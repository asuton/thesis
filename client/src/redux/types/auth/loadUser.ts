import { IAuth } from "./user";

export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";

export interface UserLoadAction {
  type: typeof USER_LOADED;
  payload: IAuth;
}

export interface AuthErrorAction {
  type: typeof AUTH_ERROR;
  payload: IAuth;
}

export type UserActionTypes = UserLoadAction | AuthErrorAction;

export type UserState = {
  isAuthenticated?: boolean;
  loading?: boolean;
  user?: IAuth;
  error?: any;
};
