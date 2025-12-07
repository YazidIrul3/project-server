import { postProjectGroup } from "../productGroup/projectGroup.service";
import { createProjectSchema, CreateProjectSchema } from "../schemas/project";
import { createProject, findProjectById } from "./project.repository";

export const getProjectById = async (id: string) => {
  const data = await findProjectById(id);

  return data;
};

export const postProject = async (body: CreateProjectSchema) => {
  const parsed = createProjectSchema.safeParse(body);
  const project = await createProject(parsed.data);

  await postProjectGroup(parsed.data.template, project.id);
};
