export const GET_DOCTOR_REQUEST = "GET_DOCTOR_REQUEST";
export const GET_DOCTOR_SUCCESS = "GET_DOCTOR_SUCCESS";
export const GET_DOCTOR_FAIL = "GET_DOCTOR_FAIL";

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

export type GetDoctorActionTypes =
  | GetDoctorRequestAction
  | GetDoctorSuccessAction
  | GetDoctorSuccessFail;

export type GetDoctorState = {
  loading?: boolean;
  doctor?: IDoctor;
  error?: any;
};
