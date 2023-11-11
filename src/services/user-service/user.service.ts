import axios from "axios";

const apiUrl = process.env.API_URL;

export const userService = {
  getUser,
};

async function getUser(userId: string) {
  const response = await axios.get(`${apiUrl}/users/${userId}`, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return response.data;
}
