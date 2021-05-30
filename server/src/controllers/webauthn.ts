import { Request, Response } from "express";
import {
  WebAuthnResponseAttestation,
  clientDataJSON,
  WebAuthnResponseAssertion,
  Authr,
} from "../types/webauthn";
import { verifyAuthenticatorAttestationResponse } from "../helpers/webauthn/verifyAuthenticatorAttestationResponse";
import { verifyAuthenticatorAssertionResponse } from "../helpers/webauthn/verifyAuthenticatorAssertionResponse";
import {
  publicKeyCredentialCreation,
  generateServerGetAssertion,
} from "../helpers/webauthn";
import base64url from "base64url";
import { findUserById, insertAuthInfoQuery } from "../services/user";

export const generateServerMakeCredRequest = async (
  req: Request,
  res: Response
) => {
  const user = await findUserById(req.id);

  if (!user) {
    return res.status(500).send("Could not find user");
  }

  const publicKeyCredentialCreationOptions = publicKeyCredentialCreation(user);

  req.session.challenge = publicKeyCredentialCreationOptions.challenge;
  req.session.user = publicKeyCredentialCreationOptions.user.id;

  return res.send(publicKeyCredentialCreationOptions);
};

export const webAuthnLogin = async (req: Request, res: Response) => {
  const user = await findUserById(req.id);

  if (!user || !user.webAuthnRegistered)
    return res.status(401).json({
      error: [
        {
          msg: "Not webauthn registered!",
        },
      ],
    });

  const getAssertion = generateServerGetAssertion(await user.authenticator);

  req.session.challenge = getAssertion.challenge;
  req.session.user = user.id;

  return res.status(201).send(getAssertion);
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
    return res.status(400).json({
      error: [
        {
          msg: `Response missing one or more of 
          id/rawId/response/type fields or type is not public key`,
        },
      ],
    });
  }

  const webAuthnResponse = req.body as WebAuthnResponseAttestation &
    WebAuthnResponseAssertion;

  const clientData = JSON.parse(
    base64url.decode(webAuthnResponse.response.clientDataJSON)
  ) as clientDataJSON;

  if (req.session && clientData.challenge !== req.session.challenge) {
    return res.status(400).send("Challenges don't match!");
  }

  if (clientData.origin !== "http://localhost:3000") {
    return res.status(400).send("Origins don't match!");
  }

  if (!req.session.user && req.session.user !== req.id) {
    return res.status(400).send("Invalid session");
  }

  let result: {
    signatureIsValid?: boolean;
    verified?: boolean;
    response?: Authr;
  } = { signatureIsValid: false, verified: false };

  if (webAuthnResponse.response.attestationObject !== undefined) {
    result = await verifyAuthenticatorAttestationResponse(webAuthnResponse);
  } else if (webAuthnResponse.response.authenticatorData !== undefined) {
    const user = await findUserById(req.session.user);
    if (!user) {
      return res.status(500).json({
        error: [
          {
            msg: "Could not find user",
          },
        ],
      });
    }
    result = await verifyAuthenticatorAssertionResponse(
      webAuthnResponse,
      await user.authenticator
    );
  } else {
    res.status(400).json({
      error: [
        {
          msg: "Could not determine type of response!",
        },
      ],
    });
  }

  if (result.signatureIsValid && result.response) {
    req.session.loggedIn = true;
    await insertAuthInfoQuery(result.response, req.id);
    return res.status(200).send("Registered");
  } else if (result.verified) {
    req.session.loggedIn = true;
    return res.status(200).send("Logged in");
  } else {
    return res.status(500).json({
      error: [
        {
          msg: "Can not authenticate signature!",
        },
      ],
    });
  }
};
