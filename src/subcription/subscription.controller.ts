import express, { NextFunction, Request, Response } from "express";
import { logger } from "../libs/winston";
import { validate } from "../middleware/validate";
import { subscriptionSchema } from "../schemas/subscription";
import {
  createSubscriptionValidation,
  deleteSubscriptin,
  getAllSubscriptions,
  updateSubscription,
} from "./subscription.service";
import { errorResponse, successResponse } from "../utils/response";

const JSONbig = require("json-bigint");

const subscriptionRouter = express.Router();

// GET
subscriptionRouter.get("/", async (req: Request, res: Response) => {
  try {
    const data = await getAllSubscriptions();

    res.setHeader("Content-Type", "application/json");
    res.send(
      JSONbig.stringify({
        data,
        error: false,
        success: true,
        message: "Subscriptions fetched successfully",
      })
    );
  } catch (error) {
    logger.error(error);
  }
});

// POST
subscriptionRouter.post(
  "/",
  validate(subscriptionSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;

      await createSubscriptionValidation(body);

      res.status(201).json({
        error: false,
        success: true,
        message: "New Subcription created",
      });
    } catch (error) {
      logger.error(error);

      errorResponse(res, error.statusCode, error.message);
    }
  }
);

// PUT
subscriptionRouter.put(
  "/:id",
  validate(subscriptionSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body, params } = req;

      await updateSubscription(params?.id, body);

      return successResponse(res, 201, "Subscription updated");
    } catch (error) {
      logger.error(error);

      errorResponse(res, error.statusCode, error.message);
      // return errorResponse(res, error.statusCode, error.message);
      // next(error);
    }
  }
);

subscriptionRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { params } = req;

      await deleteSubscriptin(params?.id);

      return successResponse(res, 201, "Subscription deleted");
    } catch (error) {
      logger.error(error);

      next(error);
    }
  }
);
export default subscriptionRouter;
