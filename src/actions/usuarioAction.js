import {
  COMENZAR_INICIO_SESION,
  INICIO_SESION_EXITO,
  INICIO_SESION_ERROR,
  CERRAR_SESION,
  AUTENTIFICACION404,
} from "../types/index";

import clienteAxios from "../config/axios";
import swal from "sweetalert";
// Comenzar inicio Sesion
export function inicioSesionReducer(usuario) {
  return async (dispatch) => {
    dispatch(comenzarLogin());
    try {
      const peticion = await clienteAxios.post("/Auth/login", usuario);
      console.log('peticion', peticion.data)
      dispatch(inicioSesionExito(peticion.data));
    } catch (error) {
      dispatch(inicioSesionError(error));
      swal({
        title: 'Inicio de Seccion',
        text: error.response.data,
        icon: 'warning'
      })
    }
  };
}

const comenzarLogin = () => ({
  type: COMENZAR_INICIO_SESION,
  payload: true,
});
const inicioSesionExito = (token) => ({
  type: INICIO_SESION_EXITO,
  payload: token,
});
const inicioSesionError = (error) => ({
  type: INICIO_SESION_ERROR,
  payload: error,
});

export function cerrarSesionAction() {
  return async (dispatch) => {
    dispatch(cerrarSesion());
  };
}
export function cerrarSesion404Action() {
  return async (dispatch) => {
    dispatch(cerrarSesion404());
  };
}

const cerrarSesion = () => ({
  type: CERRAR_SESION,
});

const cerrarSesion404 = () => ({
  type: AUTENTIFICACION404,
});
