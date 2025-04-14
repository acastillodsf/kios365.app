import {
  SOCIOS_COMPONENT_INICIA,
  SOCIOS_COMPONENT_EXITOSA,
  SOCIOS_COMPONENT_ERROR,
} from "../types/index";

import clienteAxios from "../config/axios";

// Comenzar inicio Sesion
export function componentSocios() {
  return async (dispatch) => {
    dispatch(comenzarConsulta());

    try {
      const peticion = await clienteAxios.get("component/socios_component");
      dispatch(componentSociosExito(peticion.data));
    } catch (error) {
      dispatch(componentSociosError(error));
    }
  };
}

const comenzarConsulta = () => ({
  type: SOCIOS_COMPONENT_INICIA,
  payload: true,
});
const componentSociosExito = (token) => ({
  type: SOCIOS_COMPONENT_EXITOSA,
  payload: token,
});
const componentSociosError = (error) => ({
  type: SOCIOS_COMPONENT_ERROR,
  payload: error,
});
