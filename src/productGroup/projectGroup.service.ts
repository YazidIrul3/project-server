import { createTemplateProjectGroup } from "./projectGroup.repository";

export const postProjectGroup = async (template: string, projectId: string) => {
  await createTemplateProjectGroup(template, projectId);
};
