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
import Spinner from "src/reusable/Spinner";
import swal from "sweetalert";
import InputMask from "react-input-mask";
import clienteAxios from "src/config/axios";
import moment from "moment";
import { ImprimirDocumento } from "src/actions/uepapayAction";

const PagoServicios = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const getEstado = () => dispatch(getconsultaProducto());

  const { consulta, cargando } = useSelector(
    (state) => state.estadoCuenta
  );
  const {  cuentas  } = consulta;

  const ram = (length)=>{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
  }
  const iniTransaccion = {
    xid: `${moment().format("YYYYMMDD")}${ram(30)}`,
    transaccion: "Recarga",
    provider: "",
    contrato: "",
    nombre: "",
    cuenta: "",
    concepto: 1,
    comentario: "",
    monto: 0,
    fee: 0,
    total: 0,
    facturas: [],
  };

   const [Transaccion, setTransaccion] = useState(iniTransaccion);
  const [serviciosProvider, setServiciosProvider] = useState([]);
  const [processing, setprocessing] = useState(false);

  const { provider, cuenta, monto, comentario, contrato } =
    Transaccion;

  useEffect(() => {
    getEstado();
    getGlobalSetting();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 
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
      if (e.target.name === "beneficiario") {
        setTransaccion({
          ...Transaccion,
          [e.target.name]: e.target.value,
        });
        consultaCuenta(e.target.value);
      } else {
        setTransaccion({
          ...Transaccion,
          [e.target.name]: e.target.value,
        });
      }
    }
  };

   
  const consultaCuenta = async (cuenta) => {
    try {
      const peticion = await clienteAxios.get(
        `transacciones/transcuenta?beneficiario=${cuenta}`
      );
 
      setTransaccion({
        ...Transaccion,
        beneficiario: cuenta,
        beneficiarioname: peticion.data.msg === "" ? peticion.data.nombre : "",
      });
    } catch (error) {}
  };

  const getGlobalSetting = async (cuenta) => {
    try {
      const peticion = await clienteAxios.get(`services/proveedor`);
 
      setServiciosProvider(peticion.data.recargaProvider);
    } catch (error) {}
  };

  const handleEnviar = () => {
    if (cuenta.toString() === "") {
      swal({
        title: "Transaccion",
        text: `Favor seleccione producto a Debitar ! `,
        icon: "info",
        button: "Aceptar",
      });
      return;
    } else {
      swal({
        title: "Pago de Servicios",
        text: `Estas seguro de que deseas Realizar Transaccion ? `,
        icon: "warning",
        buttons: ["No", "Si"],
      }).then((respuesta) => {
        if (respuesta) {
          RealizarPago(Transaccion);
        }
      });
    }
  };

  const RealizarPago = async (data) => {
    setprocessing(true)
    console.log(data)
    try {
      const peticion = await clienteAxios.post(`services/Payment`, data);
      history.push(`/Transaccion/confirmacion/${peticion.data.toString()}`)
      
      setprocessing(false)

    } catch (error) {
      swal({
        title: "Transaccion no Procesada",
        text: error.response.data,
        icon: "warning",
        button: "Aceptar",
      });
      setprocessing(false)
    }
  };
  const handleCancelar = () => {
    history.push("/dashboard");
  };

   return (
    <>
      <CCol xs="12" sm="8">
        <CCard>
          <CCardHeader>Pago de Servicios</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs="12">
                <CFormGroup row>
                  <CCol md="4">
                    <CLabel htmlFor="text-input">Proveedor / Servicio</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CSelect
                      custom
                      name="provider"
                      id="ccmonth"
                      value={provider}
                      onChange={handleChange}
                    >
                      <option value="">-- Seleccione Proveedor -- </option>
                      {serviciosProvider.map((row,index) => {
                        return (
                          <option key={index} value={row.descripcion}>
                            {row.descripcion}
                          </option>
                        );
                      })}
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="4">
                    <CLabel htmlFor="text-input">Telefono </CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <InputMask
                      mask="(999) 999-9999"
                      className="form-control"
                      name="contrato"
                      value={contrato}
                      onChange={handleChange}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="4">
                    <CLabel htmlFor="text-input">Monto</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CInput
                      custom
                      name="monto"
                      value={monto}
                      onChange={handleChange}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="4">
                    <CLabel htmlFor="text-input">Cuenta de Origen</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CSelect
                      custom
                      name="cuenta"
                      value={cuenta}
                      onChange={handleChange}
                    >
                      <option value="">-- Seleccione Cuenta -- </option>
                      {cuentas.map((row,index) => {
                        if (row.tipocuenta === 1) {
                          return (
                            <option key={index} value={row.cuenta}>
                              {row.cuenta} | {row.producto}
                            </option>
                          );
                        } else {
                          return <></>;
                        }
                      })}
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="4">
                    <CLabel htmlFor="text-input">Comentario</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
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
          <CCardFooter >
            {processing ? (
              <Spinner />
            ) : (
              <CRow>
                <CCol md="6" style={{ textAlign: "left" }}>
                  <CButton onClick={handleCancelar} size="sm" color="danger">
                    <CIcon name="cil-ban" /> Cancelar{" "}
                  </CButton>
                </CCol>
                <CCol md="6" style={{ textAlign: "right" }}>
                  <CButton onClick={handleEnviar} size="sm" color="success">
                    <CIcon name="cil-scrubber" /> Realizar Transaccion
                  </CButton>
                </CCol>
              </CRow>
            )}
          </CCardFooter>
        </CCard>
      </CCol>
    </>
  );
};

export default PagoServicios;
