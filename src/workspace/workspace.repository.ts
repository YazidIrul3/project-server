import { UpdateWorkspaceSchema, WorkspaceSchema } from "../schemas/workspace";
import prisma from "../libs/prisma";

export const findWorkSpaceById = async (id: string) => {
  const data = await prisma.workspace.findUnique({
    where: {
      id,
    },
  });

  return data;
};

export const findWorkspacesByUserId = async (userId: string) => {
  const data = await prisma.workspace.findMany({
    where: {
      userId,
    },
    include: {
      user: true,
    },
    omit: {
      userId: true,
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

export const findWorkspaceByType = (typeName: string) => {
  const data = prisma.workspace.findMany({
    where: {
      workspaceType: {
        name: typeName,
      },
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
  const data = await prisma.workspace.create({
    data: {
      name: body.name,
      avatar: body.avatar,
      userId: body.userId,
      workspaceTypeId: body.workspaceTypeId,
      timezone: body.timezone,
    },
  });

  return data;
};

export const updateWorkspace = async (
  id: string,
  body: UpdateWorkspaceSchema
) => {
  await prisma.workspace.update({
    where: {
      id,
    },
    data: {
      name: body.name,
      timezone: body.timezone,
    },
  });
};

export const removeWorkspaceById = async (id: string) => {
  await prisma.workspace.delete({
    where: {
      id,
    },
  });
};
