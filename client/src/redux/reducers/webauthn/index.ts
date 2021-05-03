import {
  WEBAUTHN_REGISTER_REQUEST,
  WEBAUTHN_REGISTER_SUCCESS,
  WEBAUTHN_REGISTER_FAIL,
  WEBAUTHN_LOGIN_REQUEST,
  WEBAUTHN_LOGIN_SUCCESS,
  WEBAUTHN_LOGIN_FAIL,
  WEBAUTH_RESPONSE_REQUEST,
  WEBAUTH_RESPONSE_SUCCESS,
  WEBAUTH_RESPONSE_FAIL,
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
    case WEBAUTH_RESPONSE_REQUEST:
      return {
        apiCall: true,
      };
    case WEBAUTHN_REGISTER_SUCCESS:
    case WEBAUTHN_LOGIN_SUCCESS:
    case WEBAUTH_RESPONSE_SUCCESS:
      return {
        isAuthenticated: true,
      };
    case WEBAUTHN_REGISTER_FAIL:
    case WEBAUTHN_LOGIN_FAIL:
    case WEBAUTH_RESPONSE_FAIL:
      return {
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default webAuthnReducer;
