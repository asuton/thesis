import { Request, Response } from "express";
import { Doctor, Patient } from "../models";
import {
  getDoctorByIdQuery,
  insertDoctorAuthInfoQuery,
} from "../services/doctor";
import { getPatientByIdQuery } from "../services/patient";
import {
  WebAuthnResponseAttestation,
  clientDataJSON,
  WebAuthnResponseAssertion,
  Authr,
} from "../types/webauthn";
import base64url from "base64url";
import { verifyAuthenticatorAttestationResponse } from "../helpers/verifyAuthenticatorAttestationResponse";
import { verifyAuthenticatorAssertionResponse } from "../helpers/verifyAuthenticatorAssertionResponse";
import { generateServerGetAssertion } from "../helpers/generateServerGetAssertion";
import { generateBase64BufferChallenge } from "../helpers/webauthn";

export const generateServerMakeCredRequest = async (
  req: Request,
  res: Response
) => {
  let user: Patient | Doctor | undefined = await getPatientByIdQuery(req.id);
  if (!user) {
    user = (await Doctor.findOne(req.id)) as Doctor;
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
  req.session.user = publicKeyCredentialCreationOptions.user.displayName;

  return res.send(publicKeyCredentialCreationOptions);
};

export const webAuthnLogin = async (req: Request, res: Response) => {
  let user: Patient | Doctor | undefined = await getPatientByIdQuery(req.id);
  if (!user) {
    user = (await Doctor.findOne(req.id)) as Doctor;
  }
  if (!user.webAuthnRegistered) return res.send("Not registered");
  let getAssertion = generateServerGetAssertion(await user.authenticator);
  req.session.challenge = getAssertion.challenge;
  req.session.user = user.id;
  return res.send(getAssertion);
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
  const webAuthnResponse = req.body as WebAuthnResponseAttestation &
    WebAuthnResponseAssertion;
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
    let user: Patient | Doctor | undefined = await getPatientByIdQuery(req.id);
    if (!user) {
      user = (await Doctor.findOne(req.id)) as Doctor;
    }
    result = verifyAuthenticatorAssertionResponse(
      webAuthnResponse,
      await user.authenticator
    );
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

export const dummyRoute = (req: Request, res: Response) => {
  if (req.session.loggedIn) {
    return res.send("yaaaaaaaaaaaay");
  } else {
    return res.send("nay");
  }
};
