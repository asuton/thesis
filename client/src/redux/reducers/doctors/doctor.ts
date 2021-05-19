import {
  GET_DOCTOR_REQUEST,
  GET_DOCTOR_SUCCESS,
  GET_DOCTOR_FAIL,
  GetDoctorActionTypes,
  GetDoctorState,
} from "../../types/doctors/doctor";

const initialState: GetDoctorState = { loading: true };

const getDoctorReducer = (
  state = initialState,
  action: GetDoctorActionTypes
): GetDoctorState => {
  switch (action.type) {
    case GET_DOCTOR_REQUEST:
      return {
        loading: true,
      };
    case GET_DOCTOR_SUCCESS:
      return {
        loading: false,
        doctor: action.payload,
      };
    case GET_DOCTOR_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getDoctorReducer;
