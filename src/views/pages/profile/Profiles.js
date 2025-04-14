/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  CButton,
  CCol,
  CContainer,
  CInput,
  CRow,
  CCardGroup,
  CCard,
  CCardBody,
  CForm,
  CImg,
  CFormGroup,
  CLabel,
  CInputCheckbox,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
} from "@coreui/react";
import swal from "sweetalert";
import "../../../assets/css/custom.css";
import { sha256 } from "js-sha256";
import { useDispatch, useSelector } from "react-redux";
import { createProfilePost } from "src/actions/registroAction";
import ActivityIndicator from "src/reusable/ActivityIndicator";
import { getcompleteProfile } from "src/actions/completeProfiles";
import { useHistory } from "react-router";



const Profiles = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { consultando,consulta } = useSelector((state) => state.completeProfiles);
  const { profile } = useSelector((state) => state.solicitud_registro);
  const { settingApp } = useSelector((state) => state.appSetting);

  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    password2: "",
    isCompleted: false,
  });

  useEffect(() => {
    dispatch(getcompleteProfile(match.params.idSolicitud))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  const [terminos, setTerminos] = useState(false);

  const { username, password, password2, isCompleted } = userInfo;
  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleCheck = () => {
    setTerminos(!terminos);
  };


  const handleClickSend = (e) => {

    e.preventDefault();
    if (
      username.trim()  === "" ||
      password.trim()  === "" ||
      password2.trim() === "" ||
      password.trim()  !== password2.trim() ||
      !terminos
    ) {
      swal({
        title: "Perfil de Usuario",
        text: "Todos los campos son obligatorios para continuar con el proceso.",
        icon: "warning",
        button: "Aceptar",
      });
    } else {
      const passwordEncrypted = sha256(password);
      const data2Send = {
        solicitud: match.params.idSolicitud,
        username,
        password: passwordEncrypted,
      };
      enviarInfo(data2Send);
    }
    
  };

  const enviarInfo = (info) => {

    dispatch(createProfilePost(info));

  };

  const handleClickCancel = () => {
    setUserInfo({
      username: "",
      password: "",
      password2: "",
      isCompleted: false,
    });
    setTerminos(false);
  };

  const showModal = () => {
    setUserInfo({
      ...userInfo,
      isCompleted: !isCompleted,
    });
  };
  const hideModal = () => {
    setUserInfo({
      ...userInfo,
      isCompleted: !isCompleted,
    });
  };
  
  const { nombre,correo } = consulta;


  useEffect(() => {
    
    setUserInfo({
      ...userInfo,
      username : correo
    })
    
  }, [correo])

  useEffect(() => {
    if(profile){
      history.push('/login');
    }
  }, [profile])

   
  return (
    <div className="c-app c-default-layout flex-row align-items-center login-bg">
      <CContainer>
        <CRow className="justify-content-sm-center">
          <CCol sm="8" lg="6">
            <CCardGroup>
              <CCard className="p-4 mt-3 mt-sm-0">
                 <CCardBody>
                  <CForm>
                    <CRow className="justify-content-center mb-4">
                      <a href="#!">
                        <CImg
                          alt="Logo CooperativaQuisqueya"
                           src={settingApp.logoApp}
                          width="auto"
                          height="100"
                        />
                      </a>
                    </CRow>

                    {consultando ? <ActivityIndicator /> : (
                   
                      <>
                    <h5 className="mb-4 text-center">
                      Bienvenido, { nombre }, este es el proceso para completar la informacion en tu
                      perfil de usuario, completa los campos que estan
                      a continuación
                    </h5>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Usuario</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                        <CInput
                          id="text-input"
                          name="username"
                          placeholder="Nombre Usuario"
                          value={username}
                          onChange={handleChange}
                          required
                          disabled
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">Contraseña</CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                        <CInput
                          type="password"
                          name="password"
                          placeholder="Contraseña"
                          value={password}
                          onChange={handleChange}
                          required
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel htmlFor="text-input">
                          Confirmar Contraseña
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                        <CInput
                          type="password"
                          name="password2"
                          placeholder="Contraseña"
                          value={password2}
                          onChange={handleChange}
                          required
                        />
                      </CCol>
                    </CFormGroup>

                    <CRow>
                      <CCol xs="12">
                        <CFormGroup
                          variant="checkbox"
                          className="checkbox text-center"
                        >
                          <CInputCheckbox
                            id="checkbox1"
                            name="terminos"
                            checked={terminos ? true : false}
                            onChange={handleCheck}
                          />
                          <CLabel
                            variant="checkbox"
                            className="form-check-label"
                            htmlFor="checkbox1"
                          >
                            {" "}
                            Acepto los{" "}
                            <CLabel
                              onClick={showModal}
                              color="link"
                              className="btn-link px-0 p-0"
                            >
                              Terminos de Uso & Politica de Privacidad.
                            </CLabel>
                          </CLabel>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <CRow className="mt-4">
                      <CCol md="6">
                        <CButton
                          color="success"
                          block
                          onClick={handleClickSend}
                        >
                          Enviar
                        </CButton>
                      </CCol>
                      <CCol md="6">
                        <CButton
                          className="mt-3 mt-sm-0"
                          color="danger"
                          block
                          onClick={handleClickCancel}
                        >
                          Cancelar
                        </CButton>
                      </CCol>
                    </CRow>
                    </>
                    ) }
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
          <CModal
            show={isCompleted}
            onClose={hideModal}
            color="success"
            size="lg"
          >
            <CModalHeader closeButton>
              <CModalTitle>
                Terminos de Uso & Politica de Privacidad
              </CModalTitle>
            </CModalHeader>
            <CModalBody>
              <embed
                type="text/html"
                src="https://dasoft.com.do/politicaCoopQuisqueya.txt"
                className="modalTerminosEmbed"
              />
            </CModalBody>
            <CModalFooter>
              <CButton color="success" block onClick={hideModal}>
                Cerrar
              </CButton>
            </CModalFooter>
          </CModal>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Profiles;
