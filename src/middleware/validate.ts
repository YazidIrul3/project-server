import { logger } from "better-auth";
import { error } from "console";
import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validate =
  <T>(schema: ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      logger.error(result.error.message);

      return res
        .status(400)
        .json({ success: false, error: result.error.issues });
    }

    next();
  };
