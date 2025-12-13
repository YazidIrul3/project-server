import { logger } from "better-auth";
import { postProjectsGroupTemplate } from "../productGroup/projectGroup.service";
import {
  createProjectSchema,
  CreateProjectSchema,
  updateProjectSchema,
  UpdateProjectSchema,
} from "../schemas/project";
import {
  createProject,
  findProjectById,
  removeProject,
  updateProject,
} from "./project.repository";

export const getProjectById = async (id: string) => {
  const data = await findProjectById(id);

  return data;
};

export const postProject = async (body: CreateProjectSchema) => {
  const parsed = createProjectSchema.safeParse(body);
  const project = await createProject({
    name: parsed.data.name,
    template: parsed.data.template,
    workspaceId: parsed.data.workspaceId,
  });

  logger.info("project ID" + project?.id);

  const newProject = await postProjectsGroupTemplate(
    parsed.data.template,
    project.id
  );

  return newProject;
};

export const putProject = async (id: string, body: UpdateProjectSchema) => {
  const parsed = updateProjectSchema.safeParse(body);

  await updateProject(id, parsed.data);
};

export const deleteProject = async (id: string) => {
  await removeProject(id);
};
