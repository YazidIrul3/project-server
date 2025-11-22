import express, { NextFunction, Request, Response } from "express";
import { logger } from "../libs/winston";
import {
  getWorkspace,
  getWorkspaceByUserIdAndWorkspaceName,
  getWorkspaces,
  postWorkspace,
} from "./workspace.service";
import { successResponse } from "../utils/response";
import { validate } from "../middleware/validate";
import { createWorkspaceSchema } from "../schemas/workspace";

const workspaceRouter = express.Router();

workspaceRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, name } = req.query;

      logger.info(user.toString());
      logger.info(name);

      if (user && name) {
        const data = await getWorkspaceByUserIdAndWorkspaceName(
          user.toString(),
          name.toString()
        );

        logger.info(data);
        successResponse(res, "Fetched workspaces data success", 200, data);
      }

      const data = await getWorkspaces();

      successResponse(res, "Fetched workspaces data success", 200, data);
    } catch (error) {
      logger.error(error);

      next(error);
    }
  }
);
workspaceRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const data = await getWorkspace(id);

      successResponse(res, "Workspaces are data fetched", 200, data);
    } catch (error) {
      logger.error(error);

      next(error);
    }
  }
);

workspaceRouter.post(
  "/",
  validate(createWorkspaceSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;

      await postWorkspace({
        avatar: body.avatar,
        name: body.name,
        timezone: body.timezone,
        userId: body.userId,
        workspaceTypeName: body.workspaceTypeName,
      });

      successResponse(res, "Workspaces created success", 201);
    } catch (error) {
      logger.error(error);

      next(error);
    }
  }
);

export default workspaceRouter;
