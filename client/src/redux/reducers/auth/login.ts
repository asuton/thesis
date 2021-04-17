import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LoginActiontypes,
  LoginState,
} from "../../types/auth/login";
import { IAuth } from "../../types/auth/user";

let payload: IAuth | null = null;
const user: string | null = localStorage.getItem("user");
payload = user ? JSON.parse(user) : null;

const initiatlState: LoginState = payload
  ? { loggedIn: true, user: payload }
  : {};

const loginReducer = (
  state = initiatlState,
  action: LoginActiontypes
): LoginState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loggingIn: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        loggedIn: true,
        user: action.payload,
      };
    case LOGIN_FAIL:
      return {
        loggedIn: false,
        error: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem("user");
      return {
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default loginReducer;
