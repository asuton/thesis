import {
  GET_PATIENT_REQUEST,
  GET_PATIENT_SUCCESS,
  GET_PATIENT_FAIL,
  PatientActionTypes,
  GET_PATIENTS_REQUEST,
  GET_PATIENTS_SUCCESS,
  GET_PATIENTS_FAIL,
  PUT_PATIENT_REQUEST,
  PUT_PATIENT_SUCCESS,
  PUT_PATIENT_FAIL,
  IPutPatientForm,
} from "../../types/patient";
import { IPatient, IPatients } from "../../types/patient";
import { Dispatch } from "redux";
import axios from "axios";
import store from "../../store";
import { setAlert } from "../alert";
import { config } from "../../types/config";

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

export const putPatient =
  (id: string, form: IPutPatientForm) =>
  async (dispatch: Dispatch<PatientActionTypes>) => {
    dispatch({ type: PUT_PATIENT_REQUEST });

    try {
      const body = JSON.stringify(form);
      const res = await axios.put(
        `http://localhost:5000/patients/${id}`,
        body,
        config
      );
      const payload: IPatient = res.data;

      dispatch({
        type: PUT_PATIENT_SUCCESS,
        payload: payload,
      });

      store.dispatch(setAlert("Account updated successfully", "success"));
    } catch (err) {
      const errors = err.response?.data.error;

      dispatch({
        type: PUT_PATIENT_FAIL,
        payload: errors ? errors : err,
      });

      if (errors) {
        errors.forEach((error: any) => {
          store.dispatch(setAlert(error.msg, "error"));
        });
      }
    }
  };
