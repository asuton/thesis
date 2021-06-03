import {
  GET_DOCTOR_REQUEST,
  GET_DOCTOR_SUCCESS,
  GET_DOCTOR_FAIL,
  DoctorActionTypes,
  GET_DOCTORS_REQUEST,
  GET_DOCTORS_SUCCESS,
  GET_DOCTORS_FAIL,
  IPutDoctorForm,
  PUT_DOCTOR_REQUEST,
  PUT_DOCTOR_SUCCESS,
  PUT_DOCTOR_FAIL,
  IPostDoctorForm,
  POST_DOCTOR_REQUEST,
  POST_DOCTOR_SUCCESS,
  POST_DOCTOR_FAIL,
} from "../../types/doctor";
import { IDoctor, IDoctors } from "../../types/doctor";
import { Dispatch } from "redux";
import axios from "axios";
import store from "../../store";
import { setAlert } from "../alert";
import { config } from "../../types/config";

export const getDoctorById =
  (id: string) => async (dispatch: Dispatch<DoctorActionTypes>) => {
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

export const getDoctors =
  () => async (dispatch: Dispatch<DoctorActionTypes>) => {
    dispatch({ type: GET_DOCTORS_REQUEST });

    try {
      const res = await axios.get("http://localhost:5000/doctors");
      const payload: IDoctors[] = res.data;

      dispatch({
        type: GET_DOCTORS_SUCCESS,
        payload: payload,
      });
    } catch (err) {
      const errors = err.response?.data.error;

      dispatch({
        type: GET_DOCTORS_FAIL,
        payload: errors ? errors : err,
      });

      if (errors) {
        errors.forEach((error: any) => {
          store.dispatch(setAlert(error.msg, "error"));
        });
      }
    }
  };

export const putDoctor =
  (id: string, form: IPutDoctorForm) =>
  async (dispatch: Dispatch<DoctorActionTypes>) => {
    dispatch({ type: PUT_DOCTOR_REQUEST });

    try {
      const body = JSON.stringify(form);
      const res = await axios.put(
        `http://localhost:5000/doctors/${id}`,
        body,
        config
      );
      const payload: IDoctor = res.data;

      dispatch({
        type: PUT_DOCTOR_SUCCESS,
        payload: payload,
      });

      store.dispatch(setAlert("Account successfully updated", "success"));
    } catch (err) {
      const errors = err.response?.data.error;

      dispatch({
        type: PUT_DOCTOR_FAIL,
        payload: errors ? errors : err,
      });

      if (errors) {
        errors.forEach((error: any) => {
          store.dispatch(setAlert(error.msg, "error"));
        });
      }
    }
  };

export const postDoctor =
  (form: IPostDoctorForm, history: any) =>
  async (dispatch: Dispatch<DoctorActionTypes>) => {
    dispatch({ type: POST_DOCTOR_REQUEST });

    try {
      const body = JSON.stringify(form);
      const res = await axios.post(
        `http://localhost:5000/doctors`,
        body,
        config
      );
      const payload: IDoctor = res.data;

      dispatch({
        type: POST_DOCTOR_SUCCESS,
        payload: payload,
      });

      store.dispatch(setAlert("Doctor successfully created", "success"));
      history.push("/doctors");
    } catch (err) {
      const errors = err.response?.data.error;

      dispatch({
        type: POST_DOCTOR_FAIL,
        payload: errors ? errors : err,
      });

      if (errors) {
        errors.forEach((error: any) => {
          store.dispatch(setAlert(error.msg, "error"));
        });
      }
    }
  };
