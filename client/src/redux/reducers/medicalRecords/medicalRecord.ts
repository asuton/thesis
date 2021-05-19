import {
  GET_MEDICAL_RECORD_REQUEST,
  GET_MEDICAL_RECORD_SUCCESS,
  GET_MEDICAL_RECORD_FAIL,
  MedicalRecordActionTypes,
  MedicalRecordState,
  POST_MEDICAL_RECORD_REQUEST,
  POST_MEDICAL_RECORD_SUCCESS,
  POST_MEDICAL_RECORD_FAIL,
} from "../../types/medicalRecords/medicalRecord";

const initialState: MedicalRecordState = { loading: true };

const MedicalRecordReducer = (
  state = initialState,
  action: MedicalRecordActionTypes
): MedicalRecordState => {
  switch (action.type) {
    case GET_MEDICAL_RECORD_REQUEST:
    case POST_MEDICAL_RECORD_REQUEST:
      return {
        loading: true,
      };
    case GET_MEDICAL_RECORD_SUCCESS:
      return {
        loading: false,
        medicalRecord: action.payload,
      };
    case POST_MEDICAL_RECORD_SUCCESS:
      return {
        loading: false,
      };
    case GET_MEDICAL_RECORD_FAIL:
    case POST_MEDICAL_RECORD_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export default MedicalRecordReducer;
