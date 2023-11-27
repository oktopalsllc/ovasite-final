"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import "@/styles/styles.css";
// import { useForm } from "react-hook-form";
// import axiosInstance from "@/lib/axios";

export default function ResetPassword({params}: {params: {resetToken: string}}) {
    const { resetToken } = params;
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    //   const {
    //     register,
    //     handleSubmit,
    //     watch,
    //     formState: { errors },
    //   } = useForm();

    //   const onSubmit = (data, e) => {
    //     e.preventDefault();
    //     console.log("form data", data);

    //     axiosInstance
    //       .post("auth/reset-password", data)
    //       .then((response) => console.log(response))
    //       .catch((e) => console.log(e));
    //   };

    return (
        <>
            <div>
                <Link href='/'>
                    <Image
                        src="/Logo.png"
                        width={70}
                        className="cursor-pointer mx-auto px-auto mt-10"
                        height={100}
                        alt="see"
                    />
                </Link>
                {/* <div className="shadow-lg bg-white px-12 py-12 sm:rounded-lg sm:px-12"> */}
                <div className="shadow-lg bg-white px-6 py-12 sm:rounded-lg sm:px-12">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md mt-6">
                        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-[#001233]">
                            Create a new password
                        </h2>
                        {/* <div className="mt-5 text-center text-sm font-medium leading-6 text-[#001233]">
              <p>
                Enter your email we will send you a link to reset your password.
              </p>
            </div> */}
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                            <form className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-[#001233] font-sans"
                                    >
                                        Choose new password
                                    </label>
                                    <div className="mt-2 relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type={passwordVisible ? "text" : "password"}
                                            autoComplete="current-password"
                                            required
                                            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#001233] focus:ring-[#001233] block w-full rounded-md sm:text-sm focus:ring-1"
                                            placeholder="Enter Password"
                                        // {...register("password")}
                                        />
                                        <Image
                                            src={passwordVisible ? 'show.png' : 'hide.png'}
                                            alt={passwordVisible ? 'Show Password' : 'Hide Password'}
                                            className="absolute top-1/2 transform -translate-y-1/2 right-2 w-5 h-5 cursor-pointer"
                                            onClick={togglePasswordVisibility}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-[#001233]"
                                    >
                                        Confirm password
                                    </label>
                                    <div className="mt-2 relative">
                                        <input
                                            id="confirmPassword"
                                            name="password"
                                            type={passwordVisible ? "text" : "password"}
                                            autoComplete="current-password"
                                            required
                                            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#001233] focus:ring-[#001233] block w-full rounded-md sm:text-sm focus:ring-1"
                                            placeholder="Confirm Password"
                                        // {...register("password")}
                                        />
                                        <Image
                                            width={40}
                                            height={40}
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
                                        Create Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    );
}