"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="h-[900px] md:h-screen relative bg-[#EFDEDBB8]">
            <div className="w-full h-full grid grid-cols-2">
                <div className="w-full h-full lg:mt-20 md:bg-[url('/hero-bg-l.svg')] bg-no-repeat bg-[length:30%_30%] md:bg-auto bg-left-bottom bg-none"></div>
                <div className="w-full h-full lg:mt-20 md:bg-[url('/hero-bg-r.svg')] bg-no-repeat bg-[length:60%_60%] md:bg-auto bg-right-bottom bg-none"></div>
            </div>
            <div className="px-10 top-0 left-0 absolute">
                <div className="w-3/4 h-full mx-auto mt-2 pt-36">
                    <div className="text-2xl leading-9 font-extrabold lg:text-[45px] lg:leading-[70px] lg:font-extrabold text-center">
                        <h1>Your all-in-one platform for data</h1>
                        <h1>
                            <span className="text-[#FF595A]">collection, </span>
                            <span className="text-[#4CAF50]"> monitoring</span> and{" "}
                            <span className="text-[#FFA500]">evaluation.</span>{" "}
                        </h1>
                    </div>
                    <div className="md:w-8/12 mx-auto text-center">
                        <p className="text-center font-normal text-base leading-6 md:text-md md:leading-9 mt-2">
                            OvaSite simplifies data collection, analysis and action. With a
                            user-friendly interface and robust tools,it converts data into
                            actionable insights, enabling informed decisions that fuel
                            progress.
                        </p>
                    </div>
                    <div className="text-center text-white lg:mt-8 mt-4 flex justify-center pb-2 lg:pb-0 gap-4">
                        <Link
                            href="/signup"
                            className="items-center bg-[#FF595A] border-0 py-2 px-10 lg:px-6 focus:outline-none hover:bg-[#fe5000] rounded font-bold text-white text-sm text-center"
                        >
                            Get Started
                        </Link>
                        <Link
                            href="/features"
                            className="items-center border border-gray-900 py-2 px-10 lg:px-6 focus:outline-none rounded text-[#001233] hover:text-white hover:bg-gray-400 hover:border-white font-medium text-sm text-center"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-9/12 mx-auto lg:-mt-36 -mt-72">
                <Image
                    alt="Frame6"
                    width={100}
                    height={50}
                    src="/Frame6.svg"
                    className="w-full"
                />
            </div>
        </section>
    );
};