import z from "zod";

export const userSchema = z.object({
  subcription_id: z.uuid(),
  google_id: z.uuid(),
  name: z.string().min(1, "Name is required"),
  email: z.email("The email is field is not email"),
  number_phone: z.string().min(9, "Number phone need to have 9 digits or more"),
  timezone: z.string("Timezone must be string"),
});

export const updateUserSchema = z.object({
  subcription_id: z.uuid(),
  name: z.string().min(1, "Name is required"),
  number_phone: z.string().min(9, "Number phone need to have 9 digits or more"),
  timezone: z.string("Timezone must be string"),
});

export type UserBodyRequest = z.infer<typeof userSchema>;
