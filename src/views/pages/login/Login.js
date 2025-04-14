import React, { Fragment, useEffect, useState } from "react";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormGroup,
  CImg,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CLabel,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import "../../../assets/css/custom.css";
import "../register/login.css";

import { useDispatch, useSelector } from "react-redux";
import { inicioSesionReducer } from "../../../actions/usuarioAction";
import { sha256 } from "js-sha256";
import Spinner from "src/reusable/Spinner";
import { Link } from "react-router-dom";
import { GetImagen } from "src/actions/getImage";
import coopsyslogo from "../../../img/kios365.png";

import clienteAxios from "src/config/axios";
import Swal from "sweetalert2";
import swal from "sweetalert";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { browserName, browserVersion } from "react-device-detect";


const Login = (props) => {
  const dispatch = useDispatch();
  const { autenticado, cargando, mensaje } = useSelector(
    (state) => state.usuario
  );

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (autenticado) {
      props.history.push("/agente/atender");
    }

  }, [autenticado, props.history]);

  const logeo = (datos) => dispatch(inicioSesionReducer(datos));

  // State local
  const [DataForm, setDataForm] = useState({
    username: "",
    password: "",
    agent: "",
    croquets: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacion
    if (username.trim() === "" || password.trim() === "") {
      swal({
        icon: "warning",
        title: "Todos los campos son necesarios",
        text: `Favor verifique los campos.`,
        buttons: "Aceptar",
      });
      return;
    }

    // Enviar al action
    let encryptedPassword = sha256(password).toString();
    logeo({
      type: "login",
      username,
      encryptedPassword,
      croquets: DataForm.croquets,
      agent: DataForm.agent,
    });
  };

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const croquets = () => {
    var croq = "";

    const peticion = localStorage.getItem("croquets");
    if (peticion) {
      croq = peticion;
    } else {
      croq = makeid(100);
      window.localStorage.setItem("croquets", croq);
    }

    setDataForm({
      ...DataForm,
      agent: `${browserName} ${browserVersion}`,
      croquets: croq,
    });
  };
  useEffect(() => {
    croquets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setDataForm({
      ...DataForm,
      [e.target.name]: e.target.value,
    });
  };

  const { username, password } = DataForm;

  return (
    <Fragment>
      <div className="main-section-blanco-container">
        <section className="main-section-blanco" id="logins">
          <div className="flex flex-column align-center justify-start login">

            <CRow
              className="flex flex-row justify-between align-center"
              style={{
                width: "100%",
                height: "fit-content",
                padding: "20px 30px",
              }}
            ><p className="text-center textbrand mt-2">
                <span className="textbrand me-25">
                  ¿Necesitas Ayuda?
                </span>
                {
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  <a href="https://www.dasoft.com.do/contactenos/">
                    <span>Contactar a Soporte</span>
                  </a>
                }
              </p></CRow>

            <div className="flex flex-column align-center login-section">
              <div className="login-wrapper">
                <CCard
                  style={{
                    borderRadius: 30,
                  }}
                >
                  <CCardBody>
                    <CImg
                      id="logo"
                      src={
                        coopsyslogo
                      }
                    />
                    {/* <h1
                      style={{
                        color: "rgb(15, 23, 42)",
                        fontSize: "24px",
                        fontWeight: 600,
                        lineHeight: "32px",
                        letterSpacing: "0em",
                        textAlign: "center",
                      }}
                    >
                      Ingresa a tu cuenta
                    </h1> */}
                    {/* <p className="mb-4 card-text">
                      Inicia sesión en tu cuenta para acceder a la plataforma.
                    </p> */}
                    <CForm onSubmit={handleSubmit}>
                      <div className="form-group">
                        {" "}
                        <CInput
                          className="form-control LoginInput2"
                          type="text"
                          name="username"
                          value={username}
                          placeholder="Correo Electronico"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <CInput
                          className="form-control LoginInput2"
                          type="password"
                          placeholder="Contraseña"
                          name="password"
                          value={password}
                          onChange={handleChange}
                        />
                      </div>
                      <div
                        className="row justify-content-center my-3 px-3"
                        style={{ flexFlow: "row" }}
                      >
                        {" "}
                        <CButton
                          type="submit"
                          color="primary"
                          className="btn-block LoginInput2"
                          disabled={cargando}
                        >
                          Ingresar
                        </CButton>
                      </div>
                      <div
                        className="row justify-content-center my-3 px-3"
                        style={{ flexFlow: "row" }}
                      >
                      </div>
                    </CForm>
                    <div className="row justify-content-center my-2 mt-4">
                      <CButton onClick={() => setActive(!active)}>
                        <small className="text-muted">
                          ¿Has olvidado tu contraseña?
                        </small>
                      </CButton>
                      <CButton
                        onClick={() =>
                          dispatch({
                            type: "POLICITA_PRIVACIDAD",
                            payload: true,
                          })
                        }
                      >
                        <small className="text-muted">
                          Politica de Privacidad
                        </small>
                      </CButton>
                      <CButton
                        href="https://dasoftsrl.atlassian.net/servicedesk/customer/portals"
                        target="_banck"
                      >
                        <small className="text-muted"> Ayuda !</small>
                      </CButton>
                      <CButton to="/public/datacenter/status" target="_banck">
                        <small className="text-muted">DataCenter </small>
                      </CButton>
                    </div>
                  </CCardBody>
                </CCard>
              </div>
            </div>
          </div>
          <div id="fb-root"></div>
          <div id="fb-customer-chat" className="fb-customerchat"></div>
        </section>
      </div>
    </Fragment>
  );
};

export default Login;
