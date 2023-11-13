import axios from "axios";
import { PrismaClient } from "@prisma/client";
import axiosInstance from "@/lib/axios";
// import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const apiUrl = process.env.API_URL;
export const authService = {
  signin,
  signup,
};

// async function signin(email: string, password: string){
//     try{
//         const response = await axios.post(
//             `${apiUrl}/auth/login`,
//             { email: email, password: password }
//         );
//         return response.data;
//     }
//     catch(err){
//         console.log(err);
//     }
// }
// async function signin(email: string, password: string) {
//   try {
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       return false;
//     }
//     const isPasswordCorrect = await bcrypt.compare(
//       password,
//       user.password as string
//     );
//     if (!isPasswordCorrect) {
//       return false;
//     }

//     const userInfo = {
//       id: user.id,
//       email: user.email,
//       role: user.role,
//       stripeCustomerId: user.stripeCustomerId,
//       stripeSubscriptionId: user.stripeSubscriptionId,
//       stripePriceId: user.stripePriceId,
//       stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd,
//       createdAt: user.createdAt,
//     };
//     return userInfo;
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function signup(email: string, password: string) {
//   const response = await axios.post(`${apiUrl}/auth/register`, {
//     email: email,
//     password: password,
//   });
//   return response.data;
// }

async function signin(credentials: ISignInForm): Promise<SignInResponse> {
  try {
    const response = await axiosInstance.post("auth/login", credentials);
    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    return {
      success: false,
      error: "Login failed. Please check your credentials.",
    };
  }
}

async function signup(data: ISignUpForm): Promise<SignUpResponse> {
  try {
    const response = await axiosInstance.post("auth/register", data);
    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    return {
      success: false,
      error: "User already exists",
    };
  }
}
