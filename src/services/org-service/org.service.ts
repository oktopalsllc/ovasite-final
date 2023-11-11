import axios from "axios";

const apiUrl = process.env.API_URL;

export const orgService = {
  createOrg,
  getOrgs,
  getOrgById,
  getOrgOwners,
  updateOrg,
  deleteOrg,
};

// Create a new organization
export async function createOrg(data: string) {
  const response = await axios.post(
    `${apiUrl}/orgs`,
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

// Get all organizations related
// to a user
export async function getOrgs() {
  const response = await axios.get(`${apiUrl}/orgs`, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return response.data;
}

// Get organization by Id
export async function getOrgById(orgId: string) {
  const response = await axios.get(`${apiUrl}/orgs/${orgId}`, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return response.data;
}

// Get organization owners
export async function getOrgOwners() {
  const response = await axios.get(`${apiUrl}/orgs/org-owners`, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return response.data;
}

// Update organization
export async function updateOrg(orgId: string, data: string) {
  const response = await axios.patch(
    `${apiUrl}/orgs/${orgId}`,
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

// Delete organization
export async function deleteOrg(orgId: string) {
  const response = await axios.delete(`${apiUrl}/orgs/${orgId}`, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return response.data;
}
