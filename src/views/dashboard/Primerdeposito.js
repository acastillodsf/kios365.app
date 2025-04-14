/* eslint-disable react-hooks/exhaustive-deps */
import CIcon from "@coreui/icons-react";
import {
  CBadge,
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
import { suscripcionSummit } from "src/actions/uepapayAction";
import Spinner from "src/reusable/Spinner";
import swal from "sweetalert";
import { ButtonCardNet } from "../deposito/ButtonCardNet";
import Swal from "sweetalert2";
import { getwallet, wallet_DeleteProfile } from "src/actions/CardNetAction";
import { ActivateCrediCard } from "../Wallet/CrediCard_Activate";

const addScript = (etiqueta, url) => {
  const wallet = document.getElementById(etiqueta);
  const script = document.createElement("script");
  script.src = url;
  script.async = true;
  wallet.appendChild(script);
};

const Primerdeposito = ({ datos }) => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(getwallet()), []);

  const { cargando, SettingCarNet, error } = useSelector(
    (state) => state.Wallet
  );

  const [PaymentProfiles, setPaymentProfiles] = useState([]);
  const [Inicialiced, setIni] = useState(false);
  const [UniqueID, setUniqueID] = useState("");
  const [CaptureURL, setCaptureURL] = useState("");

  useEffect(() => {
    if (!cargando && !error && SettingCarNet.PaymentProfiles) {
      setPaymentProfiles(SettingCarNet.PaymentProfiles);
      setUniqueID(SettingCarNet.UniqueID);
      setCaptureURL(SettingCarNet.CaptureURL);
    }
  }, [cargando, error]);

  useEffect(() => {
    if (!Inicialiced) {
      if (SettingCarNet.PublickKey && SettingCarNet.PWCheckout) {
        addScript(
          "walletBienvenido",
          `${SettingCarNet.PWCheckout}Scripts/PWCheckout.js?key=${SettingCarNet.PublickKey}`
        );

        setTimeout(() => {
          addScript("walletBienvenido", "/PWCheckout.js");
        }, 500);
        setIni(true);
      }
    }
  }, [cargando, error]);

  const history = useHistory();

  const { socio, nombres } = datos;
  const { uepapaySuscripcionLoading, suscripcion } = useSelector(
    (state) => state.uepapay
  );
  const { url } = suscripcion;

  const iniTransaccion = {
    xid: "",
    cuenta: "",
    concepto: 1,
    comentario: "Cuota de Apertura",
    ahorro: 1000,
    aportacion: 3000,
    cuota: 1000,
    monto: 5000,
    fee: 300,
    total: 5300,
  };

  const [Transaccion, setTransaccion] = useState(iniTransaccion);

  const { ahorro, aportacion, cuota, monto, comentario, total, fee } =
    Transaccion;

  const handleChange = (e) => {
    // if (e.target.name === "monto") {
    //   setTransaccion({
    //     ...Transaccion,
    //     [e.target.name]: e.target.value,
    //     fee: e.target.value * 0.06,
    //     total: e.target.value * 1.06,
    //   });
    // } else {
    //   setTransaccion({
    //     ...Transaccion,
    //     [e.target.name]: e.target.value,
    //   });
    // }
    setTransaccion({
      ...Transaccion,
    });
  };

  const getBadge = (status) => {
    switch (status) {
      case true:
        return "success";
      case false:
        return "secondary";
      case "Pending":
        return "warning";
      case "En Espera":
        return "danger";
      default:
        return "primary";
    }
  };

  const handleCancelar = () => {
    history.push("/dashboard");
  };

  useEffect(() => {
    if (url) {
      window.location.assign(url);
    }
  }, [uepapaySuscripcionLoading]);


  let disasiguiente = true;

  !cargando && PaymentProfiles.map((row) => {
    if(row.Enabled){
      disasiguiente=false;
    }
  })

  return (
    <>
      <input
        id="carnettokenUniqueID"
        value={SettingCarNet.UniqueID}
        type="hidden"
      />
      <input id="carnettokencaptureUrl" value={CaptureURL} type="hidden" />
      <input
        id="carnettokencapturePublickey"
        value={SettingCarNet.PublickKey}
        type="hidden"
      />

      <CCol xs="12" sm="10" id="walletBienvenido">
        <CCard
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: 550,
            backgroundImage:
              "url(https://blog.cliengo.com/wp-content/uploads/2022/10/BLOG_Estrategia-de-negocios-02-800x301.png)",
          }}
        >
          <CCardBody>
            <CRow>
              <CCol xs="12">
                <div className="pricing-free-trial mt-5">
                  <div className="row">
                    <div className="col-12 col-lg-10 col-lg-offset-3 mx-auto">
                      <div className="pricing-trial-content d-flex  ">
                        <div className="text-md-left">
                          <h3 className="text-secundary">
                            Bienvenido a CoopQuisqueya
                          </h3>
                          <h6 className="text-prymary"></h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-lg-10 col-lg-offset-3 mx-auto">
                      <div className="pricing-trial-content d-flex justify-content-between">
                        <div className="text-md-left   mt-3">
                          <p style={{ color: "#32325d" }}>
                            Ofrecemos una amplia gama de productos y servicios
                            financiero que seguramente se ajustarán a sus
                            necesidades. Antes de continuar, nos gustaría
                            solicitarle que nos proporcione su forma de pago
                            preferida.
                          </p>
                          <p style={{ color: "#32325d" }}>
                            Para garantizar una experiencia de compra sin
                            complicaciones, ofrecemos diversas opciones de pago,
                            desde tarjetas de crédito hasta transferencias
                            bancarias. Simplemente indíquenos su método de pago
                            preferido y estaremos encantados de asistirle en su
                            proceso de inscripcion.
                          </p>
                          <CButton
                            color="primary"
                            variant="outline"
                            active
                            style={{ width: 200 }}
                            value="Checkout"
                            id="btnCheckout"
                            block
                            aria-pressed="true"
                            onClick={() => {}}
                          >
                            Adicionar Nueva Tarjeta
                          </CButton>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-lg-10 col-lg-offset-3 mx-auto">
                      <div className="pricing-trial-content d-flex justify-content-between">
                        <div className="text-md-left   mt-3">
                          <table className="table table-hover table-outline mb-0  d-sm-table">
                            <thead className="thead-light">
                              <tr>
                                <th className="text-center"></th>
                                <th style={{width:271}}>Titular</th>
                                <th style={{width:160}} className="text-center"  >Numero Tarjeta</th>
                                <th >Tipo</th>
                                <th className="text-center">Expiracion</th>
                                <th style={{width:75}} >Estado</th>
                                <th >Opciones</th>
                              </tr>
                            </thead>
                            <tbody>
                              {cargando ? (
                                <tr>
                                  <td colspan="8" className="text-center">
                                    <div
                                      className="d-flex justify-content-center"
                                      style={{ color: "blue" }}
                                    >
                                      <div
                                        className="spinner-border"
                                        role="status"
                                      ></div>
                                      <strong className="ml-1">
                                        Cargando....
                                      </strong>
                                    </div>
                                  </td>
                                </tr>
                              ) : error ? (
                                <tr>
                                  <td colspan="8" className="text-center">
                                    <div
                                      className="d-flex justify-content-center"
                                      style={{ color: "blue" }}
                                    >
                                      <div
                                        className="spinner-border"
                                        role="status"
                                      ></div>
                                      <strong className="ml-1">
                                        Cargando....
                                      </strong>
                                    </div>
                                  </td>
                                </tr>
                              ) : (
                                PaymentProfiles.map((row) => {
                                  return (
                                    <tr>
                                      <td className="text-center">
                                        <div className="c-avatar">
                                          <img
                                            src={
                                              row.Brand === "VISA"
                                                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdWPe7GxypcraT0A8-Oyk0TPr7uM9a9iiO_XgyO3vNfbxKqXxVHI84Nwz76-vn_s_fg4U&usqp=CAU"
                                                : row.Brand === "MasterCard"
                                                ? "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png"
                                                : "/avatars/1.jpg"
                                            }
                                            className="c-avatar-img"
                                            alt="admin@bootstrapmaster.com"
                                          />
                                          <span className="c-avatar-status bg-success"></span>
                                        </div>
                                      </td>
                                      <td>
                                        <div>{row.CardOwner}</div>
                                      </td>
                                      <td className="text-left">
                                        <div>{`${row.Bin.substring(
                                          0,
                                          4
                                        )} **** **** ${row.Last4}`}</div>
                                      </td>
                                      <td>{row.Type}</td>
                                      <td className="text-left">
                                        {" "}
                                        {row.Expiration.substring(0, 4)} /{" "}
                                        {row.Expiration.substring(4, 6)}
                                      </td>
                                      <td className="text-left">
                                        <CBadge color={getBadge(row.Enabled)}>
                                          {row.Enabled ? "Active" : "Pendiente"}
                                        </CBadge>
                                      </td>
                                      <td className="py-2">
                                        {!row.Enabled && (
                                          <CButton
                                            color="primary"
                                            variant="outline"
                                            shape="square"
                                            size="sm"
                                            onClick={() => {
                                              dispatch({
                                                type: "Wallet-Activate",
                                                payload: row,
                                              });
                                            }}
                                          >
                                            Activar
                                          </CButton>
                                        )}{" "}
                                        <CButton
                                          color="primary"
                                          variant="outline"
                                          shape="square"
                                          size="sm"
                                          onClick={() => {
                                            Swal.fire({
                                              title: "Wallet",
                                              text: "Estas Seguro que deseas Eliminar Metodo de Pago ?",
                                              icon: "warning",
                                              showCancelButton: true,
                                              confirmButtonColor: "#3085d6",
                                              cancelButtonColor: "#d33",
                                              confirmButtonText:
                                                "Si, Estoy Seguro!",
                                              cancelButtonText: "Cancelar",
                                            }).then((result) => {
                                              if (result.isConfirmed) {
                                                dispatch(
                                                  wallet_DeleteProfile(
                                                    SettingCarNet.id,
                                                    row.PaymentProfileId
                                                  )
                                                );
                                              }
                                            });
                                          }}
                                        >
                                          Eliminar
                                        </CButton>
                                      </td>
                                    </tr>
                                  );
                                })
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div> 
                </div>
              </CCol>
            </CRow>
            <CRow className="text-md-left   mt-3 col-lg-10 col-lg-offset-3 mx-auto">
              {uepapaySuscripcionLoading ? (
                <Spinner />
              ) : (
                <>
                  <CCol>
                     
                  </CCol>
                  <CCol style={{textAlign:'end'}}>
                    <CButton onClick={handleCancelar} size="sm" color="primary" disabled={disasiguiente} >
                      <CIcon name="cil-ban" /> Siguiente >
                    </CButton>
                  </CCol>
                </>
              )}
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <ActivateCrediCard />
    </>
  );
};

export default Primerdeposito;
