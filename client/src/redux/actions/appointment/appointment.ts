import {
  GET_TAKEN_APPOINTMENTS_REQUEST,
  GET_TAKEN_APPOINTMENTS_SUCCESS,
  GET_TAKEN_APPOINTMENTS_FAIL,
  AppointmentActionTypes,
  IAppointment,
  POST_APPOINTMENT_SUCCESS,
  POST_APPOINTMENT_FAIL,
  POST_APPOINTMENT_REQUEST,
  IAppointmentForm,
  GET_APPOINTMENTS_REQUEST,
  GET_APPOINTMENTS_SUCCESS,
  GET_APPOINTMENTS_FAIL,
  IGetAppointment,
  DELETE_APPOINTMENT_REQUEST,
  DELETE_APPOINTMENT_FAIL,
  DELETE_APPOINTMENT_SUCCESS,
} from "../../types/appointment/appointment";
import { Dispatch } from "redux";
import axios from "axios";
import store from "../../store";
import { setAlert } from "../alert";
import { config } from "../../types/config";

export const getAppointments =
  () => async (dispatch: Dispatch<AppointmentActionTypes>) => {
    dispatch({ type: GET_APPOINTMENTS_REQUEST });
    try {
      const res = await axios.get(`http://localhost:5000/appointment/`);
      const payload: IGetAppointment[] = res.data;
      dispatch({
        type: GET_APPOINTMENTS_SUCCESS,
        payload: payload,
      });
    } catch (err) {
      const errors = err.response?.data.error;

      dispatch({
        type: GET_APPOINTMENTS_FAIL,
        payload: errors ? errors : err,
      });

      if (errors) {
        errors.forEach((error: any) => {
          store.dispatch(setAlert(error.msg, "error"));
        });
      }
    }
  };

export const getTakenAppointments =
  (id: string) => async (dispatch: Dispatch<AppointmentActionTypes>) => {
    dispatch({ type: GET_TAKEN_APPOINTMENTS_REQUEST });

    try {
      const res = await axios.get(
        `http://localhost:5000/appointment/${id}/taken`
      );
      const payload: IAppointment[] = res.data;

      dispatch({
        type: GET_TAKEN_APPOINTMENTS_SUCCESS,
        payload: payload,
      });
    } catch (err) {
      const errors = err.response?.data.error;

      dispatch({
        type: GET_TAKEN_APPOINTMENTS_FAIL,
        payload: errors ? errors : err,
      });

      if (errors) {
        errors.forEach((error: any) => {
          store.dispatch(setAlert(error.msg, "error"));
        });
      }
    }
  };

export const postAppointment =
  (id: string, form: IAppointmentForm, history: any) =>
  async (dispatch: Dispatch<AppointmentActionTypes>) => {
    dispatch({ type: POST_APPOINTMENT_REQUEST });
    try {
      const body = JSON.stringify(form);
      const res = await axios.post(
        `http://localhost:5000/appointment/${id}/`,
        body,
        config
      );

      dispatch({ type: POST_APPOINTMENT_SUCCESS });

      store.dispatch(setAlert("Appointment successfully created", "success"));
      history.push(`/doctors/${id}/`);
    } catch (err) {
      const errors = err.response?.data.error;

      dispatch({
        type: POST_APPOINTMENT_FAIL,
        payload: errors ? errors : err,
      });

      if (errors) {
        errors.forEach((error: any) => {
          store.dispatch(setAlert(error.msg, "error"));
        });
      }
    }
  };

export const deleteAppointment =
  (id: string) => async (dispatch: Dispatch<AppointmentActionTypes>) => {
    dispatch({ type: DELETE_APPOINTMENT_REQUEST });
    try {
      const res = await axios.delete(`http://localhost:5000/appointment/${id}`);

      dispatch({ type: DELETE_APPOINTMENT_SUCCESS, payload: id });

      store.dispatch(setAlert("Appointment successfully deleted", "success"));
    } catch (err) {
      const errors = err.response?.data.error;

      dispatch({
        type: DELETE_APPOINTMENT_FAIL,
        payload: errors ? errors : err,
      });

      if (errors) {
        errors.forEach((error: any) => {
          store.dispatch(setAlert(error.msg, "error"));
        });
      }
    }
  };
