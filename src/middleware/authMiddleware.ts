import { NextFunction, Request, Response } from "express";
import { auth } from "../libs/auth";
import { fromNodeHeaders } from "better-auth/node";
import { AppError } from "../utils/appError";
import { logger, success } from "better-auth";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    const token = req.headers.authorization.split(" ")[1];

    if (token && session.session.token == token) {
      next();
    } else {
      logger.error("Unathorized : You nedd to login first");

      res.status(401).json({
        message: "Unathorized : You nedd to login first",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    logger.error(error);
  }
};
