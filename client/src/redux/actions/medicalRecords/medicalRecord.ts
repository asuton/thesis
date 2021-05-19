import {
  GET_MEDICAL_RECORD_REQUEST,
  GET_MEDICAL_RECORD_SUCCESS,
  GET_MEDICAL_RECORD_FAIL,
  MedicalRecordActionTypes,
  POST_MEDICAL_RECORD_REQUEST,
  POST_MEDICAL_RECORD_FAIL,
  POST_MEDICAL_RECORD_SUCCESS,
} from "../../types/medicalRecords/medicalRecord";
import { IMedicalRecord } from "../../types/medicalRecords/medicalRecord";
import { MedicalRecordFormState } from "../../../components/MedicalRecordForm";
import { Dispatch } from "redux";
import axios from "axios";
import { config } from "../../types/config";

export const getMedicalRecord =
  (id: string, patId: string) =>
  async (dispatch: Dispatch<MedicalRecordActionTypes>) => {
    dispatch({ type: GET_MEDICAL_RECORD_REQUEST });

    try {
      const res = await axios.get(
        `http://localhost:5000/patients/${patId}/records/${id}`
      );
      const payload: IMedicalRecord = res.data;

      dispatch({
        type: GET_MEDICAL_RECORD_SUCCESS,
        payload: payload,
      });
    } catch (err) {
      dispatch({
        type: GET_MEDICAL_RECORD_FAIL,
        payload: err,
      });
    }
  };

export const postMedicalRecord =
  (form: MedicalRecordFormState, id: string) =>
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
    } catch (err) {
      dispatch({ type: POST_MEDICAL_RECORD_FAIL, payload: err });
    }
  };
