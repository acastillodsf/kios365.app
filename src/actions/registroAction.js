import {
  REGISTER_DOCUMENTO,
  REGISTER_DOCUMENTO_OK,
  REGISTER_DOCUMENTO_ERROR,
  CREATE_PROFILE,
  CREATE_PROFILE_OK,
  CREATE_PROFILE_ERROR,
} from "../types/index";

import clienteAxios from "../config/axios";
import swal from "sweetalert";


// Listado de Socios
export function validar_documento(datos) {
  return async (dispatch) => {
    dispatch(infoValidarDocumento());

    try {
      const peticion = await clienteAxios.post(`/auth/register`, datos);
      dispatch(cinfoValidarDocumentoExito(peticion.data));
    } catch (error) {
      dispatch(infoValidarDocumentoError(error));
    }
  };
}

const infoValidarDocumento = () => ({
  type: REGISTER_DOCUMENTO,
  payload: true,
});
const cinfoValidarDocumentoExito = (datos) => ({
  type: REGISTER_DOCUMENTO_OK,
  payload: datos,
});
const infoValidarDocumentoError = (error) => ({
  type: REGISTER_DOCUMENTO_ERROR,
  payload: error,
});

export function createProfilePost(datos) {

  return async (dispatch) => {
    dispatch(envioProfile());

    try {
      const peticion = await clienteAxios.post(`/completeProfile`, datos);
      dispatch(envioProfileExito(peticion.data));
      swal({
        title: "Perfil de Usuario",
        text: "¡Felicidades! Completaste el proceso de inscripción, ingresa a las plataformas correspondientes con tus credenciales",
        icon: "warning",
        button: "Aceptar",
      });
    } catch (error) {
      dispatch(envioProfileError(error));
      swal({
        title: "Perfil de Usuario",
        text: error.message,
        icon: "warning",
        button: "Aceptar",
      });
    }
  };
}

const envioProfile = () => ({
  type: CREATE_PROFILE,
  payload: true,
});
const envioProfileExito = (datos) => ({
  type: CREATE_PROFILE_OK,
  payload: datos,
});
const envioProfileError = (error) => ({
  type: CREATE_PROFILE_ERROR,
  payload: error,
});
