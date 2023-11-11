import axios from "axios";

const apiUrl = process.env.API_URL;

export const projectService = {
  createProject,
  addProjectEmp,
  getProject,
  getProjects,
  getProjectEmps,
  getEmpProjects,
  updateProject,
  editEmpRole,
  deleteProject,
  removeEmployee,
};

// Create a new project
async function createProject(orgId: string, data: string) {
  const response = await axios.post(
    `${apiUrl}/orgs/${orgId}/project/create`,
    {
      data,
    },
    {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  return response.data;
}

// Associate employee with a project
async function addProjectEmp(
  orgId: string,
  projectId: string,
  data: string
) {
  const response = await axios.post(
    `${apiUrl}/orgs/${orgId}/project/adduser/${projectId}`,
    {
      data,
    },
    {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  return response.data;
}

// Get a project by its id
async function getProject(orgId: string, projectId: string) {
  const response = await axios.get(
    `${apiUrl}/orgs/${orgId}/project/${projectId}`,
    {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  return response.data;
}

// Get organization projects
async function getProjects(orgId: string) {
  const response = await axios.get(`${apiUrl}/orgs/${orgId}/projects`, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return response.data.projects;
}

// Get associated employees
async function getProjectEmps(orgId: string, projectId: string) {
  const response = await axios.get(
    `${apiUrl}/orgs/${orgId}/projectusers/${projectId}`,
    {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  return response.data;
}

// Get employee projects
async function getEmpProjects(orgId: string, empId: string) {
  const response = await axios.get(
    `${apiUrl}/orgs/${orgId}/userprojects/${empId}`,
    {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  return response.data;
}

// Update project
async function updateProject(
  orgId: string,
  projectId: string,
  data: string
) {
  const response = await axios.patch(
    `${apiUrl}/orgs/${orgId}/project/update/${projectId}`,
    {
      data,
    },
    {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  return response.data;
}

// Edit project employee role
async function editEmpRole(
  orgId: string,
  projectId: string,
  data: string
) {
  const response = await axios.patch(
    `${apiUrl}/orgs/${orgId}/project/updateprojectrole/${projectId}`,
    {
      data,
    },
    {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  return response.data;
}

// Delete a project
async function deleteProject(orgId: string, projectId: string) {
  const response = await axios.delete(
    `${apiUrl}/orgs/${orgId}/project/delete/${projectId}`,
    {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  return response.data;
}

// Remove project employee
async function removeEmployee(
  orgId: string,
  projectId: string,
  empId: string
) {
  const response = await axios.delete(
    `${apiUrl}/orgs/${orgId}/${projectId}/removeemployee/${empId}`,
    {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  return response.data;
}

// Export a project to csv
async function exportProject(orgId: string, projectId: string) {
  const response = await axios.get(
    `${apiUrl}/orgs/${orgId}/project/export/${projectId}`,
    {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  return response.data;
}
