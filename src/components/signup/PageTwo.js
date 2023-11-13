import { Country, State } from "country-state-city";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Selector from "../selector";
import Image from "next/image";

function PageTwo() {
  let countryData = Country.getAllCountries();

  const [country, setCountry] = useState(countryData[0]);
  const [currentStep, setCurrentStep] = useState(1);
  const [stateData, setStateData] = useState();

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

  useEffect(() => {
    setStateData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);

  return (
    <>
      <div style={{ display: currentStep === 2 ? "block" : "none" }}>
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
                src="/Frame756.jpg"
                style={{ marginLeft: "20%", marginTop: "40px" }}
              />
              <div className="flex flex-1 flex-col justify-center px-4 py-2 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                  <div>
                    <h1 className="title-font font-bold text-xl text-[#001233] mb-4 mt-10">
                      Create your business
                    </h1>
                  </div>

                  <div className="mt-10">
                    <div>
                      <form action="email" method="POST" className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium leading-6 text-[#001233]">
                            <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-[#000000]">
                              What is your business name?
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
                              placeholder="Your business name"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium leading-6 text-[#001233]"
                          >
                            Where is your organization located?
                          </label>
                        </div>
                        <div className="mt-2">
                          <p className="mt-1 px-3 py-2 border-collapse placeholder-slate-400 focus:outline-none focus:border-[#001233] focus:ring-[#001233] block w-full rounded-sm sm:text-sm focus:ring-1">
                            <label
                              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-city"
                            >
                              Country
                            </label>

                            <Selector
                              data={countryData}
                              selected={country}
                              setSelected={setCountry}
                            />
                          </p>
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

export default PageTwo;
