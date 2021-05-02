import { config } from "../../types/config";
import {
  WebAuthnActionTypes,
  WEBAUTHN_REGISTER_REQUEST,
  WEBAUTHN_REGISTER_SUCCESS,
  WEBAUTHN_REGISTER_FAIL,
  WEBAUTHN_LOGIN_REQUEST,
  WEBAUTHN_LOGIN_SUCCESS,
  WEBAUTHN_LOGIN_FAIL,
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

    const response = await sendWebAuthnResponse(body);

    dispatch({ type: WEBAUTHN_REGISTER_SUCCESS });
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({ type: WEBAUTHN_REGISTER_FAIL, payload: errors });
  }
};

export const getGetAssertionChallenge = async () => {
  try {
    const res = await axios.get("http://localhost:5000/webauthn/login", config);
    const payload = res.data;

    const publicKey = preformatGetAssertReq(payload);

    const assertion = (await navigator.credentials.get({
      publicKey,
    })) as Credential;

    const body = convertCredToRes(assertion);

    const response = await sendWebAuthnResponse(body);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

const sendWebAuthnResponse = async (body: WebAuthnResponse) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/webauthn/response",
      body,
      config
    );
    return res;
  } catch (err) {
    return;
  }
};
