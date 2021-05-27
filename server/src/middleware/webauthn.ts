import { Request, Response, NextFunction } from "express";

export const webAuthn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.session || !req.session.user) {
      return res.status(500).json({
        error: [
          {
            msg: "WebAuthn session does not exist",
          },
        ],
      });
    }
    if (req.session.user !== req.id) {
      return res.status(400).json({
        error: [
          {
            msg: "WebAuthn session invalid",
          },
        ],
      });
    }
    if (!req.session.loggedIn) {
      return res.status(400).json({
        error: [
          {
            msg: "Not webauthn verified",
          },
        ],
      });
    }
    next();
  } catch (err) {
    res.status(500).send("Server error");
  }
};
