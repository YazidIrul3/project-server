import { postWorkspaceType } from "../workspaceType/workspaceType.service";
import {
  createWorkspaceSchema,
  CreateWorkspaceSchema,
  updateWorkspaceSchema,
  UpdateWorkspaceSchema,
} from "../schemas/workspace";
import {
  createWorkspace,
  findWorkSpaceById,
  findWorkspaceByName,
  findWorkspaceByUserAndName,
  findWorkspacesByUserId,
  findWorkSpaces,
  removeWorkspaceById,
  findWorkspaceByType,
  updateWorkspace,
} from "./workspace.repository";

export const getWorkspaces = async () => {
  await findWorkSpaces();
};

export const getWorkspace = async (id: string) => {
  await findWorkSpaceById(id);
};

export const getWorkspaceByUserIdAndWorkspaceName = async (
  userId: string,
  name: string
) => {
  const data = await findWorkspaceByUserAndName(userId, name);

  return data;
};

export const getWorkspacesByUserId = async (userId: string) => {
  const data = await findWorkspacesByUserId(userId);

  return data;
};

export const postWorkspace = async (body: CreateWorkspaceSchema) => {
  const parsed = createWorkspaceSchema.safeParse(body);
  const data = await findWorkspaceByName(body.name);
  const workspaceType = await postWorkspaceType({
    name: parsed.data.workspaceTypeName.toLowerCase(),
    memberCapacity:
      parsed.data.workspaceTypeName.toLowerCase() == "personal"
        ? 1
        : parsed.data.workspaceTypeName.toLowerCase() == "team"
        ? 4
        : 10,
  });
  const dataWorkspaceByUserAndName = await findWorkspaceByUserAndName(
    parsed.data.userId,
    parsed.data.workspaceTypeName
  );
  const dataWorkspaceByType = await findWorkspaceByType("personal");

  if (data) {
    return data;
  } else if (dataWorkspaceByUserAndName) {
    return dataWorkspaceByUserAndName;
  } else {
    if (workspaceType.name == "personal") {
      if (dataWorkspaceByType.length < 1) {
        await createWorkspace({
          name: parsed.data.name,
          avatar: parsed.data.avatar,
          timezone: parsed.data.timezone,
          userId: parsed.data.userId,
          workspaceTypeId: workspaceType.id,
        });
      }
    }

    await createWorkspace({
      name: parsed.data.name,
      avatar: parsed.data.avatar,
      timezone: parsed.data.timezone,
      userId: parsed.data.userId,
      workspaceTypeId: workspaceType.id,
    });
  }
};

export const putWorkspace = async (id: string, body: UpdateWorkspaceSchema) => {
  const parsed = updateWorkspaceSchema.safeParse(body);

  await updateWorkspace(id, {
    name: parsed.data.name,
    timezone: parsed.data.timezone,
  });
};

export const deleteWorkspace = async (id: string) => {
  await removeWorkspaceById(id);
};
