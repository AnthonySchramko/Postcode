import { z } from "zod";

export const postcodeSchema = z.object({
  name: z.string().min(1, { message: "Name of area is required" }),
  postcode: z
    .string()
    .refine((value) => /^(0[289][0-9]{2})|([1-9][0-9]{3})$/.test(value), {
      message: "Please provide a valid Australian postcode",
    }),
  state: z.string().min(2, { message: "A state must be provided" }),
  lga: z.string().min(1, { message: "A local government must be provided" }),
  population: z.number(),
});
export type FormData = z.infer<typeof postcodeSchema>;
