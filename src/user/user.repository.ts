import {
  createNewSubscription,
  findSubscriptionByName,
} from "../subcription/subscription.repository";
import prisma from "../libs/prisma";

interface AuthType {
  id?: string;
  email?: string;
  verified_email?: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  timezone?: string;
}

interface UpdateBodyRequest {
  name?: string;
  timezone?: string;
  number_phone?: string;
  subcriptionId?: string;
}

export const findUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    omit: {
      subscriptionId: true,
    },
    where: {
      id,
    },
    include: {
      subscription: true,
    },
  });

  return user;
};

export const findUserByGoogleId = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      google_id: id,
    },
  });

  return user;
};

export const createUser = async (body: AuthType) => {
  let freeSubscription = await findSubscriptionByName("free");

  if (!freeSubscription) {
    freeSubscription = await createNewSubscription(
      "free",
      "Free Subscription",
      0,
      "active"
    );
  }

  await prisma.user.create({
    data: {
      google_id: body.id,
      name: body.name,
      number_phone: "",
      email: body.email,
      timezone: body.timezone || "",
      subscriptionId: freeSubscription.id, // sesuai schema
    },
  });
};

export const updateUser = async (body: UpdateBodyRequest, userId: string) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: body?.name,
      number_phone: body?.number_phone,
      timezone: body?.timezone,
      subscriptionId: body?.subcriptionId,
    },
  });
};
