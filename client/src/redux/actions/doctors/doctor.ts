import {
  GET_DOCTOR_REQUEST,
  GET_DOCTOR_SUCCESS,
  GET_DOCTOR_FAIL,
  GetDoctorActionTypes,
} from "../../types/doctors/doctor";
import { IDoctor } from "../../types/doctors/doctor";
import { Dispatch } from "redux";
import axios from "axios";

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
      dispatch({
        type: GET_DOCTOR_FAIL,
        payload: err,
      });
    }
  };
