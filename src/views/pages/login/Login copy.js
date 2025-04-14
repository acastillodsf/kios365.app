import React, { useEffect, useState } from "react";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CImg,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import "../../../assets/css/custom.css";

import { useDispatch, useSelector } from "react-redux";
import { inicioSesionReducer } from "../../../actions/usuarioAction";
import { sha256 } from "js-sha256";
import Spinner from "src/reusable/Spinner";
import { Link } from "react-router-dom";
import { GetImagen } from "src/actions/getImage";

const Login = (props) => {
  const dispatch = useDispatch();
  const { cargando, autenticado, mensaje, AccessType } = useSelector(
    (state) => state.usuario
  );
  const { settingApp, statusCode } = useSelector((state) => state.appSetting);

  useEffect(() => {
    if (autenticado) {

      props.history.push("/dashboard");

    }
  }, [autenticado, props.history]);

  const logeo = (datos) => dispatch(inicioSesionReducer(datos));

  // State local
  const [dato, setDato] = useState({
    username: "",
    password: "",
  });

  const { username, password } = dato;

  const handleChange = (e) => {
    setDato({
      ...dato,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacion
    if (username.trim() === "" || password.trim() === "") {
      alert("Tos los campos son necesarios");
      return;
    }

    // Enviar al action
    let encryptedPassword = sha256(password).toString();
    console.log({ username, encryptedPassword })
    logeo({ username, encryptedPassword });
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
    <div
      className="c-app c-default-layout flex-row align-items-center login-bg"
      style={{
        backgroundImage: settingApp.backgroundImage,
      }}
    >
      <CContainer>
        <CRow className="justify-content-lg-end justify-content-sm-center">
          <CCol sm="8" lg="5">
            <CAlert
              color="warning"
              show={visible}
              closeButton
              onShowChange={setVisible}
            >
              La contraseña que ingresaste es incorrecta.
            </CAlert>

            <CCardGroup>
              <CCard className="p-4 css-vgsn9v">
                <CCardBody>
                  <CForm>
                    <CRow className="justify-content-center mb-5">
                      <a href="#!">
                        <CImg
                          alt="Logo"
                          src={settingApp.logoApp}
                          width="100%"
                          height="auto"
                        />
                      </a>
                    </CRow>
                    {cargando ? (
                      <Spinner />
                    ) : (
                      <>
                        <CInputGroup className="mb-3 pb-2">
                          <p className="css-1izryvb">Login</p>
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
                            placeholder="Usuario"
                            onChange={handleChange}
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                          />
                        </CInputGroup>
                        <CRow>
                          <CCol xs="6">
                            {/* <CButton color="success" className="px-4">Acceder</CButton> */}
                            <CButton
                              type="submit"
                              color="success"
                              className="btn-login btn-login-primary mt-4"
                              onClick={handleSubmit}
                            >
                              Iniciar sesión
                            </CButton>
                          </CCol>
                          <CCol xs="6" className="text-right">
                            <CButton
                              onClick={() => props.history.push("/rescue")}
                              color="link"
                              className="btn btn-link px-0 p-0"
                            >
                              Olvide Mi Contraseña
                            </CButton>
                            {settingApp.register !== undefined && settingApp.register === 1 && (
                              <Link
                                to="/register"
                                color="link"
                                className="btn btn-link px-0 p-0"
                              >
                                Registrarme
                              </Link>
                            )}
                          </CCol>
                        </CRow>
                      </>
                    )}
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
