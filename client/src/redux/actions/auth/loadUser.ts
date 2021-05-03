import { USER_LOADED, AUTH_ERROR, AuthActionTypes } from "../../types/auth/";
import { IAuth } from "../../types/auth/user";
import { Dispatch } from "redux";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

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
    dispatch({
      type: AUTH_ERROR,
      payload: err,
    });
  }
};
