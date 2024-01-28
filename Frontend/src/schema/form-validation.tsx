import { z } from "zod";

export const postcodeSchema = z.object({
  name: z.string().min(1, { message: "Name of area is required" }),
  postcode: z
    .string()
    .min(4, { message: "A postcode with only 4 digits is required" }),
  state: z.string().min(2, { message: "A state must be provided" }),
  lga: z.string().min(1, { message: "A local government must be provided" }),
  population: z.number(),
});
export type FormData = z.infer<typeof postcodeSchema>;
