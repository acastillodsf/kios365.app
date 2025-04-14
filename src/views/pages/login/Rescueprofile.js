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
import { useSelector } from "react-redux";
import ActivityIndicator from "src/reusable/ActivityIndicator";
import { useHistory } from "react-router";
import clienteAxios from "src/config/axios";

const Rescueprofile = ({ match }) => {
  const history = useHistory();

  const { settingApp, statusCode } = useSelector((state) => state.appSetting);

  const [consultando, setconsultando] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nombre: "",
    username: "",
    password: "",
    password2: "",
    isCompleted: false,
  });

  useEffect(() => {
    // dispatch(getcompleteProfile(match.params.idSolicitud))
    // eslint-disable-next-line react-hooks/exhaustive-deps

    ConsultaRescue(match.params.idRescue);
  }, []);

  const [terminos, setTerminos] = useState(false);

  const { nombre, username, password, password2, isCompleted } = userInfo;
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
      username.trim() === "" ||
      password.trim() === "" ||
      password2.trim() === "" ||
      password.trim() !== password2.trim() ||
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
        rescue: match.params.idRescue,
        username,
        password: passwordEncrypted,
      };
      enviarInfo(data2Send);
    }
  };

  const enviarInfo = async (info) => {
    setconsultando(true);
    try {
      await clienteAxios.post(`/rescueProfile`, info);

      swal({
        title: "Cambio Exitoso.",
        text: "Ha cambiado su Credenciales exitosamente.",
        icon: "success",
        button: "Aceptar",
      });
      history.push("/login");

      setconsultando(false);
    } catch (error) {
      swal({
        title: "Error Inesperado.",
        text: "Hubo un error al intentar procesar su solicitud, favor de intentar nuevamente mas tarde.",
        icon: "warning",
        button: "Aceptar",
      });
      setconsultando(false);
    }
  };
  const ConsultaRescue = async (key) => {
    setconsultando(true);
    try {
      const peticion = await clienteAxios.get(`/rescueProfile?idRescue=${key}`);

      setUserInfo({
        ...userInfo,
        nombre: peticion.data.nombre,
        username: peticion.data.username,
        rescue: peticion.data.rescue,
      });
      console.log(peticion.data);
      setconsultando(false);
    } catch (error) {
      swal({
        title: "Link Expirado.",
        text: "Este link de recuperacion ha sido expirado, favor de intentar nuevamente.",
        icon: "warning",
        button: "Aceptar",
      }).then(history.push("/login"));
      setconsultando(false);
    }
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

  if (parseInt(statusCode) !== 200) {
    return <></>;
  }

  console.log(userInfo);
  return (
    <section
      className="main-section"
      id="logins"
      style={{
        backgroundImage: `${settingApp.backgroundImage} `,
      }}
    >
      <div className="login-section">
        <div className="login-wrapper">
          {consultando ? (
            <ActivityIndicator />
          ) : (
            <>
              <CImg id="logo" src={settingApp.logoApp} />
              <h2 class="text-left">
                Hola, {nombre} 👋
                <br />
              </h2>
              <p class="mb-4 card-text">
              Este es el proceso para recuperar la
                cuenta de perfil de usuario, completa los campos que estan
                acontinuación
              </p>
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
                  <CLabel htmlFor="text-input">Confirmar</CLabel>
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
                  <CButton color="success" block onClick={handleClickSend}>
                    Enviar
                  </CButton>
                </CCol>
                <CCol md="6">
                  <CButton
                    className="mt-3 mt-sm-0"
                    color="danger"
                    block
                    onClick={()=>{history.push("/login") }}
                  >
                    Cancelar
                  </CButton>
                </CCol>
              </CRow>
            </>
          )}
        </div>
      </div>
    </section>
  );
 
};

export default Rescueprofile;
