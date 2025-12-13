import z from "zod";

export const createProjectGroupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  projectId: z.uuid(),
  color: z.string(),
});

export const updateProjectGroupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  color: z.string(),
});

export type CreateProjectGroupSchema = z.infer<typeof createProjectGroupSchema>;
export type UpdateProjectGroupSchema = z.infer<typeof updateProjectGroupSchema>;
