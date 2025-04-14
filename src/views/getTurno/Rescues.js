import React, { useEffect, useState } from "react";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CImg,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import "../../../assets/css/custom.css";
import "../register/login.css";

import { useSelector } from "react-redux";
import Spinner from "src/reusable/Spinner";
import clienteAxios from "src/config/axios";
import swal from "sweetalert";

const Rescues = (props) => {
  const { cargando, autenticado, mensaje } = useSelector(
    (state) => state.usuario
  );
  const { settingApp, statusCode } = useSelector((state) => state.appSetting);

  useEffect(() => {
    if (autenticado) {
      props.history.push("/dashboard");
    }
  }, [autenticado, props.history]);

  // State local
  const [dato, setDato] = useState({
    username: "",
    password: "",
  });

  const { username } = dato;

  const handleChange = (e) => {
    setDato({
      ...dato,
      [e.target.name]: e.target.value,
    });
  };

  const handleRescue = async (e) => {
    // Validacion
    if (username.trim() === "") {
      swal({
        title: "Error de validacion.",
        text: "Favor de introducir su Correo o Nombre de usuario.",
        icon: "warning",
        button: "Aceptar",
      });
      return;
    }

    console.log({ username });
    try {
      const peticion = await clienteAxios.post("/rescues", { username });
      swal({
        title: "Confirmacion Enviada.",
        text: peticion.data,
        icon: "success",
        button: "Aceptar",
      });
      props.history.push("/login");
    } catch (error) {
      swal({
        title: "Validacion de Datos",
        text: error.response.data,
        icon: "warning",
        button: "Aceptar",
      });
    }
  };

  useEffect(() => {
    if (mensaje) {
      console.log(mensaje);
      setVisible(10);
    }
  }, [mensaje]);

  const [visible, setVisible] = React.useState(0);

  if (parseInt(statusCode) !== 200) {
    return <></>;
  }

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
          <CImg id="logo" src={settingApp.logoApp} />
          <h2 class="text-left">
            Hola, 👋
            <br />
          </h2>
          <p class="mb-4 card-text">Ingresar datos para recuperar el acceso.</p>

          {cargando ? (
            <Spinner />
          ) : (
            <>
              <CInputGroup className="mb-3">
                <p className="text">Recuperacion de Cuenta</p>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupPrepend>
                  <CInputGroupText>
                    <CIcon name="cil-user" />
                  </CInputGroupText>
                </CInputGroupPrepend>
                <CInput
                  type="text"
                  name="username"
                  value={username}
                  placeholder="Ingrese Correo Electronico."
                  onChange={handleChange}
                />
              </CInputGroup>
              <div className="row justify-content-center my-3 px-3">
                <CButton
                  type="submit"
                  color="primary"
                  // className="btn-login btn-login-primary mt-4 LoginInput2"
                  className="btn-block btn-login-primary LoginInput2"
                  onClick={handleRescue}
                >
                  Recuperar cuenta
                </CButton>
              </div>
              <div className="row justify-content-center my-2 mt-4">
                {settingApp.links &&
                  settingApp.links.map((link) => {
                    return (
                      <CButton href={link.link}>
                        <small className="text-muted">{link.name}</small>
                      </CButton>
                    );
                  })}
              </div>
              <p className="text-center mt-2">
                <span className="me-25">Ya tienes usuario?</span>
                {
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  <a href="/#/login">
                    <span> Iniciar sesión.</span>
                  </a>
                }
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );

};

export default Rescues;
