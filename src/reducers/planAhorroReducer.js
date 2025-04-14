import {
  CUENTA_PLAN_GET,
  CUENTA_PLAN_GET_OK,
  CUENTA_PLAN_GET_ERROR,
  CUENTA_PLAN_POST,
  CUENTA_PLAN_POST_OK,
  CUENTA_PLAN_POST_ERROR,
} from "../types/index";

const initialState = {
  cuentaPlanConsulta: false,
  update: false,
  updateok: false,
  socio: 0,
  nombres: "",
  cuentas: [],
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case CUENTA_PLAN_GET:
      return {
        ...state,
        cuentaPlanConsulta: action.payload,
        update: false,
      };
    case CUENTA_PLAN_GET_OK:
      return {
        ...state,
        socio: action.payload.socio,
        nombres: action.payload.nombres,
        cuentas: action.payload.cuentas,
        cuentaPlanConsulta: false,
        update: false,
      };
    case CUENTA_PLAN_GET_ERROR:
      return {
        ...state,
        error: action.payload,
        cuentaPlanConsulta: false,
        update: false,
      };

    case CUENTA_PLAN_POST:
      return {
        ...state,
        update: action.payload,
        updateok: false,
      };
    case CUENTA_PLAN_POST_OK:
      return {
        ...state,
        update: true,
        updateok: true,
      };
    case CUENTA_PLAN_POST_ERROR:
      return {
        ...state,
        error: action.payload,
        update: false,
        updateok: false,
      };

    default:
      return state;
  }
}
