import { AuthData } from "../types/webauthn";
import crypto from "crypto";
import jsrsasign from "jsrsasign";

export const parseAuthData = (buffer: Buffer): AuthData => {
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

export const hash = (alg: string, message: Buffer) => {
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
