import { Color } from "@material-ui/lab/Alert";

export const SET_ALERT = "SET_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";

export interface IAlert {
  id: string;
  msg: string;
  alertType: Color;
}

export interface SetAlertAction {
  type: typeof SET_ALERT;
  payload: IAlert;
}

export interface RemoveAlertAction {
  type: typeof REMOVE_ALERT;
  payload: string;
}

export type AlertActionTypes = SetAlertAction | RemoveAlertAction;

export type AlertState = {
  alerts: IAlert[];
};
