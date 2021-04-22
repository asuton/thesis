import {
  GET_PATIENTS_REQUEST,
  GET_PATIENTS_SUCCESS,
  GET_PATIENTS_FAIL,
  GetPatientsActionTypes,
  GetPatientsState,
} from "../../types/patients/patients";

const initiatlState: GetPatientsState = { loading: true };

const getPatientsReducer = (
  state = initiatlState,
  action: GetPatientsActionTypes
): GetPatientsState => {
  switch (action.type) {
    case GET_PATIENTS_REQUEST:
      return {
        loading: true,
      };
    case GET_PATIENTS_SUCCESS:
      return {
        loading: false,
        patients: action.payload,
      };
    case GET_PATIENTS_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getPatientsReducer;
