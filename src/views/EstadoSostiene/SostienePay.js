import {
  CButton,
  CCol,
  CFormGroup,
  CImg,
  CLabel,
  CModal,
  CModalBody,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { DisabledAutorization } from "src/reusable/Spinner";
import clienteAxios from "src/config/axios";
import swal from "sweetalert";
import { SelectCustom } from "../Productos/SelectCustom";

export const SostienePay = ({ close, show, suscripcion }) => {
  const [desc, setDesc] = useState(false);
  const [spin, setSpin] = useState(false);
  const [Data, setData] = useState({
    suscripcion : 0,
    metodo: "UepaPay",
    monto: 0,
    cuota: 0,
    avance: 0,
    cargo: 100,
    fee: 100,
    plazo: 1
  });

  const hangleChange = (e) => {
    if (e.target.name === "metodo" || e.target.name === "plazo") {
      const metodo = e.target.name === "metodo" ? e.target.value : Data.metodo;

      const plazo = e.target.name === "plazo" ? e.target.value : Data.plazo;
      const cuota = (parseInt(plazo)===1 ? suscripcion.saldo : suscripcion.cuota);
      const fee = (cuota * 0.06).toFixed(2);

      setData({
        ...Data,
        [e.target.name]: e.target.value,
        plazo: plazo,
        avance: cuota,
        fee: metodo === "UepaPay" ? fee : 0,
        monto:
          parseFloat(cuota) +
          parseFloat(metodo === "UepaPay" ? fee : 0),
      });
    } else {
      setData({
        ...Data,
        [e.target.name]: e.target.value,
      });
    }
  };
  useEffect(() => {
    if (show) {
      setData({
        ...Data,
        suscripcion: suscripcion.suscripcion,
        avance: suscripcion.precio,
        metodo: "UepaPay",
        monto:
          (parseFloat(suscripcion.precio) ) *
          1.05,
        fee:
          (parseFloat(suscripcion.precio)) *
          0.05,
      });
    }
  }, [show]);
  const plazos = [];

  if (suscripcion.saldo !== undefined) {
    plazos.push({
      value: 1,
      name: "Realizar Saldo Total",
      text: Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      })
        .format(suscripcion.saldo)
        .replace("$", ""),
    });
    plazos.push({
      value: 2,
      name: "Realizar Pago Cuota",
      text: Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      })
        .format(suscripcion.cuota)
        .replace("$", ""),
    });
  }

  const PAGAR = async () => {
    setDesc(true);
    await clienteAxios
      .post("/order/createpay", Data)
      .then(async ({ data }) => {
        console.log(data);

        //   const w = window.open(fileUrl, "_blank");
        //   w && w.focus();
        setTimeout(() => setDesc(false), 1000);

        setSpin(true);
        // const formulario = document.getElementById("form");
        // formulario.submit();

        var win = window.open(
          data.pago,
          "_blank",
          "titlebar=Hola,toolbar=0,location=0,menubar=0,width=1060,height=1020"
        );

        var pollTimer = window.setInterval(function () {
          if (win.closed !== false) {
            // !== is required for compatibility with Opera
            window.clearInterval(pollTimer);
            setSpin(false);
            VerificarEstado(data.orden);
          }
        }, 200);
      })
      .catch(() => {
        setDesc(false);
      });
  };
  const VerificarEstado = (orden) => {
    clienteAxios
      .get(`/order/status`, { params: { orden } })
      .then(({ data }) => {
        if (data.metodo === "UepaPay" && data.estado === "Approved") {
          swal({
            title: "Approved",
            text: `Nuemero de Autorizacion ${data.authorizationcode}, Cargo  realizado con la Tarjeta Terminada en ${data.cardnumber}`,
          });
          close();
        }
      });
  };
  return (
    <div>
      <CModal
        show={show}
        onClose={close}
        closeOnBackdrop={false}
        centered
        size="lg"
        className="mobile-modal"
        style={{ maxHeight: '100vh', overflowY: 'auto' }}

      >
        <CModalBody>
          <CCol xs="12">
            <div className="pricing-free-trial mt-5">
              <div className="row">
                <div className="col-12 col-lg-12 col-lg-offset-3 mx-auto">
                  <CRow>
                    <CCol>
                      <CRow>
                        <CCol
                          md="0"
                          style={{
                            width: 60,
                            height: 60,
                            margin: "0px 15px",
                            textAlign: "center",
                          }}
                        >
                          <CImg
                            src={suscripcion.imagen}
                            style={{ height: 59 }}
                          />
                        </CCol>
                        <CCol
                          style={{
                            paddingBottom: 20,
                            marginLeft: 10,
                            alignItems: "center",
                            textAlign: "start",
                          }}
                        >
                          <div> {suscripcion.nombre} </div>

                          <div className="small text-muted">
                            {suscripcion.descripcion}
                          </div>
                          <div className="small text-muted">
                            Precio: {suscripcion.precio}
                          </div>
                        </CCol>
                      </CRow>
                    </CCol>
                    <CCol
                      md="6"
                      style={{
                        paddingBottom: 20,
                        marginLeft: 10,
                        alignItems: "center",
                        textAlign: "end",
                      }}
                    >
                      <h3 className="text-primary">Pago con Tarjeta</h3>
                    </CCol>
                  </CRow>
                  {/* <CRow>{JSON.stringify(Data)}</CRow> */}
                  <div
                    className="pricing-trial-content d-flex flex-column flex-md-row justify-content-between"
                    style={{
                      minHeight: 500,
                    }}
                  >
                    <CCol 
                      name="id1"
                      className="text-md-left mt-3"
                      md="7"
                      xs="12"
                      style={{
                        paddingRight: 0,
                      }}
                    >
                      <CFormGroup row>
                        <CCol xs="12" md="12">
                          <CLabel>Metodo de Pago : </CLabel>
                          <SelectCustom
                            value={Data.metodo}
                            data={[
                              {
                                value: "UepaPay",
                                name: "Pago con Tarjeta",
                              },
                            ]}
                            name="metodo"
                            onChange={hangleChange}
                          />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="12" md="12">
                          <CLabel>Cantidad de Plazo : </CLabel>
                          <SelectCustom
                            value={Data.plazo}
                            data={plazos}
                            name="plazo"
                            onChange={hangleChange}
                            onChange2={(e) => {
                              setData({
                                ...Data,
                                plazo: e.target.value,
                                cuota: (
                                  suscripcion.precio / e.target.value
                                ).toFixed(2),
                              });
                            }}
                          />
                        </CCol>
                      </CFormGroup>

                      {/* {DataForm.modo ===
                      "produccion" && (
                      <Fragment>
                        <CFormGroup row>
                          <CCol md="3">
                            <CLabel>Comercio : </CLabel>
                          </CCol>
                          <CCol xs="12" md="9">
                            <CInput
                              id="text-nameApp"
                              name="MerchantName"
                              value={DataForm.produccion.MerchantName}
                              onChange={hanChangeParam}
                            />
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol md="3">
                            <CLabel>Registro: </CLabel>
                          </CCol>
                          <CCol xs="12" md="9">
                            <CInput
                              id="text-urlApp"
                              name="MerchantNumber"
                              value={DataForm.produccion.MerchantNumber}
                              onChange={hanChangeParam}
                            />
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol md="3">
                            <CLabel>Terminal : </CLabel>
                          </CCol>
                          <CCol xs="12" md="9">
                            <CInput
                              id="text-homeName"
                              name="MerchantTerminal"
                              value={DataForm.produccion.MerchantTerminal}
                              onChange={hanChangeParam}
                            />
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol md="3">
                            <CLabel>Type : </CLabel>
                          </CCol>
                          <CCol xs="12" md="9">
                            <CInput
                              id="text-homepage"
                              name="MerchantType"
                              value={DataForm.produccion.MerchantType}
                              onChange={hanChangeParam}
                            />
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol md="3">
                            <CLabel>Code Institution : </CLabel>
                          </CCol>
                          <CCol xs="12" md="9">
                            <CInput
                              id="text-homepage"
                              name="AcquiringInstitutionCode"
                              value={DataForm.produccion.AcquiringInstitutionCode}
                              onChange={hanChangeParam}
                            />
                          </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                          <CCol md="3">
                            <CLabel>URL Cancell : </CLabel>
                          </CCol>
                          <CCol xs="12" md="9">
                            <CInput
                              id="text-contactpage"
                              name="urlCancell"
                              value={DataForm.produccion.urlCancell}
                              onChange={hanChangeParam}
                            />
                          </CCol>
                        </CFormGroup>
                      </Fragment>
                    )} */}
                    </CCol>
                    <CCol name="id1" md="5" xs="12">
 
 
 
                      <CRow style={{ marginBottom: 6 }}>
                        <CCol  xs="7" md="7">Modalidad : </CCol>{" "}
                        <CCol xs="5" style={{ textAlign: "end" }}> {Data.plazo===1 ? "Saldar" : "Pago Cuota"}</CCol>
                      </CRow>
                      <CRow style={{ marginBottom: 6 }}>
                        <CCol  xs="7" md="7">Monto  :</CCol>{" "}
                        <CCol xs="5" style={{ textAlign: "end" }}> {Data.avance}</CCol>
                      </CRow>
                      
                      <CRow style={{ marginBottom: 6 }}>
                        <CCol xs="7" md="7">Fee UepaPay :</CCol>{" "}
                        <CCol xs="5" style={{ textAlign: "end",background:'red' }}>
                          {" "}
                          {Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          })
                            .format(parseFloat(Data.fee))
                            .replace("$", "RD$ ")}
                        </CCol>
                      </CRow>
                      <hr />
                      <CRow
                        style={{
                          marginBottom: 6,
                          fontSize: 14,
                          fontWeight: "bold",
                          color: "#B12704",
                        }}
                      >
                        <CCol md="7">Pagar Ahora: </CCol>{" "}
                        <CCol style={{ textAlign: "end" }}>
                          {Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          })
                            .format(
                              parseFloat(Data.monto) 
                            )
                            .replace("$", "RD$ ")}
                        </CCol>
                      </CRow>
                      
                      <CRow>
                        <CButton
                          color="primary"
                          variant="outline"
                          style={{
                            width: "100%",
                            padding: 10,
                            marginBottom: 13,
                          }}
                          onClick={() => PAGAR()}
                        >
                          <Icon icon="fluent-mdl2:payment-card" width={25} />{" "}
                          Pagar con {Data.metodo} ({" "}
                          {Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          })
                            .format(parseFloat(Data.avance))
                            .replace("$", "RD$ ")}
                          )
                        </CButton>
                      </CRow>
                      <CRow>
                        <CButton
                          color="danger"
                          variant="outline"
                          style={{
                            width: "100%",
                            padding: 10,
                            marginBottom: 13,
                          }}
                          onClick={() => close()}
                        >
                          <Icon
                            icon="material-symbols:cancel-outline"
                            width={25}
                          />{" "}
                          Cancelar
                        </CButton>
                      </CRow>
                    </CCol>
                  </div>
                </div>
              </div>
            </div>
          </CCol>
        </CModalBody>
      </CModal>
      {spin && (
        <DisabledAutorization
          text="¿Actualmente tienes una Ventana de Pago Abierta ? 
          Finalice o Cancele para continuar.
          "
        />
      )}
    </div>
  );
};
