import { Request, Response } from "express";

export const setup = async (_req: Request, res: Response) => {
  return res.send("setup");
};
