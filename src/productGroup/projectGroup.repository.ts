import prisma from "../libs/prisma";
import {
  CreateProjectGroupSchema,
  UpdateProjectGroupSchema,
} from "../schemas/project-group";

export const findProjectGroupsByProjectId = async (projectId: string) => {
  await prisma.projectGroup.findMany({
    where: {
      projectId,
    },
  });
};

export const createProjectGroup = async (body: CreateProjectGroupSchema) => {
  await prisma.projectGroup.create({
    data: {
      color: body.color,
      name: body.name,
      projectId: body.projectId,
    },
  });
};

export const createTemplateProjectsGroup = async (
  template: string,
  projectId: string
) => {
  if (template.toLowerCase() == "default") {
    await prisma.projectGroup.createMany({
      data: [
        { name: "planning", color: "#e40e0e", projectId: projectId },
        { name: "progress", color: "#e47b0c", projectId: projectId },
        { name: "finish", color: "#3acd09", projectId: projectId },
      ],
    });
  }
};

export const updateProjectGroup = async (
  id: string,
  body: UpdateProjectGroupSchema
) => {
  await prisma.projectGroup.update({
    where: {
      id,
    },
    data: {
      name: body.name,
      color: body.color,
    },
  });
};

export const removeProjectGroup = async (id: string) => {
  await prisma.projectGroup.delete({
    where: {
      id,
    },
  });
};
