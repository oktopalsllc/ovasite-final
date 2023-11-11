import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

function PageFour() {
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
      <div style={{ display: currentStep === 4 ? "block" : "none" }}>
        <div id="account">
          <div>
            <div>
              <div>
                <Link href="/home">
                  <Image alt='Logo' width={70} height={undefined}
                    src="Logo.jpg"
                    style={{ marginLeft: "20%", marginTop: "10px" }}
                  />
                </Link>
                <Image alt='frame' width={400} height={undefined}
                  src="/Frame7563.jpg"
                  style={{ marginLeft: "20%", marginTop: "40px" }}
                />
                <div className="flex flex-1 flex-col justify-center px-4 py-2 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                  <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                      <br />
                      <h1 className="title-font font-bold text-xl text-[#001233] mb-4 mt-10">
                        Which currency do you want to use?
                      </h1>
                    </div>

                    <div className="mt-10">
                      <div>
                        <form
                          action="email"
                          method="POST"
                          className="space-y-6"
                        >
                          <div>
                            <div className="mt-2">
                              <input
                                id="address"
                                name="address"
                                type="{showPassword ? 'text' : 'text'}"
                                autoComplete="current-password"
                                required
                                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#001233] focus:ring-[#001233] block w-full rounded-md sm:text-sm focus:ring-1 "
                                placeholder="NGN"
                              />
                            </div>
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
          </div>
          <div>
            <Image alt='frame' width={undefined} height={undefined} src="Frame750.jpg" />
          </div>
        </div>
      </div>
    </>
  );
}

export default PageFour;
