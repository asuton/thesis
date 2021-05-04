type fmt = "packed" | "none" | "fido-u2f";
type typeWebAuthnResponse = "public-key";
type typeClientDataJSON = "webauthn.create" | "webauthn.get";

export interface WebAuthnResponseAttestation {
  rawId: string;
  id: string;
  response: {
    attestationObject: string;
    clientDataJSON: string;
  };
  getClientExtenstionResults?: {};
  type: typeWebAuthnResponse;
}

export interface WebAuthnResponseAssertion {
  rawId: string;
  id: string;
  response: {
    authenticatorData: string;
    signature: string;
    userHandle: string;
    clientDataJSON: string;
  };
  getClientExtenstionResults?: {};
  type: typeWebAuthnResponse;
}

export interface clientDataJSON {
  challenge: string;
  origin: string;
  type: typeClientDataJSON;
}

export interface AttestationStruct {
  fmt: fmt;
  authData: Buffer;
  attStmt: {
    alg: number;
    sig: Buffer;
    x5c: Buffer[];
    ecdaaKeyId?: undefined;
  };
}

export interface Authr {
  fmt: string;
  pubKey: string;
  counter: number;
  credId: string;
}

export interface AttestAuthData {
  rpIdHash: Buffer;
  flagsBuf: Buffer;
  flags: {
    up: boolean;
    uv: boolean;
    at: boolean;
    ed: boolean;
    flagsInt: number;
  };
  counter: number;
  counterBuf: Buffer;
  aaguid: Buffer;
  credId: Buffer;
  COSEPubKey: Buffer;
}

export interface AssertAuthData {
  rpIdHash: Buffer;
  flagsBuf: Buffer;
  flags: {
    up: boolean;
    uv: boolean;
    at: boolean;
    ed: boolean;
    flagsInt: number;
  };
  counter: number;
  counterBuf: Buffer;
}

export interface VerifyAttestation {
  signatureIsValid: boolean;
  response: Authr | undefined;
}

export interface GenerateServerGetAssertion {
  challenge: string;
  allowCredentials: {
    type: string;
    id: string;
    transports: string[];
  }[];
  userVerification: string;
}
