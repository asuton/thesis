import { USER_LOADED, AUTH_ERROR, AuthActionTypes } from "../../types/auth/";
import { IAuth } from "../../types/auth/user";
import { Dispatch } from "redux";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import store from "../../store";
import { setAlert } from "../alert";

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
