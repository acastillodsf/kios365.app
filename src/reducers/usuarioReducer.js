import {
  COMENZAR_INICIO_SESION,
  INICIO_SESION_EXITO,
  INICIO_SESION_ERROR,
  CERRAR_SESION,
  VERIFICACION_USUARIO_EXITO,
  AUTENTIFICACION404,
} from "../types/index";
import tokenAuth from "../config/token";

const initialState = {
  cargando: false,
  error: "",
  AccessToken: window.localStorage.getItem("token"),
  autenticado: window.localStorage.getItem("token") ? true : false,
  croquets: window.localStorage.getItem("croquets") || '',
  error401: false,
  usuario: "",
  mensaje: null,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {

  switch (action.type) {
    case COMENZAR_INICIO_SESION:
      return {
        ...state,
        cargando: action.payload,
      };
    case INICIO_SESION_EXITO:
      tokenAuth(action.payload.accessToken);

      window.localStorage.setItem("token", action.payload.accessToken);

      return {
        ...state,
        AccessToken: action.payload.accessToken,
        cargando: false,
        autenticado: true,
        error401: false,
      };
    case CERRAR_SESION:
      window.localStorage.removeItem("token");


      return {
        ...state,
        autenticado: false,
      };

    case 'UNAUTHORIZED':
      window.localStorage.removeItem("token");


      return {
        ...state,
        autenticado: false,
      };
    case AUTENTIFICACION404:
      window.localStorage.removeItem("token");
      return {
        ...state,
        error401: true,
        autenticado: false,
      };
    case INICIO_SESION_ERROR:
      return {
        ...state,
        error: action.payload,
        cargando: false,
        mensaje: action.payload.response.data,
      };
    case "INICIO_SESION_CLEAR":
      return {
        ...state,
        error: {},
        cargando: false,
        mensaje: "",
      };
    case VERIFICACION_USUARIO_EXITO:
      return {
        ...state,
        cargando: false,
        autenticado: action.payload.confirmacion,
        usuario: action.payload.nombre,
        nombre: action.payload.nombre,
        confirmacion: state.token,
      };

    default:
      return state;
  }
}
