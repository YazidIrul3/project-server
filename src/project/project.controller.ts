import { logger } from "better-auth";
import express, { Request, Response, NextFunction } from "express";
import { validate } from "../middleware/validate";
import { createProjectSchema } from "../schemas/project";
import { getProjectById, postProject } from "./project.service";
import { successResponse } from "../utils/response";

const projectRouter = express.Router();

projectRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const data = await getProjectById(id);

      successResponse(res, "Fetch project by id success", 200, data);
    } catch (error) {
      logger.error(error);

      next(error);
    }
  }
);

projectRouter.post(
  "/",
  validate(createProjectSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, template, workspaceId } = req.body;

      await postProject({
        name,
        template,
        workspaceId,
      });

      successResponse(res, "Create project success", 201);
    } catch (error) {
      logger.error(error);

      next(error);
    }
  }
);

export default projectRouter;
