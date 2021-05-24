import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AuthActionTypes,
} from "../../types/auth/";
import { IAuth } from "../../types/auth/user";
import { config } from "../../types/config";
import { Dispatch } from "redux";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import store from "../../store";
import { loadUser } from "./loadUser";
import { setAlert } from "../alert";
import { getMakeCredChallenge } from "../webauthn";

interface RegisterFormState {
  name: string;
  surname: string;
  email: string;
  password: string;
  OIB: string;
  dateOfBirth: string;
  address: string;
  phone: string;
}

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
