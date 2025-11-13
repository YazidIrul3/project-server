import {
  createNewSubscription,
  findAllSubcription,
  findDeleteSubscriptionById,
  findSubscriptionByName,
  findUpdateSubcriptionById,
} from "./subscription.repository";
import {
  SubcriptionBodyRequest,
  subscriptionSchema,
} from "../schemas/subscription";
import { AppError } from "../utils/appError";

// GET
export const getAllSubscriptions = async () => {
  const data = await findAllSubcription();

  return data;
};

// POST
export const createSubscriptionValidation = async (
  body: SubcriptionBodyRequest
) => {
  const parsed = subscriptionSchema.safeParse(body);
  const isExist = await findSubscriptionByName(parsed?.data?.name);

  if (isExist) {
    // throw new AppError("Name already exist", 409);

    return isExist
  }
  //  Create new data
  await createNewSubscription(
    parsed.data.name,
    parsed.data.description,
    parsed.data.monthPrice,
    parsed.data.status
  );

  return isExist;
};

// PUT
export const updateSubscription = async (
  id: string,
  body: SubcriptionBodyRequest
) => {
  const parsed = subscriptionSchema.safeParse(body);

  await findUpdateSubcriptionById(
    id,
    parsed.data.name,
    parsed.data.description,
    parsed.data.monthPrice,
    parsed.data.status
  );
};

// DELETE
export const deleteSubscriptin = async (id: string) => {
  await findDeleteSubscriptionById(id);
};
