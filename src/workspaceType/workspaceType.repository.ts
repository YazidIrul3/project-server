import { CreateWorkspaceTypeSchema } from "schemas/workspaceType";
import prisma from "../libs/prisma";

export const findWorkSpaceTypeById = async (id: string) => {
  const data = await prisma.workspaceType.findUnique({
    where: {
      id,
    },
  });

  return data;
};
export const findWorkSpaceTypeByName = async (name: string) => {
  const data = await prisma.workspaceType.findFirst({
    where: {
      name,
    },
  });

  return data;
};

export const createWorkspaceType = async (body: CreateWorkspaceTypeSchema) => {
  const data = await prisma.workspaceType.create({
    data: {
      memberCapacity: body.memberCapacity,
      name: body.name,
    },
  });

  return data;
};
