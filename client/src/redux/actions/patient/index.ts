import {
  GET_PATIENT_REQUEST,
  GET_PATIENT_SUCCESS,
  GET_PATIENT_FAIL,
  PatientActionTypes,
  GET_PATIENTS_REQUEST,
  GET_PATIENTS_SUCCESS,
  GET_PATIENTS_FAIL,
} from "../../types/patient";
import { IPatient, IPatients } from "../../types/patient";
import { Dispatch } from "redux";
import axios from "axios";
import store from "../../store";
import { setAlert } from "../alert";

export const getPatientById =
  (id: string) => async (dispatch: Dispatch<PatientActionTypes>) => {
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

export const getPatients =
  () => async (dispatch: Dispatch<PatientActionTypes>) => {
    dispatch({ type: GET_PATIENTS_REQUEST });

    try {
      const res = await axios.get("http://localhost:5000/patients");
      const payload: IPatients[] = res.data;

      dispatch({
        type: GET_PATIENTS_SUCCESS,
        payload: payload,
      });
    } catch (err) {
      const errors = err.response?.data.error;

      dispatch({
        type: GET_PATIENTS_FAIL,
        payload: errors ? errors : err,
      });

      if (errors) {
        errors.forEach((error: any) => {
          store.dispatch(setAlert(error.msg, "error"));
        });
      }
    }
  };
