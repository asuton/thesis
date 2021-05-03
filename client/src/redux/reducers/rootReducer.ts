import { combineReducers } from "redux";
import getPatientsReducer from "./patients/patients";
import webAuthnReducer from "./webauthn";
import authReducer from "./auth";

const rootReducer = combineReducers({
  auth: authReducer,
  patients: getPatientsReducer,
  webatuhn: webAuthnReducer,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;
