import {
    ESTADO_CUENTA_GET,
    ESTADO_CUENTA_GET_OK,
    ESTADO_CUENTA_GET_ERROR,
    ESTADO_CUENTA_POST,
    ESTADO_CUENTA_POST_OK,
    ESTADO_CUENTA_POST_ERROR
  } from "../types/index";
  
 
  const initialState = {
    cargando: false,
    cargado: false,
    error: "",
    consulta: {
      datos:{
        socio: 0,
        nombres : ""
      },
      cuentas:[]
    },
    cargadoEstado:false,
    cargadonEstado:false,
    consultaEstado : {
      cuenta:"",
      tipo:"",
      producto:"",
      divisa:"",
      tipocuenta:0,
      isocio:0,
      inombre:"",
      tipoidentidad:"",
      cedula:"",
      informacion:{
        
      }
    },
    consultaTransacciones:[]
  };
  // eslint-disable-next-line import/no-anonymous-default-export
  export default function (state = initialState, action) {
    switch (action.type) {
      case ESTADO_CUENTA_GET:
        return {
          ...state,
          cargando: action.payload,
        };
      case ESTADO_CUENTA_GET_OK:
        return {
          ...state,
          consulta: action.payload,
          cargado: true,
          cargando: false,
        };
  
      case ESTADO_CUENTA_GET_ERROR:
        return {
          ...state,
          error: action.payload,
          cargado: false,
          
        };

 
        case ESTADO_CUENTA_POST:
          return {
            ...state,
            cargandoEstado: action.payload,
            cargadoEstado: false,
          };
        case ESTADO_CUENTA_POST_OK:
          return {
            ...state,
            consultaEstado: action.payload,
            cargadoEstado: true,
            cargandoEstado: false,
          };
    
        case ESTADO_CUENTA_POST_ERROR:
          return {
            ...state,
            error: action.payload,
            cargadoEstado: false,
            cargandoEstado: false,
          };

      default:
        return state;
    }
  }
  