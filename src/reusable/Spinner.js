import {
  CLabel,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getSetting } from "src/actions/settingAction";

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status"></div>
      <strong className="ml-1">Cargando....</strong>
    </div>
  );
};
export const Spinnerblue = ({value,style}) => {
  return (
    <div className="d-flex justify-content-center" style={{ color: "blue",...style }}>
      <div className="spinner-border" role="status"></div>
      <strong className="ml-1">{value===undefined ? "Cargando...." : value} </strong>
    </div>
  );
};

export const SpinnerText = ({ text }) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status"></div>
      <strong className="ml-1"> {text} </strong>
    </div>
  );
};
export const Downloading = ({ value, text }) => {
  return (
    <CModal
      show={true}
      color="success"
      size="sm"
      centered
      closeOnBackdrop={false}
    >
      <CModalBody>
        <div
          className="d-flex justify-content-center"
          style={{ color: "blue" }}
        >
          <div className="spinner-border" role="status"></div>
          <strong className="ml-3 pt-1">
            {value === undefined ? "Descargando Archivo...." : value}
          </strong>
        </div>
      </CModalBody>
    </CModal>
  );
};

export const AlertMensaje = ({ value }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(true);
  return (
    <CModal
      show={show}
      color="warning"
      size="sm"
      centered
      closeOnBackdrop={false}
      onClose={() => {
        setShow(!show);
        dispatch(getSetting());
      }}
    >
      <CModalTitle>
        <CModalHeader closeButton>
          <CModalTitle>Mensaje</CModalTitle>
        </CModalHeader>
      </CModalTitle>
      <CModalBody>
        <CLabel htmlFor="company">
          {value === undefined ? "Descargando Archivo...." : value}
        </CLabel>
      </CModalBody>
    </CModal>
  );
};

export const DisabledAutorization = ({ value, text }) => {
  return (
    <CModal show={true} size="sm" centered closeOnBackdrop={false}>
      <CModalBody style={{ color: "blue", textAlign: "center" }}>
        {text ? (
          <strong className="ml-3 pt-1">{text}</strong>
        ) : (
          <strong className="ml-3 pt-1">
            ¿No ve el navegador seguro de Digital Kingom ? Abriremos la ventana
            nuevamente para que pueda completar el proceso de vinculacion
          </strong>
        )}
      </CModalBody>
    </CModal>
  );
};

export const TokenUnistall = () => {
  return (
    <CModal show={true} centered closeOnBackdrop={false}>
      <CModalBody style={{ color: "blue" }}>
        <h1>Error: Archivo token.json no encontrado</h1>

        <p>
          Lamentablemente, no hemos podido encontrar el archivo 'token.json' en
          su sistema. Este archivo es esencial para el funcionamiento adecuado
          de la aplicación.
        </p>

        <p>Para solucionar este problema, siga estos pasos:</p>
        <ol>
          <li>
            <strong>Consulte el manual de procedimientos:</strong> Revise la
            documentación de instalación o el manual de usuario proporcionado
            con la aplicación para obtener instrucciones detalladas sobre cómo
            instalar o reemplazar el archivo 'token.json'.
          </li>
          <li>
            <strong>Verifique la ubicación del archivo:</strong> Asegúrese de
            que el archivo 'token.json' esté ubicado en el directorio correcto y
            que tenga el nombre correcto. A menudo, se encuentra en la carpeta
            de configuración de la aplicación.
          </li>
          <li>
            <strong>Cree un nuevo archivo 'token.json':</strong> Si no tiene el
            archivo 'token.json' o necesita crear uno nuevo, siga las
            instrucciones del manual para generar un archivo válido con los
            datos requeridos.
          </li>
          <li>
            <strong>Actualice la aplicación:</strong> Una vez que haya instalado
            o reemplazado el archivo 'token.json', reinicie la aplicación para
            que los cambios surtan efecto.
          </li>
        </ol>

        <p>
          Si continúa experimentando problemas o tiene alguna pregunta, no dude
          en ponerse en contacto con nuestro equipo de soporte técnico para
          obtener asistencia adicional.
        </p>

        <p>
          Gracias por utilizar nuestra aplicación y por su paciencia mientras
          resolvemos este problema. Lamentamos los inconvenientes que esto pueda
          causar.
        </p>
      </CModalBody>
    </CModal>
  );
};

export default Spinner;
