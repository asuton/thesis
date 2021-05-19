import {
  GET_PATIENT_REQUEST,
  GET_PATIENT_SUCCESS,
  GET_PATIENT_FAIL,
  GetPatientActionTypes,
} from "../../types/patients/patient";
import { IPatient } from "../../types/patients/patient";
import { Dispatch } from "redux";
import axios from "axios";

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
      dispatch({
        type: GET_PATIENT_FAIL,
        payload: err,
      });
    }
  };
