import { fromNodeHeaders } from "better-auth/node";
import express, { NextFunction, Request, Response } from "express";
import { auth } from "../libs/auth";
import { logger } from "../libs/winston";
import { putUser } from "./user.service";
import { createSubscriptionValidation } from "../subcription/subscription.service";
import { findUserById } from "./user.repository";
import { authMiddleware } from "../middleware/authMiddleware";
import { successResponse } from "../utils/response";

const userRouter = express.Router();
const JSONbig = require("json-bigint");

userRouter.get("/me", authMiddleware, async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  const user = await findUserById(session.user.id);

  if (session.user.subcriptionId == null) {
    const subs = await createSubscriptionValidation({
      name: "Free",
      description: "Free Subscription",
      status: "active",
      monthPrice: 0,
    });

    await putUser({ subcriptionId: subs.id }, session!.user.id);
  }

  // logger.info(session);
  res.status(200).send(
    JSONbig.stringify({
      data: user,
      error: false,
      success: true,
      message: "Profile fetched successfully",
    })
  );
});

userRouter.put("/:id", async (req, res) => {
  try {
    const { body, params } = req;

    await putUser(body, params.id);

    successResponse(res, "Update user success", 201);
  } catch (error) {
    logger.error(error);
  }
});

export default userRouter;
