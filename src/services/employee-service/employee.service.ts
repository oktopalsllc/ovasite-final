import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userString =
  typeof window !== "undefined" ? localStorage.getItem("userId") : "";
const userId = userString?.toString() || "";

export const employeeService = {
    getCurrentEmployee,
};

async function getCurrentEmployee(orgId: string) {
  if (!userId) {
    return null;
  }

  const employee = await prisma.employee.findFirst({
    where: {
      userId: userId as string,
      organizationId: orgId as string, // You may access the organization ID from the request
    },
  });
  if (!employee) {
    return "User is not an employee in this organization";
  }
  return employee.id;
}
