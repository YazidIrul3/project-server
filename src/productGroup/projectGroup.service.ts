import {
  createProjectGroupSchema,
  CreateProjectGroupSchema,
} from "../schemas/project-group";
import {
  createProjectGroup,
  createTemplateProjectsGroup,
  findProjectGroupsByProjectId,
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
