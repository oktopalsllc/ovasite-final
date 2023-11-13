"use server";
import axiosInstance from "@/lib/axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// export const employeeService = {
// };

export async function getCurrentEmployee(orgId: string, userId: string) {
  if (!userId) {
    return null;
  }

  const employee = await prisma.employee.findFirst({
    where: {
      userId: userId,
      organizationId: orgId,
    },
  });
  if (!employee) {
    return "User is not an employee in this organization";
  }
  return employee.id as string;
}
