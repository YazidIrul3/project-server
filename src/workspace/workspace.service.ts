import { postWorkspaceType } from "../workspaceType/workspaceType.service";
import {
  createWorkspaceSchema,
  CreateWorkspaceSchema,
} from "../schemas/workspace";
import {
  createWorkspace,
  findWorkSpaceById,
  findWorkspaceByName,
  findWorkspaceByUserAndName,
  findWorkSpaces,
} from "./workspace.repository";
import { AppError } from "../utils/appError";

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

 return data
};

export const postWorkspace = async (body: CreateWorkspaceSchema) => {
  const parsed = createWorkspaceSchema.safeParse(body);
  const workspaceType = await postWorkspaceType({
    name: parsed.data.workspaceTypeName,
    memberCapacity:
      parsed.data.workspaceTypeName == "personal"
        ? 1
        : parsed.data.workspaceTypeName == "organisation"
        ? 4
        : 10,
  });

  const data = await findWorkspaceByName(body.name);
  const dataWorkspaceByUserAndName = await findWorkspaceByUserAndName(
    body.userId,
    body.workspaceTypeName
  );

  if (data) {
    return data;
  } else if (dataWorkspaceByUserAndName) {
    return dataWorkspaceByUserAndName;
  } else {
    await createWorkspace({
      name: parsed.data.name,
      avatar: parsed.data.avatar,
      timezone: parsed.data.timezone,
      userId: parsed.data.userId,
      workspaceTypeId: workspaceType.id,
    });
  }
};
