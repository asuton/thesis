export const GET_DOCTOR_REQUEST = "GET_DOCTOR_REQUEST";
export const GET_DOCTOR_SUCCESS = "GET_DOCTOR_SUCCESS";
export const GET_DOCTOR_FAIL = "GET_DOCTOR_FAIL";

export const GET_DOCTORS_REQUEST = "GET_DOCTORS_REQUEST";
export const GET_DOCTORS_SUCCESS = "GET_DOCTORS_SUCCESS";
export const GET_DOCTORS_FAIL = "GET_DOCTORS_FAIL";

export const PUT_DOCTOR_REQUEST = "PUT_DOCTOR_REQUEST";
export const PUT_DOCTOR_SUCCESS = "PUT_DOCTOR_SUCCESS";
export const PUT_DOCTOR_FAIL = "PUT_DOCTOR_FAIL";

export const POST_DOCTOR_REQUEST = "POST_DOCTOR_REQUEST";
export const POST_DOCTOR_SUCCESS = "POST_DOCTOR_SUCCESS";
export const POST_DOCTOR_FAIL = "POST_DOCTOR_FAIL";

interface IMedicalRecord {
  title: string;
  patientId: string;
  createdAt: Date;
  id: string;
  doctorId: string;
}

export interface IDoctor {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  qualification: string;
  OIB: string;
  license: string;
  medicalRecord: IMedicalRecord[];
}

export interface IDoctors {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  qualification: string;
  OIB: string;
  license: string;
}

export interface IPutDoctorForm {
  qualification: string;
  phone: string;
}

export interface IPostDoctorForm {
  name: string;
  surname: string;
  email: string;
  phone: string;
  qualification: string;
  password: string;
  OIB: string;
  license: string;
}

export interface GetDoctorRequestAction {
  type: typeof GET_DOCTOR_REQUEST;
}

export interface GetDoctorSuccessAction {
  type: typeof GET_DOCTOR_SUCCESS;
  payload: IDoctor;
}

export interface GetDoctorSuccessFail {
  type: typeof GET_DOCTOR_FAIL;
  payload: any;
}

export interface GetDoctorsRequestAction {
  type: typeof GET_DOCTORS_REQUEST;
}

export interface GetDoctorsSuccessAction {
  type: typeof GET_DOCTORS_SUCCESS;
  payload: IDoctors[];
}

export interface GetDoctorsSuccessFail {
  type: typeof GET_DOCTORS_FAIL;
  payload: any;
}

export interface PutDoctorRequestAction {
  type: typeof PUT_DOCTOR_REQUEST;
}

export interface PutDoctorSuccessAction {
  type: typeof PUT_DOCTOR_SUCCESS;
  payload: IDoctor;
}

export interface PutDoctorSuccessFail {
  type: typeof PUT_DOCTOR_FAIL;
  payload: any;
}

export interface PostDoctorRequestAction {
  type: typeof POST_DOCTOR_REQUEST;
}

export interface PostDoctorSuccessAction {
  type: typeof POST_DOCTOR_SUCCESS;
}

export interface PostDoctorSuccessFail {
  type: typeof POST_DOCTOR_FAIL;
  payload: any;
}

export type DoctorActionTypes =
  | GetDoctorRequestAction
  | GetDoctorSuccessAction
  | GetDoctorSuccessFail
  | GetDoctorsRequestAction
  | GetDoctorsSuccessAction
  | GetDoctorsSuccessFail
  | PutDoctorRequestAction
  | PutDoctorSuccessAction
  | PutDoctorSuccessFail
  | PostDoctorRequestAction
  | PostDoctorSuccessAction
  | PostDoctorSuccessFail;

export type DoctorState = {
  loading?: boolean;
  doctor?: IDoctor;
  doctors?: IDoctors[];
  error?: any;
};
