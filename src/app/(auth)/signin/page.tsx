"use client";
import { authService } from "@/services/auth-service/auth.service.ts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "@/styles/styles.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useIsMounted } from "@/hooks/useIsMounted";
import { toast } from "@/components/form/ui/use-toast";

const schema = yup.object({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Page = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignInForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any, e: any) => {
    e.preventDefault();

    try {
      const response = await authService.signin(data);

      if (response.success) {
        const access_token = response.data.access_token;
        const userInfo = response.data.userInfo;

        localStorage.setItem("token", access_token);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        if (userInfo.organizations.length == 0) {
          router.push("/orgs/create-org");
        } else {
          router.push("/users/update-profile");
        }
      } else {
        const error = response.error;
        toast({
          title: "Error",
          description: error,
        });
      }
    } catch (error) {}
  };

  if (!useIsMounted) return;

  //   const handleSubmit = async (e: any) => {
  //     e.preventDefault();
  //     try {
  //       const email = e.target[0].value;
  //       const password = e.target[1].value;
  //       const response = await authService.signin(email, password);
  //       const { access_token, userInfo } = response;
  //       // if(response === false || response === undefined)
  //       // {
  //       //     console.log("Invalid credentials");
  //       //     return;
  //       // }
  //       localStorage.setItem("token", access_token);
  //       localStorage.setItem("userId", userInfo.id);
  //       router.push(`/orgs`);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  return (
    <>
      <div>
        {/* first page */}
        <div>
          <div className="grid grid-cols-1 place-content-center relative h-screen">
            {/* Logo */}
            <div className="absolute top-5 left-5">
              <Link href="/">
                <Image
                  src="/Logo.png"
                  alt=""
                  width={70}
                  height={70}
                  style={{ marginLeft: "20%", marginTop: "10px" }}
                />
              </Link>
            </div>

            {/* Login form */}
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <h1 className="title-font font-bold text-xl text-[#001233] mb-4 mt-10">
                  Welcome Back
                </h1>
              </div>

              <div className="mt-10">
                <div>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          required
                          placeholder="email"
                          {...register("email", { required: true })}
                        />
                      </div>
                    </div>

                    <div className="mt-2 relative">
                      <input
                        id="password"
                        type={passwordVisible ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        placeholder="Password"
                        {...register("password", { required: true })}
                      />
                      <Image
                        src={passwordVisible ? "/show.png" : "/hide.png"}
                        alt={
                          passwordVisible ? "Show Password" : "Hide Password"
                        }
                        className="absolute top-1/2 transform -translate-y-1/2 right-2 w-5 h-5 cursor-pointer"
                        onClick={togglePasswordVisibility}
                        width={20}
                        height={20}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 rounded border-[#001233] text-[#001233] focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="remember-me"
                          className="ml-3 block text-sm leading-6 text-[#001233]"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="text-sm leading-6">
                        <Link
                          href="/ForgotPassword"
                          className="font-semibold text-[#001233] hover:text-[#001233]"
                        >
                          Forgot password?
                        </Link>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-[#FF595A] px-3 py-1.5 text-sm font-bold leading-6 text-[white] shadow-sm hover:bg-[#fe5000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#001233]"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>

                <div className="mt-10">
                  <div className="relative">
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="w-full border-t border-gray-200" />
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4">
                    <p className="text-[#001233] text-sm mt-3 text-center">
                      Don&apos;t have an account?{" "}
                      <Link
                        href="/signup"
                        className="font-bold text-[#FF595A] hover:text-[#001233]"
                      >
                        Sign Up.
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
