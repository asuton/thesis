export const GET_PATIENTS_REQUEST = "GET_PATIENTS_REQUEST";
export const GET_PATIENTS_SUCCESS = "GET_PATIENTS_SUCCESS";
export const GET_PATIENTS_FAIL = "GET_PATIENTS_FAIL";

export interface IPatient {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  OIB: string;
  dateOfBirth: Date;
  password: string;
}

export interface GetPatientsRequestAction {
  type: typeof GET_PATIENTS_REQUEST;
}

export interface GetPatientsSuccessAction {
  type: typeof GET_PATIENTS_SUCCESS;
  payload: IPatient[];
}

export interface GetPatientsSuccessFail {
  type: typeof GET_PATIENTS_FAIL;
  payload: any;
}

export type GetPatientsActionTypes =
  | GetPatientsRequestAction
  | GetPatientsSuccessAction
  | GetPatientsSuccessFail;

export type GetPatientsState = {
  loading?: boolean;
  patients?: IPatient[];
  error?: any;
};
