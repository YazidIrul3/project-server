import z from "zod";

export const createProjectGroupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  projectId: z.uuid(),
  color: z.string(),
});

export type CreateProjectSchema = z.infer<typeof createProjectGroupSchema>;
