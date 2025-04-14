import {
  CButton,
  CCol,
  CImg,
  CModal,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import NumberFormat from "react-number-format";
import gauth from "../../img/google-authenticator.png";
import clienteAxios from "src/config/axios";

export const DigiCreate = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const [gAuth, setgAuth] = useState();
  const [GoogleAuth, setGc] = useState({ gAuth: "", key: "" });

  const HangleCreate = (gtoken) => {
    console.log(gtoken);
  };
  useEffect(() => getToken(), []);

  const getToken = async (dispatch) => {
    try {
      const peticion = await clienteAxios.get("/GoogleAuthEnroll");
      setGc(peticion.data);
    } catch (error) {}
  };

  return (
    <CModal
      show={show}
      onClose={() => dispatch({ type: "CLEAR_SESION_ERROR" })}
      closeOnBackdrop={false}
      centered
      style={{ background: "#f6f6f6" }}
      // size=""
    >
      <Fragment>
        <CModalBody>
          <CCol xs="12">
            <div className="pricing-free-trial mt-5">
              <div className="row">
                <div className="col-12 col-lg-10 col-lg-offset-3 mx-auto">
                  <div className="pricing-trial-content d-flex justify-content-center">
                    <div className="text-md-left ustify-content-center">
                      <h3 className="text-secundary">Google Authenticator</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-lg-10 col-lg-offset-3 mx-auto">
                  <div className="pricing-trial-content d-flex justify-content-between">
                    <div className="text-md-left ustify-content-center mt-3">
                      <p style={{ color: "#32325d", textAlign: "center" }}>
                        Escanea este codigo en tu App, Favor de no Perderlo sera
                        requerido cada vez, su seguridad es importante para
                        nosotros.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="row justify-content-center px-3 mb-0"
                style={{ textAlign: "center" }}
              >
                <CImg width={200} src={GoogleAuth.gAuth} />
              </div>
               
              <div className="row">
                <div className="col-12 col-lg-10 col-lg-offset-3 mx-auto">
                  <div className="pricing-trial-content d-flex justify-content-between">
                    <div className="text-md-left ustify-content-center mt-3">
                      <p style={{ color: "#32325d", textAlign: "center" }}>
                        Abra su aplicación de autenticación e ingrese el código
                        de seguridad de su proveedor
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-lg-10 col-lg-offset-3 mx-auto">
                  <div className="pricing-trial-content d-flex justify-content-between  mt-3">
                    <NumberFormat
                      className="form-control text-center"
                      value={gAuth}
                      onChange={(e) => setgAuth(e.target.value)}
                      format="### ###"
                      mask="_"
                      placeholder="2FA"

                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div class="row justify-content-center my-3 px-3">
                  {" "}
                  <CButton
                    color="primary"
                    className="btn-block btn-color"
                    onClick={() => {
                      HangleCreate(gAuth);
                    }}
                  >
                    Verificar
                  </CButton>
                </div>
              </div>
            </div>
          </CCol>
        </CModalBody>
        <CModalFooter style={{ borderTop: 0 }}>
          <CButton
            onClick={() => {
              setShow(false);
            }}
          >
            Cancel
          </CButton>
        </CModalFooter>
      </Fragment>
    </CModal>
  );
};
