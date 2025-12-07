import prisma from "../libs/prisma";
import { CreateProjectSchema, UpdateProjectSchema } from "../schemas/project";

export const findProjectsByWorkspace = () => {};

export const findProjectById = async (id: string) => {
  const data = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  return data;
};

export const createProject = async (body: CreateProjectSchema) => {
  const project = await prisma.project.create({
    data: {
      name: body?.name,
      workspaceId: body?.workspaceId,
    },
  });

  return project;
};

export const updateProject = async (id: string, body: UpdateProjectSchema) => {
  const project = await prisma.project.update({
    where: {
      id,
    },
    data: {
      name: body?.name,
    },
  });

  return project;
};

export const removeProject = async (id: string) => {
  await prisma.project.delete({
    where: {
      id,
    },
  });
};
