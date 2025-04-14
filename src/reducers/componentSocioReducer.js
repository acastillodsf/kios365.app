import {
  SOCIOS_COMPONENT_INICIA,
  SOCIOS_COMPONENT_EXITOSA,
  SOCIOS_COMPONENT_ERROR,
} from "../types/index";

const initialState = {
  component_cargando: false,
  listPerfil: [],
  listEstados: [],
  listNacionalidades: [],
  listPais: [],
  listClasificacion: [],
  listNomina: [],
  listProvincia: [],
  listMunicipio: [],
  listProfesion: [],
  listEstadoCivil: [],
  listBancos: [],
  listTipoContacto: [],
  listParentesco: [],
  listAgentes: [],
  listProductos: [],
  listPrestamoTipoAmortizacion:[],
  listPrestamoFrecuencia:[],
  
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case SOCIOS_COMPONENT_INICIA:
      return {
        ...state,
        component_cargando: action.payload,
      };
    case SOCIOS_COMPONENT_EXITOSA:
      return {
        ...state,
        listPerfil: action.payload.listperfil,
        listEstados: action.payload.listEstados,
        listNacionalidades: action.payload.listNacionalidades,
        listPais: action.payload.listPais,
        listClasificacion: action.payload.listClasificacion,
        listNomina: action.payload.listNomina,
        listProvincia: action.payload.listProvincia,
        listMunicipio: action.payload.listMunicipio,
        listProfesion: action.payload.listProfesion,
        listEstadoCivil: action.payload.listEstadoCivil,
        listBancos: action.payload.listBancos,
        listTipoContacto: action.payload.listTipoContacto,
        listParentesco: action.payload.listParentesco,
        listAgentes: action.payload.listAgentes,
        listProductos: action.payload.listProductos,
        listPrestamoTipoAmortizacion: action.payload.listPrestamoTipoAmortizacion,
        listPrestamoFrecuencia:action.payload.listPrestamoFrecuencia,
        component_cargando: false,
      };
    case SOCIOS_COMPONENT_ERROR:
      return {
        ...state,
        error: action.payload,
        component_cargando: false,
      };

    default:
      return state;
  }
}
