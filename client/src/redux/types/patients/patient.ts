export const GET_PATIENT_REQUEST = "GET_PATIENT_REQUEST";
export const GET_PATIENT_SUCCESS = "GET_PATIENT_SUCCESS";
export const GET_PATIENT_FAIL = "GET_PATIENT_FAIL";

interface IMedicalRecord {
  title: string;
  patientId: string;
  createdAt: Date;
  id: string;
}

interface IDiagnosticTesting {
  test: string;
  patientId: string;
  createdAt: Date;
  id: string;
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

export type GetPatientActionTypes =
  | GetPatientRequestAction
  | GetPatientSuccessAction
  | GetPatientSuccessFail;

export type GetPatientState = {
  loading?: boolean;
  patient?: IPatient;
  error?: any;
};
