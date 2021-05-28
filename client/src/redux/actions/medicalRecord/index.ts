import {
  GET_MEDICAL_RECORD_REQUEST,
  GET_MEDICAL_RECORD_SUCCESS,
  GET_MEDICAL_RECORD_FAIL,
  MedicalRecordActionTypes,
  POST_MEDICAL_RECORD_REQUEST,
  POST_MEDICAL_RECORD_FAIL,
  POST_MEDICAL_RECORD_SUCCESS,
  IPutMedicalRecord,
  PUT_MEDICAL_RECORD_REQUEST,
  PUT_MEDICAL_RECORD_FAIL,
  PUT_MEDICAL_RECORD_SUCCESS,
  MedicalRecordFormState,
} from "../../types/medicalRecord";
import { IMedicalRecord } from "../../types/medicalRecord";
import { Dispatch } from "redux";
import axios from "axios";
import { config } from "../../types/config";
import store from "../../store";
import { setAlert } from "../alert";

export const getMedicalRecord =
  (id: string) => async (dispatch: Dispatch<MedicalRecordActionTypes>) => {
    dispatch({ type: GET_MEDICAL_RECORD_REQUEST });

    try {
      const res = await axios.get(
        `http://localhost:5000/patients/records/${id}`,
        config
      );
      const payload: IMedicalRecord = res.data;

      dispatch({
        type: GET_MEDICAL_RECORD_SUCCESS,
        payload: payload,
      });
    } catch (err) {
      const errors = err.response.data.error;
      dispatch({
        type: GET_MEDICAL_RECORD_FAIL,
        payload: errors,
      });
      if (errors) {
        errors.forEach((error: any) => {
          store.dispatch(setAlert(error.msg, "error"));
        });
      }
    }
  };

export const postMedicalRecord =
  (form: MedicalRecordFormState, id: string, history: any) =>
  async (dispatch: Dispatch<MedicalRecordActionTypes>) => {
    dispatch({ type: POST_MEDICAL_RECORD_REQUEST });
    try {
      const body = JSON.stringify(form);
      const res = await axios.post(
        `http://localhost:5000/patients/${id}/records`,
        body,
        config
      );

      dispatch({ type: POST_MEDICAL_RECORD_SUCCESS });

      store.dispatch(setAlert("Record successfully created", "success"));
      history.push(`/patients/${id}/`);
    } catch (err) {
      const errors = err.response?.data.error;

      dispatch({
        type: POST_MEDICAL_RECORD_FAIL,
        payload: errors ? errors : err,
      });

      if (errors) {
        errors.forEach((error: any) => {
          store.dispatch(setAlert(error.msg, "error"));
        });
      }
    }
  };

export const putMedicalRecord =
  (id: string, form: IPutMedicalRecord) =>
  async (dispatch: Dispatch<MedicalRecordActionTypes>) => {
    dispatch({ type: PUT_MEDICAL_RECORD_REQUEST });

    try {
      const body = JSON.stringify(form);
      const res = await axios.put(
        `http://localhost:5000/patients/records/${id}`,
        body,
        config
      );
      const payload: IMedicalRecord = res.data;

      dispatch({
        type: PUT_MEDICAL_RECORD_SUCCESS,
        payload: payload,
      });

      store.dispatch(
        setAlert("Medical record updated successfully", "success")
      );
    } catch (err) {
      const errors = err.response?.data.error;

      dispatch({
        type: PUT_MEDICAL_RECORD_FAIL,
        payload: errors ? errors : err,
      });

      if (errors) {
        errors.forEach((error: any) => {
          store.dispatch(setAlert(error.msg, "error"));
        });
      }
    }
  };
