const initialState = {
  Iniciando: false,
  TransCard: false,
  TransCardConfig: {},
  TransCardUserData: {},
  TransConfirmacion: {},
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case "TRANSCARD":
      return {
        ...state,
        Iniciando: true,
      };
    case "TRANSCARD_SETTING":
      return {
        ...state,
        Iniciando: false,
        TransCard: action.payload.TransCard,
        TransCardConfig: action.payload.TransCardConfig,
        TransCardUserData: action.payload.TransCardUserData,
      };
    case "TRANSCARD_CONSULT":
      console.log(action.payload)
      return {
        ...state,
        Iniciando: false,
        TransConfirmacion: action.payload,

      };

    case "TRANSCARD_ERROR":
      return {
        ...state,
        error: action.payload.response.data,
        statusCode: action.payload.response.status,
        Iniciando: false,
      };
    default:
      return state;
  }
}
