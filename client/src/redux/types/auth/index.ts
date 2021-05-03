import { IAuth } from "./user";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";

export const LOGOUT = "LOGOUT";

export interface RegisterRequestAction {
  type: typeof REGISTER_REQUEST;
}

export interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: IAuth;
}

export interface RegisterFailAction {
  type: typeof REGISTER_FAIL;
  payload: any;
}

export interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: IAuth;
}

export interface LoginFailAction {
  type: typeof LOGIN_FAIL;
  payload: any;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export interface UserLoadAction {
  type: typeof USER_LOADED;
  payload: IAuth;
}

export interface AuthErrorAction {
  type: typeof AUTH_ERROR;
  payload: IAuth;
}

export type AuthActionTypes =
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailAction
  | LogoutAction
  | UserLoadAction
  | AuthErrorAction;

export type AuthState = {
  isAuthenticated?: boolean;
  loading?: boolean;
  user?: IAuth;
  errors?: any;
};
