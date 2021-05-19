export const WEBAUTHN_REGISTER_REQUEST = "WEBAUTHN_REGISTER_REQUEST";
export const WEBAUTHN_REGISTER_SUCCESS = "WEBAUTHN_REGISTER_SUCCESS";
export const WEBAUTHN_REGISTER_FAIL = "WEBAUTHN_REGISTER_FAIL";

export const WEBAUTHN_LOGIN_REQUEST = "WEBAUTHN_LOGIN_REQUEST";
export const WEBAUTHN_LOGIN_SUCCESS = "WEBAUTHN_LOGIN_SUCCESS";
export const WEBAUTHN_LOGIN_FAIL = "WEBAUTHN_LOGIN_FAIL";

export const WEBAUTHN_RESPONSE_REQUEST = "WEBAUTHN_RESPONSE_REQUEST";
export const WEBAUTHN_RESPONSE_FAIL = "WEBAUTHN_RESPONSE_FAIL";

export const WEBAUTHN_SESSION_REQUEST = "WEBAUTHN_SESSION_REQUEST";
export const WEBAUTHN_SESSION_SUCCESS = "WEBAUTHN_SESSION_SUCCESS";
export const WEBAUTHN_SESSION_FAIL = "WEBAUTHN_SESSION_FAIL";

export interface WebAuthnRegisterRequestAction {
  type: typeof WEBAUTHN_REGISTER_REQUEST;
}

export interface WebAuthnRegisterSuccessAction {
  type: typeof WEBAUTHN_REGISTER_SUCCESS;
}

export interface WebAuthnRegisterFailAction {
  type: typeof WEBAUTHN_REGISTER_FAIL;
  payload: any;
}

export interface WebAuthnLoginRequestAction {
  type: typeof WEBAUTHN_LOGIN_REQUEST;
}

export interface WebAuthnLoginSuccessAction {
  type: typeof WEBAUTHN_LOGIN_SUCCESS;
}

export interface WebAuthnLoginFailAction {
  type: typeof WEBAUTHN_LOGIN_FAIL;
  payload: any;
}

export interface WebauthnResponseRequestAction {
  type: typeof WEBAUTHN_RESPONSE_REQUEST;
}

export interface WebauthnResponseFailAction {
  type: typeof WEBAUTHN_RESPONSE_FAIL;
  payload: any;
}

export interface WebAuthnSessionRequestAction {
  type: typeof WEBAUTHN_SESSION_REQUEST;
}

export interface WebAuthnSessionSuccessAction {
  type: typeof WEBAUTHN_SESSION_SUCCESS;
  payload: any;
}

export interface WebAuthnSessionFailAction {
  type: typeof WEBAUTHN_SESSION_FAIL;
  payload: any;
}

export type WebAuthnActionTypes =
  | WebAuthnRegisterRequestAction
  | WebAuthnRegisterSuccessAction
  | WebAuthnRegisterFailAction
  | WebAuthnLoginRequestAction
  | WebAuthnLoginSuccessAction
  | WebAuthnLoginFailAction
  | WebauthnResponseRequestAction
  | WebauthnResponseFailAction
  | WebAuthnSessionRequestAction
  | WebAuthnSessionSuccessAction
  | WebAuthnSessionFailAction;

export type WebAuthnState = {
  apiCall?: boolean;
  credential?: any;
  isAuthenticated?: boolean;
  errors?: any;
};
