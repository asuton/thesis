import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  AuthActionTypes,
  RegisterFormState,
} from "../../types/auth";
import { IAuth } from "../../types/auth/user";
import { Dispatch } from "redux";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import store from "../../store";
import { config } from "../../types/config";
import { setAlert } from "../alert";
import { checkWebAuthnSession, getMakeCredChallenge } from "../webauthn";

export const register =
  (form: RegisterFormState) => async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({
      type: REGISTER_REQUEST,
    });

    const body = JSON.stringify(form);

    try {
      const res = await axios.post(
        "http://localhost:5000/patients",
        body,
        config
      );
      const payload: IAuth = res.data;
      dispatch({
        type: REGISTER_SUCCESS,
        payload: payload,
      });
      setAuthToken(payload.token);
      await store.dispatch(loadUser());
    } catch (err) {
      const errors = err.response?.data.error;

      dispatch({
        type: REGISTER_FAIL,
        payload: errors ? errors : err,
      });

      if (errors) {
        errors.forEach((error: any) => {
          store.dispatch(setAlert(error.msg, "error"));
        });
      }
    }
  };

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

export const loadUser = () => async (dispatch: Dispatch<AuthActionTypes>) => {
  const storage = localStorage.getItem("user");

  if (storage) {
    const user: IAuth = JSON.parse(storage);
    setAuthToken(user.token);
  }

  try {
    const res = await axios.get("http://localhost:5000/login/auth");
    const payload: IAuth = res.data;

    dispatch({
      type: USER_LOADED,
      payload: payload,
    });
    if (payload.webAuthnRegistered)
      await store.dispatch(checkWebAuthnSession());
  } catch (err) {
    const errors = err.response?.data.error;
    dispatch({
      type: AUTH_ERROR,
      payload: errors ? errors : err,
    });
    if (errors) {
      errors.forEach((error: any) => {
        store.dispatch(setAlert(error.msg, "error"));
      });
    }
  }
};
