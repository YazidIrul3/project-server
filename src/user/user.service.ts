import { userSchema } from "../schemas/user";
import { findSubscriptionByName } from "../subcription/subscription.repository";
import { AppError } from "../utils/appError";
import {
  createUser,
  findUserByGoogleId,
  findUserById,
  updateUser,
} from "./user.repository";

interface AuthType {
  id?: string;
  email?: string;
  verified_email?: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  locale?: string;
}

interface PutBodyRequest {
  name?: string;
  timezone?: string;
  number_phone?: string;
  subcriptionId?: string;
}

export const putUser = async (body: PutBodyRequest, userId: string) => {
  await updateUser(body, userId);
};
