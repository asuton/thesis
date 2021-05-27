export const GET_TAKEN_APPOINTMENTS_REQUEST = "GET_TAKEN_APPOINTMENTS_REQUEST";
export const GET_TAKEN_APPOINTMENTS_SUCCESS = "GET_TAKEN_APPOINTMENTS_SUCCESS";
export const GET_TAKEN_APPOINTMENTS_FAIL = "GET_TAKEN_APPOINTMENTS_FAIL";

export const POST_APPOINTMENT_REQUEST = "POST_APPOINTMENT_REQUEST";
export const POST_APPOINTMENT_SUCCESS = "POST_APPOINTMENT_SUCCESS";
export const POST_APPOINTMENT_FAIL = "POST_APPOINTMENT_FAIL";

export const GET_APPOINTMENTS_REQUEST = "GET_APPOINTMENTS_REQUEST";
export const GET_APPOINTMENTS_SUCCESS = "GET_APPOINTMENTS_SUCCESS";
export const GET_APPOINTMENTS_FAIL = "GET_APPOINTMENTS_FAIL";

export const DELETE_APPOINTMENT_REQUEST = "DELETE_APPOINTMENT_REQUEST";
export const DELETE_APPOINTMENT_SUCCESS = "DELETE_APPOINTMENT_SUCCESS";
export const DELETE_APPOINTMENT_FAIL = "DELETE_APPOINTMENT_FAIL";

export interface IAppointment {
  date: Date;
  time: Date;
}

export interface IAppointmentForm {
  date: string;
  time: string;
}

interface IDoctor {
  name: string;
  surname: string;
}

interface IPatient {
  name: string;
  surname: string;
}

export interface IGetAppointment {
  date: Date;
  time: Date;
  id: string;
  patientId: string;
  doctorId: string;
  doctor: IDoctor;
  patient: IPatient;
  createdAt: Date;
}

export interface GetTakenAppointmentsRequestAction {
  type: typeof GET_TAKEN_APPOINTMENTS_REQUEST;
}

export interface GetTakenAppointmentsSuccessAction {
  type: typeof GET_TAKEN_APPOINTMENTS_SUCCESS;
  payload: IAppointment[];
}

export interface GetTakenAppointmentsFailAction {
  type: typeof GET_TAKEN_APPOINTMENTS_FAIL;
  payload: any;
}

export interface PostAppointmentRequestAction {
  type: typeof POST_APPOINTMENT_REQUEST;
}

export interface PostAppointmentSuccessAction {
  type: typeof POST_APPOINTMENT_SUCCESS;
}

export interface PostAppointmentFailAction {
  type: typeof POST_APPOINTMENT_FAIL;
  payload: any;
}

export interface GetAppointmentRequestAction {
  type: typeof GET_APPOINTMENTS_REQUEST;
}

export interface GetAppointmentSuccessAction {
  type: typeof GET_APPOINTMENTS_SUCCESS;
  payload: IGetAppointment[];
}

export interface GetAppointmentFailAction {
  type: typeof GET_APPOINTMENTS_FAIL;
  payload: any;
}

export interface DeleteAppointmentRequestAction {
  type: typeof DELETE_APPOINTMENT_REQUEST;
}

export interface DeleteAppointmentSuccessAction {
  type: typeof DELETE_APPOINTMENT_SUCCESS;
  payload: string;
}

export interface DeleteAppointmentFailAction {
  type: typeof DELETE_APPOINTMENT_FAIL;
  payload: any;
}

export type AppointmentActionTypes =
  | GetTakenAppointmentsRequestAction
  | GetTakenAppointmentsSuccessAction
  | GetTakenAppointmentsFailAction
  | PostAppointmentRequestAction
  | PostAppointmentSuccessAction
  | PostAppointmentFailAction
  | GetAppointmentRequestAction
  | GetAppointmentSuccessAction
  | GetAppointmentFailAction
  | DeleteAppointmentRequestAction
  | DeleteAppointmentSuccessAction
  | DeleteAppointmentFailAction;

export type AppointmentState = {
  loading?: boolean;
  takenAppointments?: IAppointment[];
  appointments?: IGetAppointment[];
  error?: any;
};
