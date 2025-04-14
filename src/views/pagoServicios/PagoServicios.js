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


const limpiar = (value)=>{

  if(value === null){
    return ''
  }
  
  
  var result = "";
  var characters ="0123456789";
  
    
    for (let i = 0; i < value.length; i++) {
      result += characters.includes(value[i]) ? value[i] : "";
    }

  return result;

}

const PagoServicios = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const getEstado = () => dispatch(getconsultaProducto());

  const { consulta, cargando } = useSelector(
    (state) => state.estadoCuenta
  );
  const {  cuentas } = consulta;

  const iniTransaccion = {
    xid: "",
    transaccion: "Servicio",
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

  const [page, setPage] = useState(0);
  const [Transaccion, setTransaccion] = useState(iniTransaccion);
  const [serviciosProvider, setServiciosProvider] = useState([]);
  const [processing, setprocessing] = useState(false);

  const { provider, cuenta, monto, facturas, nombre, comentario, contrato } =
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

  const handleValide = async () => {
    try {
      const peticion = await clienteAxios.get(`services/balances`, {
        params: {
          tipo: "Servicio",
          servicio: provider,
          contrato: limpiar(contrato),
        },
      });
      setTransaccion({
        ...Transaccion,
        nombre: peticion.data.nombre,
        xid: peticion.data.xid,
        facturas: peticion.data.facturas,
      });
      setPage(1);
    } catch (error) {
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
 
      setServiciosProvider(peticion.data.serviciosProvider);
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
          RealizarPago({
            ...Transaccion,
            contrato : limpiar(Transaccion.contrato)
          });
        }
      });
    }
  };

  const RealizarPago = async (data) => {
    setprocessing(true);
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
                      disabled={page !== 0}
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
                    <CLabel htmlFor="text-input">Contrato</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    {provider === "ALTICE" || 
                     provider === "VIVA POSTPAGO" || provider === "CLARO" || provider === "CLARO - POSTPAGO"? (
                      <InputMask
                        mask="(999) 999-9999"
                        className="form-control"
                        name="contrato"
                        value={contrato}
                        onChange={handleChange}
                        disabled={page !== 0}
                      />
                    ) : (
                      <CInput
                        className="form-control"
                        name="contrato"
                        value={contrato}
                        onChange={handleChange}
                        disabled={page !== 0}
                      />
                    )}
                  </CCol>
                </CFormGroup>
                {page > 0 && (
                  <>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Nombre</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                        <CInput name="nombre" value={nombre} readOnly />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Monto</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                        <CSelect
                          custom
                          name="monto"
                          value={monto}
                          onChange={handleChange}
                        >
                          <option value="">-- Seleccione Monto -- </option>
                          {facturas.map((row,index) => {
                            return (
                              <option key={index} value={row.total}>
                                {row.total} | Factura No.: {row.ref} |{" "}
                                {moment(row.fecha).format("DD/MM/YYYY")}
                              </option>
                            );
                          })}
                        </CSelect>
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
                  </>
                )}
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter style={{ textAlign: "right" }}>
            {page === 0 ? (
              <CButton onClick={handleValide} size="sm" color="success">
                <CIcon name="cil-scrubber" /> Siguiente
              </CButton>
            ) : processing ? (
              <Spinner />
            ) : (
              <>
                <CButton onClick={handleEnviar} size="sm" color="success">
                  <CIcon name="cil-scrubber" /> Realizar Transaccion
                </CButton>{" "}
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

export default PagoServicios;
