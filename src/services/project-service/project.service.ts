import axios from "axios";
import {
  projectSchema,
  projectUpdate,
  projectStatus,
  projectSchemaType,
  projectUpdateType,
  projectStatusType,
} from "@/schemas/project";

import axiosInstance from "@/lib/axios";
import {
  projectEmpType,
  projectRole,
  projectRoleType,
} from "@/schemas/projectEmp";

const apiUrl = process.env.API_URL;

export const projectService = {
  createProject,
  addProjectEmp,
  getProject,
  getProjectStats,
  getProjects,
  getOrgEmployees,
  getProjectEmps,
  getEmpProjects,
  updateProject,
  updateStatus,
  editEmpRole,
  exportProject,
  deleteProject,
  removeEmployee,
};

function toISODateString(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString();
}

function toISODate(date: Date): string {
  return date.toISOString();
}

// Create a new project
async function createProject(
  orgId: string,
  data: projectSchemaType,
  token: string
) {
  const validation = projectSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("Project not valid");
  }
  const { name, description, expectedDuration, status, startDate, endDate } =
    data;
  const response = await axios.post(
    `${apiUrl}/orgs/${orgId}/project/create`,
    {
      name,
      description,
      expectedDuration,
      status,
      startDate: toISODateString(startDate),
      endDate: toISODate(endDate),
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

// Associate employee with a project
async function addProjectEmp(
  orgId: string,
  projectId: string,
  data: projectEmpType,
  token: string
) {
  const { employeeId, role } = data;
  const response = await axios.post(
    `${apiUrl}/orgs/${orgId}/project/adduser/${projectId}`,
    {
      employeeId,
      role,
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

// Get a project by its id
async function getProject(orgId: string, projectId: string, token: string) {
  const response = await axios.get(
    `${apiUrl}/orgs/${orgId}/project/${projectId}`,
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

// Get a project stats
async function getProjectStats(
  orgId: string,
  projectId: string,
  token: string
) {
  const response = await axios.get(
    `${apiUrl}/orgs/${orgId}/project/stats/${projectId}`,
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

// Get organization projects
// async function getProjects(orgId: string, token: string) {
//   const response = await axios.get(`${apiUrl}/orgs/${orgId}/projects`, {
//     withCredentials: true,
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + token,
//     },
//   });
//   return response.data;
// }

async function getProjects(orgId: string, token: string) {
  const response = await axiosInstance.get(`orgs/${orgId}/projects`);
  return response.data;
}

// Get associated project employees
async function getOrgEmployees(
  orgId: string,
  projectId: string,
  token: string
) {
  const response = await axios.get(
    `${apiUrl}/orgs/${orgId}/projectemployees/${projectId}`,
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

// Get associated employees
async function getProjectEmps(orgId: string, projectId: string, token: string) {
  const response = await axios.get(
    `${apiUrl}/orgs/${orgId}/projectusers/${projectId}`,
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

// Get employee projects
async function getEmpProjects(orgId: string, empId: string, token: string) {
  const response = await axios.get(
    `${apiUrl}/orgs/${orgId}/userprojects/${empId}`,
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

// Update project
async function updateProject(
  orgId: string,
  projectId: string,
  data: projectUpdateType,
  token: string
) {
  const validation = projectUpdate.safeParse(data);
  if (!validation.success) {
    throw new Error("Project not valid");
  }
  const { name, description, expectedDuration, startDate } = data;
  const response = await axios.patch(
    `${apiUrl}/orgs/${orgId}/project/update/${projectId}`,
    {
      name,
      description,
      expectedDuration,
      startDate: toISODateString(startDate),
      endDate: toISODate(new Date()),
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

// Update project status
async function updateStatus(
  orgId: string,
  projectId: string,
  data: projectStatusType,
  token: string
) {
  const validation = projectStatus.safeParse(data);
  if (!validation.success) {
    throw new Error("Project not valid");
  }
  const { status } = data;
  const response = await axios.patch(
    `${apiUrl}/orgs/${orgId}/project/status/${projectId}`,
    {
      status,
      endDate: toISODate(new Date()),
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

// Edit project employee role
async function editEmpRole(
  orgId: string,
  projectId: string,
  data: object,
  token: string
) {
  const response = await axios.patch(
    `${apiUrl}/orgs/${orgId}/updateprojectrole/${projectId}`,
    {
      ...data,
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

// Delete a project
async function deleteProject(orgId: string, projectId: string, token: string) {
  const response = await axios.delete(
    `${apiUrl}/orgs/${orgId}/project/delete/${projectId}`,
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

// Remove project employee
async function removeEmployee(
  orgId: string,
  projectId: string,
  empId: string,
  token: string
) {
  const response = await axios.delete(
    `${apiUrl}/orgs/${orgId}/${projectId}/removeemployee/${empId}`,
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

// Export a project to csv
async function exportProject(orgId: string, projectId: string, token: string) {
  const response = await axios.get(
    `${apiUrl}/orgs/${orgId}/project/export/${projectId}`,
    {
      responseType: "blob", // important to handle the file stream
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}
