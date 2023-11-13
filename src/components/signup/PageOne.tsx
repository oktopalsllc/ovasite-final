import axiosInstance from "@/lib/axios";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useIsMounted } from "@/hooks/useIsMounted";
import { authService } from "@/services/auth-service/auth.service";
import { useRouter } from "next/navigation";

const schema = yup.object({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
  source: yup.string().required("Source is required")
});

function PageOne() {
  const [currentStep, setCurrentStep] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignUpForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any, e: any) => {
    e.preventDefault();

    try {
      const response = await authService.signup(data);

      if (response.success) {
        router.push("/signin");
      } else {
        const error = response.error;
      }
    } catch (error) {}
  };

  if (!useIsMounted) return;

  // ================================================================================

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  // const handleBack = () => {
  //   setCurrentStep(currentStep - 1);
  // };
  //! ================================================================================

  const options = [
    { label: "LinkedIn", value: "linkedin" },
    { label: "Facebook", value: "facebook" },
    { label: "Instagram", value: "instagram" },
    { label: "Affiliate", value: "affiliate" },
    { label: "Twitter(X)", value: "twitter" },
    { label: "Referrals", value: "referrals" },
  ];
  return (
    <>
      <div style={{ display: currentStep === 1 ? "block" : "none" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen relative place-content-center">
          {/* Logo */}
          <div className="absolute top-5 left-5">
            <Link href="/home">
              <Image alt="Logo" src="/Logo.jpg" width={60} height={60} />
            </Link>
          </div>

          {/* Signup form */}
          <div className="flex flex-1 flex-col justify-center px-4 py-2 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <h1 className="title-font font-bold text-xl text-[#001233] mb-4 mt-10">
                  Create your account
                </h1>
              </div>

              <div className="mt-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-[#001233]"
                    >
                      <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Email address
                      </span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                      {...register("email")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-[#001233]"
                    >
                      <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Password
                      </span>
                    </label>
                    <span className="mt-2 relative">
                      <input
                        id="password"
                        type={passwordVisible ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        placeholder="Password"
                        {...register("password")}
                      />
                      <Image
                        width={200}
                        height={200}
                        src={passwordVisible ? "/show.png" : "/hide.png"}
                        alt={
                          passwordVisible ? "Show Password" : "Hide Password"
                        }
                        className="absolute top-1/2 transform -translate-y-1/2 right-2 w-5 h-5 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                    </span>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-[#001233]"
                    >
                      <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        How did you hear about us?
                      </span>
                    </label>
                    <div className="mt-2 relative">
                      <select {...register("source")}>
                        <option value="FACEBOOK">Facebook</option>
                        <option value="ADVERTS">Adverts</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-[#FF595A] px-3 py-1.5 text-sm font-bold leading-6 text-[white] shadow-sm hover:bg-[#fe5000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#001233]"
                    >
                      Sign Up
                    </button>
                    <p className="text-center mt-6 text-sm leading-6 text-[#001233]">
                      By signing up, you are indicating that you have read and
                      agreed to our
                      <Link
                        href="/terms"
                        className="font-bold text-[#FF595A] hover:text-[#001233]"
                      >
                        <span bg-white px-6 text-gray-900>
                          {" "}
                          Terms and Conditions.
                        </span>
                      </Link>
                    </p>
                  </div>
                </form>

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
                      Already have an account?{" "}
                      <Link
                        href="/signin"
                        className="font-bold text-[#FF595A] hover:text-[#001233]"
                      >
                        Sign In.
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block h-full">
            <Image
              className="w-full h-full"
              alt="frame"
              width={200}
              height={200}
              src="/signup-bg.svg"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PageOne;