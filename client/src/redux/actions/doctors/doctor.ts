import {
  GET_DOCTOR_REQUEST,
  GET_DOCTOR_SUCCESS,
  GET_DOCTOR_FAIL,
  GetDoctorActionTypes,
} from "../../types/doctors/doctor";
import { IDoctor } from "../../types/doctors/doctor";
import { Dispatch } from "redux";
import axios from "axios";
import store from "../../store";
import { setAlert } from "../alert";

export const getDoctorById =
  (id: string) => async (dispatch: Dispatch<GetDoctorActionTypes>) => {
    dispatch({ type: GET_DOCTOR_REQUEST });

    try {
      const res = await axios.get(`http://localhost:5000/doctors/${id}`);
      const payload: IDoctor = res.data;

      dispatch({
        type: GET_DOCTOR_SUCCESS,
        payload: payload,
      });
    } catch (err) {
      const errors = err.response?.data.error;

      dispatch({
        type: GET_DOCTOR_FAIL,
        payload: errors ? errors : err,
      });

      if (errors) {
        errors.forEach((error: any) => {
          store.dispatch(setAlert(error.msg, "error"));
        });
      }
    }
  };
