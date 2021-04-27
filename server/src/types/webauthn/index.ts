type fmt = "packed" | "none";
type typeWebAuthnResponse = "public-key";
type typeClientDataJSON = "webauthn.create" | "webauthn.get";

export interface WebAuthnResponse {
  rawId: string;
  id: string;
  response: {
    attestationObject: string;
    authenticatorData: string;
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

export interface AuthData {
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
