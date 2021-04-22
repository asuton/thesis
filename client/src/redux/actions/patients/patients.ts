import {
  GET_PATIENTS_REQUEST,
  GET_PATIENTS_SUCCESS,
  GET_PATIENTS_FAIL,
  GetPatientsActionTypes,
} from "../../types/patients/patients";
import { IPatient } from "../../types/patients/patients";
import { Dispatch } from "redux";
import axios from "axios";

export const getPatients = () => async (
  dispatch: Dispatch<GetPatientsActionTypes>
) => {
  dispatch({ type: GET_PATIENTS_REQUEST });

  try {
    const res = await axios.get("http://localhost:5000/patients");
    const payload: IPatient[] = res.data;

    dispatch({
      type: GET_PATIENTS_SUCCESS,
      payload: payload,
    });
  } catch (err) {
    dispatch({
      type: GET_PATIENTS_FAIL,
      payload: err,
    });
  }
};
