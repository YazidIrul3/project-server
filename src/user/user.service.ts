import { updateUser } from "./user.repository";

interface PutBodyRequest {
  name?: string;
  timezone?: string;
  number_phone?: string;
  subcriptionId?: string;
}

export const putUser = async (body: PutBodyRequest, userId: string) => {
  await updateUser(body, userId);
};
