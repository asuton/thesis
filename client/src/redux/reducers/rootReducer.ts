import { combineReducers } from "redux";
import PatientReducer from "./patient";
import webAuthnReducer from "./webauthn";
import authReducer from "./auth";
import DoctorReducer from "./doctor/";
import MedicalRecordReducer from "./medicalRecord";
import DiagnosticTestingReducer from "./diagnosticTesting";
import AlertReducer from "./alert";
import AppointmentReducer from "./appointment";

const rootReducer = combineReducers({
  alert: AlertReducer,
  appointment: AppointmentReducer,
  auth: authReducer,
  diagnosticTesting: DiagnosticTestingReducer,
  doctor: DoctorReducer,
  medicalRecord: MedicalRecordReducer,
  patient: PatientReducer,
  webauthn: webAuthnReducer,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;
