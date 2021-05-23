import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AuthActionTypes,
} from "../../types/auth/";
import { IAuth } from "../../types/auth/user";
import { Dispatch } from "redux";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import store from "../../store";
import { loadUser } from "./loadUser";
import { config } from "../../types/config";
import { setAlert } from "../alert";

export const login =
  ({ email, password }: { email: string; password: string }) =>
  async (dispatch: Dispatch<AuthActionTypes>) => {
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
      window.location.reload();
    } catch (err) {
      const errors = err.response?.data.error;

      dispatch({
        type: LOGIN_FAIL,
        payload: errors ? errors : err,
      });

      if (errors) {
        errors.forEach((error: any) => {
          store.dispatch(setAlert(error.msg, "error"));
        });
      }
    }
  };

export const logout = () => async (dispatch: Dispatch<AuthActionTypes>) => {
  try {
    dispatch({ type: LOGOUT });
    const res = await axios.get("http://localhost:5000/login/logout", config);
    window.location.reload();
  } catch (err) {
    const errors = err.response?.data.error;
    if (errors) {
      errors.forEach((error: any) => {
        store.dispatch(setAlert(error.msg, "error"));
      });
    }
  }
};
