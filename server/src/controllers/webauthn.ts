import { Request, Response } from "express";
import { Doctor, Patient } from "../models";
import {
  getDoctorByIdQuery,
  insertDoctorAuthInfoQuery,
} from "../services/doctor";
import { getPatientByIdQuery } from "../services/patient";
import { WebAuthnResponse, clientDataJSON } from "../types/webauthn";
import crypto from "crypto";
import base64url from "base64url";
import { verifyAuthenticatorAttestationResponse } from "../helpers/verifyAuthenticatorAttestationResponse";

export const generateServerMakeCredRequest = async (
  req: Request,
  res: Response
) => {
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

export const checkWebAuthnResponse = async (req: Request, res: Response) => {
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
  const webAuthnResponse = req.body as WebAuthnResponse;
  const clientData = JSON.parse(
    base64url.decode(webAuthnResponse.response.clientDataJSON)
  ) as clientDataJSON;

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

  let result: any;

  if (webAuthnResponse.response.attestationObject !== undefined) {
    result = verifyAuthenticatorAttestationResponse(webAuthnResponse);
  } else if (webAuthnResponse.response.authenticatorData !== undefined) {
  } else {
    res.send({
      status: "failed",
      message: "Can not determine type of response!",
    });
  }

  if (result.signatureIsValid) {
    req.session.loggedIn = true;
    const response = await insertDoctorAuthInfoQuery(result.response, req.id);
    console.log(response);
    res.json({ status: "ok" });
  } else {
    res.json({
      status: "failed",
      message: "Can not authenticate signature!",
    });
  }
};
