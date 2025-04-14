import clienteAxios from "src/config/axios";

export function getSetting() {
    return async (dispatch) => {
      dispatch({
        type: "APP_INIT"
      });
      try {
        const peticion = await clienteAxios.get(`/setting`);
        dispatch({
            type: "APP_SETTING",
            payload : peticion.data
          });
      } catch (error) {
        dispatch({
            type: "APP_ERROR",
            payload : error
          });
      }
    };
  }