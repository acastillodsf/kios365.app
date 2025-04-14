import CIcon from "@coreui/icons-react";
import {
  CAlert,
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
import { getTransCardConfirmacion } from "src/actions/TransCardAction";
import Spinner from "src/reusable/Spinner";

const Formconfirmacion = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const getEstado = () => dispatch(getTransCardConfirmacion(match.params.id));

  const { Iniciando, TransConfirmacion } = useSelector(
    (state) => state.TransCard
  );

  useEffect(() => {
    getEstado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (Iniciando) {
    return <Spinner />;
  }

  const PaymentCode = {
    "00" : "Aprobada",
    "01" : "Llamar al Banco",
    "02" : "Llamar al Banco",
    "03" : "Comercio Invalido",
    "04" : "Rechazada",
    "05" : "Rechazada",
    "06" : "Error en Mensaje",
    "07" : "Tarjeta Rechazada",
    "08" : "Llamar al Banco",
    "09" : "Request in progress",
    "10" : "Aprobación Parcial",
    "11" : "Approved VIP",
    "12" : "Transaccion Invalida",
    "13" : "Monto Invalido",
    "14" : "Cuenta Invalida",
    "15" : "No such issuer",
    "16" : "Approved update track 3",
    "17" : "Customer cancellation",
    "18" : "Customer dispute",
    "19" : "Reintentar Transaccion",
    "20" : "No tomo accion",
    "21" : "No tomo acción",
    "22" : "Transaccion No Aprobada",
    "23" : "Transaccion No Aceptada",
    "24" : "File update not supported",
    "25" : "Unable to locate record",
    "26" : "Duplicate record",
    "27" : "File update edit error",
    "28" : "File update file locked",
    "30" : "File update failed",
    "31" : "Bin no soportado",
    "32" : "Tx. Completada Parcialmente",
    "33" : "Tarjeta Expirada",
    "34" : "Transacción No Aprobada",
    "35" : "Transaccion No Aprobada",
    "36" : "Transaccion No Aprobada",
    "37" : "Transaccion No Aprobada",
    "38" : "Transaccion No Aprobada",
    "39" : "Tarjeta Invalida",
    "40" : "Función no Soportada",
    "41" : "Transacción No Aprobada",
    "42" : "Cuenta Invalida",
    "43" : "Transacción No Aprobada",
    "44" : "No investment account",
    "51" : "Fondos insuficientes",
    "52" : "Cuenta Invalidad",
    "53" : "Cuenta Invalidad",
    "54" : "Tarjeta vencida",
    "56" : "Cuenta Invalidad",
    "57" : "Transaccion no permitida",
    "58" : "Transaccion no permitida en terminal",
    "60" : "Contactar Adquirente",
    "61" : "Excedió Limte de Retiro",
    "62" : "Tarjeta Restringida",
    "65" : "Excedió Cantidad de Intento",
    "66" : "Contactar Adquirente",
    "67" : "Hard capture",
    "68" : "Response received too late",
    "75" : "Pin excedio Limte de Intentos",
    "77" : "Captura de Lote Invalida",
    "78" : "Intervencion del Banco Requerida",
    "79" : "Rechazada",
    "81" : "Pin invalido",
    "82" : "PIN Required",
    "85" : "Llaves no disponibles",
    "89" : "Terminal Invalida",
    "90" : "Cierre en proceso",
    "91" : "Host No Disponible",
    "92" : "Error de Ruteo",
    "94" : "Duplicate Transaction",
    "95" : "Error de Reconciliación",
    "96" : "Error de Sistema",
    "97" : "Emisor no Disponible",
    "98" : "Excede Limete de Efectivo",
    "99" : "CVV or CVC Error response",
    "TF" : "Solicitud de autenticación rechazada o no completada."
  };

   return (
    <>
      {TransConfirmacion !== undefined ? (
        TransConfirmacion.responsecode !== "-00" ? (
          <CCol xs="12" sm="6">
            <CAlert color="info">
              <h4 className="alert-heading">
                Su Transaccion ha sido {""}
              </h4>
              <h4 className="alert-heading">
                {TransConfirmacion.responsecode} - {PaymentCode[TransConfirmacion.responsecode]}
              </h4>
            </CAlert>
            <CCard>
              <CCardHeader>Deposito a Cuenta</CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol xs="12">
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">
                          Debito a Tarjeta No.:{" "}
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                        <CInput
                          name="cuenta"
                          value={TransConfirmacion.creditcardnumber}
                          disabled
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">
                          Codigo de Confirmacion
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                        <CInput
                          name="authorizationcode"
                          value={TransConfirmacion.authorizationcode}
                          disabled
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Monto</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                        <CInput
                          name="monto"
                          value={TransConfirmacion.monto}
                          disabled
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">
                          Cargo Transaccion Tarjeta
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                        <CInput
                          name="monto"
                          value={TransConfirmacion.fee}
                          disabled
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Total Transaccion</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                        <CInput
                          name="monto"
                          value={TransConfirmacion.total}
                          disabled
                        />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Documemto</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                        <CInput
                          name="retrievalreferencenumber"
                          value={TransConfirmacion.retrievalreferencenumber}
                          disabled
                        />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Concepto</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                        <CInput
                          name="comentario"
                          value={TransConfirmacion.comentario}
                          disabled
                        />
                      </CCol>
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CCardBody>
              <CCardFooter>
                {false ? (
                  <Spinner />
                ) : (
                  <>
                    <CButton
                      onClick={() => {
                        history.push("/Transaccion/TransCard");
                      }}
                      size="sm"
                      color="success"
                    >
                      <CIcon name="cil-ban" /> Realizar Otra Transaccion{" "}
                    </CButton>
                  </>
                )}
              </CCardFooter>
            </CCard>
          </CCol>
        ) : (
          <>
            <CCol md="6">
              <CRow>
                <CCard>
                  <CAlert color="info">
                    <h4 className="alert-heading">
                      {TransConfirmacion.responsecode} -{" "}
                      {PaymentCode[TransConfirmacion.responsecode]}
                    </h4>
                    <p className="mb-0">
                      {" "}
                      Su transaccion no pudo ser completada, favor intentar mas
                      tarde, Si presenta el cargo en su estado de cuenta
                      bancario favor comunicarse con nuestro departamento para
                      mayor asistencia.
                    </p>
                  </CAlert>
                  <CButton
                    onClick={() => {
                      history.push("/Transaccion/TransCard");
                    }}
                    size="sm"
                    color="success"
                  >
                    <CIcon name="cil-ban" /> Realizar Otra Transaccion{" "}
                  </CButton>
                </CCard>
              </CRow>
            </CCol>
          </>
        )
      ) : (
        <>
          <h1>Error de Datoas</h1>
        </>
      )}
    </>
  );
};

export default Formconfirmacion;
