import { z } from "zod";

export const projectEmp = z.object({
  employeeId: z.string(),
  role: z.string(),
});

export type projectEmpType = z.infer<typeof projectEmp>;

export const projectRole = z.object({
  role: z.string(),
});

export type projectRoleType = z.infer<typeof projectRole>;
