"use client";
import React from "react";
import "@/styles/styles.css";
import Link from "next/link";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="h-[800px] md:h-screen relative bg-[#EFDEDBB8]">
      <div className="w-full h-full grid grid-cols-2">
        <div className="w-full h-full md:bg-[url('/hero-bg-l.svg')] bg-no-repeat bg-[length:30%_30%] md:bg-auto bg-left-bottom bg-none"></div>
        <div className="w-full h-full md:bg-[url('/hero-bg-r.svg')] bg-no-repeat bg-[length:60%_60%] md:bg-auto bg-right-bottom bg-none"></div>
      </div>
      <div className="top-0 left-0 absolute">
        <div className="w-9/12 h-full mx-auto mt-2 md:mt-16 pt-36">
          <div className="text-2xl leading-9 font-extrabold lg:text-[64px] lg:leading-[92px] lg:font-extrabold text-center">
            <h1>Your all-in-one platform for data</h1>
            <h1>
              <span className="text-[#FF595A]">collection, </span>
              <span className="text-[#4CAF50]"> monitoring</span> and{" "}
              <span className="text-[#FFA500]">evaluation.</span>{" "}
            </h1>
          </div>
          <div className="md:w-8/12 mx-auto text-center">
            <p className="text-center font-normal text-base leading-6 md:text-2xl md:leading-9 mt-8">
              OvaSite simplifies data collection, analysis and action. With a
              user-friendly interface and robust tools,it converts data into
              actionable insights, enabling informed decisions that fuel
              progress.
            </p>
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Link
              href="/signup"
              className="items-center bg-[#FF595A] border-0 py-2 px-6 focus:outline-none hover:bg-[#fe5000] rounded font-bold text-white"
            >
              Get Started
            </Link>
            <Link
              href="/features"
              className="items-center  border-0 py-2 px-6 focus:outline-none rounded text-[#001233] font-medium "
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
      <div className="w-9/12 mx-auto -mt-72">
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

export default Hero;
