export const GET_DOCTORS_REQUEST = "GET_DOCTORS_REQUEST";
export const GET_DOCTORS_SUCCESS = "GET_DOCTORS_SUCCESS";
export const GET_DOCTORS_FAIL = "GET_DOCTORS_FAIL";

export interface IDoctor {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  qualification: string;
  OIB: string;
  license: string;
}

export interface GetDoctorsRequestAction {
  type: typeof GET_DOCTORS_REQUEST;
}

export interface GetDoctorsSuccessAction {
  type: typeof GET_DOCTORS_SUCCESS;
  payload: IDoctor[];
}

export interface GetDoctorsSuccessFail {
  type: typeof GET_DOCTORS_FAIL;
  payload: any;
}

export type GetDoctorsActionTypes =
  | GetDoctorsRequestAction
  | GetDoctorsSuccessAction
  | GetDoctorsSuccessFail;

export type GetDoctorState = {
  loading?: boolean;
  doctors?: IDoctor[];
  error?: any;
};
