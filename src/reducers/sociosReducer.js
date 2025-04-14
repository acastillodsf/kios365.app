import {
  CONSULTA_SOCIO_INICIO,
  CONSULTA_SOCIO_EXITO,
  CONSULTA_SOCIO_ERROR,
  CONSULTA_LISTSOCIO_INICIO,
  CONSULTA_LISTSOCIO_EXITO,
  CONSULTA_LISTSOCIO_ERROR,
  UPDATE_SOCIO_INICIO,
  UPDATE_SOCIO_EXITO,
  UPDATE_SOCIO_ERROR,
  CREAR_CUENTA_INICIO,
  CREAR_CUENTA_EXITO,
  CREAR_CUENTA_ERROR,
  CREAR_CUENTA_LIMPIAR,
  LIST_CUENTA_SOCIO,
  LIST_CUENTA_SOCIO_OK,
  LIST_CUENTA_SOCIO_ERROR
} from "../types/index";

const initialState = {
  cargando: false,
  cargandolista: false,
  update: false,
  create: false,
  error: "",
  socios: [],
  perfil: [],
  estado: [],
  listCuenta: []
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case CONSULTA_LISTSOCIO_INICIO:
      return {
        ...state,
        action: action.payload,
        cargandolista: false,
        cargando: false,
        create:false
      };
    case CONSULTA_LISTSOCIO_EXITO:
      return {
        ...state,
        listsocios: action.payload,
        cargandolista: false,
        cargando: false,
      };
    case CONSULTA_LISTSOCIO_ERROR:
      return {
        ...state,
        error: action.payload,
        cargandolista: false,
        cargando: false,
      };

    case CONSULTA_SOCIO_INICIO:
      return {
        ...state,
        cargando: action.payload,
        update: false,
      };
    case CONSULTA_SOCIO_EXITO:
      return {
        ...state,
        socios: action.payload,
        cargando: false,
      };
    case CONSULTA_SOCIO_ERROR:
      return {
        ...state,
        error: action.payload,
        cargando: false,
      };

    case UPDATE_SOCIO_INICIO:
      return {
        ...state,
        cargando: action.payload,
        update: false,
      };
    case UPDATE_SOCIO_EXITO:
      return {
        ...state,
        updatesocios: action.payload,
        cargando: false,
        update: true,
      };
    case UPDATE_SOCIO_ERROR:
      return {
        ...state,
        error: action.payload,
        cargando: false,
        update: false,
      };


    case CREAR_CUENTA_INICIO:
      return {
        ...state,
        create: action.payload,
      };
    case CREAR_CUENTA_EXITO:
      return {
        ...state,
        createAccount: action.payload,
        create:true
      };
    case CREAR_CUENTA_ERROR:
      return {
        ...state,
        error: action.payload,
        create: false,
      };

    case CREAR_CUENTA_LIMPIAR :
      return {
        ...state,
        create: false
      };

    //
    case LIST_CUENTA_SOCIO:
      return {
        ...state,
        listando: action.payload,
      };
    case LIST_CUENTA_SOCIO_OK:
      return {
        ...state,
        listCuenta: action.payload,
      };
    case LIST_CUENTA_SOCIO_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
