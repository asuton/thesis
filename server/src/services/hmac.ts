import * as crypto from "crypto";
import { HMAC_KEY } from "../utils/constants";

export const createSignature = (content: string) => {
  const hmac = crypto.createHmac("sha256", HMAC_KEY);
  hmac.update(content);
  const authTag = hmac.digest();
  return authTag;
};
export const verifySignature = (content: string, authTagDb: Buffer) => {
  const hmac = crypto.createHmac("sha256", HMAC_KEY);
  hmac.update(content);
  const authTag = hmac.digest();
  const comparedAuth = crypto.timingSafeEqual(authTag, authTagDb);
  if (!comparedAuth) {
    throw new Error("Auth tags are different");
  }
  return comparedAuth;
};
