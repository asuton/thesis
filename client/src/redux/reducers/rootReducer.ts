import { combineReducers } from "redux";
import getPatientsReducer from "./patients/patients";
import webAuthnReducer from "./webauthn";
import authReducer from "./auth";
import getDoctorsReducer from "./doctors/doctors";
import getPatientReducer from "./patients/patient";
import MedicalRecordReducer from "./medicalRecords/medicalRecord";
import DiagnosticTestingReducer from "./diagnosticTestings/diagnosticTesting";
import getDoctorReducer from "./doctors/doctor";

const rootReducer = combineReducers({
  auth: authReducer,
  patients: getPatientsReducer,
  doctors: getDoctorsReducer,
  webatuhn: webAuthnReducer,
  patient: getPatientReducer,
  medicalRecord: MedicalRecordReducer,
  diagnosticTesting: DiagnosticTestingReducer,
  doctor: getDoctorReducer,
});

//kasnije spojit patients i patient, doctors i doctor

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;
