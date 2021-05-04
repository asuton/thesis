import {
  AttestationStruct,
  Authr,
  WebAuthnResponseAttestation,
  VerifyAttestation,
} from "../../types/webauthn";
import base64url from "base64url";
import cbor from "cbor";
import {
  COSEECDHAtoPKCS,
  ASN1toPEM,
  parseGetAttestAuthData,
  hash,
  verifySignature,
} from ".";

export const verifyU2FAttestation = async (
  webAuthnResponse: WebAuthnResponseAttestation
): Promise<VerifyAttestation> => {
  let signatureIsValid = false;
  let response: Authr | undefined;

  const attestationBuffer = base64url.toBuffer(
    webAuthnResponse.response.attestationObject
  );

  const attestationStruct = cbor.decodeAllSync(
    attestationBuffer
  )[0] as AttestationStruct;

  const authDataStruct = parseGetAttestAuthData(attestationStruct.authData);

  if (!authDataStruct.flags.up)
    throw new Error("User was not present during authentication");

  const clientDataHash = hash(
    base64url.toBuffer(webAuthnResponse.response.clientDataJSON)
  );

  const reservedByte = Buffer.from([0x00]);
  const publicKey = COSEECDHAtoPKCS(authDataStruct.COSEPubKey);
  const signatureBase = Buffer.concat([
    reservedByte,
    authDataStruct.rpIdHash,
    clientDataHash,
    authDataStruct.credId,
    publicKey,
  ]);
  const PEMCertificate = ASN1toPEM(attestationStruct.attStmt.x5c[0]);
  const signature = attestationStruct.attStmt.sig;

  signatureIsValid = await verifySignature(
    signature,
    signatureBase,
    PEMCertificate
  );

  if (signatureIsValid) {
    response = {
      fmt: "fido-u2f",
      pubKey: base64url(publicKey),
      counter: authDataStruct.counter,
      credId: base64url(authDataStruct.credId),
    };
    return { signatureIsValid, response };
  }
  if (!signatureIsValid) throw new Error("Failed to verify the signature!");

  const res = { signatureIsValid, response };

  return res;
};
