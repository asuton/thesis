export const WEBAUTHN_REGISTER_REQUEST = "REGISTER_REQUEST";
export const WEBAUTHN_REGISTER_SUCCESS = "WEBAUTHN_REGISTER_SUCCESS";
export const WEBAUTHN_REGISTER_FAIL = "WEBAUTHN_REGISTER_FAIL";

export const WEBAUTHN_LOGIN_REQUEST = "WEBAUTHN_LOGIN_REQUEST";
export const WEBAUTHN_LOGIN_SUCCESS = "WEBAUTHN_LOGIN_SUCCESS";
export const WEBAUTHN_LOGIN_FAIL = "WEBAUTHN_LOGIN_FAIL";

export interface WebAuthnRegisterRequest {
  type: typeof WEBAUTHN_REGISTER_REQUEST;
}

export interface WebAuthnRegisterSuccess {
  type: typeof WEBAUTHN_REGISTER_SUCCESS;
}

export interface WebAuthnRegisterFail {
  type: typeof WEBAUTHN_REGISTER_FAIL;
  payload: any;
}

export interface WebAuthnLoginRequest {
  type: typeof WEBAUTHN_LOGIN_REQUEST;
}

export interface WebAuthnLoginSuccess {
  type: typeof WEBAUTHN_LOGIN_SUCCESS;
}

export interface WebAuthnLoginFail {
  type: typeof WEBAUTHN_LOGIN_FAIL;
  payload: any;
}

export type WebAuthnActionTypes =
  | WebAuthnRegisterRequest
  | WebAuthnRegisterSuccess
  | WebAuthnRegisterFail
  | WebAuthnLoginRequest
  | WebAuthnLoginSuccess
  | WebAuthnLoginFail;

export type WebAuthnState = {
  apiCall: boolean;
  credential: any;
  isLoggedIn: boolean;
  errors?: any;
};
