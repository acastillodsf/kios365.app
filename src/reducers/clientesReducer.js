import {
  CLIENTE_CONSULTA_INICIO,
  CLIENTE_CONSULTA_EXITOSA,
  CLIENTE_CONSULTA_ERROR,
  CLIENTE_UPDATE_INICIO,
  CLIENTE_UPDATE_EXITOSA,
  CLIENTE_UPDATE_ERROR,
} from "../types/index";

const initialState = {
  cargando: false,
  cargado: false,
  update: false,
  error: "",
  clientes: [
    {
      id: 0,
      nombre: "",
      authtoken: "",
      creado: "",
      actividad: "",
      activo: 0,
    },
  ],
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case CLIENTE_CONSULTA_INICIO:
      return {
        ...state,
        cargando: action.payload,
        update: false,
      };
    case CLIENTE_CONSULTA_EXITOSA:
      return {
        ...state,
        clientes: action.payload,
        cargado: true,
        cargando: false,
      };

    case CLIENTE_CONSULTA_ERROR:
      return {
        ...state,
        error: action.payload,
        cargado: false,
      };

    case CLIENTE_UPDATE_INICIO:
      return {
        ...state,
        cargando: action.payload,
        update: false,
      };
    case CLIENTE_UPDATE_EXITOSA:
      return {
        ...state,
        update: true,
        cargando: false,
      };

    case CLIENTE_UPDATE_ERROR:
      return {
        ...state,
        error: action.payload,
        cargado: false,
      };

    default:
      return state;
  }
}
