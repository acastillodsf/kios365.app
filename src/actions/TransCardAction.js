import clienteAxios from "src/config/axios";

export function getSettingTranscard() {
    return async (dispatch) => {
      dispatch({
        type: "TRANSCARD"
      });
      try {
        const peticion = await clienteAxios.get(`TransCardConfig`);
        dispatch({
            type: "TRANSCARD_SETTING",
            payload : peticion.data
          });
      } catch (error) {
        dispatch({
            type: "TRANSCARD_ERROR",
            payload : error
          });
      }
    };
  }

 

  export function getTransCardConfirmacion(id) {
    return async (dispatch) => {
      dispatch({
        type: "TRANSCARD"
      });
      try {
        const peticion = await clienteAxios.get(`/carnet/verificacion`,{
          params : {
            orden: id 
          }
        });
        dispatch({
            type: "TRANSCARD_CONSULT",
            payload : peticion.data
          });
      } catch (error) {
        dispatch({
            type: "TRANSCARD_ERROR",
            payload : error
          });
      }
    };
  }