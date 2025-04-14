import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CFormGroup,
  CImg,
  CRow,
} from "@coreui/react";
import "../../../assets/css/custom.css";
 import CIcon from "@coreui/icons-react";
import { useSelector } from "react-redux";
 
const Felicitaciones = ({ math }) => {
 
  const { settingApp } = useSelector((state) => state.appSetting);

  return (
    <div className="c-app c-default-layout flex-row align-items-center register-bg ">
      <CContainer>
        <CRow className="justify-content-lg-end justify-content-sm-center">
          <CCol md="9" lg="7" xl="12">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CRow className="justify-content-around mb-5">
                  <CCol
                    md="6"
                    lg="7"
                    xl="3"
                    sm="12"
                    className="text-center mb-3"
                  >
                    <a href="#!">
                      <CImg
                        alt="Logo CooperativaQuisqueya"
                        src={settingApp.logoApp}                        
                        width="auto"
                        height="100"
                      />
                    </a>
                  </CCol>
                  <CCol md="9" lg="7" xl="8" sm="12">
                    <h3 className="text-center text-md-right mt-3">
                      SOLICITUD SUSCRIPCION <br /> SOCIO
                    </h3>
                  </CCol>
                </CRow>

                <CRow className="justify-content-center mb-5 ">
                  <CFormGroup className="text-center">
                    <CRow >
                      <CCol md={12}>
                        <h1 className="text-center">¡Felicidades!</h1>
                        <h3 className="text-center">
                          Has enviado exitosamente toda la información
                          necesaria.
                        </h3>
                        <h3 className="text-center">
                          Te contactaremos en un período de 24 horas.
                        </h3>
                      </CCol>
                    </CRow>
                    <CRow className="justify-content-center mt-3" row>
                      <CCol md={3} className="text-center my-sm-0 my-3">
                        <CButton color="success" className="px-4"  to="/login">
                        <CIcon name="cil-user" />{" "}
                          Login
                        </CButton>
                      </CCol>
                      <CCol md={3} className="text-center my-sm-0 my-3">
                        <CButton color="primary" className="px-4"  href="https://www.coopquisqueya.com">{" "}
                        <CIcon name="cil-check" />
                          Website
                        </CButton>
                      </CCol>
                    </CRow>
                  </CFormGroup>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Felicitaciones;
