export const GET_PATIENT_REQUEST = "GET_PATIENT_REQUEST";
export const GET_PATIENT_SUCCESS = "GET_PATIENT_SUCCESS";
export const GET_PATIENT_FAIL = "GET_PATIENT_FAIL";

export const GET_PATIENTS_REQUEST = "GET_PATIENTS_REQUEST";
export const GET_PATIENTS_SUCCESS = "GET_PATIENTS_SUCCESS";
export const GET_PATIENTS_FAIL = "GET_PATIENTS_FAIL";

export const PUT_PATIENT_REQUEST = "PUT_PATIENT_REQUEST";
export const PUT_PATIENT_SUCCESS = "PUT_PATIENT_SUCCESS";
export const PUT_PATIENT_FAIL = "PUT_PATIENT_FAIL";

interface IMedicalRecord {
  title: string;
  patientId: string;
  createdAt: Date;
  id: string;
  doctorId: string;
}

interface IDiagnosticTesting {
  test: string;
  patientId: string;
  createdAt: Date;
  id: string;
}

export interface IPatients {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  OIB: string;
  dateOfBirth: Date;
}

export interface IPatient {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  OIB: string;
  dateOfBirth: Date;
  medicalRecord: IMedicalRecord[];
  diagnosticTesting: IDiagnosticTesting[];
}

export interface IPutPatientForm {
  phone: string;
  address: string;
}

export interface GetPatientRequestAction {
  type: typeof GET_PATIENT_REQUEST;
}

export interface GetPatientSuccessAction {
  type: typeof GET_PATIENT_SUCCESS;
  payload: IPatient;
}

export interface GetPatientFailAction {
  type: typeof GET_PATIENT_FAIL;
  payload: any;
}

export interface GetPatientsRequestAction {
  type: typeof GET_PATIENTS_REQUEST;
}

export interface GetPatientsSuccessAction {
  type: typeof GET_PATIENTS_SUCCESS;
  payload: IPatients[];
}

export interface GetPatientsFailAction {
  type: typeof GET_PATIENTS_FAIL;
  payload: any;
}

export interface PutPatientRequestAction {
  type: typeof PUT_PATIENT_REQUEST;
}

export interface PutPatientSuccessAction {
  type: typeof PUT_PATIENT_SUCCESS;
  payload: IPatient;
}

export interface PutPatientFailAction {
  type: typeof PUT_PATIENT_FAIL;
  payload: any;
}

export type PatientActionTypes =
  | GetPatientRequestAction
  | GetPatientSuccessAction
  | GetPatientFailAction
  | GetPatientsRequestAction
  | GetPatientsSuccessAction
  | GetPatientsFailAction
  | PutPatientRequestAction
  | PutPatientSuccessAction
  | PutPatientFailAction;

export type PatientState = {
  loading?: boolean;
  patient?: IPatient;
  patients?: IPatients[];
  error?: any;
};
