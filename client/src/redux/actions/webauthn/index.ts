import { config } from "../../types/config";
import {
  WebAuthnActionTypes,
  WEBAUTHN_REGISTER_REQUEST,
  WEBAUTHN_REGISTER_SUCCESS,
  WEBAUTHN_REGISTER_FAIL,
  WEBAUTHN_LOGIN_REQUEST,
  WEBAUTHN_LOGIN_SUCCESS,
  WEBAUTHN_LOGIN_FAIL,
  WEBAUTH_RESPONSE_REQUEST,
  WEBAUTH_RESPONSE_FAIL,
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

export const getMakeCredChallenge = () => async (
  dispatch: Dispatch<WebAuthnActionTypes>
) => {
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
  } catch (err) {
    dispatch({ type: WEBAUTHN_REGISTER_FAIL, payload: err });
  }
};

export const getGetAssertionChallenge = () => async (
  dispatch: Dispatch<WebAuthnActionTypes>
) => {
  dispatch({ type: WEBAUTHN_LOGIN_REQUEST });
  try {
    const res = await axios.get("http://localhost:5000/webauthn/login", config);
    const payload = res.data;

    const publicKey = preformatGetAssertReq(payload);

    const assertion = (await navigator.credentials.get({
      publicKey,
    })) as Credential;

    const body = convertCredToRes(assertion);
    store.dispatch(sendWebAuthnResponse(body));
    dispatch({ type: WEBAUTHN_LOGIN_SUCCESS });
  } catch (err) {
    dispatch({ type: WEBAUTHN_LOGIN_FAIL, payload: err });
  }
};

export const sendWebAuthnResponse = (body: WebAuthnResponse) => async (
  dispatch: Dispatch<WebAuthnActionTypes>
) => {
  dispatch({ type: WEBAUTH_RESPONSE_REQUEST });
  try {
    const res = await axios.post(
      "http://localhost:5000/webauthn/response",
      body,
      config
    );
    return res;
  } catch (err) {
    dispatch({ type: WEBAUTH_RESPONSE_FAIL, payload: err });
  }
};
