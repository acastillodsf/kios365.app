import {
    ESTADO_CUENTA_GET,
    ESTADO_CUENTA_GET_OK,
    ESTADO_CUENTA_GET_ERROR,
    ESTADO_CUENTA_POST,
    ESTADO_CUENTA_POST_OK,
    ESTADO_CUENTA_POST_ERROR
  } from "../types/index";
  
  import clienteAxios from "../config/axios";
import { cerrarSesionAction } from "./usuarioAction";
  
  // Comenzar inicio Sesion
  export function getconsultaProducto() {
    return async (dispatch) => {
      dispatch(comenzarConsulta());
  
      try {
        const peticion = await clienteAxios.get('/productos');
        dispatch(consultaCuentaExito(peticion.data));
      } catch (error) {
        if( parseInt(error.response.status)===401){
          dispatch(cerrarSesionAction());
        }
        dispatch(consultaCuentaError(error));
      }
    };
  }

  export function consultaSocioEstado(consulta) {
    return async (dispatch) => {
      dispatch(comenzarConsultaEst());
  
      try {
        const peticion = await clienteAxios.post("/ConsultaAH/",consulta);
        dispatch(consultaCuentaEstExito(peticion.data));
      } catch (error) {
        dispatch(consultaCuentaEstError(error));
      }
    };
  }
  
  const comenzarConsulta = () => ({
    type: ESTADO_CUENTA_GET,
    payload: true,
  });
  const consultaCuentaExito = (token) => ({
    type: ESTADO_CUENTA_GET_OK,
    payload: token,
  });
  const consultaCuentaError = (error) => ({
    type: ESTADO_CUENTA_GET_ERROR,
    payload: error,
  });
  

  const comenzarConsultaEst = () => ({
    type: ESTADO_CUENTA_POST,
    payload: true,
  });
  const consultaCuentaEstExito = (token) => ({
    type: ESTADO_CUENTA_POST_OK,
    payload: token,
  });
  const consultaCuentaEstError = (error) => ({
    type: ESTADO_CUENTA_POST_ERROR,
    payload: error,
  });