import base64url from "base64url";
import cbor from "cbor";
import { verifyPackedAttestation } from "./verifyPackedAttestation";
import { verifyNoneAttestation } from "./verifyNoneAttestation";
import {
  WebAuthnResponseAttestation,
  AttestationStruct,
  Authr,
} from "../../types/webauthn";

interface VerifyAuthenticatorAttestationResponse {
  signatureIsValid: boolean;
  response: Authr | undefined;
}

export const verifyAuthenticatorAttestationResponse = (
  webAuthnResponse: WebAuthnResponseAttestation
): VerifyAuthenticatorAttestationResponse => {
  const attestationBuffer = base64url.toBuffer(
    webAuthnResponse.response.attestationObject
  );
  const attestationStruct = cbor.decodeAllSync(
    attestationBuffer
  )[0] as AttestationStruct;

  let result: VerifyAuthenticatorAttestationResponse = {
    signatureIsValid: false,
    response: undefined,
  };

  if (attestationStruct.fmt === "packed") {
    result = verifyPackedAttestation(webAuthnResponse);
  }
  if (attestationStruct.fmt === "none") {
    result = verifyNoneAttestation(webAuthnResponse);
  }

  return result;
};
