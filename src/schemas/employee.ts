import { z } from "zod";

export const empRoleSchema = z.object({
  employeeId: z.string(),
  role: z.string(),
});

export type empRoleType = z.infer<typeof empRoleSchema>;

export const inviteSchema = z.object({
  email: z.string(),
  role: z.string(),
});

export type inviteSchemaType = z.infer<typeof inviteSchema>;
