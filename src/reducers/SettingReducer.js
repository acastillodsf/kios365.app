  const initialState = {
    inicializado: false,
    error: "",
    statusCode : "200",
    settingApp: {},
    mensaje:null,
  };
  // eslint-disable-next-line import/no-anonymous-default-export
  export default function (state = initialState, action) {
  
    switch (action.type) {
      case 'APP_INIT':
        return {
          ...state,
          inicializado: false,
          statusCode : "000"
        };
      case 'APP_SETTING':
        return {
          ...state,
          settingApp: action.payload,
          inicializado: true,
          statusCode : "200"
        };
       
      case 'APP_ERROR':
        return {
          ...state,
          error: action.payload.response.data,
          statusCode : action.payload.response.status,
          inicializado: false,
        };
      default:
        return state;
    }
  }
  