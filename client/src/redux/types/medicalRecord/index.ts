export const GET_MEDICAL_RECORD_REQUEST = "GET_MEDICAL_RECORD_REQUEST";
export const GET_MEDICAL_RECORD_SUCCESS = "GET_MEDICAL_RECORD_SUCCESS";
export const GET_MEDICAL_RECORD_FAIL = "GET_MEDICAL_RECORD_FAIL";

export const POST_MEDICAL_RECORD_REQUEST = "POST_MEDICAL_RECORD_REQUEST";
export const POST_MEDICAL_RECORD_SUCCESS = "POST_MEDICAL_RECORD_SUCCESS";
export const POST_MEDICAL_RECORD_FAIL = "POST_MEDICAL_RECORD_FAIL";

interface IDoctor {
  name: string;
  surname: string;
}

interface IPatient {
  name: string;
  surname: string;
  OIB: string;
  dateOfBirth: Date;
}

export interface IMedicalRecord {
  title: string;
  medicalHistory: string;
  physicalExamination: string;
  diagnosis: string;
  treatment: string;
  recommendation: string;
  additionalNote: string;
  id: string;
  patientId: string;
  doctorId: string;
  createdAt: Date;
  updatedAt: Date;
  doctor: IDoctor;
  patient: IPatient;
}

export interface GetMedicalRecordRequestAction {
  type: typeof GET_MEDICAL_RECORD_REQUEST;
}

export interface GetMedicalRecordSuccessAction {
  type: typeof GET_MEDICAL_RECORD_SUCCESS;
  payload: IMedicalRecord;
}

export interface GetMedicalRecordFailAction {
  type: typeof GET_MEDICAL_RECORD_FAIL;
  payload: any;
}

export interface PostMedicalRecordRequestAction {
  type: typeof POST_MEDICAL_RECORD_REQUEST;
}

export interface PostMedicalRecordSuccessAction {
  type: typeof POST_MEDICAL_RECORD_SUCCESS;
}

export interface PostMedicalRecordFailAction {
  type: typeof POST_MEDICAL_RECORD_FAIL;
  payload: any;
}

export type MedicalRecordActionTypes =
  | GetMedicalRecordRequestAction
  | GetMedicalRecordSuccessAction
  | GetMedicalRecordFailAction
  | PostMedicalRecordRequestAction
  | PostMedicalRecordSuccessAction
  | PostMedicalRecordFailAction;

export type MedicalRecordState = {
  loading?: boolean;
  medicalRecord?: IMedicalRecord;
  error?: any;
};
