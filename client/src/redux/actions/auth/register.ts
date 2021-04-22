import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  RegisterActionTypes,
} from "../../types/auth/register";
import { IAuth } from "../../types/auth/user";
import { config } from "../../types/config";
import { Dispatch } from "redux";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import store from "../../store";
import { loadUser } from "./loadUser";

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

export const register = (form: RegisterFormState) => async (
  dispatch: Dispatch<RegisterActionTypes>
) => {
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
    store.dispatch(loadUser());
    window.location.reload();
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: REGISTER_FAIL,
      payload: errors,
    });
  }
};
