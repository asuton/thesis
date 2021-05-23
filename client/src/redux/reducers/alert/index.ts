import {
  SET_ALERT,
  REMOVE_ALERT,
  AlertState,
  AlertActionTypes,
} from "../../types/alert";

const initialState: AlertState = { alerts: [] };

const AlertReducer = (
  state = initialState,
  action: AlertActionTypes
): AlertState => {
  switch (action.type) {
    case SET_ALERT:
      return {
        alerts: [...state.alerts, action.payload],
      };
    case REMOVE_ALERT:
      return {
        alerts: [
          ...state.alerts.filter((alert) => alert.id !== action.payload),
        ],
      };
    default:
      return state;
  }
};

export default AlertReducer;
