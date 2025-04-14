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
 
const initialState = {
  uepapayLoading: false,
  uepapayConfirmationLoading: false,
  peticion: {
    url: "",
  },
  confirmation: {
    uepapay: {
      cuenta: "",
      monto: 0,
      fee: 0,
      total: 0,
      comentario: "",
      authorizationcode: "",
      ordernumberuepapay: "",
      cardnumber: "",
      url: "",
      status: "",
    },
  },
  suscripcion:{
    url: ""
  },
  mensaje: "",
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case UEPAPAY:
      return {
        ...state,
        uepapayLoading: action.payload,
        mensaje: "",
      };
    case UEPAPAY_OK:
      return {
        ...state,
        uepapayLoading: false,
        peticion: action.payload,
      };
    case UEPAPAY_ERROR:
      return {
        ...state,
        error: action.payload,
        uepapayLoading: false,
        mensaje: action.payload.response.status,
      };

    case UEPAPAYGET:
      return {
        ...state,
        uepapayConfirmationLoading: action.payload,
        mensaje: "",
      };
    case UEPAPAYGET_OK:
      return {
        ...state,
        uepapayConfirmationLoading: false,
        confirmation: action.payload,
      };

    case UEPAPAYGET_ERROR:
      return {
        ...state,
        error: action.payload,
        uepapayConfirmationLoading: false,
        mensaje: action.payload.response.status,
      };


    //

    case SUSCRIPCION:
      return {
        ...state,
        uepapaySuscripcionLoading: action.payload,
        mensaje: "",
      };
    case SUSCRIPCION_OK:
      return {
        ...state,
        uepapaySuscripcionLoading: false,
        suscripcion: action.payload,
      };

    case SUSCRIPCION_ERROR:
      return {
        ...state,
        error: action.payload,
        uepapaySuscripcionLoading: false,
        mensaje: action.payload.response.status,
      };

    default:
      return state;
  }
}
