import { putProject } from "project/project.service";
import {
  createProjectGroupSchema,
  CreateProjectGroupSchema,
  UpdateProjectGroupSchema,
} from "../schemas/project-group";
import {
  createProjectGroup,
  createTemplateProjectsGroup,
  findProjectGroupsByProjectId,
  removeProjectGroup,
  updateProjectGroup,
} from "./projectGroup.repository";

export const getProjectGroups = async (projectId: string) => {
  await findProjectGroupsByProjectId(projectId);
};

export const postProjectGroup = async (body: CreateProjectGroupSchema) => {
  const parsed = createProjectGroupSchema.safeParse(body);

  await createProjectGroup(parsed.data);
};

export const postProjectsGroupTemplate = async (
  template: string,
  projectId: string
) => {
  await createTemplateProjectsGroup(template, projectId);
};

export const putProjectGroup = async (
  id: string,
  body: UpdateProjectGroupSchema
) => {
  await updateProjectGroup(id, body);
};

export const deleteProjectGroup = async (id: string) => {
  await removeProjectGroup(id);
};
