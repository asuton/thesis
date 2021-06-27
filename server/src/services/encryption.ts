import * as crypto from "crypto";

export const encrypt = (plainText: string, AAD: string, key: Buffer) => {
  const iv = crypto.randomBytes(12);

  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  cipher.setAAD(Buffer.from(AAD, "utf8"));

  const encrypted = Buffer.concat([
    cipher.update(plainText, "utf8"),
    cipher.final(),
  ]);

  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, encrypted]).toString("base64");
};

export const decrypt = (cipherText: string, AAD: string, key: Buffer) => {
  const stringValue = Buffer.from(cipherText, "base64");

  const iv = stringValue.slice(0, 12);
  const tag = stringValue.slice(12, 28);
  const encrypted = stringValue.slice(28);

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);

  decipher.setAAD(Buffer.from(AAD, "utf8"));

  return decipher.update(encrypted) + decipher.final("utf8");
};
