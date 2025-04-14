 

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import clienteAxios from "../config/axios";
import swal from "sweetalert";
// Comenzar inicio Sesion
export function getwallet() {
  return async (dispatch) => {
    dispatch({type: 'wallet->init'});
    try {
      const peticion = await clienteAxios.get("/carnet/tokenizacion/wallet");
      dispatch({type:'wallet',payload: peticion.data });
    } catch (error) {
      dispatch({type:'wallet-error',payload: error });
    }
  };
}
 
export function getwalletApi(id) {
  return async (dispatch) => {
    dispatch({type: 'wallet->init'});
    try {
      const peticion = await clienteAxios.get(`/carnet/tokenizacion/api/${id}/wallet`);
      dispatch({type:'wallet',payload: peticion.data });
    } catch (error) {
      dispatch({type:'wallet-error',payload: error });
    }
  };
}
export function wallet_DeleteProfile(id,PaymentProfileId) {
  return async (dispatch) => {
    dispatch({type: 'wallet->init'});
    try {
      const peticion = await clienteAxios.delete("/carnet/tokenizacion/wallet",{params: { id,PaymentProfileId }});
      dispatch({type:'wallet',payload: peticion.data });
    } catch (error) {
      dispatch({type:'wallet-error',payload: error });
    }
  };
}
export function wallet_Activate(token,code) {
  return async (dispatch) => {
    dispatch({type: 'wallet->Activate'});
    try {
      await clienteAxios.post("/carnet/tokenizacion/wallet/Active",{ token,code });
      dispatch({type: 'wallet->Activate->Success'});
      dispatch(getwallet());
    } catch (error) {
      console.log(error)
      swal({
        title : "Error en la Activacion",
        text : error.response.data
      })
      dispatch({type:'wallet-error',payload: error });
    }
  };
}

export function wallet_Purchase(data) {
  return async (dispatch) => {
    dispatch({type: 'wallet-Purchase->init'});
    try {
      const peticion = await clienteAxios.post("/carnet/tokenizacion/wallet/Purchase",data);
      dispatch({type:'wallet-Purchase',payload: peticion.data });

    } catch (error) {
      dispatch({type:'wallet-Purchase-error',payload: error });
    }
  };
}