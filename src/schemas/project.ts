import z from "zod";

export const updateProjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const createProjectSchema = z.object({
  workspaceId: z.uuid(),
  name: z.string().min(1, "Name is required"),
  template: z.string(),
});

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>;
