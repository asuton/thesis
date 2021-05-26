import {
  GET_TAKEN_APPOINTMENTS_REQUEST,
  GET_TAKEN_APPOINTMENTS_SUCCESS,
  GET_TAKEN_APPOINTMENTS_FAIL,
  AppointmentActionTypes,
  AppointmentState,
  POST_APPOINTMENT_REQUEST,
  POST_APPOINTMENT_FAIL,
  POST_APPOINTMENT_SUCCESS,
  GET_APPOINTMENTS_REQUEST,
  GET_APPOINTMENTS_SUCCESS,
  GET_APPOINTMENTS_FAIL,
  DELETE_APPOINTMENT_FAIL,
  DELETE_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT_REQUEST,
} from "../../types/appointment/appointment";

const initialState: AppointmentState = { loading: true };

const AppointmentReducer = (
  state = initialState,
  action: AppointmentActionTypes
): AppointmentState => {
  switch (action.type) {
    case GET_TAKEN_APPOINTMENTS_REQUEST:
    case POST_APPOINTMENT_REQUEST:
    case GET_APPOINTMENTS_REQUEST:
      return {
        loading: true,
      };
    case DELETE_APPOINTMENT_REQUEST:
      return {
        loading: true,
        appointments:
          state.appointments && state.appointments.length > 0
            ? state.appointments
            : [],
      };
    case GET_TAKEN_APPOINTMENTS_SUCCESS:
      return {
        loading: false,
        takenAppointments: action.payload,
      };
    case POST_APPOINTMENT_SUCCESS:
      return {
        loading: false,
      };
    case DELETE_APPOINTMENT_SUCCESS:
      return {
        loading: false,
        appointments: state.appointments?.filter(
          (app) => app.id !== action.payload
        ),
      };
    case GET_APPOINTMENTS_SUCCESS:
      return {
        appointments: action.payload,
      };
    case GET_TAKEN_APPOINTMENTS_FAIL:
    case POST_APPOINTMENT_FAIL:
    case GET_APPOINTMENTS_FAIL:
    case DELETE_APPOINTMENT_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export default AppointmentReducer;
