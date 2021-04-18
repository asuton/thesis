import {
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RegisterActionTypes,
  RegisterState,
} from "../../types/auth/register";

const initState: RegisterState = {};

const registerReducer = (
  state = initState,
  action: RegisterActionTypes
): RegisterState => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        registering: true,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        registered: true,
      };
    case REGISTER_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export default registerReducer;
