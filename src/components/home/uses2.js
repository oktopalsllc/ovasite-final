"use client";
import React from "react";
import "@/styles/styles.css";
import Link from "next/link";
import Image from "next/image";

const Uses = () => {
  return (
    <section className="bg-[#0000001A]">
      <div className="pt-2 pb-12 md:py-32 w-9/12 mx-auto mt-36 text-start flex flex-col md:flex-row justify-between items-start gap-10">
        <div className="w-full md:w-1/2 pt-12 md:pt-0">
          <h1 className="text-2xl md:text-4xl leading-[60px] font-bold mb-0 md:mb-8">
            Team Collaboration
          </h1>
          <p className="text-base md:text-lg leading-9 md:leading-9 font-normal">
            Our platform is designed to enhance teamwork by offering a suite of
            powerful collaboration features that enable you to work seamlessly
            with your colleagues, share valuable insights, and collectively
            arrive at smart solutions.{" "}
          </p>
          <div className="mt-12">
            <Link
              href="/features"
              className="items-center bg-[#FF595A] text-white border-0 py-4 px-8 focus:outline-none mr-8 hover:bg-[#fe5000] rounded font-bold"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-16 md:mt-0 grid place-content-center">
          <Image
            src={"/empowering_change.svg"}
            alt="empowering_change"
            width={100}
            height={100}
            className="w-[400px] h-[400px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Uses;
