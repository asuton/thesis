import {
  USER_LOADED,
  AUTH_ERROR,
  UserState,
  UserActionTypes,
} from "../../types/auth/loadUser";

const initialState: UserState = { isAuthenticated: false };

const loadUserReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case USER_LOADED:
      return {
        isAuthenticated: true,
        user: action.payload,
      };
    case AUTH_ERROR:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export default loadUserReducer;
