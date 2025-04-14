import {
  CLIENTE_CONSULTA_INICIO,
  CLIENTE_CONSULTA_EXITOSA,
  CLIENTE_CONSULTA_ERROR,
  CLIENTE_UPDATE_INICIO,
  CLIENTE_UPDATE_EXITOSA,
  CLIENTE_UPDATE_ERROR,
} from "../types/index";

import clienteAxios from "../config/axios";
import { cerrarSesion404Action } from "../actions/usuarioAction";

// Consulta datos del Cliente
export function consultarClientesReducer() {
  return async (dispatch) => {
    dispatch(comenzarconsulta());

    try {
      const peticion = await clienteAxios.get("clientes");
      dispatch(consultaClienteExito(peticion.data));
    } catch (error) {
      if ((error.response.status = "401")) {
        dispatch(cerrarSesion404Action());
      }
      dispatch(consultaClienteError(error));
    }
  };
}

export function updateClientesReducer(ucliente) {
  return async (dispatch) => {
    dispatch(updateCliente());

    try {
      const peticion = await clienteAxios.post("clientes", ucliente);
      dispatch(updateClienteExito(peticion.data));
    } catch (error) {
      dispatch(updateClienteError(error));
      console.log(error.response.status);
      if (error.response.status === "401") {
        dispatch(cerrarSesion404Action());
      }
    }
  };
}

const updateCliente = () => ({
  type: CLIENTE_UPDATE_INICIO,
  payload: true,
});
const updateClienteExito = (datos) => ({
  type: CLIENTE_UPDATE_EXITOSA,
  payload: datos,
});
const updateClienteError = (error) => ({
  type: CLIENTE_UPDATE_ERROR,
  payload: error,
});

const comenzarconsulta = () => ({
  type: CLIENTE_CONSULTA_INICIO,
  payload: true,
});
const consultaClienteExito = (datos) => ({
  type: CLIENTE_CONSULTA_EXITOSA,
  payload: datos,
});
const consultaClienteError = (error) => ({
  type: CLIENTE_CONSULTA_ERROR,
  payload: error,
});
