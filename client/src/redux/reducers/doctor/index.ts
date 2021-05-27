import {
  GET_DOCTOR_REQUEST,
  GET_DOCTOR_SUCCESS,
  GET_DOCTOR_FAIL,
  DoctorActionTypes,
  DoctorState,
  GET_DOCTORS_REQUEST,
  GET_DOCTORS_SUCCESS,
  GET_DOCTORS_FAIL,
} from "../../types/doctor";

const initialState: DoctorState = { loading: true };

const DoctorReducer = (
  state = initialState,
  action: DoctorActionTypes
): DoctorState => {
  switch (action.type) {
    case GET_DOCTOR_REQUEST:
    case GET_DOCTORS_REQUEST:
      return {
        loading: true,
      };
    case GET_DOCTOR_SUCCESS:
      return {
        loading: false,
        doctor: action.payload,
      };
    case GET_DOCTORS_SUCCESS:
      return {
        loading: false,
        doctors: action.payload,
      };
    case GET_DOCTOR_FAIL:
    case GET_DOCTORS_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export default DoctorReducer;
