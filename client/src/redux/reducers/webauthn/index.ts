import {
  WEBAUTHN_REGISTER_REQUEST,
  WEBAUTHN_REGISTER_SUCCESS,
  WEBAUTHN_REGISTER_FAIL,
  WEBAUTHN_LOGIN_REQUEST,
  WEBAUTHN_LOGIN_SUCCESS,
  WEBAUTHN_LOGIN_FAIL,
  WEBAUTHN_RESPONSE_REQUEST,
  WEBAUTHN_RESPONSE_FAIL,
  WEBAUTHN_SESSION_REQUEST,
  WEBAUTHN_SESSION_SUCCESS,
  WEBAUTHN_SESSION_FAIL,
  WebAuthnState,
  WebAuthnActionTypes,
} from "../../types/webauthn";

const initState: WebAuthnState = {
  isAuthenticated: false,
};

const webAuthnReducer = (
  state = initState,
  action: WebAuthnActionTypes
): WebAuthnState => {
  switch (action.type) {
    case WEBAUTHN_REGISTER_REQUEST:
    case WEBAUTHN_LOGIN_REQUEST:
    case WEBAUTHN_RESPONSE_REQUEST:
    case WEBAUTHN_SESSION_REQUEST:
      return {
        apiCall: true,
        isAuthenticated: state.isAuthenticated,
      };
    case WEBAUTHN_REGISTER_SUCCESS:
    case WEBAUTHN_LOGIN_SUCCESS:
    case WEBAUTHN_SESSION_SUCCESS:
      return {
        isAuthenticated: true,
      };
    case WEBAUTHN_REGISTER_FAIL:
    case WEBAUTHN_LOGIN_FAIL:
    case WEBAUTHN_RESPONSE_FAIL:
    case WEBAUTHN_SESSION_FAIL:
      return {
        errors: action.payload,
        isAuthenticated: state.isAuthenticated,
      };
    default:
      return state;
  }
};

export default webAuthnReducer;
