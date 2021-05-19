import {
  GET_PATIENT_REQUEST,
  GET_PATIENT_SUCCESS,
  GET_PATIENT_FAIL,
  GetPatientActionTypes,
  GetPatientState,
} from "../../types/patients/patient";

const initialState: GetPatientState = { loading: true };

const getPatientReducer = (
  state = initialState,
  action: GetPatientActionTypes
): GetPatientState => {
  switch (action.type) {
    case GET_PATIENT_REQUEST:
      return {
        loading: true,
      };
    case GET_PATIENT_SUCCESS:
      return {
        loading: false,
        patient: action.payload,
      };
    case GET_PATIENT_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getPatientReducer;
