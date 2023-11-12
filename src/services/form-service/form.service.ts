import axios from "axios";
import { formSchema, formSchemaType } from "@/schemas/form";

const apiUrl = process.env.API_URL;

export const formService = {
  createForm,
  getForm,
  getFormData,
  getFormSubmissions,
  getForms,
  getUserForms,
  publishForm,
  updateForm,
  updateFormData,
  deleteForm,
};

// Create a new form
async function createForm(orgId: string, data: string, token: string) {
  const{title, description, projectId} = JSON.parse(data);
  const response = await axios.post(
    `${apiUrl}/orgs/${orgId}/form/create`,
    {
      title: title,
      description: description,
      projectId: projectId
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
  return response.data.newForm;
}

// Get a form by Id
async function getForm(formId: string, orgId: string, token: string) {
  console.log(token);
  const response = await axios.get(`${apiUrl}/orgs/${orgId}/form/${formId}`, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return response.data.form;
}

// Get form data by form Id
async function getFormData(formId: string, orgId: string, token: string) {
  const response = await axios.get(
    `${apiUrl}/orgs/${orgId}/form/data/${formId}`,
    {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );

  return response.data.form;
}

// Get form submissions
async function getFormSubmissions(formId: string, orgId: string, token: string) {
  const response = await axios.get(
    `${apiUrl}/orgs/${orgId}/form/submissions/${formId}`,
    {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data.form;
}

// Get forms for a particular project
async function getForms(orgId: string, projectId: string, token: string) {
  const response = await axios.get(
    `${apiUrl}/orgs/${orgId}/forms/${projectId}`,
    {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );

  return response.data.forms;
}

// Get forms created by a particular user
async function getUserForms(
  orgId: string,
  empId: string,
  projectId: string,
  token: string
) {
  const response = await axios.get(
    `${apiUrl}/orgs/${orgId}/userforms/${empId}/${projectId}`,
    {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );

  return response.data.forms;
}

// Publish a form for use
async function publishForm(orgId: string, formId: string, token: string) {
  const response = await axios.patch(
    `${apiUrl}/orgs/${orgId}/form/publish/${formId}`,
    {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );

  return response.data.publishedForm;
}

// Update a form
async function updateForm(orgId: string, formId: string, data: string, token: string) {
  const response = await axios.patch(
    `${apiUrl}/orgs/${orgId}/form/update/${formId}`,
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

  return response.data.updatedForm;
}

// Update a form data
async function updateFormData(orgId: string, formId: string, data: string, token: string) {
  const response = await axios.patch(
    `${apiUrl}/orgs/${orgId}/form/update/data/${formId}`,
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

  return response.data.updatedForm;
}

// Delete a form
async function deleteForm(orgId: string, formId: string, token: string) {
  const response = await axios.delete(
    `${apiUrl}/orgs/${orgId}/form/delete/${formId}`,
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
