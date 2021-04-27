import { combineReducers } from "redux";
import loadUserReducer from "./auth/loadUser";
import loginReducer from "./auth/login";
import registerReducer from "./auth/register";
import getPatientsReducer from "./patients/patients";

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  patients: getPatientsReducer,
  user: loadUserReducer,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;
