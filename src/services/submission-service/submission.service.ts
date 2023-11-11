import axios from "axios";

const apiUrl = process.env.API_URL;

export const submissionService = {
  getGeolocation,
  createSubmission,
  getSubmission,
  getProjectSubmission,
  getformSubmission,
  getEmpSubmission,
  updateSubmission,
  exportSubmission,
  deleteSubmission,
};

// Get geolocation(longitude, latitude)
async function getGeolocation(): Promise<string> {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const geolocation = {
          latitude,
          longitude
        };
        resolve(JSON.stringify(geolocation));
      }, (error) => {
        reject(error);
      });
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}


// Create a new submission
async function createSubmission(orgId: string, data: string) {
  const response = await axios.post(
    `${apiUrl}/orgs/${orgId}/submission/create`,
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

// Get a submission by Id
async function getSubmission(orgId: string, id: string) {
  const response = await axios.get(`${apiUrl}/orgs/${orgId}/submission/${id}`, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return response.data;
}

// Get submissions of a project
async function getProjectSubmission(orgId: string, projectId: string) {
  const response = await axios.get(
    `${apiUrl}/orgs/${orgId}/submissions/project/${projectId}`,
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

// Get submissions of a project
async function getformSubmission(orgId: string, formId: string) {
  const response = await axios.get(
    `${apiUrl}/orgs/${orgId}/submissions/form/${formId}`,
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

// Get submissions of an employee
async function getEmpSubmission(
  orgId: string,
  empId: string,
  projectId: string
) {
  const response = await axios.get(
    `${apiUrl}/orgs/${orgId}/usersubmissions/${empId}/${projectId}`,
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

// Update a submission
async function updateSubmission(
  orgId: string,
  id: string,
  data: string
) {
  const response = await axios.patch(
    `${apiUrl}/orgs/${orgId}/submission/update/${id}`,
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

// Export a submission
async function exportSubmission(orgId: string, id: string) {
  const response = await axios.get(
    `${apiUrl}/orgs/${orgId}/submission/export/${id}`,
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

// Delete a submission
async function deleteSubmission(orgId: string, id: string) {
  const response = await axios.delete(
    `${apiUrl}/orgs/${orgId}/submission/delete/${id}`,
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
