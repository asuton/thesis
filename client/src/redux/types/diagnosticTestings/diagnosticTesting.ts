export const GET_DIAGNOSTIC_TESTING_REQUEST = "GET_DIAGNOSTIC_TESTING_REQUEST";
export const GET_DIAGNOSTIC_TESTING_SUCCESS = "GET_DIAGNOSTIC_TESTING_SUCCESS";
export const GET_DIAGNOSTIC_TESTING_FAIL = "GET_DIAGNOSTIC_TESTING_FAIL";

export const POST_DIAGNOSTIC_TESTING_REQUEST =
  "POST_DIAGNOSTIC_TESTING_REQUEST";
export const POST_DIAGNOSTIC_TESTING_SUCCESS =
  "POST_DIAGNOSTIC_TESTING_SUCCESS";
export const POST_DIAGNOSTIC_TESTING_FAIL = "POST_DIAGNOSTIC_TESTING_FAIL";

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

export interface IDiagnosticTesting {
  test: string;
  result: string;
  patientId: string;
  doctorId: string;
  createdAt: Date;
  updatedAt: Date;
  doctor: IDoctor;
  patient: IPatient;
}

export interface GetDiagnosticTestingRequestAction {
  type: typeof GET_DIAGNOSTIC_TESTING_REQUEST;
}

export interface GetDiagnosticTestingSuccessAction {
  type: typeof GET_DIAGNOSTIC_TESTING_SUCCESS;
  payload: IDiagnosticTesting;
}

export interface GetDiagnosticTestingFailAction {
  type: typeof GET_DIAGNOSTIC_TESTING_FAIL;
  payload: any;
}

export interface PostDiagnosticTestingRequestAction {
  type: typeof POST_DIAGNOSTIC_TESTING_REQUEST;
}

export interface PostDiagnosticTestingSuccessAction {
  type: typeof POST_DIAGNOSTIC_TESTING_SUCCESS;
}

export interface PostDiagnosticTestingFailAction {
  type: typeof POST_DIAGNOSTIC_TESTING_FAIL;
  payload: any;
}

export type DiagnosticTestingActionTypes =
  | GetDiagnosticTestingRequestAction
  | GetDiagnosticTestingSuccessAction
  | GetDiagnosticTestingFailAction
  | PostDiagnosticTestingRequestAction
  | PostDiagnosticTestingSuccessAction
  | PostDiagnosticTestingFailAction;

export type DiagnosticTestingState = {
  loading?: boolean;
  diagnosticTesting?: IDiagnosticTesting;
  error?: any;
};
