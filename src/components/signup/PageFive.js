import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

function PageFive() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };
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
      <div style={{ display: currentStep === 5 ? "block" : "none" }}>
        <div id="account">
          <div>
            <div>
              <Link href="/home">
                <Image alt="Logo" src="/Logo.jpg" width={60} height={60} />
              </Link>
              <Image
                alt="frame"
                width={400}
                height={200}
                src="/Frame7564.jpg"
                style={{ marginLeft: "20%", marginTop: "40px" }}
              />
              <div className="flex flex-1 flex-col justify-center px-4 py-2 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                  <div>
                    <h1 className="title-font font-bold text-xl text-[#001233] mb-4 mt-10">
                      Personal Information
                    </h1>
                  </div>

                  <div className="mt-10">
                    <div>
                      <form method="POST" className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium leading-6 text-[#001233]">
                            <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-[#000000]">
                              What is your name?
                            </span>
                          </label>
                          <div className="mt-2">
                            <input
                              id="businessName"
                              name="businessName"
                              type="text"
                              autoComplete="text"
                              required
                              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#001233] focus:ring-[#001233] block w-full rounded-md sm:text-sm focus:ring-1"
                              placeholder="First and Last Name"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium leading-6 text-[#001233]">
                            Phone Number
                          </label>
                        </div>
                        <div className="mt-2">
                          <input
                            id="businessName"
                            name="businessName"
                            type="text"
                            autoComplete="text"
                            required
                            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#001233] focus:ring-[#001233] block w-full rounded-md sm:text-sm focus:ring-1"
                            placeholder="Phone Number"
                          />
                        </div>
                      </form>
                    </div>

                    <div style={{ textAlign: "right", marginTop: "15%" }}>
                      <button
                        onClick={handleBack}
                        style={{
                          marginRight: "10px",
                          border: "1px solid #E0E0E0",
                        }}
                        className=" border-0 py-2 px-6 focus:outline-none 
                rounded text-[#001233] font-medium "
                      >
                        {" "}
                        Back
                      </button>

                      <button
                        onClick={handleNext}
                        style={{}}
                        className=" bg-[#FF595A] border-0 py-2 px-6 focus:outline-none 
                  hover:bg-[#fe5000] rounded text-[#001233]  font-bold "
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Image alt="frame" width={200} height={200} src="/Frame750.jpg" />
          </div>
        </div>
      </div>
    </>
  );
}

export default PageFive;
