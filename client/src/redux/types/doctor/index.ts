export const GET_DOCTOR_REQUEST = "GET_DOCTOR_REQUEST";
export const GET_DOCTOR_SUCCESS = "GET_DOCTOR_SUCCESS";
export const GET_DOCTOR_FAIL = "GET_DOCTOR_FAIL";

export const GET_DOCTORS_REQUEST = "GET_DOCTORS_REQUEST";
export const GET_DOCTORS_SUCCESS = "GET_DOCTORS_SUCCESS";
export const GET_DOCTORS_FAIL = "GET_DOCTORS_FAIL";

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

export type DoctorActionTypes =
  | GetDoctorRequestAction
  | GetDoctorSuccessAction
  | GetDoctorSuccessFail
  | GetDoctorsRequestAction
  | GetDoctorsSuccessAction
  | GetDoctorsSuccessFail;

export type DoctorState = {
  loading?: boolean;
  doctor?: IDoctor;
  doctors?: IDoctors[];
  error?: any;
};
