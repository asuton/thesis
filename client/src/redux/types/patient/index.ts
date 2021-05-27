export const GET_PATIENT_REQUEST = "GET_PATIENT_REQUEST";
export const GET_PATIENT_SUCCESS = "GET_PATIENT_SUCCESS";
export const GET_PATIENT_FAIL = "GET_PATIENT_FAIL";

export const GET_PATIENTS_REQUEST = "GET_PATIENTS_REQUEST";
export const GET_PATIENTS_SUCCESS = "GET_PATIENTS_SUCCESS";
export const GET_PATIENTS_FAIL = "GET_PATIENTS_FAIL";

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

export interface GetPatientRequestAction {
  type: typeof GET_PATIENT_REQUEST;
}

export interface GetPatientSuccessAction {
  type: typeof GET_PATIENT_SUCCESS;
  payload: IPatient;
}

export interface GetPatientSuccessFail {
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

export interface GetPatientsSuccessFail {
  type: typeof GET_PATIENTS_FAIL;
  payload: any;
}

export type PatientActionTypes =
  | GetPatientRequestAction
  | GetPatientSuccessAction
  | GetPatientSuccessFail
  | GetPatientsRequestAction
  | GetPatientsSuccessAction
  | GetPatientsSuccessFail;

export type PatientState = {
  loading?: boolean;
  patient?: IPatient;
  patients?: IPatients[];
  error?: any;
};
