import { z } from "zod";

export const orgSchema = z.object({
  name: z.string().min(4),
  address: z.string().optional(),
});

export type orgSchemaType = z.infer<typeof orgSchema>;