import { Request, Response } from "express";
import { Doctor, Patient } from "../models";
import { getDoctorByIdQuery } from "../services/doctor";
import { getPatientByIdQuery } from "../services/patient";
import crypto from "crypto";
import base64url from "base64url";

interface publicKeyCredentialCreationOptions {
  challenge: BufferSource;
  rp: PublicKeyCredentialRpEntity;
  user: PublicKeyCredentialUserEntity;
  pubKeyCredParams: PublicKeyCredentialParameters[];
  attestation: AttestationConveyancePreference;
  timeout: number;
}
export const generateServerMakeCredRequest = async (
  req: Request,
  res: Response
): Promise<Response<publicKeyCredentialCreationOptions>> => {
  let user: Patient | Doctor | undefined = await getPatientByIdQuery(req.id);
  if (!user) {
    user = (await getDoctorByIdQuery(req.id)) as Doctor;
  }

  const publicKeyCredentialCreationOptions = {
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

  req.session.challenge = publicKeyCredentialCreationOptions.challenge;
  req.session.displayName = publicKeyCredentialCreationOptions.user.displayName;

  return res.send(publicKeyCredentialCreationOptions);
};
const generateBase64BufferChallenge = () => {
  const buffer = crypto.randomBytes(32);
  return base64url(buffer);
};

export const checkWebAuthnResponse = (req: Request, res: Response) => {
  if (
    !req.body ||
    !req.body.id ||
    !req.body.rawId ||
    !req.body.response ||
    !req.body.type ||
    req.body.type !== "public-key"
  ) {
    return res.send({
      status: "failed",
      msg:
        "Response missing one or more of id/rawId/response/type fields or type is not public key",
    });
  }
  const webAuthnResponse = req.body;
  const clientData = JSON.parse(
    base64url.decode(webAuthnResponse.response.clientDataJSON)
  );
  if (req.session && clientData.challenge !== req.session.challenge) {
    return res.send({
      status: "failed",
      message: "Challenges don't match!",
    });
  }
  if (clientData.origin !== "http://localhost:3000") {
    res.send({
      status: "failed",
      message: "Origins don't match!",
    });
  }
};
