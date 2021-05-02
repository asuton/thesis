import { generateBase64BufferChallenge } from ".";
import { Authenticator } from "../../models";

interface GenerateServerGetAssertion {
  challenge: string;
  allowCredentials: {
    type: string;
    id: string;
    transports: string[];
  }[];
  userVerification: string;
}

export const generateServerGetAssertion = (
  authenticators: Authenticator[]
): GenerateServerGetAssertion => {
  let allowCredentials = [];
  for (let authr of authenticators) {
    allowCredentials.push({
      type: "public-key",
      id: authr.credId,
      transports: ["usb", "nfc", "ble"],
    });
  }
  return {
    challenge: generateBase64BufferChallenge(),
    allowCredentials: allowCredentials,
    userVerification: "discouraged",
  };
};
