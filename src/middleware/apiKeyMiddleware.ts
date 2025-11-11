import { NextFunction } from "connect";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export const apiKeyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers["api-key"];

    if (!header || header != process.env.API_KEY) {
      res
        .status(401)
        .json({
          error: true,
          success: false,
          message: "Unauthorized : API Key is required",
        });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};
