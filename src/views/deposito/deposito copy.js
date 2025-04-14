import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CSelect,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getconsultaProducto } from "src/actions/sociosEstadoCuentaAction";
import { enviarPeticion } from "src/actions/uepapayAction";
import Spinner from "src/reusable/Spinner";
import swal from "sweetalert";
import { ButtonCardNet } from "./ButtonCardNet";
import { TransCarNet } from "./TransCarNet";

const Deposito = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const getEstado = () => dispatch(getconsultaProducto());

  const { uepapayLoading, peticion } = useSelector((state) => state.uepapay);
  const { cargandolista, listsocios } = useSelector((state) => state.socios);
  const { consulta, cargando, cargado } = useSelector(
    (state) => state.estadoCuenta
  );
  const { datos, cuentas, certificados, prestamos } = consulta;

  const iniTransaccion = {
    xid: "",
    cuenta: "",
    concepto: 1,
    comentario: "",
    monto: 0,
    fee: 0,
    total: 0,
    app: "web",
    divisa:"DOP"
    
  };

  const [Transaccion, setTransaccion] = useState(iniTransaccion);
  const { cuenta,divisa, monto, comentario, total, fee } = Transaccion;



  useEffect(() => {
    getEstado();
  }, []);

  useEffect(() => {
    console.log(cuentas);
  }, [cuentas]);

  if (cargando) {
    return <Spinner />;
  }

  const handleChange = (e) => {
    if (e.target.name === "monto") {
      setTransaccion({
        ...Transaccion,
        [e.target.name]: e.target.value,
        fee: e.target.value * 0.06,
        total: e.target.value * 1.06,
      });
    } else {
      setTransaccion({
        ...Transaccion,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleEnviar = () => {
    // setTransaccion({
    //     ...Transaccion,
    //     url: 'https://dasoft.com.do/test.php',
    //   });
    // console.log(Transaccion);

    // window.open('https://dasoft.com.do/test.php')?.focus();
    // window.location.assign('https://dasoft.com.do/test.php');



    if(cuenta.toString()===""){
      swal({
        title: "Transaccion",
        text: `Favor seleccione producto a Creditar ! `,
        icon: "info",
        button: "Aceptar",
      });
      return ;
    }else{
      dispatch(enviarPeticion(Transaccion));
    }
    
  };
  // 02428318
  // popular
  // Juan Jimenez
  const handleCancelar = () => {
    history.push("/dashboard");
  };

  return (
    <>
      <CCol xs="12" sm="6">
        <CCard>
          <CCardHeader>Deposito a Cuenta</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs="12">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Cuenta a Creditar</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect
                      custom
                      name="cuenta"
                      id="ccmonth"
                      value={cuenta}
                      onChange={handleChange}
                    >
                        <option value="">-- Seleccione Cuenta -- </option>
                      {cuentas.map((row) => {
                        return (
                          <option value={row.cuenta}>
                            {row.cuenta} | {row.divisa} | {row.producto}
                          </option>
                        );
                      })}
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Moneda</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="divisa"
                      value={divisa}
                      onChange={handleChange}
                      readOnly
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Monto</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="monto"
                      value={monto}
                      onChange={handleChange}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Fee</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="monto"
                      value={fee.toFixed(2)}
                      onChange={handleChange}
                      disabled
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Total Transaccion</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="monto"
                      value={total.toFixed(2)}
                      onChange={handleChange}
                      disabled
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Concepto</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="comentario"
                      value={comentario}
                      onChange={handleChange}
                    />
                  </CCol>
                </CFormGroup>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            {uepapayLoading ? (
              <Spinner />
            ) : (
              <>
                <ButtonCardNet 
                cuenta={cuenta}
                comentario={comentario}
                Amount={{
                  monto: monto,
                  fee: fee,
                  total: total
                }} 
                Tax={0} /> {" "}
                <CButton onClick={handleCancelar} size="sm" color="danger">
                  <CIcon name="cil-ban" /> Cancelar{" "}
                </CButton>
              </>
            )}
          </CCardFooter>
        </CCard>
      </CCol>
    </>
  );
};

export default Deposito;
