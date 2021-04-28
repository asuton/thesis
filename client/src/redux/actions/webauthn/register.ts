import { config } from "../../types/config";
import axios from "axios";
import base64url from "base64url";

interface Credential {
  id: string;
  rawId: ArrayBuffer;
  response: {
    attestationObject: ArrayBuffer;
    clientDataJSON: ArrayBuffer;
  };
  type: string;
}

interface sendWebAuthnResponse {
  id: string;
  rawId: string;
  response: {
    attestationObject: string;
    clientDataJSON: string;
  };
  type: string;
}

export const getMakeCredChallenge = async () => {
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

    const rawId = bufferToString(attestation.rawId);
    const attestationObject = bufferToString(
      attestation.response.attestationObject
    );
    const clientDataJSON = bufferToString(attestation.response.clientDataJSON);
    const id = attestation.id;
    const type = attestation.type;

    const body = {
      id,
      rawId,
      response: {
        attestationObject,
        clientDataJSON,
      },
      type,
    };
    const response = await sendWebAuthnResponse(body);
  } catch (err) {
    console.log(err);
  }
};

const preformatMakeCredReq = (
  makeCredReq: any
): PublicKeyCredentialCreationOptions => {
  makeCredReq.challenge = Uint8Array.from(
    atob(makeCredReq.challenge.replace(/\-/g, "+").replace(/\_/g, "/")),
    (c) => c.charCodeAt(0)
  );
  makeCredReq.user.id = Uint8Array.from(
    atob(makeCredReq.user.id.replace(/\-/g, "+").replace(/\_/g, "/")),
    (c) => c.charCodeAt(0)
  );
  return makeCredReq;
};

let preformatGetAssertReq = (getAssert: any) => {
  console.log(getAssert.challenge);
  getAssert.challenge = Uint8Array.from(
    atob(getAssert.challenge.replace(/\-/g, "+").replace(/\_/g, "/")),
    (c) => c.charCodeAt(0)
  );
  for (let allowCred of getAssert.allowCredentials) {
    allowCred.id = base64url.decode(allowCred.id);
  }

  return getAssert;
};

function bufferToString(buffer: ArrayBuffer): string {
  return Buffer.from(buffer)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

let sendWebAuthnResponse = async (body: any) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/webauthn/response",
      body,
      config
    );
  } catch (err) {
    console.log(err);
  }
};

export const login = async () => {
  try {
    const res = await axios.get("http://localhost:5000/webauthn/login", config);
    const payload = res.data;
    console.log(payload);
    const publicKey = preformatGetAssertReq(payload);

    const assertion = (await navigator.credentials.get({
      publicKey,
    })) as Credential;

    const response = await sendWebAuthnResponse(assertion);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export const getDummy = async () => {
  try {
    const res = await axios.get("http://localhost:5000/webauthn/dummy", config);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
