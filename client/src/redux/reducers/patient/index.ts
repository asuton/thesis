import {
  GET_PATIENT_REQUEST,
  GET_PATIENT_SUCCESS,
  GET_PATIENT_FAIL,
  PatientActionTypes,
  PatientState,
  GET_PATIENTS_REQUEST,
  GET_PATIENTS_SUCCESS,
  GET_PATIENTS_FAIL,
  PUT_PATIENT_REQUEST,
  PUT_PATIENT_SUCCESS,
  PUT_PATIENT_FAIL,
} from "../../types/patient";

const initialState: PatientState = { loading: true };

const PatientReducer = (
  state = initialState,
  action: PatientActionTypes
): PatientState => {
  switch (action.type) {
    case GET_PATIENT_REQUEST:
    case GET_PATIENTS_REQUEST:
    case PUT_PATIENT_REQUEST:
      return {
        loading: true,
      };
    case GET_PATIENT_SUCCESS:
    case PUT_PATIENT_SUCCESS:
      return {
        loading: false,
        patient: action.payload,
      };
    case GET_PATIENTS_SUCCESS:
      return {
        loading: false,
        patients: action.payload,
      };
    case GET_PATIENT_FAIL:
    case GET_PATIENTS_FAIL:
    case PUT_PATIENT_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export default PatientReducer;
