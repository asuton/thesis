import { AttestAuthData, AssertAuthData, Authr } from "../../types/webauthn";
import { Authenticator, User } from "../../models";
import crypto from "crypto";
import jsrsasign from "jsrsasign";
import base64url from "base64url";
import cbor from "cbor";

export const publicKeyCredentialCreation = (user: User) => {
  return {
    challenge: generateBase64BufferChallenge(),
    rp: {
      name: "thesis",
      //id: "thesis",
    },
    user: {
      id: user.id,
      name: user.email,
      displayName: user.name + " " + user.surname,
    },
    pubKeyCredParams: [
      { type: "public-key", alg: -7 },
      { type: "public-key", alg: -257 },
    ],
    timeout: 60000,
    attestation: "direct",
  };
};

export const generateBase64BufferChallenge = () => {
  const buffer = crypto.randomBytes(32);
  return base64url(buffer);
};

export const parseGetAttestAuthData = (buffer: Buffer): AttestAuthData => {
  const rpIdHash = buffer.slice(0, 32);
  buffer = buffer.slice(32);

  const flagsBuf = buffer.slice(0, 1);
  buffer = buffer.slice(1);
  const flagsInt = flagsBuf[0];
  const flags = {
    up: !!(flagsInt & 0x01),
    uv: !!(flagsInt & 0x04),
    at: !!(flagsInt & 0x40),
    ed: !!(flagsInt & 0x80),
    flagsInt,
  };

  const counterBuf = buffer.slice(0, 4);
  buffer = buffer.slice(4);
  const counter = counterBuf.readUInt32BE(0);

  const aaguid = buffer.slice(0, 16);
  buffer = buffer.slice(16);

  const credIDLenBuf = buffer.slice(0, 2);
  buffer = buffer.slice(2);
  const credIDLen = credIDLenBuf.readUInt16BE(0);
  const credId = buffer.slice(0, credIDLen);
  buffer = buffer.slice(credIDLen);

  const COSEPubKey = buffer;

  return {
    rpIdHash,
    flagsBuf,
    flags,
    counter,
    counterBuf,
    aaguid,
    credId,
    COSEPubKey,
  };
};

export const hash = (message: Buffer, alg: string = "SHA256") => {
  return crypto.createHash(alg).update(message).digest();
};

export const base64ToPem = (b64cert: string) => {
  let pemcert = "";
  for (let i = 0; i < b64cert.length; i += 64)
    pemcert += b64cert.slice(i, i + 64) + "\n";

  return (
    "-----BEGIN CERTIFICATE-----\n" + pemcert + "-----END CERTIFICATE-----"
  );
};

export const getCertificateInfo = (certificate: string) => {
  const subjectCert = new jsrsasign.X509();
  subjectCert.readCertPEM(certificate);

  const subjectString = subjectCert.getSubjectString();
  const subjectParts = subjectString.slice(1).split("/");

  const subject = {} as any;
  for (const field of subjectParts) {
    const kv = field.split("=");
    subject[kv[0]] = kv[1];
  }

  const version = subjectCert.getVersion();
  const basicConstraintsCA = false;

  return {
    subject,
    version,
    basicConstraintsCA,
  };
};

export const COSEECDHAtoPKCS = (COSEPublicKey: Buffer) => {
  const coseStruct = cbor.decodeAllSync(COSEPublicKey)[0];
  const tag = Buffer.from([0x04]);
  const x = coseStruct.get(-2);
  const y = coseStruct.get(-3);

  return Buffer.concat([tag, x, y]);
};

export const findAuthr = (credID: string, authenticators: Authenticator[]) => {
  for (let authr of authenticators) {
    if (authr.credId === credID) return authr;
  }

  throw new Error(`Unknown authenticator with credID ${credID}!`);
};

export const parseGetAssertAuthData = (buffer: Buffer): AssertAuthData => {
  const rpIdHash = buffer.slice(0, 32);
  buffer = buffer.slice(32);

  const flagsBuf = buffer.slice(0, 1);
  buffer = buffer.slice(1);
  const flagsInt = flagsBuf[0];
  const flags = {
    up: !!(flagsInt & 0x01),
    uv: !!(flagsInt & 0x04),
    at: !!(flagsInt & 0x40),
    ed: !!(flagsInt & 0x80),
    flagsInt,
  };

  const counterBuf = buffer.slice(0, 4);
  buffer = buffer.slice(4);
  const counter = counterBuf.readUInt32BE(0);

  return { rpIdHash, flagsBuf, flags, counter, counterBuf };
};

export const ASN1toPEM = (pkBuffer: Buffer) => {
  if (!Buffer.isBuffer(pkBuffer))
    throw new Error("ASN1toPEM: pkBuffer must be Buffer.");

  let type: string;
  if (pkBuffer.length == 65 && pkBuffer[0] == 0x04) {
    pkBuffer = Buffer.concat([
      Buffer.from(
        "3059301306072a8648ce3d020106082a8648ce3d030107034200",
        "hex"
      ),
      pkBuffer,
    ]);
    type = "PUBLIC KEY";
  } else {
    type = "CERTIFICATE";
  }

  const b64cert = pkBuffer.toString("base64");

  let PEMKey = "";
  for (let i = 0; i < Math.ceil(b64cert.length / 64); i++) {
    let start = 64 * i;
    PEMKey += b64cert.substr(start, 64) + "\n";
  }

  PEMKey = `-----BEGIN ${type}-----\n` + PEMKey + `-----END ${type}-----\n`;

  return PEMKey;
};

export const verifySignature = async (
  signature: Buffer,
  data: Buffer,
  publicKey: string
) => {
  return crypto
    .createVerify("SHA256")
    .update(data)
    .verify(publicKey, signature);
};
