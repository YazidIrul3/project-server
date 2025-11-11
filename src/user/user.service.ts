// import { userSchema } from "../schemas/user";
// import { findSubscriptionByName } from "../subcription/subscription.repository";
// import { AppError } from "../utils/appError";
// import {
//   createUser,
//   findUserByGoogleId,
//   findUserById,
//   updateUser,
// } from "./user.repository";

// interface AuthType {
//   id?: string;
//   email?: string;
//   verified_email?: boolean;
//   name?: string;
//   given_name?: string;
//   family_name?: string;
//   picture?: string;
//   locale?: string;
// }

// interface PutBodyRequest {
//   name: string;
//   timezone: string;
//   number_phone: string;
//   subcription_id: string;
// }

// export const postUser = async (body: AuthType) => {
//   // const parsed = userSchema.safeParse(body);
//   const subscription = await findSubscriptionByName("free");

//   if (!subscription) {
//     throw new AppError("Subscription Data Not Found", 404);
//   }

//   await createUser(body, subscription?.id);
// };

// export const authWithGoogle = async (data: AuthType) => {
//   const userExisted = await findUserByGoogleId(data?.id);

//   if (!userExisted) {
//     await postUser(data);
//   }
// };

// export const userProfile = async (id: string) => {
//   const user = await findUserById(id);

//   return user;
// };

// export const putUser = async (body: PutBodyRequest, userId: string) => {
//   await updateUser(body, userId);
// };
