import {
  COMPROFILE,
  COMPROFILE_OK,
  COMPROFILE_ERROR,
} from "../types/index";

import clienteAxios from "../config/axios";

// Comenzar inicio Sesion
export function getcompleteProfile(key) {
  return async (dispatch) => {
    dispatch(comenzarLogin());

    try {
      const peticion = await clienteAxios.get(`/completeProfile?idSolicitud=${key}`);
      console.log(peticion)
      dispatch(inicioSesionExito(peticion.data));
    } catch (error) {
      dispatch(inicioSesionError(error));
    }
  };
}

const comenzarLogin = () => ({
  type: COMPROFILE,
  payload: true,
});
const inicioSesionExito = (token) => ({
  type: COMPROFILE_OK,
  payload: token,
});
const inicioSesionError = (error) => ({
  type: COMPROFILE_ERROR,
  payload: error,
});
 