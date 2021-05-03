import { parseGetAttestAuthData, COSEECDHAtoPKCS } from ".";
import {
  AttestationStruct,
  Authr,
  WebAuthnResponseAttestation,
} from "../../types/webauthn";
import { COSEKEYS, COSEKTY } from "./COSE";
import base64url from "base64url";
import cbor from "cbor";
import nodeRSA from "node-rsa";
import elliptic from "elliptic";

interface VerifyNoneAttestation {
  signatureIsValid: boolean;
  response: Authr | undefined;
}

export const verifyNoneAttestation = (
  webAuthnResponse: WebAuthnResponseAttestation
): VerifyNoneAttestation => {
  let signatureIsValid = false;
  let response: Authr | undefined;

  const attestationBuffer = base64url.toBuffer(
    webAuthnResponse.response.attestationObject
  );

  const attestationStruct = cbor.decodeAllSync(
    attestationBuffer
  )[0] as AttestationStruct;

  const authDataStruct = parseGetAttestAuthData(attestationStruct.authData);
  console.log(authDataStruct);
  const pubKeyCose = cbor.decodeAllSync(authDataStruct.COSEPubKey as Buffer)[0];

  if (pubKeyCose.get(COSEKEYS.kty) === COSEKTY.EC2) {
    const x = pubKeyCose.get(COSEKEYS.x);
    const y = pubKeyCose.get(COSEKEYS.y);
    const ansiKey = Buffer.concat([Buffer.from([0x04]), x, y]);
    signatureIsValid = true;

    response = {
      fmt: "none",
      pubKey: base64url(ansiKey),
      counter: authDataStruct.counter,
      credId: base64url(authDataStruct.credId),
    };
    return { signatureIsValid, response };
  } else if (pubKeyCose.get(COSEKEYS.kty) === COSEKTY.RSA) {
    const key = new nodeRSA(undefined);
    key.importKey(
      {
        n: pubKeyCose.get(COSEKEYS.n),
        e: 65537,
      },
      "components-public"
    );

    signatureIsValid = true;
    response = {
      fmt: "packed",
      pubKey: key.exportKey("pkcs1-public-pem"),
      counter: authDataStruct.counter,
      credId: base64url.encode(authDataStruct.credId),
    };
    return { signatureIsValid, response };
  } else if (pubKeyCose.get(COSEKEYS.kty) === COSEKTY.OKP) {
    const x = pubKeyCose.get(COSEKEYS.x);
    const key = new elliptic.eddsa("ed25519");

    response = {
      fmt: "packed",
      pubKey: base64url(key.keyFromPublic(x).getPublic()),
      counter: authDataStruct.counter,
      credId: base64url(authDataStruct.credId),
    };
    return { signatureIsValid, response };
  }
  const res = { signatureIsValid, response };
  return res;
};
