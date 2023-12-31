"use server";

import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schemas/form";
import { createAuditLog } from "./auditHelper";
import { getCurrentEmployee } from "@/services/employee-service/employee.service";
import axios from "axios";
var ip = require("ip");

export async function GetFormStats(formId: string) {
  const stats = await prisma.form.findUnique({
    where: {
      id: formId,
    },
    select: {
      visits: true,
      subCount: true,
    },
  });

  const visits = stats?.visits || 0;
  const submissions = stats?.subCount || 0;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  };
}

export async function CreateForm(
  orgId: string,
  projectId: string,
  employeeId: string,
  data: formSchemaType
) {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("form not valid");
  }

  const { title, description } = data;

  const form = await prisma.form.create({
    data: {
      title,
      description,
      employee: { connect: { id: employeeId as string } },
      project: { connect: { id: projectId } },
      organization: { connect: { id: orgId } },
    },
  });

  if (!form) {
    throw new Error("something went wrong");
  }
  await createAuditLog(
    form.creatorId,
    ip.address() || null,
    form.organizationId,
    "create",
    "Form",
    "",
    JSON.stringify(form),
    form.id.toString()
  );

  return form.id;
}

export async function GetForms(projectId: string) {
  return await prisma.form.findMany({
    where: {
      projectId,
    },
    include: {
      project: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function GetAIForms(projectId: string) {
  return await prisma.form.findMany({
    where: {
      projectId,
      published: true,
    },
    include: {
      submissions: {
        select: {
          submissionData: true,
          geolocation: true,
          createdAt: true,
        }
      },
      employee:{
        select:{
          id: true,
          fullName: true
        }
      }
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function GetFormProject(projectId: string){
  return await prisma.project.findUnique({
    where:{
      id: projectId
    },
    select:{
      isCompleted: true
    }
  });
}

export async function GetFormById(formId: string) {
  return await prisma.form.findUnique({
    where: {
      id: formId,
    },
    include: { employee: true },
  });
}

export async function UpdateFormContent(id: string, jsonContent: string) {
  return await prisma.form.update({
    where: {
      id,
    },
    data: {
      formData: jsonContent,
    },
  });
}

export async function PublishForm(id: string) {
  return await prisma.form.update({
    data: {
      published: true,
    },
    where: {
      id,
    },
  });
}

export async function CloseForm(id: string) {
  const closeForm = await prisma.form.update({
    data: {
      closed: true,
    },
    where: {
      id,
    },
  });
  if (!closeForm) return false;
  await createAuditLog(
    closeForm.creatorId,
    ip.address() || null,
    closeForm.organizationId,
    "close",
    "Form",
    "",
    JSON.stringify(closeForm),
    closeForm.id.toString()
  );
  return true;
}

export async function GetFormContentByUrl(formId: string) {
  return await prisma.form.findUnique({
    select: {
      formData: true,
    },
    where: {
      id: formId,
    },
  });
}

export async function UpdateFormVisits(formId: string) {
  return await prisma.form.update({
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      id: formId,
    },
  });
}

export async function SubmitForm(formId: string, content: string) {
  try {
    const { formValues, location } = JSON.parse(content);
    const { latitude, longitude } = location;
    const geoData = await axios.get(
      `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
    );
    const geoDataString = JSON.stringify(geoData.data);
    const form = await prisma.form.findUnique({
      where: {
        id: formId,
      },
    });
    if (!form) {
      return false;
    }
    const submission = await prisma.submission.create({
      data: {
        title: form.title,
        description: form.description,
        submissionData: JSON.stringify(formValues),
        formData: form.formData,
        geolocation: geoDataString,
        form: { connect: { id: formId as string } },
        employee: { connect: { id: form.creatorId } },
        project: { connect: { id: form.projectId as string } },
        organization: { connect: { id: form.organizationId as string } },
      },
    });
    if (!submission) {
      return false;
    }

    const updatedForm = await prisma.form.update({
      data: {
        subCount: {
          increment: 1,
        },
      },
      where: {
        id: formId,
        published: true,
      },
    });
    if (!updatedForm) return false;
    await createAuditLog(
      submission.creatorId,
      ip.address() || null,
      submission.organizationId,
      "create",
      "Submission",
      "",
      JSON.stringify(submission),
      submission.id.toString()
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function GetFormWithSubmissions(id: string) {
  return await prisma.form.findUnique({
    where: {
      id,
    },
    include: {
      submissions: true,
      employee: true,
    },
  });
}

export async function deleteForm(id: string) {
  const deletedForm = await prisma.form.delete({
    where: {
      id,
    },
  });
  if (!deletedForm) return false;
  return true;
}
