import { IAuth } from "./user";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

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

export type RegisterActionTypes =
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailAction;

export type RegisterState = {
  registering?: boolean;
  registered?: boolean;
  error?: any;
};
