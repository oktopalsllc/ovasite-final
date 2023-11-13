"use server";

import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schemas/form";
// import { currentUser } from "@clerk/nextjs";
import { getCurrentEmployee } from "@/services/employee-service/employee.service";

// class UserNotFoundErr extends Error {}

// export async function GetFormStats(orgId: string) {
//   // const user = await currentUser();
//   // if (!user) {
//   //   throw new UserNotFoundErr();
//   // }

//   const stats = await prisma.form.aggregate({
//     where: {
//       organizationId: orgId,
//     },
//     _sum: {
//       visits: true,
//       subCount: true,
//     },
//   });

//   const visits = stats._sum.visits || 0;
//   const submissions = stats._sum.subCount || 0;

//   let submissionRate = 0;

//   if (visits > 0) {
//     submissionRate = (submissions / visits) * 100;
//   }

//   const bounceRate = 100 - submissionRate;

//   return {
//     visits,
//     submissions,
//     submissionRate,
//     bounceRate,
//   };
// }

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
      // userId: user.id,
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

  return form.id;
}

export async function GetForms(projectId: string) {
  // const user = await currentUser();
  // if (!user) {
  //   throw new UserNotFoundErr();
  // }

  return await prisma.form.findMany({
    where: {
      projectId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function GetFormById(formId: string) {
  return await prisma.form.findUnique({
    where: {
      id: formId,
    },
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

export async function SubmitForm(formId: string, content: string) {
  // const form = await GetFormById(formId);
  // if (!form) return null;
  const updatedForm = await prisma.form.findUnique({
    // data: {
    //   subCount: {
    //     increment: 1,
    //   },
    // },
    where: {
      id: formId,
      published: true,
    },
  });
  if(!updatedForm) return false;
  await prisma.submission.create({
    data: {
      title: updatedForm.title,
      description: updatedForm.description,
      submissionData: content,
      form: { connect: { id: formId as string } },
      employee: { connect: { id: updatedForm.creatorId } },
      project: { connect: { id: updatedForm.projectId as string } },
      organization: { connect: { id: updatedForm.organizationId as string } },
    },
  });
  return true;
  // return await prisma.form.update({
  //   data: {
  //     subCount: {
  //       increment: 1,
  //     },
  //     submissions: {
  //       create: {
  //         title: updatedForm.title,
  //         description: updatedForm.description,
  //         submissionData: content,
  //         form: { connect: { id: formId  as string} },
  //         employee: { connect: { id: updatedForm.creatorId } },
  //         project: { connect: { id: updatedForm.projectId as string } },
  //         organization: { connect: { id: updatedForm.organizationId as string } },
  //       },
  //     },
  //   },
  //   where: {
  //     id: formId,
  //   },
  // });
}

export async function GetFormWithSubmissions(id: string) {
  return await prisma.form.findUnique({
    where: {
      id,
    },
    include: {
      submissions: true,
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
