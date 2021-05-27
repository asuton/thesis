import {
  GET_DIAGNOSTIC_TESTING_REQUEST,
  GET_DIAGNOSTIC_TESTING_SUCCESS,
  GET_DIAGNOSTIC_TESTING_FAIL,
  POST_DIAGNOSTIC_TESTING_REQUEST,
  POST_DIAGNOSTIC_TESTING_SUCCESS,
  POST_DIAGNOSTIC_TESTING_FAIL,
  DiagnosticTestingActionTypes,
  DiagnosticTestingState,
} from "../../types/diagnosticTesting";

const initialState: DiagnosticTestingState = { loading: true };

const DiagnosticTestingReducer = (
  state = initialState,
  action: DiagnosticTestingActionTypes
): DiagnosticTestingState => {
  switch (action.type) {
    case GET_DIAGNOSTIC_TESTING_REQUEST:
    case POST_DIAGNOSTIC_TESTING_REQUEST:
      return {
        loading: true,
      };
    case GET_DIAGNOSTIC_TESTING_SUCCESS:
      return {
        loading: false,
        diagnosticTesting: action.payload,
      };
    case POST_DIAGNOSTIC_TESTING_SUCCESS:
      return {
        loading: false,
      };
    case GET_DIAGNOSTIC_TESTING_FAIL:
    case POST_DIAGNOSTIC_TESTING_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export default DiagnosticTestingReducer;
