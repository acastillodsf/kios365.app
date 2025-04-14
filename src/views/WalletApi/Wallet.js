import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CInput,
  CRow,
} from "@coreui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getwalletApi } from "src/actions/CardNetAction";
import { AddCrediCard } from "./AddCrediCard";
import Swal from "sweetalert2";
import { Downloading } from "src/reusable/Spinner";
import clienteAxios from "src/config/axios";

const addScript = (etiqueta, url) => {
  const wallet = document.getElementById(etiqueta);
  const script = document.createElement("script");
  script.src = url;
  script.async = true;
  wallet.appendChild(script);
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

export const Wallet = ({match}) => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(getwalletApi(match.params.id)), []);

  const { cargando, SettingCarNet, error } = useSelector(
    (state) => state.Wallet
  );

  const [PaymentProfiles, setPaymentProfiles] = useState([]);
  const [Inicialiced, setIni] = useState(false);
  const [UniqueID, setUniqueID] = useState("");
  const [CaptureURL, setCaptureURL] = useState("");
  const [active, setActive] = useState(false);

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
          "wallet",
          `${SettingCarNet.PWCheckout}Scripts/PWCheckout.js?key=${SettingCarNet.PublickKey}`
        );

        setTimeout(() => {
          addScript("wallet", "/PWCheckout.js");
        }, 500);
        setIni(true);
      }
    }
  }, [cargando, error]);

  const [searchTerm, setSearchTerm] = useState("");

 
  const wallet_DeleteProfile = async(id,PaymentProfileId) => {
    dispatch({type: 'wallet->init'});
    try {
      await clienteAxios.delete("/carnet/tokenizacion/wallet",{params: { id,PaymentProfileId }});
      window.location.reload()
    } catch (error) {
      dispatch({type:'wallet-error',payload: error });
    }
  };

  
  return (
    <div id="wallet">

      { cargando ? <Downloading value="Cargando" /> : 
      <CRow>
        <input
          id="carnettokenUniqueID"
          value={SettingCarNet.UniqueID}
          type="hidden"
        />
        <input id="carnettokencaptureUrl" value={CaptureURL} type="hidden" />

        <CCol md="12" xl="9">
          <CCard>
            <CCardBody>
              <CRow>
                <CCol>
                  <div class="text-md-left mt-0">
                    <h3 class="text-primary">Wallet </h3>
                  </div>
                </CCol>
              </CRow>
              <div className="row my-2 mx-0">
                
                <CCol
                  xl="5"
                  className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
                >
                  <div className="card-header-actions">
                    <form id="form_1">
                      <input name="PWToken" type="hidden" id="PWToken" />
                      <CButton
                        color="primary"
                        variant="outline"
                        size="xl"
                        active
                        value="Checkout"
                        id="btnCheckout"
                        block
                        aria-pressed="true"
                        onClick={() => {}}
                      >
                        Adicionar Nueva Tarjeta
                      </CButton>
                    </form>
                  </div>
                </CCol>
              </div>
              <table className="table table-hover table-outline mb-0  d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center"></th>
                    <th>Tarjeta</th>
                    <th>Opciones</th>
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
                          <div className="spinner-border" role="status"></div>
                          <strong className="ml-1">Cargando....</strong>
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
                          <div className="spinner-border" role="status"></div>
                          <strong className="ml-1">Cargando....</strong>
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
                            <div>{row.Type}</div>
                            <div className="small text-muted"><span>{`${row.Bin.substring(0, 4)} **** **** ${row.Last4}`}</span> </div>
                            <div>{row.Expiration.substring(0, 4)} /{" "} {row.Expiration.substring(4, 6)}</div>
                            <div><CBadge color={getBadge(row.Enabled)}>
                              {row.Enabled ? "Active" : "Pendiente"}
                            </CBadge></div>
                          </td>
                          <td className="py-2">
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
                                  confirmButtonText: "Si, Estoy Seguro!",
                                  cancelButtonText: "Cancelar",
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                      wallet_DeleteProfile(SettingCarNet.id,row.PaymentProfileId)
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
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      }

      <AddCrediCard />
    </div>
  );
};

export default Wallet;
