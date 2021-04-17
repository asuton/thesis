import { combineReducers } from "redux";
import loginReducer from "./auth/login";
import registerReducer from "./auth/register";

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;
