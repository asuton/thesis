import {
  AttestationStruct,
  Authr,
  WebAuthnResponseAttestation,
} from "../../types/webauthn";
import {
  parseGetAttestAuthData,
  hash,
  base64ToPem,
  getCertificateInfo,
  COSEECDHAtoPKCS,
} from ".";
import { COSEKEYS, COSEALGHASH, COSECRV, COSEKTY, COSERSASCHEME } from "./COSE";
import elliptic from "elliptic";
import nodeRSA from "node-rsa";
import crypto from "crypto";
import base64url from "base64url";
import cbor from "cbor";

interface VerifyPackedAttestation {
  signatureIsValid: boolean;
  response: Authr | undefined;
}

export const verifyPackedAttestation = (
  webAuthnResponse: WebAuthnResponseAttestation
): VerifyPackedAttestation => {
  const attestationBuffer = base64url.toBuffer(
    webAuthnResponse.response.attestationObject
  );

  const attestationStruct = cbor.decodeAllSync(
    attestationBuffer
  )[0] as AttestationStruct;
  const authDataStruct = parseGetAttestAuthData(attestationStruct.authData);

  const clientDataHashBuf = hash(
    base64url.toBuffer(webAuthnResponse.response.clientDataJSON)
  );

  const signatureBaseBuffer = Buffer.concat([
    attestationStruct.authData,
    clientDataHashBuf,
  ]);

  const signatureBuffer = attestationStruct.attStmt.sig;

  let signatureIsValid = false;
  let response: Authr | undefined;

  if (attestationStruct.attStmt.x5c) {
    const leafCert = base64ToPem(
      attestationStruct.attStmt.x5c[0].toString("base64")
    );

    const certInfo = getCertificateInfo(leafCert);

    if (certInfo.version !== 3)
      throw new Error("Batch certificate version is not 3(ASN1 INT 2)!");

    if (!certInfo.subject.C || certInfo.subject.C.length !== 2)
      throw new Error(
        "Batch certificate C is not set to two character ISO 3166 code!"
      );

    if (!certInfo.subject.O) throw new Error("Batch certificate O is empty!");

    if (certInfo.subject.OU !== "Authenticator Attestation")
      throw new Error(
        'Batch certificate OU is not set to "Authenticator Attestation"!'
      );

    if (!certInfo.subject.CN) throw new Error("Batch certificate CN is empty!");

    if (certInfo.basicConstraintsCA)
      throw new Error("Batch certificate CA is not false!");

    signatureIsValid = crypto
      .createVerify("sha256")
      .update(signatureBaseBuffer)
      .verify(leafCert, signatureBuffer);

    const publicKey = COSEECDHAtoPKCS(authDataStruct.COSEPubKey);
    if (signatureIsValid) {
      response = {
        fmt: "packed",
        pubKey: base64url(publicKey),
        counter: authDataStruct.counter,
        credId: base64url(authDataStruct.credId),
      };
      return { signatureIsValid, response };
    }
  } else if (attestationStruct.attStmt.ecdaaKeyId) {
    throw new Error("ECDAA IS NOT SUPPORTED YET!");
  } else {
    const pubKeyCose = cbor.decodeAllSync(
      authDataStruct.COSEPubKey as Buffer
    )[0];

    const hashAlg = COSEALGHASH[pubKeyCose.get(COSEKEYS.alg)];

    if (pubKeyCose.get(COSEKEYS.kty) === COSEKTY.EC2) {
      const ansiKey = COSEECDHAtoPKCS(pubKeyCose);

      const signatureBaseHash = hash(signatureBaseBuffer, hashAlg);

      const ec = new elliptic.ec(COSECRV[pubKeyCose.get(COSEKEYS.crv)]);
      const key = ec.keyFromPublic(ansiKey);

      signatureIsValid = key.verify(signatureBaseHash, signatureBuffer);

      if (signatureIsValid) {
        response = {
          fmt: "packed",
          pubKey: base64url(ansiKey),
          counter: authDataStruct.counter,
          credId: base64url(authDataStruct.credId),
        };
        return { signatureIsValid, response };
      }
    } else if (pubKeyCose.get(COSEKEYS.kty) === COSEKTY.RSA) {
      const signingScheme = COSERSASCHEME[pubKeyCose.get(COSEKEYS.alg)];

      const key = new nodeRSA(undefined);

      key.setOptions({
        signingScheme,
      });

      key.importKey(
        {
          n: pubKeyCose.get(COSEKEYS.n),
          e: 65537,
        },
        "components-public"
      );

      signatureIsValid = key.verify(signatureBaseBuffer, signatureBuffer);

      if (signatureIsValid) {
        response = {
          fmt: "packed",
          pubKey: key.exportKey(),
          counter: authDataStruct.counter,
          credId: base64url.encode(authDataStruct.credId),
        };
        return { signatureIsValid, response };
      }
    } else if (pubKeyCose.get(COSEKEYS.kty) === COSEKTY.OKP) {
      const x = pubKeyCose.get(COSEKEYS.x);

      const signatureBaseHash = hash(signatureBaseBuffer, hashAlg);

      const key = new elliptic.eddsa("ed25519");
      key.keyFromPublic(x);

      signatureIsValid = key.verify(signatureBaseHash, signatureBuffer, x);

      if (signatureIsValid) {
        response = {
          fmt: "packed",
          pubKey: x,
          counter: authDataStruct.counter,
          credId: base64url(authDataStruct.credId),
        };
        return { signatureIsValid, response };
      }
    }
  }

  if (!signatureIsValid) throw new Error("Failed to verify the signature!");

  const res = { signatureIsValid, response };

  return res;
};
