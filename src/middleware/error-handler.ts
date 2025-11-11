// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { logger } from "../libs/winston";
import { errorResponse } from "../utils/response";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err) {
    logger.error("Error:", err);
    errorResponse(res, err.statusCode, err.message);
  }

  next();
}
