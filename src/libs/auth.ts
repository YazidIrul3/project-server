import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import config from "../config/config";
import { createUser } from "../user/user.repository";
import {
  createNewSubscription,
  findSubscriptionByName,
} from "../subcription/subscription.repository";

export const auth = betterAuth({
  socialProviders: {
    google: {
      enabled: true,
      clientId: config.GOOGLE_CLIENT_ID as string,
      clientSecret: config.GOOGLE_CLIENT_SECRET as string,
      prompt: "select_account",
      accessType: "offline",
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  basePath: "/api/auth",
  trustedOrigins: [config.FRONT_END_URL, config.BACKEND_URL],

  database: prismaAdapter(prisma, { provider: "postgresql" }),

  user: {
    additionalFields: {
      subcriptionId: {
        type: "string",
        required: false,
        references: {
          model: "Subscription",
          field: "id",
        },
      },
      google_id: { type: "string", required: false },
      number_phone: { type: "string", required: false, defaultValue: "" },
      timezone: { type: "string", required: false, defaultValue: "" },
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60,
    },
  },
});
