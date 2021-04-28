import {
  findAuthr,
  hash,
  parseGetAssertAuthData,
  ASN1toPEM,
  verifySignature,
} from "./webauthn";
import base64url from "base64url";
import { WebAuthnResponseAssertion } from "../types/webauthn";

export let verifyAuthenticatorAssertionResponse = (
  webAuthnResponse: WebAuthnResponseAssertion,
  authenticators: any
) => {
  const authr = findAuthr(webAuthnResponse.id, authenticators);
  const authenticatorData = base64url.toBuffer(
    webAuthnResponse.response.authenticatorData
  );

  let response: any = { verified: false };

  if (authr.fmt === "packed") {
    const authrDataStruct = parseGetAssertAuthData(authenticatorData);

    if (!authrDataStruct.flags.up)
      throw new Error("User was NOT presented durring authentication!");

    const clientDataHash = hash(
      base64url.toBuffer(webAuthnResponse.response.clientDataJSON)
    );

    const signatureBase = Buffer.concat([
      authrDataStruct.rpIdHash,
      authrDataStruct.flagsBuf,
      authrDataStruct.counterBuf,
      clientDataHash,
    ]);

    const publicKey = ASN1toPEM(base64url.toBuffer(authr.pubKey));
    const signature = base64url.toBuffer(webAuthnResponse.response.signature);

    response.verified = verifySignature(signature, signatureBase, publicKey);

    if (response.verified) {
      if (response.counter <= authr.counter)
        throw new Error("Authr counter did not increase!");

      authr.counter = authrDataStruct.counter;
    }
  }

  return response;
};
