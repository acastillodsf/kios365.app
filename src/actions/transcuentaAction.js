import {
    TRANSCUENTA,
    TRANSCUENTA_OK,
    TRANSCUENTA_ERROR,
  } from "../types/index";
  
  import clienteAxios from "../config/axios";
import swal from "sweetalert";
  
  // Comenzar inicio Sesion
  export function PeticionTransCuenta(datos) {
    return async (dispatch) => {
      dispatch(enviar_peticion_inicio());
  
      try {
        const peticion = await clienteAxios.post("/transcuenta", datos);
        dispatch(enviar_peticion_exito(peticion.data));

        console.log(peticion.data)

        swal({
          title: "Transaccion",
          text: peticion.data,
          icon: "info",
          button: "Aceptar",
        });

      } catch (error) {
        console.log(error.response.data)
        dispatch(enviar_peticion_error(error));
      }
    };
  }
 
  const enviar_peticion_inicio = () => ({
    type: TRANSCUENTA,
    payload: true,
  });
  const enviar_peticion_exito = (token) => ({
    type: TRANSCUENTA_OK,
    payload: token,
  });
  const enviar_peticion_error = (error) => ({
    type: TRANSCUENTA_ERROR,
    payload: error,
  });
    