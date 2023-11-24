import axios from "axios";

const apiUrl = process.env.API_URL;

export const inviteService = {
  sendInvite,
  joinOrg,
};

async function sendInvite(orgId: string, data: object, token: string) {
  const response = await axios.post(
    `${apiUrl}/invites/${orgId}/generate-invite-link`,
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

async function joinOrg(inviteCode: string, data: object) {
  try {
    const response = await axios.post(
      `${apiUrl}/invites/join/${inviteCode}`,
      {
        ...data,
      },
      {
        withCredentials: true,
      }
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: "Unable to complete action at this time.",
    };
  }
}
