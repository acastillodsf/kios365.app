import {
  COMPROFILE,
  COMPROFILE_OK,
  COMPROFILE_ERROR
} from "../types/index";

const initialState = {
  consultando : false,
  consulta : {
    tipodocumento:'',
    documento:'',
    nombre:'',
    correo:''
  }
 

};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case COMPROFILE:
      return {
        ...state,
        consultando: action.payload,
      };
    case COMPROFILE_OK:
      return {
        ...state,
        consulta: action.payload,
        consultando: false,
      };
    
    case COMPROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        consultando: false,
        mensaje: action.payload.response.status,
      };
 

    default:
      return state;
  }
}
