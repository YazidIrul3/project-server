import {
  createWorkspaceTypeSchema,
  CreateWorkspaceTypeSchema,
} from "../schemas/workspaceType";
import {
  createWorkspaceType,
  findWorkSpaceTypeByName,
} from "./workspaceType.repository";

export const postWorkspaceType = async (body: CreateWorkspaceTypeSchema) => {
  const parsed = createWorkspaceTypeSchema.safeParse(body);
  const data = await findWorkSpaceTypeByName(parsed.data.name);

  if (data.id) {
    return data;
  } else {
    const newWorkspaceType = await createWorkspaceType({
      name: parsed.data.name,
      memberCapacity: parsed.data.memberCapacity,
    });

    return newWorkspaceType;
  }
};
