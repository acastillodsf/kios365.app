import {
  CUENTA_PLAN_GET,
  CUENTA_PLAN_GET_OK,
  CUENTA_PLAN_GET_ERROR,
  CUENTA_PLAN_POST,
  CUENTA_PLAN_POST_OK,
  CUENTA_PLAN_POST_ERROR,
} from "../types/index";

import clienteAxios from "../config/axios";

// Comenzar inicio Sesion
export function getplanAhorro(id) {
  return async (dispatch) => {
    dispatch(comenzarConsulta());

    try {
      const peticion = await clienteAxios.get(`cuentas/planAhorros/${id}`);
      dispatch(getplanAhorroExito(peticion.data));
    } catch (error) {
      dispatch(getplanAhorroError(error));
    }
  };
}
export function updatePlanAhorro(data) {
  return async (dispatch) => {
    dispatch(comenzarUpdate());

    try {
      const peticion = await clienteAxios.post(`cuentas/planAhorros/`, data);
      dispatch(postplanAhorroExito(peticion.data));
    } catch (error) {
      dispatch(postlanAhorroError(error));
    }
  };
}

const comenzarConsulta = () => ({
  type: CUENTA_PLAN_GET,
  payload: true,
});
const getplanAhorroExito = (data) => ({
  type: CUENTA_PLAN_GET_OK,
  payload: data,
});
const getplanAhorroError = (error) => ({
  type: CUENTA_PLAN_GET_ERROR,
  payload: error,
});

const comenzarUpdate = () => ({
  type: CUENTA_PLAN_POST,
  payload: true,
});
const postplanAhorroExito = (data) => ({
  type: CUENTA_PLAN_POST_OK,
  payload: data,
});

const postlanAhorroError = (error) => ({
  type: CUENTA_PLAN_POST_ERROR,
  payload: error,
});
