import {
  GET_DOCTORS_REQUEST,
  GET_DOCTORS_SUCCESS,
  GET_DOCTORS_FAIL,
  GetDoctorsActionTypes,
} from "../../types/doctors/doctors";
import { IDoctor } from "../../types/doctors/doctors";
import { Dispatch } from "redux";
import axios from "axios";
import store from "../../store";
import { setAlert } from "../alert";

export const getDoctors =
  () => async (dispatch: Dispatch<GetDoctorsActionTypes>) => {
    dispatch({ type: GET_DOCTORS_REQUEST });

    try {
      const res = await axios.get("http://localhost:5000/doctors");
      const payload: IDoctor[] = res.data;

      dispatch({
        type: GET_DOCTORS_SUCCESS,
        payload: payload,
      });
    } catch (err) {
      const errors = err.response?.data.error;

      dispatch({
        type: GET_DOCTORS_FAIL,
        payload: errors ? errors : err,
      });

      if (errors) {
        errors.forEach((error: any) => {
          store.dispatch(setAlert(error.msg, "error"));
        });
      }
    }
  };
