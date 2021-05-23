import {
  GET_PATIENT_REQUEST,
  GET_PATIENT_SUCCESS,
  GET_PATIENT_FAIL,
  GetPatientActionTypes,
} from "../../types/patients/patient";
import { IPatient } from "../../types/patients/patient";
import { Dispatch } from "redux";
import axios from "axios";
import store from "../../store";
import { setAlert } from "../alert";

export const getPatientById =
  (id: string) => async (dispatch: Dispatch<GetPatientActionTypes>) => {
    dispatch({ type: GET_PATIENT_REQUEST });

    try {
      const res = await axios.get(`http://localhost:5000/patients/${id}`);
      const payload: IPatient = res.data;

      dispatch({
        type: GET_PATIENT_SUCCESS,
        payload: payload,
      });
    } catch (err) {
      const errors = err.response?.data.error;

      dispatch({
        type: GET_PATIENT_FAIL,
        payload: errors ? errors : err,
      });

      if (errors) {
        errors.forEach((error: any) => {
          store.dispatch(setAlert(error.msg, "error"));
        });
      }
    }
  };
