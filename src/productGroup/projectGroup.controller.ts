import { logger } from "better-auth";
import { NextFunction, Request, Response } from "express";
import { validate } from "../middleware/validate";
import {
  createProjectGroupSchema,
  updateProjectGroupSchema,
} from "../schemas/project-group";
import {
  deleteProjectGroup,
  postProjectGroup,
  putProjectGroup,
} from "./projectGroup.service";
import { successResponse } from "../utils/response";

const express = require("express");
const projectGroupRouter = express.Router();

projectGroupRouter.post(
  "/",
  validate(createProjectGroupSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;

      await postProjectGroup({
        name: body.name,
        projectId: body.projectId,
        color: body.color,
      });

      successResponse(res, "Project group created successfully", 201);
    } catch (error) {
      logger.error(error);

      next(error);
    }
  }
);

projectGroupRouter.put(
  "/:id",
  validate(updateProjectGroupSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body, params } = req;

      await putProjectGroup(params.id, {
        name: body.name,
        color: body.color,
      });

      successResponse(res, "Project group updated successfully", 201);
    } catch (error) {
      logger.error(error);

      next(error);
    }
  }
);

projectGroupRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { params } = req;

      await deleteProjectGroup(params.id);

      successResponse(res, "Project group deleted successfully", 201);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
);

export default projectGroupRouter;
