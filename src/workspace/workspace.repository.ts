import { WorkspaceSchema } from "../schemas/workspace";
import prisma from "../libs/prisma";

export const findWorkSpaceById = async (id: string) => {
  const data = await prisma.workspace.findUnique({
    where: {
      id,
    },
  });

  return data;
};

export const findWorkspaceByUserId = async (userId: string) => {
  const data = await prisma.workspace.findFirst({
    where: {
      userId,
    },
  });

  return data;
};

export const findWorkspaceByUserAndName = async (
  userId: string,
  name: string
) => {
  const data = await prisma.workspace.findFirst({
    omit: {
      userId: true,
      workspaceTypeId: true,
    },
    where: {
      userId,
      name,
    },
    include: {
      user: {
        include: {
          subscription: {
            select: {
              name: true,
            },
          },
        },
      },
      workspaceType: true,
      projects: true,
    },
  });

  return data;
};

export const findWorkspaceByName = async (name: string) => {
  const data = await prisma.workspace.findFirst({
    where: {
      name,
    },
    include: {
      workspaceType: true,
      user: true,
    },
  });

  return data;
};

export const findWorkSpaces = async () => {
  const data = await prisma.workspace.findMany();

  return data;
};

export const createWorkspace = async (body: WorkspaceSchema) => {
  await prisma.workspace.create({
    data: {
      name: body.name,
      avatar: body.avatar,
      userId: body.userId,
      workspaceTypeId: body.workspaceTypeId,
      timezone: body.timezone,
    },
  });
};
