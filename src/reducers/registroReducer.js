import {
  REGISTER_DOCUMENTO,
  REGISTER_DOCUMENTO_OK,
  REGISTER_DOCUMENTO_ERROR,
  CREATE_PROFILE,
  CREATE_PROFILE_OK,
  CREATE_PROFILE_ERROR,
} from "../types/index";

const initialState = {
  isLoading: false,
  profile: false,
  profile_error: "",
  register_validando: false,
  register_valid: {},
  register_error: {},
  listprovincia: [],
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_DOCUMENTO:
      return {
        ...state,
        register_validando: false,
      };
    case REGISTER_DOCUMENTO_OK:
      return {
        ...state,
        register_valid: action.payload,
        register_validando: true,
      };
    case REGISTER_DOCUMENTO_ERROR:
      return {
        ...state,
        register_error: action.payload,
        register_validando: true,
      };
    case CREATE_PROFILE:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_PROFILE_OK:
      return {
        ...state,
        profileinfo: action.payload,
        profile:true,
        isLoading: false,
      };
    case CREATE_PROFILE_ERROR:
      return {
        ...state,
        profile_error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
}
