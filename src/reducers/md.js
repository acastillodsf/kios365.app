const initialState = {
  sucursal: {
    show: false,
    data: {
      beneficiario: 0,
      banco: "Cooperativa",
      cuenta: "",
      cuentatipo: "",
      moneda: "",
      documento: "",
      documentotipo: "",
      nombre: ""
    },
  },
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case "SUCURSAL_CLOSED":
      return {
        ...state,
        sucursal: {
          ...state.sucursal,
          show: false,
        }
      };
    case "SUCURSAL_EDIT":
      return {
        ...state,
        sucursal: {
          show: true,
          data: action.payload
        }
      };


    case "SETTING_SAVE_SUCURSAL_OK":
      return {
        ...state,
        sucursal: {
          ...state.sucursal,
          show: false,
        }
      };
    default:
      return state;
  }
}
