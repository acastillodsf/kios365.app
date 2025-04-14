import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CDataTable,
  CForm,
  CFormGroup,
  CFormText,
  CImg,
  CInput,
  CInputFile,
  CInputGroupText,
  CInputRadio,
  CInvalidFeedback,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CSelect,
  CTabContent,
  CTabPane,
  CTabs,
  CValidFeedback,
} from "@coreui/react";
import "../../../assets/css/custom.css";
import swal from "sweetalert";
import clienteAxios from "src/config/axios";
import { Nacionalidades } from "src/data/nacionalidades";
import CIcon from "@coreui/icons-react";
import { ProvinciaRD } from "src/data/provincia";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FilePhoto } from "../FileContainter/FilePhoto";
import "./login.css";
import ValidarMail from "../tools/ValidarMail";
import { Downloading } from "src/reusable/Spinner";
import { sha256 } from "js-sha256";
import { inicioSesionReducer } from "src/actions/usuarioAction";

const Register1 = ({ match }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(0);

  const [componentes, setcomponentes] = useState([]);

  const [isCedulaSelected, setIsCedulaSelected] = useState(false);
  const [isPhotoSelected, setIsPhotoSelected] = useState(false);
  const [Code, setCode] = useState("");
  const [enviando, setenviando] = useState(false);
  const [registrando, setRegistrando] = useState(false);

  const history = useHistory();
  const { settingApp, statusCode } = useSelector((state) => state.appSetting);
 
  const InicialStateRegistro = {
    cedula : "",
    password : "",
    nombres : "",
    apellidos : "",
    correo : "",
    pais : "",
    direccion : "",
    telefono : "",
  }

  const [registro, setRegistro] = useState(InicialStateRegistro);
 
  const logeo = (datos) => dispatch(inicioSesionReducer(datos));
  const { cargando, autenticado, mensaje } = useSelector(
    (state) => state.usuario
  );
   
  useEffect(() => {
    component();
  }, []);
  useEffect(() => {}, [registro]);

  useEffect(() => {
    if (autenticado) {
      history.push("/dashboard");
    }
  }, [autenticado]);
  
  const handleChange = (e) => {
    setRegistro({
      ...registro,
      [e.target.name]: e.target.value,
    });
  };

  const component = async () => {
    try {
      const peticion = await clienteAxios.get(`/register/component`);

      const { data } = peticion;
      setcomponentes(data);
    } catch (error) {
      swal({
        title: "Registro de Usuario",
        text: error.data,
        icon: "warning",
        button: "Aceptar",
      });
    }
  };

  const handleValidarCancelar = () => {
    history.push(`/login`);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(registro)
    swal({
      title: "Formulario de Suscripcion",
      text: `Estas seguro de que deseas Enviar Informacion? `,
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        setenviando(true);
        clienteAxios.get("/auth/e/code", {
          params : {
            mail : registro.correo,
            cedula: registro.cedula
          }
        }).then(({ data }) => {
          setCode(data.code);
          setActive(true);
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
      }
    });
  };

  const RegisterSend = async () => {
 
    let encryptedPassword = sha256(registro.password).toString();

      await clienteAxios.post(`/auth/e/Register`, {
        ...registro,
        password : encryptedPassword
      }).then(({data})=>{
        
        logeo({ username: registro.cedula, encryptedPassword })

      }).catch((e)=>{
        swal({
          title: "Registro de Usuario",
          text: e.response.data,
          icon: "warning",
          button: "Aceptar",
        });
      })     

  };

  const limpiar = () => {
    setRegistro(InicialStateRegistro);
    setIsCedulaSelected(false);
    setIsPhotoSelected(false);
  };

  const { listaprovincia, listParentesco } = componentes;
 
 
  //Referidor
  useEffect(() => {
    if (typeof match.params.idReferidor !== "undefined") {
      //Consulta de Solicitud.
      consultaReferidor({ id: match.params.idReferidor });
    }
    //eslint-disable-next-line
  }, []);
  const consultaReferidor = async (data) => {
    try {
      const peticion = await clienteAxios.get(`/register/referidor`, {
        params: data,
      });

      setRegistro({
        ...registro,
        referidor: peticion.data.socio,
        referidorname: peticion.data.nombre,
      });
      console.log(peticion);
      swal({
        title: "Bienvenido a CoopQuisqueya",
        text: `${peticion.data.nombre}, Le ha invitado a pertenecer a nuestra Gran Familia CoopQuisqueya.`,
        button: "Aceptar",
      });
    } catch (error) {}
  };

  console.log(Code);
  return (
    <section className="main-section" id="logins">
          {registrando && <Downloading value="Registrando" />}
          {enviando && <Downloading value="Enviando verificacion" />}

        <div className="login-section">
          <div className="login-wrapper">
            <CImg id="logo" src={settingApp.logoApp} />
            <h2 className="text-left">Registrate !</h2>
            <p className="mb-4 card-text">
              y Haste Socio de nuestra Gran Familia CoopQusiqueya
            </p>
            <CForm onSubmit={handleSubmit}>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input" className="LoginLabel">
                    Nombre
                  </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    className="form-control LoginInput2"
                    name="nombres"
                    value={registro.nombres}
                    placeholder="Nombre"
                    onChange={handleChange}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input" className="LoginLabel">
                    Apellido
                  </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    className="form-control LoginInput2"
                    name="apellidos"
                    value={registro.apellidos}
                    placeholder="Apellido"
                    onChange={handleChange}
                  />
                </CCol>
              </CFormGroup>
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
                    value={registro.cedula}
                    placeholder="000-000000-0"
                    onChange={handleChange}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input" className="LoginLabel">
                    Pais
                  </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                <CSelect
                      custom
                      name="pais"
                      id="ccmonth"
                      onChange={handleChange}
                      className="form-control LoginInput2"
                      value={registro.pais}
                    >
                      <option value="1">Republica Dominicana </option>
                    </CSelect>
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
                    value={registro.direccion}
                    placeholder="Direccion"
                    onChange={handleChange}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input" className="LoginLabel">
                    Telefono
                  </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    className="form-control LoginInput2"
                    name="telefono"
                    value={registro.telefono}
                    placeholder=""
                    onChange={handleChange}
                  />
                </CCol>
              </CFormGroup>
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
                    value={registro.correo}
                    placeholder=""
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
 
              >
                <small className="text-muted">Politica de Privacidad</small>
              </CButton>
            </div>
            <p className="text-center mt-2">
              <span className="me-25">¿Ya Estas registrado?</span>
              {
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a href="#/login">
                  <span>Inicia Seccion</span>
                </a>
              }
            </p>
          </div>
        </div>
        <div id="fb-root"></div>
        <div id="fb-customer-chat" className="fb-customerchat"></div>

        <ValidarMail
        mail={registro.correo}
        code={Code}
        active={active}
        Close={() => setActive(false)}
        Validado={() => {
          console.log("Codigo Validado")
          RegisterSend();
        }}
      />
      </section>
  );
};

export default Register1;
