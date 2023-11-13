"use client";
import React from "react";
import "@/styles/styles.css";
import Image from "next/image";

export const Steps = () => {
  return (
    <div className="w-10/12 lg:w-9/12 mx-auto mt-36">
      <div id="features">
        <div>
          <h1 id="topbtn">How it works</h1>
        </div>
        <div id="width">
          <div className="mt-4 md:text-3xl leading-[60px] font-bold">
            <p>How we carry out our operations</p>
          </div>
          <div>
            <p className="md:text-xl md:leading-9 font-normal">
              Our application follows four steps to ensure efficient and
              effective data collection, monitoring, and evaluation.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row my-12 md:my-20 justify-between items-center lg:gap-20">
        <div id="" className="w-full lg:w-1/2">
          <h1 className="text-xl md:text-2xl leading-2 md:leading-9 font-bold">
            Streamline Data Gathering
          </h1>
          <p className="text-base md:text-xl font-normal text-start mt-4 md:mt-8">
            In today&apos;s data-driven world, the ability to gather information
            efficiently and effectively is paramount. Our platform offers you a
            simplified and intuitive interface that empowers you to collect data
            from a wide range of sources with ease, all within a single,
            centralized hub.
          </p>
        </div>
        <div id="" className="w-full mt-8 lg:mt-0 lg:w-1/2">
          <Image
            className="w-full"
            alt="frame"
            width={100}
            height={50}
            src="/Frame177.svg"
          />
        </div>
      </div>

      <div className="flex flex-col-reverse lg:flex-row my-12 md:mb-20 justify-between items-center lg:gap-20">
        <div id="" className="w-full mb-8 lg:mt-0 lg:w-1/2">
          <Image
            className="w-full"
            alt="frame"
            width={100}
            height={50}
            src="/Frame178.svg"
          />
        </div>
        <div id="" className="w-full lg:w-1/2">
          <h1 className="text-xl md:text-2xl leading-2 md:leading-9 font-bold md:text-end">
            Real-Time Progress Monitoring
          </h1>
          <p className="text-base md:text-xl font-normal md:text-end mt-4 md:mt-8">
            In the realm of data collection, where precision and timeliness are
            paramount, having a robust system in place to monitor progress in
            real-time can be a game-changer.{" "}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row my-12 md:my-20 justify-between items-center lg:gap-20">
        <div id="" className="w-full lg:w-1/2">
          <h1 className="text-xl md:text-2xl leading-2 md:leading-9 font-bold">
            Evaluate and Elevate
          </h1>
          <p className="text-base md:text-xl font-normal text-start mt-4 md:mt-8">
            Our platform goes beyond basic data analysis, offering a suite of
            advanced evaluation tools that enable you to delve deep into your
            data, uncover patterns, and derive actionable insights to inform
            your decision-making process.
          </p>
        </div>
        <div id="" className="w-full mt-8 lg:mt-0 lg:w-1/2">
          <Image
            className="w-full"
            alt="frame"
            width={100}
            height={50}
            src="/Frame180.svg"
          />
        </div>
      </div>

      <div className="flex flex-col-reverse lg:flex-row my-12 md:my-20 justify-between items-center lg:gap-20">
        <div id="" className="w-full mb-8 lg:mt-0 lg:w-1/2">
          <Image
            className="w-full"
            alt="frame"
            width={100}
            height={50}
            src="/Frame182.svg"
          />
        </div>
        <div id="" className="w-full lg:w-1/2">
          <h1 className="text-xl md:text-2xl leading-2 md:leading-9 font-bold md:text-end">
            Team Collaboration
          </h1>
          <p className="text-base md:text-xl font-normal text-start mt-4 md:mt-8">
            Our platform is designed to enhance teamwork by offering a suite of
            powerful collaboration features that enable you to work seamlessly
            with your colleagues, share valuable insights, and collectively
            arrive at smart solutions.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Steps;
