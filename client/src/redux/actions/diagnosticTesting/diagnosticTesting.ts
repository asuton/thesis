import {
  GET_DIAGNOSTIC_TESTING_REQUEST,
  GET_DIAGNOSTIC_TESTING_SUCCESS,
  GET_DIAGNOSTIC_TESTING_FAIL,
  POST_DIAGNOSTIC_TESTING_REQUEST,
  POST_DIAGNOSTIC_TESTING_SUCCESS,
  POST_DIAGNOSTIC_TESTING_FAIL,
  DiagnosticTestingActionTypes,
  IDiagnosticTesting,
} from "../../types/diagnosticTestings/diagnosticTesting";
import { DiagnosticTestingFormState } from "../../../components/DiagnosticTestingForm";
import { Dispatch } from "redux";
import axios from "axios";
import { config } from "../../types/config";

export const getDiagnosticTesting =
  (id: string, patId: string) =>
  async (dispatch: Dispatch<DiagnosticTestingActionTypes>) => {
    dispatch({ type: GET_DIAGNOSTIC_TESTING_REQUEST });

    try {
      const res = await axios.get(
        `http://localhost:5000/patients/${patId}/tests/${id}`
      );
      const payload: IDiagnosticTesting = res.data;

      dispatch({
        type: GET_DIAGNOSTIC_TESTING_SUCCESS,
        payload: payload,
      });
    } catch (err) {
      dispatch({
        type: GET_DIAGNOSTIC_TESTING_FAIL,
        payload: err,
      });
    }
  };

export const postDiagnosticTesting =
  (form: DiagnosticTestingFormState, id: string) =>
  async (dispatch: Dispatch<DiagnosticTestingActionTypes>) => {
    dispatch({ type: POST_DIAGNOSTIC_TESTING_REQUEST });
    try {
      const body = JSON.stringify(form);
      const res = await axios.post(
        `http://localhost:5000/patients/${id}/tests`,
        body,
        config
      );
      dispatch({ type: POST_DIAGNOSTIC_TESTING_SUCCESS });
    } catch (err) {
      dispatch({ type: POST_DIAGNOSTIC_TESTING_FAIL, payload: err });
    }
  };
