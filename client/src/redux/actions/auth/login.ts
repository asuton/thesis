import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LoginActiontypes,
} from "../../types/auth/login";
import { IAuth } from "../../types/auth/user";
import { Dispatch } from "redux";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import store from "../../store";
import { loadUser } from "./loadUser";

export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => async (dispatch: Dispatch<LoginActiontypes>) => {
  dispatch({ type: LOGIN_REQUEST });

  const body = JSON.stringify({ email, password });
  const send = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("http://localhost:5000/login", body, send);
    const payload: IAuth = res.data;

    dispatch({
      type: LOGIN_SUCCESS,
      payload: payload,
    });

    setAuthToken(payload.token);
    store.dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err,
    });
  }
};

export const logout = () => (dispatch: Dispatch<LoginActiontypes>) => {
  dispatch({ type: LOGOUT });
};
