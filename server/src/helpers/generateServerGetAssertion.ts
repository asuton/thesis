import { generateBase64BufferChallenge } from "../helpers/webauthn";
import { Authr } from "../types/webauthn";

export const generateServerGetAssertion = (authenticators: Array<Authr>) => {
  console.log(authenticators);
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
  };
};
