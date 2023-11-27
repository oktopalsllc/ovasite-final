import axiosInstance from "@/lib/axios";
import axios from "axios";

const apiUrl = process.env.API_URL;

export const orgService = {
  createOrg,
  createOrg2,
  getOrgs,
  getOrgById,
  getOrgOwners,
  updateOrg,
  deleteOrg,
  getUserOrgs,
  updateEmployeeProfiledata,
};

// Create a new organization
export async function createOrg(data: string, token: string) {
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
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

// Get all organizations related
// to a user
export async function getOrgs(token: string) {
  const response = await axios.get(`${apiUrl}/orgs`, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

// Get organization by Id
export async function getOrgById(orgId: string, token: string) {
  const response = await axios.get(`${apiUrl}/orgs/${orgId}`, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

// Get organization owners
export async function getOrgOwners(token: string) {
  const response = await axios.get(`${apiUrl}/orgs/org-owners`, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

// Update organization
export async function updateOrg(orgId: string, data: object, token: string) {
  const response = await axios.patch(
    `${apiUrl}/orgs/${orgId}`,
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

// Delete organization
export async function deleteOrg(orgId: string, token: string) {
  const response = await axios.delete(`${apiUrl}/orgs/${orgId}`, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}

// Create a new organization
export async function createOrg2(
  data: ICreateOrganisationForm
): Promise<CreateOrgResponse> {
  try {
    const response = await axiosInstance.post("/orgs", { ...data });
    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    return {
      success: false,
      error: "Error creating Organisation",
    };
  }
}


export async function getUserOrgs(): Promise<UserOrgsResponse> {
  try {
    const response = await axiosInstance.get(`/orgs`);
    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    return {
      success: false,
      error: "Unable to get user orgs",
    };
  }
}

export async function updateEmployeeProfiledata(
  data: IEmployeeUpdateProfile,
  orgId: string,
  empId: string
): Promise<EmployeeUpdateProfileResponse> {
  try {
    const response = await axiosInstance.patch(`/orgs/${orgId}/employees/${empId}`, data);
    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    return {
      success: false,
      error: "Unable to update employee profile",
    };
  }
}

