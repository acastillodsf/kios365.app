import {
    CButton,
    CCol,
    CImg,
    CModal,
    CModalBody,
    CModalFooter,
    CRow,
  } from "@coreui/react";
  import React, {  useEffect, useState } from "react";
  import NumberFormat from "react-number-format";
  import ilustracion from "../../../img/pricing-Illustration.svg";
  
  export const ValidarMail = ({ active, code,Close, mail,Validado }) => {
   
     const [gAuth, setgAuth] = useState("");
    
    const GAuth = (tok) => {
      if (parseInt(tok.replace(" ", "")) === code) {
        Validado()
      } else {
        setgAuth("");
      }
    };
    useEffect(() => {
      if (gAuth.replace("_", "").length === 7) {
        GAuth(gAuth);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gAuth]);
  
   
  
     return (
      <div>
        <CModal
          show={active}
          style={{ background: "#f6f6f6" }}
          size="lg"
          closeOnBackdrop={false}
          centered
        >
          <CModalBody style={{ minHeight: 315 }}>
   
              <CRow>
                <CCol xs="12">
                  <div className="pricing-free-trial mt-5">
                    <div className="row">
                      <div className="col-12 col-lg-10 col-lg-offset-3 mx-auto">
                        <div className="pricing-trial-content d-flex justify-content-between">
                          <div className="text-md-left mt-3 mr-3">
                            <h3 className="text-primary">
                              Codigo de Autorizacion
                            </h3>
                            <p>
                              Hemos enviado el codigo de validacion al correo
                              suscriptor  {mail} 
                              <br />
                            </p>
  
                            <CRow>
                              <CCol>
                                <NumberFormat
                                  className="form-control"
                                  value={gAuth}
                                  onChange={(e) => setgAuth(e.target.value)}
                                  format="### ###"
                                  mask="_"
                                />
                              </CCol>
                            </CRow>
  
                            <CRow style={{marginTop:15}} >
                              <CCol md="12">
                                <CRow>
                                  <CCol md="6">
                                    <CButton
                                      color="secondary"
                                      className="btn-block btn-color"
                                      onClick={() => {
                                        Close()
                                      }}
                                    >
                                      Volver
                                    </CButton>
                                  </CCol>
                                  <CCol md="6">
                                    <CButton
                                      color="primary"
                                      className="btn-block btn-color"
                                      onClick={() => {
                                        GAuth(gAuth);
                                      }}
                                    >
                                      Verificar
                                    </CButton>
                                  </CCol>
                                </CRow>
                              </CCol>
                            </CRow>
                          </div>
                          <CImg src={ilustracion} />
                        </div>
                      </div>
                    </div>
                  </div>
                </CCol>
              </CRow>
           </CModalBody>
          <CModalFooter>
            <CCol style={{ textAlign: "end" }}>
              <CButton
                color="secondary"
                onClick={() => Close()}
              >
                Cancel
              </CButton>
            </CCol>
          </CModalFooter>
        </CModal>
      </div>
    );
  };
  
  export default ValidarMail;
  