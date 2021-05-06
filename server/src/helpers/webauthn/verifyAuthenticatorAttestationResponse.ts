import base64url from "base64url";
import cbor from "cbor";
import { verifyPackedAttestation } from "./verifyPackedAttestation";
import { verifyNoneAttestation } from "./verifyNoneAttestation";
import { verifyU2FAttestation } from "./verifyU2FAttestation";
import {
  WebAuthnResponseAttestation,
  AttestationStruct,
  Authr,
} from "../../types/webauthn";

interface VerifyAuthenticatorAttestationResponse {
  signatureIsValid: boolean;
  response: Authr | undefined;
}

export const verifyAuthenticatorAttestationResponse = async (
  webAuthnResponse: WebAuthnResponseAttestation
): Promise<VerifyAuthenticatorAttestationResponse> => {
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
    console.log("packed");
    result = await verifyPackedAttestation(webAuthnResponse);
  } else if (attestationStruct.fmt === "none") {
    result = verifyNoneAttestation(webAuthnResponse);
    console.log("none");
  } else if (attestationStruct.fmt === "fido-u2f") {
    result = await verifyU2FAttestation(webAuthnResponse);
    console.log("fido-u2f");
  }

  return result;
};
