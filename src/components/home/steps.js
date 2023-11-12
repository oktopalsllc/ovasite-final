"use client";
import React from "react";
import "@/styles/styles.css";
import Image from "next/image";

export const Steps = () => {
  return (
    <div style={{ height: "100%" }} className="w-9/12 mx-auto mt-36">
      <div id="features">
        <div>
          <h1 id="topbtn">How it works</h1>
        </div>
        <div id="width">
          <div
            style={{ fontSize: "28px", lineHeight: "60px", fontWeight: "700" }}
            className="mt-4"
          >
            <p>How we carry out our operations</p>
          </div>
          <div
            style={{ fontSize: "20px", lineHeight: "36px", fontWeight: "400" }}
          >
            <p>
              Our application follows four steps to ensure efficient and
              effective data collection, monitoring, and evaluation.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row my-20 justify-between items-center lg:gap-20">
        <div id="" className="w-full lg:w-1/2">
          <h1 className="text-2xl font-bold">
            Streamline Data Gathering
          </h1>
          <p
            style={{ fontSize: "16px", lineHeight: "36px", fontWeight: "400" }}
          >
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

      <div className="flex flex-col-reverse lg:flex-row mb-32 justify-between items-center lg:gap-20">
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
          <h1 className="text-2xl font-bold">
            Real-Time Progress Monitoring
          </h1>
          <p
            style={{ fontSize: "16px", lineHeight: "36px", fontWeight: "400" }}
          >
            In the realm of data collection, where precision and timeliness are
            paramount, having a robust system in place to monitor progress in
            real-time can be a game-changer.{" "}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row my-20 justify-between items-center lg:gap-20">
        <div id="" className="w-full lg:w-1/2">
          <h1 className="text-2xl font-bold">
            Evaluate and Elevate
          </h1>
          <p
            style={{ fontSize: "16px", lineHeight: "36px", fontWeight: "400" }}
          >
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

      <div className="flex flex-col-reverse lg:flex-row my-20 justify-between items-center lg:gap-20">
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
          <h1 className="text-2xl font-bold">
            Team Collaboration
          </h1>
          <p
            style={{ fontSize: "16px", lineHeight: "36px", fontWeight: "400" }}
          >
            Our platform is designed to enhance teamwork by offering a suite of
            powerful collaboration features that enable you to work seamlessly
            with your colleagues, share valuable insights, and collectively
            arrive at smart solutions.&nbsp;
          </p>
        </div>
      </div>
    </div>
  );
};

export default Steps;