import axios from "axios";
import { reportSchema, reportSchemaType } from "@/schemas/report";

const apiUrl = process.env.API_URL;

export const reportService = {
  createReport,
  getReport,
  getProjectReports,
  getEmployeeReports,
  updateReport,
  deleteReport,
};

// Create a report
async function createReport(
  orgId: string,
  projectId: string,
  data: reportSchemaType,
  token: string
) {
  const validation = reportSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("Project not valid");
  }
  const {
    title,
    introduction,
    dataCollectionMethod,
    challengeRecommendation,
    executiveSummary,
    conclusion,
  } = data;
  const reportData = {
    introduction: introduction,
    dataCollectionMethod: dataCollectionMethod,
    challengeRecommendation: challengeRecommendation,
    executiveSummary: executiveSummary,
    conclusion: conclusion,
  };
  const response = await axios.post(
    `${apiUrl}/orgs/${orgId}/report/create`,
    {
      title: title,
      reportData: JSON.stringify(reportData),
      projectId: projectId,
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

// Get a single report
async function getReport(orgId: string, id: string, token: string) {
  const response = await axios.get(`${apiUrl}/orgs/${orgId}/report/${id}`, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return response.data;
}

// Get project reports
async function getProjectReports(
  orgId: string,
  projectId: string,
  token: string
) {
  const response = await axios.get(
    `${apiUrl}/orgs/${orgId}/reports/${projectId}`,
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

// Get employee reports
async function getEmployeeReports(
  orgId: string,
  projectId: string,
  empId: string,
  token: string
)
{
  const response = await axios.get(
    `${apiUrl}/orgs/${orgId}/userreports/${empId}/${projectId}`,
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

// Update a report
async function updateReport(
  orgId: string,
  id: string,
  title: string,
  data: string,
  token: string
){
  const response = await axios.patch(
    `${apiUrl}/orgs/${orgId}/report/update/${id}`,
    {
      title,
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

// Delete a report
async function deleteReport(
  orgId: string,
  id: string,
  token: string
)
{
  const response = await axios.delete(
    `${apiUrl}/orgs/${orgId}/report/delete/${id}`,
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