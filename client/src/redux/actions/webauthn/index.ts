import { config } from "../../types/config";
import {
  WebAuthnActionTypes,
  WEBAUTHN_REGISTER_REQUEST,
  WEBAUTHN_REGISTER_SUCCESS,
  WEBAUTHN_REGISTER_FAIL,
  WEBAUTHN_LOGIN_REQUEST,
  WEBAUTHN_LOGIN_SUCCESS,
  WEBAUTHN_LOGIN_FAIL,
  WEBAUTHN_RESPONSE_REQUEST,
  WEBAUTHN_RESPONSE_FAIL,
  WEBAUTHN_SESSION_REQUEST,
  WEBAUTHN_SESSION_SUCCESS,
  WEBAUTHN_SESSION_FAIL,
} from "../../types/webauthn";
import {
  preformatMakeCredReq,
  preformatGetAssertReq,
  convertCredToRes,
  Credential,
  WebAuthnResponse,
} from "../../../helpers/webauthn";
import axios from "axios";
import { Dispatch } from "redux";
import store from "../../store";
import { setAlert } from "../alert";

export const getMakeCredChallenge =
  (history: any) => async (dispatch: Dispatch<WebAuthnActionTypes>) => {
    dispatch({ type: WEBAUTHN_REGISTER_REQUEST });
    try {
      const res = await axios.get(
        "http://localhost:5000/webauthn/register",
        config
      );

      const payload = res.data;
      const publicKey = preformatMakeCredReq(payload);

      const attestation = (await navigator.credentials.create({
        publicKey,
      })) as Credential;

      const body = convertCredToRes(attestation);

      store.dispatch(sendWebAuthnResponse(body));

      dispatch({ type: WEBAUTHN_REGISTER_SUCCESS });
      store.dispatch(setAlert("WebAuthn register success", "success"));
      if (history.location.pathname === "/register") {
        store.dispatch(setAlert("User successfully created!", "success"));
        window.location.reload();
      }
    } catch (err) {
      const errors = err.response?.data.error;

      dispatch({
        type: WEBAUTHN_REGISTER_FAIL,
        payload: errors ? errors : err,
      });

      if (errors) {
        errors.forEach((error: any) => {
          store.dispatch(setAlert(error.msg, "error"));
        });
      }
    }
  };

export const getGetAssertionChallenge =
  () => async (dispatch: Dispatch<WebAuthnActionTypes>) => {
    dispatch({ type: WEBAUTHN_LOGIN_REQUEST });
    try {
      const res = await axios.get(
        "http://localhost:5000/webauthn/login",
        config
      );
      const payload = res.data;

      const publicKey = preformatGetAssertReq(payload);

      const assertion = (await navigator.credentials.get({
        publicKey,
      })) as Credential;

      const body = convertCredToRes(assertion);
      store.dispatch(sendWebAuthnResponse(body));
      dispatch({ type: WEBAUTHN_LOGIN_SUCCESS });
      store.dispatch(setAlert("WebAuthn login success", "success"));
    } catch (err) {
      const errors = err.response?.data.error;

      dispatch({ type: WEBAUTHN_LOGIN_FAIL, payload: errors ? errors : err });

      if (errors) {
        errors.forEach((error: any) => {
          store.dispatch(setAlert(error.msg, "error"));
        });
      }
    }
  };

export const sendWebAuthnResponse =
  (body: WebAuthnResponse) =>
  async (dispatch: Dispatch<WebAuthnActionTypes>) => {
    dispatch({ type: WEBAUTHN_RESPONSE_REQUEST });
    try {
      const res = await axios.post(
        "http://localhost:5000/webauthn/response",
        body,
        config
      );
      return res;
    } catch (err) {
      dispatch({ type: WEBAUTHN_RESPONSE_FAIL, payload: err });
    }
  };

export const checkWebAuthnSession =
  () => async (dispatch: Dispatch<WebAuthnActionTypes>) => {
    dispatch({ type: WEBAUTHN_SESSION_REQUEST });
    try {
      const res = await axios.get(
        "http://localhost:5000/login/webauthn",
        config
      );
      dispatch({ type: WEBAUTHN_SESSION_SUCCESS, payload: res });
    } catch (err) {
      dispatch({ type: WEBAUTHN_SESSION_FAIL, payload: err });
    }
  };
