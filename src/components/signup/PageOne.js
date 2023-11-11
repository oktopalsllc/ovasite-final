import axiosInstance from "@/lib/axios";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

// const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function PageOne() {
  const [currentStep, setCurrentStep] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    // console.log("form data", data);

    axiosInstance
      .post("auth/register", data)
      .then((response) => {
        console.log(response)
        handleNext()
      })
      .catch((e) => console.log(e));

    
  };

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
        <div id="account">
          <div>
            <Link href="/home">
              <Image alt='Logo' width={70} height={undefined}
                src="Logo.jpg"
                style={{ marginLeft: "20%", marginTop: "10px" }}
              />
            </Link>
            <div className="flex flex-1 flex-col justify-center px-4 py-2 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
              <div className="mx-auto w-full max-w-sm lg:w-96">
                <div>
                  <h1 className="title-font font-bold text-xl text-[#001233] mb-4 mt-10">
                    Create your account
                  </h1>
                </div>

                <div className="mt-10">
                  <div>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-[#001233]"
                        >
                          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            Email address
                          </span>
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#001233] focus:ring-[#001233] block w-full rounded-md sm:text-sm focus:ring-1"
                            placeholder="you@example.com"
                            {...register("email")}
                          />
                        </div>
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
                        <div className="mt-2 relative">
                          <input
                            id="password"
                            name="password"
                            type={passwordVisible ? "text" : "password"}
                            autoComplete="current-password"
                            required
                            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#001233] focus:ring-[#001233] block w-full rounded-md sm:text-sm focus:ring-1"
                            placeholder="Password"
                            {...register("password")}
                          />
                          <Image
                            width={undefined} height={undefined}
                            src={passwordVisible ? 'show.png' : 'hide.png'}
                            alt={passwordVisible ? 'Show Password' : 'Hide Password'}
                            className="absolute top-1/2 transform -translate-y-1/2 right-2 w-5 h-5 cursor-pointer"
                            onClick={togglePasswordVisibility}
                          />
    
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
                          By signing up, you are indicating that you have read
                          and agreed to our
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
          </div>
          <div>
            {" "}
            <Image alt='frame' width={frame} height={undefined} src="Frame750.jpg" />
          </div>
        </div>
      </div>
    </>
  );
}

export default PageOne;
