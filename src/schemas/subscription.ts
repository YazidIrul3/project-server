import z from "zod";

export const subscriptionSchema = z.object({
  name: z.string().min(1, "Name is required").toLowerCase(),
  description: z.string().min(1, "Description is required"),
  month_price: z.number(),
  status: z.string().toLowerCase(),
});

export type SubcriptionBodyRequest = z.infer<typeof subscriptionSchema>;
