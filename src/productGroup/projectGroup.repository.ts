import prisma from "../libs/prisma";

export const findProductsByWorkspace = () => {};

export const createTemplateProjectGroup = async (
  template: string,
  projectId: string
) => {
  if (template == "default") {
    await prisma.projectGroup.createMany({
      data: [
        { name: "planning", color: "e40e0e", projectId: projectId },
        { name: "progress", color: "e47b0c", projectId: projectId },
        { name: "finish", color: "3acd09", projectId: projectId },
      ],
    });
  }
};
