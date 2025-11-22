import z from "zod";

export const createWorkspaceTypeSchema = z.object({
  name: z.string(),
  memberCapacity: z.int(),
});

export type CreateWorkspaceTypeSchema = z.infer<typeof createWorkspaceTypeSchema>;
