"use server";
import axiosInstance from "@/lib/axios";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();
const apiUrl = process.env.API_URL;
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

export async function getOrgEmployees(orgId: string, token: string) {
  const response = await axios.get(`${apiUrl}/orgs/${orgId}/employees`, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

export async function checkInvite(inviteCode: string){
  const invite = await prisma.invite.findFirst({
    where: { token: inviteCode },
  });

  if (!invite || invite.expirationDate < new Date()) {
    return false;
  }

  return true;
}

export async function userExists(inviteCode: string) {
  const invite = await prisma.invite.findFirst({
    where: { token: inviteCode },
  });

  const user = await prisma.user.findUnique({
    where: { email: invite?.email.toLowerCase()},
  });

  if (!user) {
    return false;
  }
  
  return true;
}

export async function getCurrentOrg(orgId: string) {
  const org = await prisma.organization.findUnique({
    where: {
      id: orgId,
    },
    select: {
      id: true,
      name: true,
    }
  });
  return org;
}

export async function currentEmployee(orgId: string, userId: string) {
  const employee = await prisma.employee.findFirst({
    where: {
      userId: userId,
      organizationId: orgId,
    },
    select: {
      id: true,
      fullName: true,
      role: true,
      avatar:true
    }
  });
  return employee;
}

export async function getUserOrgs(userId:string){
  const userOrgs = await prisma.organization.findMany({
    where: {
       employees: { some: { userId: userId } } ,
    },
    select: {
      id: true,
      name: true,
      logo: true,
    }
  });
  return userOrgs;
}

export async function getEmployees(orgId:string){
  const employees = await prisma.employee.findMany({
    where: {
      organizationId: orgId,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      avatar:true,
      contactNumber: true,
      address: true,
      createdAt: true,
      updatedAt: true
    },
    orderBy: {
      createdAt: "desc",
    }
  });
  return employees;
}

export async function changeRole(orgId: string, data: object, token: string) {
  const response = await axios.patch(`${apiUrl}/orgs/${orgId}/employees/change-role`, 
    {
      ...data
    },
    {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function deleteEmployee(orgId: string, employeeId: string, token: string) {
  const response = await axios.delete(`${apiUrl}/orgs/${orgId}/employees/${employeeId}`, 
    {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}


export async function getOrgInvites(orgId: string){
  const invites = await prisma.invite.findMany({
    where: {
      organizationId: orgId
    },
    select: {
      id: true,
      email: true,
      role: true,
      expirationDate: true,
      createdAt: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return invites;
}

export async function deleteInvite(inviteId: string){
  const invite = await prisma.invite.delete({
    where: {
      id: inviteId
    }
  });
  if(invite) {
    return true;
  }
  return false;
}