export interface Credential {
  id: string;
  rawId: ArrayBuffer;
  response: {
    attestationObject: ArrayBuffer;
    clientDataJSON: ArrayBuffer;
    signature: ArrayBuffer;
    authenticatorData: ArrayBuffer;
  };
  type: string;
}

export interface WebAuthnResponse {
  id: string;
  rawId: string;
  response: {
    attestationObject?: string;
    clientDataJSON: string;
    signature?: string;
    authenticatorData?: string;
  };
  type: string;
}

export const preformatMakeCredReq = (
  makeCredReq: any
): PublicKeyCredentialCreationOptions => {
  makeCredReq.challenge = Uint8Array.from(
    atob(makeCredReq.challenge.replace(/\-/g, "+").replace(/\_/g, "/")),
    (c) => c.charCodeAt(0)
  );
  makeCredReq.user.id = Uint8Array.from(
    atob(makeCredReq.user.id.replace(/\-/g, "+").replace(/\_/g, "/")),
    (c) => c.charCodeAt(0)
  );
  return makeCredReq;
};

export const preformatGetAssertReq = (getAssert: any) => {
  getAssert.challenge = Uint8Array.from(
    atob(getAssert.challenge.replace(/\-/g, "+").replace(/\_/g, "/")),
    (c) => c.charCodeAt(0)
  );
  for (let allowCred of getAssert.allowCredentials) {
    allowCred.id = Uint8Array.from(
      atob(allowCred.id.replace(/\-/g, "+").replace(/\_/g, "/")),
      (c) => c.charCodeAt(0)
    );
  }
  return getAssert;
};

export const bufferToString = (buffer: ArrayBuffer): string => {
  return Buffer.from(buffer)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
};

export const convertCredToRes = (credential: Credential): WebAuthnResponse => {
  const id = credential.id;
  const rawId = bufferToString(credential.rawId);
  const clientDataJSON = bufferToString(credential.response.clientDataJSON);
  const type = credential.type;
  if (credential.response.attestationObject) {
    const attestationObject = bufferToString(
      credential.response.attestationObject
    );
    return {
      id,
      rawId,
      response: {
        attestationObject,
        clientDataJSON,
      },
      type,
    };
  } else if (credential.response.authenticatorData) {
    const authenticatorData = bufferToString(
      credential.response.authenticatorData
    );
    const signature = bufferToString(credential.response.signature);
    return {
      id,
      rawId,
      response: {
        authenticatorData,
        clientDataJSON,
        signature,
      },
      type,
    };
  } else {
    throw new Error("Can't convert credential");
  }
};
