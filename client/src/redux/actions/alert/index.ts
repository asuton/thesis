import { Dispatch } from "react";
import { Color } from "@material-ui/lab/Alert";
import uuid from "uuid";
import { SET_ALERT, REMOVE_ALERT, AlertActionTypes } from "../../types/alert";

export const setAlert =
  (msg: string, alertType: Color, timeout = 3000) =>
  (dispatch: Dispatch<AlertActionTypes>) => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id },
    });

    setTimeout(
      () =>
        dispatch({
          type: REMOVE_ALERT,
          payload: id,
        }),
      timeout
    );
  };
