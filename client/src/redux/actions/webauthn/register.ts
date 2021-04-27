import { config } from "../../types/config";
import axios from "axios";

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
    console.log(response);
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

function bufferToString(buffer: ArrayBuffer): string {
  return Buffer.from(buffer)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

let sendWebAuthnResponse = async (body: sendWebAuthnResponse) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/webauthn/response",
      body,
      config
    );
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
