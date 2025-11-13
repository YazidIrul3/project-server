import prisma from "../libs/prisma";

export const findSubscriptionByName = async (name: string) => {
  const data = await prisma.subscription.findUnique({
    where: {
      name,
    },
  });

  return data;
};

export const findAllSubcription = async () => {
  const data = await prisma.subscription.findMany();

  return data;
};

export const createNewSubscription = async (
  name: string,
  description: string,
  monthPrice: number,
  status: string
) => {
  const newSubscription = await prisma.subscription.create({
    data: {
      name: name,
      description: description,
      monthPrice: monthPrice,
      status: status,
    },
  });

  return newSubscription;
};

export const findUpdateSubcriptionById = async (
  id: string,
  name: string,
  description: string,
  monthPrice: number,
  status: string
) => {
  await prisma.subscription.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      monthPrice,
      status,
    },
  });
};

export const findDeleteSubscriptionById = async (id: string) => {
  await prisma.subscription.delete({
    where: {
      id,
    },
  });
};
