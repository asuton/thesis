import { AppAbility } from "../../src/services/abilities";
declare global {
  namespace Express {
    interface Request {
      id: string;
      ability: AppAbility;
    }
  }
}

declare module "express-session" {
  interface SessionData {
    challenge: string;
    user: string;
    loggedIn: boolean;
  }
}
