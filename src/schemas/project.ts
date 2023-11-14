import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(4),
  expectedDuration: z.string().min(5),
  status: z.string().default("In progress"),
  startDate: z.string().refine((date) => {
    // Custom validation to check if the date string is valid
    return !isNaN(Date.parse(date));
  }, {
    message: "Invalid start date",
  }),
  endDate: z.string().refine((date) => {
    // Custom validation to check if the date string is valid
    return !isNaN(Date.parse(date));
  }, {
    message: "Invalid end date",
  }),
  description: z.string().optional(),
});

export type projectSchemaType = z.infer<typeof projectSchema>;
