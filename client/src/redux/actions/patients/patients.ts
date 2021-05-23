import {
  GET_PATIENTS_REQUEST,
  GET_PATIENTS_SUCCESS,
  GET_PATIENTS_FAIL,
  GetPatientsActionTypes,
} from "../../types/patients/patients";
import { IPatient } from "../../types/patients/patients";
import { Dispatch } from "redux";
import axios from "axios";
import store from "../../store";
import { setAlert } from "../alert";

export const getPatients =
  () => async (dispatch: Dispatch<GetPatientsActionTypes>) => {
    dispatch({ type: GET_PATIENTS_REQUEST });

    try {
      const res = await axios.get("http://localhost:5000/patients");
      const payload: IPatient[] = res.data;

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
