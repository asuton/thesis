import { IAuth } from "./user";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const LOGOUT = "LOGOUT";

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

export type LoginActiontypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailAction
  | LogoutAction;

export type LoginState = {
  loggingIn?: boolean;
  loggedIn?: boolean;
  user?: IAuth;
  error?: any;
};
