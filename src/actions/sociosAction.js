import {
  CONSULTA_SOCIO_INICIO,
  CONSULTA_SOCIO_EXITO,
  CONSULTA_SOCIO_ERROR,
  CONSULTA_LISTSOCIO_INICIO,
  CONSULTA_LISTSOCIO_EXITO,
  CONSULTA_LISTSOCIO_ERROR,
  UPDATE_SOCIO_INICIO,
  UPDATE_SOCIO_EXITO,
  UPDATE_SOCIO_ERROR,
  CREAR_CUENTA_INICIO,
  CREAR_CUENTA_EXITO,
  CREAR_CUENTA_ERROR,
  CREAR_CUENTA_LIMPIAR,
  LIST_CUENTA_SOCIO,
  LIST_CUENTA_SOCIO_OK,
  LIST_CUENTA_SOCIO_ERROR
} from "../types/index";

import clienteAxios from "../config/axios";
import { cerrarSesion404Action } from "./usuarioAction";

// Listado de Socios
export function consultarListSociosReducer() {
  return async (dispatch) => {
    dispatch(comenzarListConsulta());

    try {
      const peticion = await clienteAxios.get(`socios/socios`);
      dispatch(consultaListSociosExito(peticion.data));
    } catch (error) {
       if (error.response.status === 401) {
        dispatch(cerrarSesion404Action());
      }
      dispatch(consultaListSociosError(error));
    }
  };
}

// Consulta la informacion de un Asociado
export function consultaSocioReducer(querry) {
  return async (dispatch) => {
    dispatch(comenzarSocioConsulta());

    try {
      const peticion = await clienteAxios.get(`socios/socios${querry}`);
      dispatch(consultaSociosExito(peticion.data));
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(cerrarSesion404Action());
      }
      dispatch(consultaSociosError(error));
    }
  };
}

export function updateSociosReducer(data) {
  return async (dispatch) => {
    dispatch(updateSocioinicia());

    try {
      const peticion = await clienteAxios.post("socios/socios", data);
      dispatch(updateSociosExito(peticion.data));
    } catch (error) {
      if (error.response.status === "401") {
        dispatch(cerrarSesion404Action());
      }
      dispatch(updateSocioError(error));
    }
  };
}

//Crear Cuenta

export function crearCuentaSocio(data) {
  return async (dispatch) => {
    dispatch(crearCuentainicia());

    try {
      const peticion = await clienteAxios.post("cuentas/cuenta-apertura", data);
      dispatch(crearCuentaExito(peticion.data));
    } catch (error) {
      if (error.response.status === "401") {
        dispatch(cerrarSesion404Action());
      }
      dispatch(crearCuentaError(error));
    }
  };
}

export function getCuentaSocio(data) {
  return async (dispatch) => {
    dispatch(listCuenta());

    console.log(data)
    try {
      const peticion = await clienteAxios.post("cuentas/cuenta", data);
      dispatch(listCuentaOk(peticion.data));
    } catch (error) {
      if (error.response.status === "401") {
        dispatch(cerrarSesion404Action());
      }
      dispatch(listCuentaError(error));
    }
  };
}

export function crearCuentaLimpiar() {
  return async (dispatch) => {
    dispatch(crearCuentaLimpia());
  };
}

const crearCuentaLimpia = () => ({
  type: CREAR_CUENTA_LIMPIAR,
  payload: true,
});
const crearCuentainicia = () => ({
  type: CREAR_CUENTA_INICIO,
  payload: true,
});
const crearCuentaExito = (datos) => ({
  type: CREAR_CUENTA_EXITO,
  payload: datos,
});
const crearCuentaError = (error) => ({
  type: CREAR_CUENTA_ERROR,
  payload: error,
});

const comenzarListConsulta = () => ({
  type: CONSULTA_LISTSOCIO_INICIO,
  payload: true,
});
const consultaListSociosExito = (token) => ({
  type: CONSULTA_LISTSOCIO_EXITO,
  payload: token,
});
const consultaListSociosError = (error) => ({
  type: CONSULTA_LISTSOCIO_ERROR,
  payload: error,
});

const comenzarSocioConsulta = () => ({
  type: CONSULTA_SOCIO_INICIO,
  payload: true,
});
const consultaSociosExito = (datos) => ({
  type: CONSULTA_SOCIO_EXITO,
  payload: datos,
});
const consultaSociosError = (error) => ({
  type: CONSULTA_SOCIO_ERROR,
  payload: error,
});

const updateSocioinicia = () => ({
  type: UPDATE_SOCIO_INICIO,
  payload: true,
});
const updateSociosExito = (datos) => ({
  type: UPDATE_SOCIO_EXITO,
  payload: datos,
});
const updateSocioError = (error) => ({
  type: UPDATE_SOCIO_ERROR,
  payload: error,
});

//
 

  const listCuenta = () => ({
    type: LIST_CUENTA_SOCIO,
    payload: true,
  });
  const listCuentaOk = (datos) => ({
    type: LIST_CUENTA_SOCIO_OK,
    payload: datos,
  });
  const listCuentaError = (error) => ({
    type: LIST_CUENTA_SOCIO_ERROR,
    payload: error,
  });