export const COSEKEYS: any = {
  kty: 1,
  alg: 3,
  crv: -1,
  x: -2,
  y: -3,
  n: -1,
  e: -2,
};

export const COSEKTY: any = {
  OKP: 1,
  EC2: 2,
  RSA: 3,
};

export const COSERSASCHEME: any = {
  "-3": "pss-sha256",
  "-39": "pss-sha512",
  "-38": "pss-sha384",
  "-65535": "pkcs1-sha1",
  "-257": "pkcs1-sha256",
  "-258": "pkcs1-sha384",
  "-259": "pkcs1-sha512",
};

export const COSECRV: any = {
  "1": "p256",
  "2": "p384",
  "3": "p521",
};

export const COSEALGHASH: any = {
  "-257": "sha256",
  "-258": "sha384",
  "-259": "sha512",
  "-65535": "sha1",
  "-39": "sha512",
  "-38": "sha384",
  "-37": "sha256",
  "-260": "sha256",
  "-261": "sha512",
  "-7": "sha256",
  "-36": "sha512",
};
