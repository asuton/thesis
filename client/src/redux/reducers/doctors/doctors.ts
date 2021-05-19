import {
  GET_DOCTORS_REQUEST,
  GET_DOCTORS_SUCCESS,
  GET_DOCTORS_FAIL,
  GetDoctorsActionTypes,
  GetDoctorState,
} from "../../types/doctors/doctors";

const initiatlState: GetDoctorState = { loading: true };

const getDoctorsReducer = (
  state = initiatlState,
  action: GetDoctorsActionTypes
): GetDoctorState => {
  switch (action.type) {
    case GET_DOCTORS_REQUEST:
      return {
        loading: true,
      };
    case GET_DOCTORS_SUCCESS:
      return {
        loading: false,
        doctors: action.payload,
      };
    case GET_DOCTORS_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getDoctorsReducer;
