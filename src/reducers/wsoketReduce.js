const initialState = {
  kioscos: [],
  pantallas: [],
  usuarios: [],
  conexiones: [],
  tiket: [],
  terminal: {
    show: false,
    sucursal: 0,
    departamento: '',
    puesto: '',
    params: {
      sucursal: [],
      departamento: [],
      puesto: []
    },
    conexion: null,
    socket: null,

  },
  agente: {
    estado: 'Disponible',
    turnos: [],
    atendiendo: {
      turno_id: 0,
      turno: "",
      tramite: "",
      tiempo: ""
    },
    estadistica: {
      cola: 0,
      anulado: 0,
      pausado: 0,
      atendido: 0
    }
  },
  ticketModal: {
    show: false,
    estado: ''
  },
  empresa: {

  }
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {

  console.log('action', action)
  switch (action.type) {
    case 'ModalTicket':
      return {
        ...state,
        ticketModal: {
          ...action.payload
        }
      };
    case "ws->update":
      const payload = action.payload;
      return {
        ...state,
        ...payload
      };

    case "UPDATE_AGENTE":
      return {
        ...state,
        agente: {
          ...state.agente,
          estado: action.payload.estado || 'Disponible',
          turnos: action.payload.turnos || [],
          atendiendo: action.payload.atendiendo || [],
          estadistica: action.payload.estadistica || {}
        }
      };

    case "UNAUTHORIZED-TERMINAL":
      return {
        ...state,
        terminal: action.payload
      };
    case "UPDATE->TERMINAL":
      return {
        ...state,
        terminal: {
          ...state.terminal,
          ...action.payload
        }
      };

    case "EDIT->TERMINAL":
      return {
        ...state,
        terminal: {
          ...state.terminal,
          show: true
        }
      };

    case "SETTING_OK":
      return {
        ...state,
        empresa: action.payload
      };
    case "connection_established":
      return {
        ...state,
        socket: action.payload.ws

      };


    default:
      return state;
  }
}
