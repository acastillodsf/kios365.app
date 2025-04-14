import React, { useEffect, useState } from "react";
import {
  CButton,
  
  CCardBody,
  CCardFooter,
  CCol,
  
  CDataTable,
  CForm,
  CFormGroup,
  CFormText,
  
  CInput,
  CInputFile,
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

const Register = ({match}) => {
  const [active, setActive] = useState(0);

  const [componentes, setcomponentes] = useState([]);

  const [isCedulaSelected, setIsCedulaSelected] = useState(false);
  const [isPhotoSelected, setIsPhotoSelected] = useState(false);

  const history = useHistory();

  const InicialStateRegistro = {
    suscripcion: "personal",
    tipodocumento: "Cédula",
    documento: "",
    nombres: "",
    apellidos: "",
    fechanacimiento: "2001-01-01",
    nacionalidad: "DOM",
    nacionalidadProvincia: 0,
    lugarNacimiento: "",
    residenciaPais: "DOM",
    residenciaMunicipio: 0,
    residenciaDireccion: "",
    residenciaTiempoAno: 0,
    residenciaTiempomes: 0,
    correo: "",
    telefono1: "",
    telefono2: "",
    celular: "",
    estadoCivil: "Soltero",
    nivelAcademico: "",
    TrabajoLugar: "",
    TrabajoOcupacion: "",
    TrabajoTempleo: "Publico",
    TrabajoNegocioPropio: "",
    TrabajoNegocioNombre: "",
    TrabajoNegocioOficio: "",
    fileCedula: "",
    filePhoto: "",
    parentesco: [],
    beneficiario: [],

    ctipodocumento: "",
    cdocumento: "",
    cnombres: "",
    capellidos: "",
    cfechanacimiento: "2001-01-01",
    cnacionalidad: "DOM",
    cnacionalidadProvincia: 0,
    clugarNacimiento: "",
    cresidenciaPais: "DOM",
    cresidenciaMunicipio: 0,
    cresidenciaDireccion: "",
    cresidenciaTiempoAno: 0,
    cresidenciaTiempomes: 0,
    ccorreo: "",
    ctelefono1: "",
    ctelefono2: "",
    ccelular: "",
    cestadoCivil: "Soltero",
    cnivelAcademico: "",
    cTrabajoLugar: "",
    cTrabajoOcupacion: "",
    cTrabajoTempleo: "Publico",
    cTrabajoNegocioPropio: "",
    cTrabajoNegocioNombre: "",
    cTrabajoNegocioOficio: "",
    cfileCedula: "",
    cfilePhoto: "",
    cparentesco: [],
    referidor: "",
    referidorname: ""
  };

  const [registro, setRegistro] = useState(InicialStateRegistro);

  const {
    suscripcion,
    tipodocumento,
    documento,
    nombres,
    apellidos,
    fechanacimiento,
    nacionalidad,
    nacionalidadProvincia,
    residenciaPais,
    residenciaMunicipio,
    residenciaDireccion,
    residenciaTiempoAno,
    residenciaTiempomes,
    correo,
    telefono1,
    telefono2,
    celular,
    estadoCivil,
    nivelAcademico,
    TrabajoLugar,
    TrabajoOcupacion,
    TrabajoTempleo,
    TrabajoNegocioOficio,
    fileCedula,
    filePhoto,
    parentesco,
    beneficiario,

    ctipodocumento,
    cdocumento,
    cnombres,
    capellidos,
    cfechanacimiento,
    cnacionalidad,

    referidor,
    referidorname,
  } = registro;

  const fieldsparentesco = [
    {
      key: "nombre",
      label: "Nombres",
      sorter: false,
      filter: false,
    },
    {
      key: "apellido",
      label: "Apellidos",
      sorter: false,
      filter: false,
    },
    {
      key: "descripcion",
      label: "Parentesco",
      sorter: false,
      filter: false,
    },
    {
      key: "cedula",
      label: "Identificacion",
      sorter: false,
      filter: false,
    },
    {
      key: "correo",
      label: "Correo",
      sorter: false,
      filter: false,
    },
    {
      key: "Opciones",
      label: "Opciones",
      _style: { width: "200px" },
      sorter: false,
      filter: false,
    },
  ];

  let cedulatitle;
  let phototitle;
  if (fileCedula?.name) {
    cedulatitle = fileCedula.name;
  } else {
    cedulatitle = "";
  }
  if (filePhoto?.name) {
    phototitle = filePhoto.name;
  } else {
    phototitle = "";
  }

  useEffect(() => {
    component();
  }, []);
  useEffect(() => {}, [registro]);

  const handleChange = (e) => {
    e.preventDefault();
    setRegistro({
      ...registro,
      [e.target.name]: e.target.value,
    });
  };

  const component = async () => {
    try {
      const peticion = await clienteAxios.post(`/register-valid`, {
        opcion: "COMPONENT",
      });

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


  const handleValidarCancelar = ()=>{
    history.push(`/login`);
  }
  const handleValidarEnviar = async () => {

    
    swal({
      title: "Formulario de Suscripcion",
      text: `Estas seguro de que deseas Enviar Informacion? `,
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        EnviarInformacion();
      }
    });
  };

  const EnviarInformacion = async () => {
    let formData = new FormData();

    formData.append("suscripcion", registro.suscripcion);
    formData.append("tipodocumento", registro.tipodocumento);
    formData.append("documento", registro.documento);

    formData.append("nombres", registro.nombres);
    formData.append("apellidos", registro.apellidos);
    formData.append("fechanacimiento", registro.fechanacimiento);
    formData.append("nacionalidad", registro.nacionalidad);
    formData.append("nacionalidadprovincia", registro.nacionalidadProvincia);
    formData.append("lugarnacimiento", registro.lugarNacimiento);
    formData.append("residenciapais", registro.residenciaPais);

    formData.append("residenciamunicipio", registro.residenciaMunicipio);
    formData.append("residenciadireccion", registro.residenciaDireccion);
    formData.append("residenciatiempoano", registro.residenciaTiempoAno);
    formData.append("residenciatiempomes", registro.residenciaTiempomes);
    formData.append("correo", registro.correo);
    formData.append("telefono1", registro.telefono1);
    formData.append("telefono2", registro.telefono2);
    formData.append("celular", registro.celular);
    formData.append("estadoCivil", registro.estadoCivil);
    formData.append("nivelacademico", registro.nivelAcademico);
    formData.append("trabajolugar", registro.TrabajoLugar);

    formData.append("trabajoocupacion", registro.TrabajoOcupacion);
    formData.append("trabajotempleo", registro.TrabajoTempleo);
    formData.append("trabajonegociooficio", registro.TrabajoNegocioOficio);
    formData.append("fileCedula", registro.fileCedula);
    formData.append("filePhoto", registro.filePhoto);
    formData.append("parentesco", registro.parentesco);
    formData.append("beneficiario", registro.beneficiario);

    formData.append("ctipodocumento", registro.ctipodocumento);
    formData.append("cdocumento", registro.cdocumento);
    formData.append("capellidos", registro.capellidos);
    formData.append("cfechanacimiento", registro.cfechanacimiento);
    formData.append("cnacionalidad", registro.cnacionalidad);
    formData.append("cnacionalidadprovincia", registro.cnacionalidadProvincia);
    formData.append("clugarnacimiento", registro.clugarNacimiento);
    formData.append("cresidenciapais", registro.cresidenciaPais);
    formData.append("cresidenciamunicipio", registro.cresidenciaMunicipio);
    formData.append("cresidenciadireccion", registro.cresidenciaDireccion);
    formData.append("cresidenciatiempoano", registro.cresidenciaTiempoAno);

    formData.append("cresidenciatiempomes", registro.cresidenciaTiempomes);
    formData.append("ccorreo", registro.ccorreo);
    formData.append("ctelefono1", registro.ctelefono1);
    formData.append("ctelefono2", registro.ctelefono2);
    formData.append("ccelular", registro.ccelular);
    formData.append("cestadocivil", registro.cestadoCivil);
    formData.append("cnivelacademico", registro.cnivelAcademico);
    formData.append("ctrabajolugar", registro.cTrabajoLugar);
    formData.append("ctrabajoocupacion", registro.cTrabajoOcupacion);

    formData.append("ctrabajotempleo", registro.cTrabajoTempleo);
    formData.append("ctrabajonegociopropio", registro.cTrabajoNegocioPropio);
    formData.append("ctrabajonegocionombre", registro.cTrabajoNegocioNombre);
    formData.append("ctrabajonegociooficio", registro.cTrabajoNegocioOficio);
    formData.append("cparentesco", registro.cparentesco);
    formData.append("referidor", registro.referidor);


    
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    try {
      const peticion = await clienteAxios.post(
        `/register`,
        formData,
        config
      );


      if (peticion.data.estado === "ok") {
        const dataBeneficiario = {
          id: peticion.data.id,
          beneficiario: registro.beneficiario,
          parentesco: registro.parentesco,
        };

        const result = await clienteAxios.post(
          "/registerbeneficiario",
          dataBeneficiario
        );
        console.log(result);

        limpiar();
        history.push(`/felicitaciones/${peticion.data.solicitud}`);
      } else {
        setActive(2);
        swal({
          title: "Registro de Usuario",
          text: peticion.data.msg,
          icon: "warning",
          button: "Aceptar",
        });
      }
    } catch (error) {
      swal({
        title: "Registro de Usuario",
        text: error.data,
        icon: "error",
        button: "Aceptar",
      });
    }
  };

  const handlechangefile = (e) => {
    e.preventDefault();
    setRegistro({ ...registro, [e.target.name]: e.target.files[0] });
    if (e.target.name === "fileCedula") {
      setIsCedulaSelected(true);
    } else if (e.target.name === "filePhoto") {
      setIsPhotoSelected(true);
    } else {
      return;
    }
    if (e.target.files[0] === undefined) {
      return;
    }
  };

  const limpiar = () => {
    setRegistro(InicialStateRegistro);
    setIsCedulaSelected(false);
    setIsPhotoSelected(false);
  };

  const { listParentesco } = componentes;

  // Parentescos
  //Controles de Contactos Personales
  const [successParentesco, setSuccessParentesco] = useState(false);

  const [uParentesco, seteuParentesco] = useState({
    eparentesco_Nombre: "",
    eparentesco_Apellido: "",
    parentesco_nombre: "",
    parentesco_parentesco: 0,
    parentesco_contacto: "",
    parentesco_beneficiario: 0,
    parentesco_apellido: "",
    parentesco_cedula: "",
    parentesco_beneficio: "",
    parentesco_descripcion: "",
    parentesco_direccion: "",
    parentesco_correo: "",
  });
  const {
    eparentesco_Nombre,
    eparentesco_Apellido,
    parentesco_nombre,
    parentesco_parentesco,
    parentesco_contacto,
    parentesco_beneficiario,
    parentesco_apellido,
    parentesco_cedula,
    parentesco_beneficio,
    parentesco_descripcion,
    parentesco_direccion,
    parentesco_correo,
  } = uParentesco;

  const handleChangeParentesco = (e) => {
    seteuParentesco({
      ...uParentesco,
      [e.target.name]: e.target.value,
    });
  };

  //Eliminar Parentesco
  const deleteBeneficiario = (enombre, eapellido) => {
    const seleccion = [];

    swal({
      title: "Eliminar Datos Beneficiario",
      text: `Estas seguro de que deseas Eliminar relacion de Beneficiario? `,
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        // eslint-disable-next-line array-callback-return
        beneficiario.map((item) => {
          // eslint-disable-next-line no-unused-expressions
          item.nombre === enombre && item.apellido === eapellido
            ? null
            : seleccion.push({
                nombre: item.nombre,
                apellido: item.apellido,
                parentesco: item.parentesco,
                contacto: item.contacto,
                beneficiario: item.beneficiario,
                beneficio: item.beneficio,
                cedula: item.cedula,
                descripcion: item.descripcion,
                direccion: item.direccion,
                correo: item.parentesco_correo,
              });
        });

        setRegistro({
          ...registro,
          beneficiario: seleccion,
        });

        swal({
          title: "Eliminar Datos Beneficiario",
          text: "Beneficiario Eliminado ",
          icon: "info",
          button: "Aceptar",
        });
      }
    });
  };
 
  //Salvar Parentesco
  const salvarParentesco = (e) => {
    if (parentesco_beneficiario === "Si") {
      //Beneficiario
      const seleccion = [];

      // eslint-disable-next-line array-callback-return
      beneficiario.map((item) => {
        item.nombre === eparentesco_Nombre &&
        item.apellido === eparentesco_Apellido &&
        parentesco_nombre !== ""
          ? seleccion.push({
              nombre: parentesco_nombre,
              apellido: parentesco_apellido,
              parentesco: parentesco_parentesco,
              contacto: parentesco_contacto,
              beneficiario: parentesco_beneficiario,
              beneficio: parentesco_beneficio,
              cedula: parentesco_cedula,
              descripcion: parentesco_descripcion,
              direccion: parentesco_direccion,
              correo: parentesco_correo,
            })
          : seleccion.push({
              nombre: item.nombre,
              apellido: item.apellido,
              parentesco: item.parentesco,
              contacto: item.contacto,
              beneficiario: item.beneficiario,
              beneficio: item.beneficio,
              cedula: item.cedula,
              descripcion: item.descripcion,
              direccion: item.direccion,
              correo: item.correo,
            });
      });

      if (eparentesco_Nombre === "") {
        seleccion.push({
          nombre: parentesco_nombre,
          apellido: parentesco_apellido,
          parentesco: parentesco_parentesco,
          contacto: parentesco_contacto,
          beneficiario: parentesco_beneficiario,
          beneficio: parentesco_beneficio,
          cedula: parentesco_cedula,
          descripcion: parentesco_descripcion,
          direccion: parentesco_direccion,
          correo: parentesco_correo,
        });
      }

      setRegistro({
        ...registro,
        beneficiario: seleccion,
      });
      setSuccessParentesco(!successParentesco);
    } else {
      //Familiar //
      const seleccion = [];

      // eslint-disable-next-line array-callback-return
      parentesco.map((item) => {
        item.nombre === eparentesco_Nombre &&
        item.apellido === eparentesco_Apellido &&
        parentesco_nombre !== ""
          ? seleccion.push({
              nombre: parentesco_nombre,
              apellido: parentesco_apellido,
              parentesco: parentesco_parentesco,
              contacto: parentesco_contacto,
              beneficiario: parentesco_beneficiario,
              beneficio: parentesco_beneficio,
              cedula: parentesco_cedula,
              descripcion: parentesco_descripcion,
              direccion: parentesco_direccion,
              correo: parentesco_correo,
            })
          : seleccion.push({
              nombre: item.nombre,
              apellido: item.apellido,
              parentesco: item.parentesco,
              contacto: item.contacto,
              beneficiario: item.beneficiario,
              beneficio: item.beneficio,
              cedula: item.cedula,
              descripcion: item.descripcion,
              direccion: item.direccion,
              correo: item.correo,
            });
      });

      if (eparentesco_Nombre === "") {
        seleccion.push({
          nombre: parentesco_nombre,
          apellido: parentesco_apellido,
          parentesco: parentesco_parentesco,
          contacto: parentesco_contacto,
          beneficiario: parentesco_beneficiario,
          beneficio: parentesco_beneficio,
          cedula: parentesco_cedula,
          descripcion: parentesco_descripcion,
          direccion: parentesco_direccion,
          correo: parentesco_correo,
        });
      }

      setRegistro({
        ...registro,
        parentesco: seleccion,
      });
      setSuccessParentesco(!successParentesco);
    }
  };




  //Referidor
  useEffect(() => {
    if (typeof match.params.idReferidor !== "undefined") {
      //Consulta de Solicitud.
      consultaReferidor({ referidor: match.params.idReferidor });
    }
    //eslint-disable-next-line
  }, []);
  const consultaReferidor = async(data) => {
    try {
      const peticion = await clienteAxios.post(`/referidor`,data );

      setRegistro({
        ...registro,
        referidor : data.referidor,
        referidorname : peticion.data.nombre,
      })
      console.log(peticion);
      swal({
        title: "Bienvenido a CoopQuisqueya",
        text: `${peticion.data.nombre}, Le ha invitado a pertenecer a nuestra Gran Familia CoopQuisqueya.`,
        button: "Aceptar",
      });
      
    } catch (error) {

    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center  register-bg " style={{
      background: 'white',
      alignContent: 'center'
    }}>
        <CRow className="justify-content-lg-end justify-content-sm-center">
          <CCol >
                 <CForm className="was-validated">
                  { referidor==="" ? (<></>) : (
                <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="text-input">Referido Por :</CLabel>
                    </CCol>
                    <CCol xs="12" md="6">
                      <CInput
                        value={referidorname}
                        disabled
                        required
                      />
                    </CCol>
                  </CFormGroup>
                  )} 
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel>Identidad</CLabel>
                    </CCol>
                    <CCol md="3">
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="inline-radio1"
                          name="inline-radios"
                          value="personal"
                          checked={suscripcion === "personal" ? true : false}
                          onChange={() =>
                            setRegistro({
                              ...registro,
                              suscripcion: "personal",
                              tipodocumento: "Cédula",
                            })
                          }
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor="inline-radio1"
                        >
                          Personal
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="inline-radio2"
                          name="inline-radios"
                          value="negocios"
                          checked={suscripcion === "negocios" ? true : false}
                          onChange={() =>
                            setRegistro({
                              ...registro,
                              suscripcion: "negocios",
                              tipodocumento: "RNC",
                            })
                          }
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor="inline-radio2"
                        >
                          Negocios
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="select">Tipo Documento</CLabel>
                    </CCol>
                    <CCol xs="12" md="3">
                      {suscripcion === "personal" ? (
                        <CSelect
                          custom
                          id="select"
                          onChange={handleChange}
                          name="tipodocumento"
                          value={tipodocumento}
                          required
                        >
                          <option value="">-- Selecciona --</option>
                          <option value="Cédula">Cédula Dominicana</option>
                          <option value="Pasaporte">Pasaporte</option>
                        </CSelect>
                      ) : (
                        <CSelect
                          custom
                          id="select"
                          onChange={handleChange}
                          name="tipodocumento"
                          value={tipodocumento}
                        >
                          <option value="RNC">RNC</option>
                        </CSelect>
                      )}
                    </CCol>
                  </CFormGroup>
                  {tipodocumento !=="" && (
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="text-input">{tipodocumento}</CLabel>
                    </CCol>
                    <CCol xs="12" md="3">
                      <CInput
                        id="text-input"
                        name="documento"
                        placeholder="Documento"
                        value={documento}
                        onChange={handleChange}
                        required
                      />
                    </CCol>
                  </CFormGroup>
                  )}
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="text-input">Nombres</CLabel>
                    </CCol>
                    <CCol xs="12" md="6">
                      <CInput
                        id="text-input"
                        name="nombres"
                        placeholder="Nombres"
                        value={nombres}
                        onChange={handleChange}
                        required
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="text-input">Apellidos</CLabel>
                    </CCol>
                    <CCol xs="12" md="6">
                      <CInput
                        id="text-input"
                        name="apellidos"
                        placeholder="Apellidos"
                        value={apellidos}
                        onChange={handleChange}
                        required
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="text-input">Fecha Nacimiento</CLabel>
                    </CCol>
                    <CCol xs="12" md="3">
                      <CInput
                        id="text-input"
                        name="fechanacimiento"
                        placeholder="Fecha de Nacimiento"
                        value={fechanacimiento}
                        onChange={handleChange}
                        type="date"
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="select">Nacionalidad</CLabel>
                    </CCol>
                    <CCol xs="12" md="4">
                      <CSelect
                        custom
                        name="nacionalidad"
                        value={nacionalidad}
                        onChange={handleChange}
                        id="select-provincia"
                      >
                        {Nacionalidades.map((row, index) => (
                          <option value={row.code} key={index}>
                            {row.name}
                          </option>
                        ))}
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="text-input">Lugar Nacimiento</CLabel>
                    </CCol>
                    <CCol xs="12" md="4">
                      {nacionalidad === "DOM" ? (
                        <CSelect
                          custom
                          name="nacionalidadProvincia"
                          value={nacionalidadProvincia}
                          onChange={handleChange}
                          id="select-provincia"
                        >
                          {ProvinciaRD.map((row, index) => (
                            <option value={row.provincia_id} key={index}>
                              {row.provincia}
                            </option>
                          ))}
                        </CSelect>
                      ) : (
                        <></>
                      )}
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CLabel col md={2}>
                      Archivo Cédula
                    </CLabel>
                    <CCol xs="12" md="6">
                      <CInputFile
                        custom
                        id="custom-file2-input"
                        name="fileCedula"
                        onChange={handlechangefile}
                        required
                      />
                      {isCedulaSelected ? (
                        <CLabel
                          htmlFor="custom-file2-input"
                          variant="custom-file"
                        >
                          {cedulatitle}
                        </CLabel>
                      ) : (
                        <CLabel
                          htmlFor="custom-file2-input"
                          variant="custom-file"
                        >
                          Subir Archivo
                        </CLabel>
                      )}
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CLabel col md={2}>
                      Anexar Foto Personal
                    </CLabel>
                    <CCol xs="12" md="6">
                      <CInputFile
                        custom
                        id="custom-file-input"
                        name="filePhoto"
                        onChange={handlechangefile}
                        required
                      />
                      {isPhotoSelected ? (
                        <CLabel
                          htmlFor="custom-file-input"
                          variant="custom-file"
                        >
                          {phototitle}
                        </CLabel>
                      ) : (
                        <CLabel
                          htmlFor="custom-file-input"
                          variant="custom-file"
                        >
                          Subir Archivo
                        </CLabel>
                      )}
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="text-input">
                        Dirección de Domicilio
                      </CLabel>
                    </CCol>
                    <CCol xs="12" md="6">
                      <CRow>
                        <CCol md="6">
                          <CSelect
                            custom
                            name="residenciaPais"
                            value={residenciaPais}
                            onChange={handleChange}
                            id="select-provincia"
                          >
                            {Nacionalidades.map((row, index) => (
                              <option value={row.code} key={index}>
                                {row.name}
                              </option>
                            ))}
                          </CSelect>
                          <CFormText className="help-block">
                            Pais de Residencia
                          </CFormText>
                        </CCol>

                        {residenciaPais === "DOM" ? (
                          <CCol md="6">
                            <CSelect
                              custom
                              name="residenciaMunicipio"
                              value={residenciaMunicipio}
                              onChange={handleChange}
                              id="select-provincia"
                            >
                              {ProvinciaRD.map((row, index) => (
                                <option value={row.provincia_id} key={index}>
                                  {row.provincia}
                                </option>
                              ))}
                            </CSelect>
                          </CCol>
                        ) : (
                          <CCol xs="12" md="4">
                            {" "}
                          </CCol>
                        )}
                      </CRow>
                      <CRow>
                        <CCol md="12">
                          <CInput
                            id="text-input"
                            name="residenciaDireccion"
                            placeholder="*"
                            value={residenciaDireccion}
                            onChange={handleChange}
                            required
                          />
                          <CFormText className="help-block">
                            Calle / Casa Numero
                          </CFormText>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="text-input">Tiempo de Residencia</CLabel>
                    </CCol>
                    <CCol xs="12" md="4">
                      <CRow>
                        <CCol md="6">
                          <CInput
                            id="text-input"
                            name="residenciaTiempoAno"
                            placeholder="*"
                            value={residenciaTiempoAno}
                            onChange={handleChange}
                          />
                          <CFormText className="help-block">Años</CFormText>
                        </CCol>
                        <CCol md="6">
                          <CInput
                            id="text-input"
                            name="residenciaTiempomes"
                            placeholder="*"
                            value={residenciaTiempomes}
                            onChange={handleChange}
                          />
                          <CFormText className="help-block">Meses</CFormText>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="text-input">Correo</CLabel>
                    </CCol>
                    <CCol md="6">
                      <CInput
                        name="correo"
                        placeholder="Correo"
                        value={correo}
                        onChange={handleChange}
                        required
                      />
                      <CInvalidFeedback className="help-block">
                        Campo Requerido
                      </CInvalidFeedback>
                      <CValidFeedback className="help-block"></CValidFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="select">Teléfonos</CLabel>
                    </CCol>
                    <CCol xs="12" md="3" className="mb-3">
                      <CInput
                        name="telefono1"
                        placeholder="teléfono 1"
                        value={telefono1}
                        onChange={handleChange}
                        required
                      />
                    </CCol>
                    <CCol xs="12" md="3">
                      <CInput
                        name="telefono2"
                        placeholder="teléfono 2"
                        value={telefono2}
                        onChange={handleChange}
                        required
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="text-input">Celular</CLabel>
                    </CCol>
                    <CCol xs="12" md="3">
                      <CInput
                        name="celular"
                        placeholder="Celular"
                        value={celular}
                        onChange={handleChange}
                        required
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="select">Estado Civil </CLabel>
                    </CCol>
                    <CCol xs="12" md="3">
                      <CSelect
                        custom
                        name="estadoCivil"
                        value={estadoCivil}
                        onChange={handleChange}
                        id="select-provincia"
                      >
                        <option value="0">Soltero </option>
                        <option value="1">Casado </option>
                        <option value="2">Union Libre </option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="text-input">Nivel Académico</CLabel>
                    </CCol>
                    <CCol xs="12" md="3">
                      <CInput
                        name="nivelAcademico"
                        placeholder="*"
                        value={nivelAcademico}
                        onChange={handleChange}
                        required
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="text-input">Nombre Empleador </CLabel>
                    </CCol>
                    <CCol xs="12" md="6">
                      <CInput
                        name="TrabajoLugar"
                        value={TrabajoLugar}
                        onChange={handleChange}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="text-input">Ocupación</CLabel>
                    </CCol>
                    <CCol xs="12" md="4">
                      <CInput
                        name="TrabajoOcupacion"
                        value={TrabajoOcupacion}
                        onChange={handleChange}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="2">
                      <CLabel htmlFor="select">Tipo de Empleo </CLabel>
                    </CCol>
                    <CCol xs="12" md="4">
                      <CSelect
                        custom
                        name="TrabajoTempleo"
                        value={TrabajoTempleo}
                        onChange={handleChange}
                        id="select-provincia"
                      >
                        <option value="Publico">Publico </option>
                        <option value="Privado">Privado </option>
                        <option value="Temporal">Temporal</option>
                        <option value="Independiente">Independiente</option>
                        <option value="Negocio Propio">Negocio Propio</option>
                      </CSelect>
                    </CCol>
                  </CFormGroup>

                  {TrabajoTempleo === "Negocio Propio" ? (
                    <>
                      <CFormGroup row>
                        <CCol md="2">
                          <CLabel htmlFor="text-input">Tipo de Negocio</CLabel>
                        </CCol>
                        <CCol xs="12" md="6">
                          <CInput
                            name="TrabajoNegocioOficio"
                            value={TrabajoNegocioOficio}
                            onChange={handleChange}
                          />
                        </CCol>
                      </CFormGroup>
                    </>
                  ) : (
                    <CFormGroup></CFormGroup>
                  )}

                  <CCardBody>
                    <CTabs
                      activeTab={active}
                      onActiveTabChange={(idx) => setActive(idx)}
                    >
                      <CNav variant="tabs">
                        <CNavItem>
                          <CNavLink>
                            <CIcon name="cil-user" />
                            {"  "}Datos de cónyugue
                          </CNavLink>
                        </CNavItem>
{/* 
                        <CNavItem>
                          <CNavLink>
                            <CIcon name="cil-user" />
                            {" Familiares"}
                          </CNavLink>
                        </CNavItem> */}

                        {/* <CNavItem>
                          <CNavLink>
                            <CIcon name="cil-user" />
                            {" Beneficiario"}
                          </CNavLink>
                        </CNavItem> */}
                      </CNav>
                      <CTabContent>
                        <CTabPane>
                          {/* Datos de Conyugue */}
                          <CCardBody>
                            <CFormGroup row>
                              <CCol md="2">
                                <CLabel htmlFor="select">Tipo Documento</CLabel>
                              </CCol>
                              <CCol xs="12" md="4">
                                {suscripcion === "personal" ? (
                                  <CSelect
                                    custom
                                    id="select"
                                    onChange={handleChange}
                                    name="ctipodocumento"
                                    value={ctipodocumento}
                                  >
                                    <option value="">-- Selecciona --</option>
                                    <option value="Cedula">
                                      Cédula Dominicana
                                    </option>
                                    <option value="Pasaporte">Pasaporte</option>
                                  </CSelect>
                                ) : (
                                  <CSelect
                                    custom
                                    id="select"
                                    onChange={handleChange}
                                    name="ctipodocumento"
                                  >
                                    <option value="rnc">RNC</option>
                                  </CSelect>
                                )}
                              </CCol>
                            </CFormGroup>

                            {ctipodocumento === "" ? (
                              <></>
                            ) : (
                              <>
                                <CFormGroup row>
                                  <CCol md="2">
                                    <CLabel htmlFor="text-input">
                                      {ctipodocumento}
                                    </CLabel>
                                  </CCol>
                                  <CCol xs="12" md="4">
                                    <CInput
                                      id="text-input"
                                      name="cdocumento"
                                      placeholder={
                                        "Número de " + ctipodocumento
                                      }
                                      value={cdocumento}
                                      onChange={handleChange}
                                      required
                                    />
                                    <CInvalidFeedback className="help-block">
                                      Campo Requerido
                                    </CInvalidFeedback>
                                    <CValidFeedback className="help-block"></CValidFeedback>
                                  </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                  <CCol md="2">
                                    <CLabel htmlFor="text-input">Nombre</CLabel>
                                  </CCol>
                                  <CCol xs="12" md="6">
                                    {/* <CInput className="form-control-warning" id="inputWarning2i"  /> */}
                                    <CInput
                                      id="text-input"
                                      name="cnombres"
                                      placeholder="Nombre del cónyugue"
                                      value={cnombres}
                                      onChange={handleChange}
                                      required
                                    />
                                  </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                  <CCol md="2">
                                    <CLabel htmlFor="text-input">
                                      Apellido
                                    </CLabel>
                                  </CCol>
                                  <CCol xs="12" md="6">
                                    <CInput
                                      id="text-input"
                                      name="capellidos"
                                      placeholder="Apellido del cónyugue"
                                      value={capellidos}
                                      onChange={handleChange}
                                      required
                                    />
                                  </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                  <CCol md="2">
                                    <CLabel htmlFor="text-input">
                                      Fecha Nacimiento
                                    </CLabel>
                                  </CCol>
                                  <CCol xs="12" md="4">
                                    <CInput
                                      id="text-input"
                                      name="cfechanacimiento"
                                      placeholder="Fecha de Nacimiento"
                                      value={cfechanacimiento}
                                      onChange={handleChange}
                                      type="date"
                                    />
                                  </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                  <CCol md="2">
                                    <CLabel htmlFor="select">
                                      Nacionalidad
                                    </CLabel>
                                  </CCol>
                                  <CCol xs="12" md="4">
                                    <CSelect
                                      custom
                                      name="cnacionalidad"
                                      placeholder="provincia"
                                      value={cnacionalidad}
                                      onChange={handleChange}
                                      id="select-provincia"
                                    >
                                      {Nacionalidades.map((row, index) => (
                                        <option value={row.code} key={index}>
                                          {row.name}
                                        </option>
                                      ))}
                                    </CSelect>
                                  </CCol>
                                </CFormGroup>
                              </>
                            )}
                          </CCardBody>

                          {/* Datos de Conyugue */}
                        </CTabPane>

                        {/* Parentescos */}
                        {/* <CTabPane>
                          <td className="py-2">
                            <CButton
                              color="primary"
                              variant="outline"
                              shape="square"
                              size="sm"
                              onClick={() => {
                                seteuParentesco({
                                  ...uParentesco,
                                  eparentesco_Nombre: "",
                                  eparentesco_Apellido: "",
                                  parentesco_nombre: "",
                                  parentesco_parentesco: 1,
                                  parentesco_contacto: "",
                                  parentesco_beneficiario: "No",
                                  parentesco_apellido: "",
                                  parentesco_cedula: "",
                                  parentesco_beneficio: 0,
                                  parentesco_descripcion: "Hermano",
                                });
                                setSuccessParentesco(!successParentesco);
                              }}
                              // onClick={(socios) => console.log(item.socio)}
                            >
                              Adicionar Familiares
                            </CButton>
                          </td>
                          <CDataTable
                            items={parentesco}
                            fields={fieldsparentesco}
                            striped
                            itemsPerPage={5}
                            pagination
                            scopedSlots={{
                              Opciones: (item) => {
                                return (
                                  <td className="py-12">
                                    <CButton
                                      color="primary"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        seteuParentesco({
                                          ...uParentesco,
                                          eparentesco_Nombre: item.nombre,
                                          eparentesco_Apellido: item.apellido,
                                          parentesco_nombre: item.nombre,
                                          parentesco_parentesco:
                                            item.parentesco,
                                          parentesco_contacto: item.contacto,
                                          parentesco_beneficiario:
                                            item.beneficiario,
                                          parentesco_apellido: item.apellido,
                                          parentesco_cedula: item.cedula,
                                          parentesco_beneficio: item.beneficio,
                                          parentesco_descripcion:
                                            item.descripcion,
                                        });
                                        setSuccessParentesco(
                                          !successParentesco
                                        );
                                      }}
                                      // onClick={(socios) => console.log(item.socio)}
                                    >
                                      <CIcon name="cil-task" />
                                      Editar
                                    </CButton>{" "}
                                    <CButton
                                      color="primary"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        deleteParentesco(
                                          item.nombre,
                                          item.apellido
                                        );
                                      }}
                                      // onClick={(socios) => console.log(item.socio)}
                                    >
                                      <CIcon name="cil-trash" />
                                      Eliminar
                                    </CButton>
                                  </td>
                                );
                              },
                            }}
                          />
                        </CTabPane> */}
                        {/* Parentesco  */}

                        {/* Beneficiario  */}

                        <CTabPane>
                          <td className="py-2">
                            <CButton
                              color="primary"
                              variant="outline"
                              shape="square"
                              size="sm"
                              onClick={() => {
                                seteuParentesco({
                                  ...uParentesco,
                                  eparentesco_Nombre: "",
                                  eparentesco_Apellido: "",
                                  parentesco_nombre: "",
                                  parentesco_parentesco: 1,
                                  parentesco_contacto: "",
                                  parentesco_beneficiario: "Si",
                                  parentesco_apellido: "",
                                  parentesco_cedula: "",
                                  parentesco_beneficio: 0,
                                  parentesco_descripcion: "Hermano",
                                });
                                setSuccessParentesco(!successParentesco);
                              }}
                              // onClick={(socios) => console.log(item.socio)}
                            >
                              Adicionar Beneficiario
                            </CButton>
                          </td>
                          <CDataTable
                            items={beneficiario}
                            fields={fieldsparentesco}
                            striped
                            itemsPerPage={5}
                            pagination
                            scopedSlots={{
                              Opciones: (item) => {
                                return (
                                  <td className="py-12">
                                    <CButton
                                      color="primary"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        seteuParentesco({
                                          ...uParentesco,
                                          eparentesco_Nombre: item.nombre,
                                          eparentesco_Apellido: item.apellido,
                                          parentesco_nombre: item.nombre,
                                          parentesco_parentesco:
                                            item.parentesco,
                                          parentesco_contacto: item.contacto,
                                          parentesco_beneficiario:
                                            item.beneficiario,
                                          parentesco_apellido: item.apellido,
                                          parentesco_cedula: item.cedula,
                                          parentesco_beneficio: item.beneficio,
                                          parentesco_descripcion:
                                            item.descripcion,
                                        });
                                        setSuccessParentesco(
                                          !successParentesco
                                        );
                                      }}
                                      // onClick={(socios) => console.log(item.socio)}
                                    >
                                      <CIcon name="cil-task" />
                                      Editar
                                    </CButton>{" "}
                                    <CButton
                                      color="primary"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        deleteBeneficiario(
                                          item.nombre,
                                          item.apellido
                                        );
                                      }}
                                      // onClick={(socios) => console.log(item.socio)}
                                    >
                                      <CIcon name="cil-trash" />
                                      Eliminar
                                    </CButton>
                                  </td>
                                );
                              },
                            }}
                          />
                        </CTabPane>

                        {/* Beneficiario  */}
                      </CTabContent>
                    </CTabs>
                  </CCardBody>
                  <CCardFooter>
                     
                    <CButton size="sm" color="success"
                    onClick={handleValidarEnviar}
                    ><CIcon name="cil-scrubber" /> Enviar Suscripcion</CButton>
                    {" "}
                    <CButton type="reset" size="sm" color="danger"
                    onClick={handleValidarCancelar}><CIcon name="cil-ban" /> Cancelar </CButton>
                  </CCardFooter>

                   

                  <CModal
                    show={successParentesco}
                    onClose={() => setSuccessParentesco(!successParentesco)}
                    color="success"
                  >
                    <CModalHeader closeButton>
                      <CModalTitle>Informacion Parentesco</CModalTitle>
                    </CModalHeader>

                    {successParentesco ? (
                      <CModalBody>
                        <CRow>
                          <CCol xs="6">
                            <CLabel>Nombre :</CLabel>
                            <CInput
                              value={parentesco_nombre}
                              onChange={handleChangeParentesco}
                              name="parentesco_nombre"
                              required
                            />
                          </CCol>
                          <CCol xs="6">
                            <CLabel>Apellido :</CLabel>
                            <CInput
                              value={parentesco_apellido}
                              onChange={handleChangeParentesco}
                              name="parentesco_apellido"
                              required
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="6">
                            <CLabel>Cedula / Pasaporte :</CLabel>
                            <CInput
                              value={parentesco_cedula}
                              onChange={handleChangeParentesco}
                              name="parentesco_cedula"
                            />
                          </CCol>
                          <CCol xs="6">
                            <CLabel>Contacto :</CLabel>
                            <CInput
                              value={parentesco_contacto}
                              onChange={handleChangeParentesco}
                              name="parentesco_contacto"
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="8">
                            <CLabel>Correo :</CLabel>
                            <CInput
                              value={parentesco_correo}
                              onChange={handleChangeParentesco}
                              name="parentesco_correo"
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="4">
                            <CLabel htmlFor="company">Parentesco</CLabel>
                            <CSelect
                              className="mb-3"
                              aria-label="Large select example"
                              value={parentesco_descripcion}
                              name="parentesco_descripcion"
                              onChange={handleChangeParentesco}
                            >
                              {listParentesco.map((row) => (
                                <option value={row.descripcion}>
                                  {" "}
                                  {row.descripcion}{" "}
                                </option>
                              ))}
                            </CSelect>
                          </CCol>
                          {/* <CCol xs="4">
                            <CLabel>Beneficiario</CLabel>
                            <CSelect
                              className="mb-3"
                              aria-label="Large select example"
                              value={parentesco_beneficiario}
                              name="parentesco_beneficiario"
                              onChange={handleChangeParentesco}
                            >
                              <option value="No">No</option>
                              <option value="Si">Si</option>
                            </CSelect>
                          </CCol> */}
                        </CRow>
                        <CRow>
                          <CCol xs="12">
                            <CLabel>Direccion :</CLabel>
                            <CInput
                              value={parentesco_direccion}
                              onChange={handleChangeParentesco}
                              name="parentesco_direccion"
                            />
                          </CCol>
                        </CRow>
                      </CModalBody>
                    ) : (
                      <CModalBody>
                        <CRow></CRow>
                      </CModalBody>
                    )}

                    <CModalFooter>
                      <CButton color="success" onClick={salvarParentesco}>
                        Salvar Parentesco
                      </CButton>{" "}
                      <CButton
                        color="secondary"
                        onClick={() => setSuccessParentesco(!successParentesco)}
                      >
                        Cancel
                      </CButton>
                    </CModalFooter>
                  </CModal>
                </CForm>
               
          </CCol>
        </CRow>
    </div>
  );
};

export default Register;
