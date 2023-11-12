"use client";
import React from "react";
import propTypes from "prop-types";
import "@/styles/styles.css";
import Image from "next/image";

export const Content = () => {
  return (
    <div className="w-10/12 lg:w-9/12 mx-auto mt-36">
      <div id="features">
        <div>
          <h1 id="topbtn">Features</h1>
        </div>
        <br />
        <div id="fea" className="text-xl md:text-3xl font-bold">
          <p>Features designed to enhance your experience</p>
        </div>
        <div id="fea2">
          <p className="text-base md:text-lg font-normal leading-6 md:leading-9 mt-4 md:mt-8">
            Experience revolutionary features for gathering, analyzing, and
            utilizing data. From adaptable forms to real-time insights, OvaSite
            empowers you
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16 ">
        <div className="bg-[#0073E633] min-h-[300px] md:min-h-[430px] rounded-2xl bg-[url('/data_collection_storage.svg')] bg-no-repeat bg-right-bottom p-6 lg:p-14 bg-[length:30%_30%] lg:bg-auto">
          <div className="mt-4">
            <h4 className="text-xl md:text-2xl leading-9 font-bold">
              Data Collection and Storage
            </h4>
            <p className="text-base md:text-lg leading-[24px] mt-3 md:mt-6">
              Collection and storage of quantitative and qualitative Data from
              multiple data source while ensuring data security
            </p>
          </div>
        </div>

        <div className="bg-[#FFA50033] min-h-[300px] md:min-h-[430px] rounded-2xl bg-[url('/XMLID_2066_.svg')] bg-no-repeat bg-right-bottom p-6 lg:p-14 bg-[length:30%_30%] lg:bg-auto">
          <div className="mt-4">
            <h4 className="text-xl md:text-2xl leading-9 font-bold">
              Real-time Data Entry and Updating
            </h4>
            <p className="text-base md:text-lg leading-[24px] mt-3 md:mt-6">
              OvaSite facilitates real-time data entry and updating to ensure
              the most current information is available for analysis
            </p>
          </div>
        </div>

        <div className="bg-[#4CAF5033] min-h-[300px] md:min-h-[430px] rounded-2xl bg-[url('/Frame.svg')] bg-no-repeat bg-right-bottom p-6 lg:p-14 bg-[length:30%_30%] lg:bg-auto">
          <div className="mt-4">
            <h4 className="text-xl md:text-2xl leading-9 font-bold">
              Cost-Effective Analysis and Feedback
            </h4>
            <p className="text-base md:text-lg leading-[24px] mt-3 md:mt-6">
              After collecting your data, get instant feedback from your
              analyzed data for informed decision making.
            </p>
          </div>
        </div>

        <div className="bg-[#AF584C33] min-h-[300px] md:min-h-[430px] rounded-2xl bg-[url('/Group.svg')] bg-no-repeat bg-right-bottom p-6 lg:p-14 bg-[length:30%_30%] lg:bg-auto">
          <div className="mt-4">
            <h4 className="text-xl md:text-2xl leading-9 font-bold">Works Offline</h4>
            <p className="text-base md:text-lg leading-[24px] mt-3 md:mt-6">
              You can collect data even without an internet connection. Data
              collected offline, is automatically uploaded once your device is
              connected to the internet.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
export default Content;
Content.propTypes = {
  imageSrc: propTypes.string,
  title: propTypes.string,
  description: propTypes.string,
  buttonText1: propTypes.string,
  buttonText2: propTypes.string,
};
