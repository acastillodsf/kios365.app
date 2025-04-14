import {
    UEPAPAY,
    UEPAPAY_OK,
    UEPAPAY_ERROR,
    UEPAPAYGET,
    UEPAPAYGET_OK,
    UEPAPAYGET_ERROR,
    SUSCRIPCION,
    SUSCRIPCION_OK,
    SUSCRIPCION_ERROR,
  } from "../types/index";
  
  import clienteAxios from "../config/axios";
import swal from "sweetalert";
import CoreAxios from "src/config/axiosCore";
  
  // Comenzar inicio Sesion
  export function enviarPeticion(datos) {
    return async (dispatch) => {
      dispatch(enviar_peticion_inicio());
  
      try {
        const peticion = await clienteAxios.post("/transacciones/uepapay", datos);
        dispatch(enviar_peticion_exito(peticion.data));
        console.log(peticion)
          if (peticion.data.url) {
            window.location.assign(peticion.data.url);
          }

      } catch (error) {
        dispatch(enviar_peticion_error(error));
      }
    };
  }


  export function suscripcionSummit(datos) {
    return async (dispatch) => {
      dispatch(enviar_suscripcion_inicio());
  
      try {
        const peticion = await clienteAxios.post("/transacciones/uepapay-inscripcion", datos);
        dispatch(enviar_suscripcion_exito(peticion.data));
      } catch (error) {
        dispatch(enviar_suscripcion_error(error));
      }
    }; 
  }

  export function obtenerPeticion(datos) {
    return async (dispatch) => {
      dispatch(obtener_peticion_inicio());
  
      try {
        const peticion = await clienteAxios.get(`/ProcessCardNetConfirmacion/?confirmation=${datos}`);
        dispatch(obtener_peticion_exito(peticion.data));
      } catch (error) {
        dispatch(obtener_peticion_error(error));
      }
    };
  }
  
  export const ImprimirDocumento = async(documento) =>{
    try {
        const data = await CoreAxios.get(`/Comprobante?documento=${documento}`,{responseType: 'blob'});

        const blob = new Blob([data.data],{ type: 'application/pdf' } )

        const fileUrl = window.URL.createObjectURL(blob);
        const w = window.open(fileUrl, '_blank');
        w && w.focus();

      } catch (error) {
        swal(
          `Error ${error.response.status.toString()}`,
          `${error.response.statusText} ${error.response.data.type}`,
          'warning'
        )
      }
  }

  const enviar_peticion_inicio = () => ({
    type: UEPAPAY,
    payload: true,
  });
  const enviar_peticion_exito = (token) => ({
    type: UEPAPAY_OK,
    payload: token,
  });
  const enviar_peticion_error = (error) => ({
    type: UEPAPAY_ERROR,
    payload: error,
  });

  
  const enviar_suscripcion_inicio = () => ({
    type: SUSCRIPCION,
    payload: true,
  });
  const enviar_suscripcion_exito = (token) => ({
    type: SUSCRIPCION_OK,
    payload: token,
  });
  const enviar_suscripcion_error = (error) => ({
    type: SUSCRIPCION_ERROR,
    payload: error,
  });
   

  const obtener_peticion_inicio = () => ({
    type: UEPAPAYGET,
    payload: true,
  });
  const obtener_peticion_exito = (token) => ({
    type: UEPAPAYGET_OK,
    payload: token,
  });
  const obtener_peticion_error = (error) => ({
    type: UEPAPAYGET_ERROR,
    payload: error,
  });