/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect, Fragment } from "react";
import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CImg,
  CInput,
  CInputGroup,
  CInputGroupText,
  CLabel,
} from "@coreui/react";
// Redux
import { useDispatch, useSelector } from "react-redux";
 

// Otros componentes
import { sha256 } from "js-sha256";
import "./login.css";
import coopsyslogo from "../../../img/SostieneLogo2.png";
import { Downloading } from "src/reusable/Spinner";
import swal from "sweetalert";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import clienteAxios from "src/config/axios";

const Register = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [active, setActive] = useState(false);
  const [Code, setCode] = useState("");
  const [enviando, setenviando] = useState(false);
  const [registrando, setRegistrando] = useState(false);
  const [registrado, setRegistrado] = useState(false);
  // State local
  const [DataForm, setDataForm] = useState({
    cooperativa: "",
    telefono: "",
    direccion: "",
    representante: "",
    correo: "",
    password: "",
    datname: "",
    usuario: "",
  });

 
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacion
    if (DataForm.correo.trim() === "" || DataForm.password.trim() === "" 
    || DataForm.cedula.trim() === ""
    || DataForm.nombre.trim() === ""
    || DataForm.password.trim() === ""
    
    ) {
       swal(
        {
          icon: 'warning',
          title : 'Campos Requeridos !',
          text: `Tos los campos son necesarios`,
          buttons : 'Aceptar'
        }
      );



      return;
    }

    // Enviar al action
    let encryptedPassword = sha256(DataForm.password).toString();
 
    setenviando(true);
    clienteAxios.post("/Auth/Register", {
      ...DataForm,
      password: encryptedPassword,
    }).then(({ data }) => {
      console.log(data);
      
      swal({
        title : "Registrado",
        text : "Su Usuario ha sido Registrado con Exito, le invitamos validar su correo electronico.",
        icon : "success"
      })
      history.push('/login')
      setenviando(false);
    }).catch((error)=>{
      setRegistrando(false);
      setenviando(false);
      swal(
        `Error ${error.response.status.toString()}`,
        `${error.response.data}  `,
        "warning"
      );
    });
  };

   
 

  const limpiar = (value) => {
    if (value === null) {
      return "";
    }

    var result = "";
    var characters = "Ñ0123456789!&*()-/ ";

    for (let i = 0; i < value.length; i++) {
      if (!characters.includes(value[i])) {
        result += value[i];
      }
    }

    return result;
  };
  const handleChange = (e) => {
    setDataForm({
      ...DataForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Fragment>
      {registrando && <Downloading value="Registrando" />}
      <section className="main-section" id="logins">
        <div className="login-section">
          <div className="login-wrapper">
            <CImg id="logo" src={coopsyslogo} />
            <h2 className="text-left">Registro de Usuario</h2>
            <p className="mb-4 card-text">
              Formulario de Registro Cooperativa.
            </p>
            <CForm onSubmit={handleSubmit}>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input" className="LoginLabel">
                    Cedula
                  </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    className="form-control LoginInput2"
                    name="cedula"
                    value={DataForm.cedula}
                    placeholder="999-9999999-9"
                    onChange={handleChange}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input" className="LoginLabel">
                    Nombre
                  </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    className="form-control LoginInput2"
                    name="nombre"
                    value={DataForm.nombre}
                    placeholder="Nombre"
                    onChange={handleChange}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input" className="LoginLabel">
                    Direccion
                  </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    className="form-control LoginInput2"
                    name="direccion"
                    value={DataForm.direccion}
                    placeholder="Direccion"
                    onChange={handleChange}
                  />
                </CCol>
              </CFormGroup>
               
              <hr />
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input" className="LoginLabel">
                    Correo
                  </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    className="form-control LoginInput2"
                    name="correo"
                    value={DataForm.correo}
                    placeholder="Correo"
                    onChange={handleChange}
                  />
                </CCol>
              </CFormGroup>
              

              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input" className="LoginLabel">
                    Contraseña
                  </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    className="form-control LoginInput2"
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={DataForm.password}
                    onChange={handleChange}
                  />
                </CCol>
              </CFormGroup>

              <div className="row justify-content-center my-3 px-3">
                {" "}
                <CButton
                  type="submit"
                  color="primary"
                  className="btn-block LoginInput2"
                  disabled={enviando}
                >
                  Registrar
                </CButton>
              </div>
            </CForm>
            <div className="row justify-content-center my-2 mt-4">
              <CButton
                onClick={() =>
                  dispatch({ type: "POLICITA_PRIVACIDAD", payload: true })
                }
              >
                <small className="text-muted">Politica de Privacidad</small>
              </CButton>
            </div>
            <p className="text-center mt-2">
              <span className="me-25">¿Ya Estas registrado?</span>
              {
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a href="#/auth/login">
                  <span>Inicia Seccion</span>
                </a>
              }
            </p>
          </div>
        </div>
        <div id="fb-root"></div>
        <div id="fb-customer-chat" className="fb-customerchat"></div>
      </section>

       
        
    </Fragment>
  );
};

export default Register;
