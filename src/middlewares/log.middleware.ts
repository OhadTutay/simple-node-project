import { NextFunction, Request, Response } from "express";

export const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("Route:", req.url);
  try {
    next();
  } catch (e) {
    console.error("Error in route:", req.url);
    console.error({ exception: e });
    res.sendStatus(500);
  }
};
