import {
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AuthState,
  AuthActionTypes,
} from "../../types/auth/";
import { IAuth } from "../../types/auth/user";

let payload: IAuth | null = null;
const user: string | null = localStorage.getItem("user");
payload = user ? JSON.parse(user) : null;

const initialState: AuthState = payload
  ? { isAuthenticated: true, user: payload }
  : { isAuthenticated: false };

const AuthReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return {
        loading: true,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        isAuthenticated: true,
        user: action.payload,
      };
    case USER_LOADED:
      return {
        isAuthenticated: true,
        user: action.payload,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
      return {
        errors: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem("user");
      return {
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;
