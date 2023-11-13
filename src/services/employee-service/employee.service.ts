import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const employeeService = {
  getCurrentEmployee,
};

async function getCurrentEmployee(orgId: string, userId: string) {
  if (!userId) {
    return null;
  }

  const employee = await prisma.employee.findFirst({
    where: {
      userId: userId as string,
      organizationId: orgId, // You may access the organization ID from the request
    },
  });
  if (!employee) {
    return "User is not an employee in this organization";
  }
  return employee.id;
}
