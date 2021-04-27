import base64url from "base64url";
import cbor from "cbor";
import { verifyPackedAttestation } from "./verifyPackedAttestation";
import { WebAuthnResponse, AttestationStruct } from "../types/webauthn";

export const verifyAuthenticatorAttestationResponse = (
  webAuthnResponse: WebAuthnResponse
) => {
  const attestationBuffer = base64url.toBuffer(
    webAuthnResponse.response.attestationObject
  );
  const attestationStruct = cbor.decodeAllSync(
    attestationBuffer
  )[0] as AttestationStruct;

  let result: any;

  if (attestationStruct.fmt === "packed") {
    result = verifyPackedAttestation(webAuthnResponse);
  }

  return result;
};
