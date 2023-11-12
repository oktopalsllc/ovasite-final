import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

function PageSix() {
  const [previewImage, setPreviewImage] = useState(null);
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <>
      <div style={{ display: currentStep === 6 ? "block" : "none" }}>
        <div id="account">
          <div>
            <div>
              <div>
                <Link href="/home">
                  <Image alt="Logo" src="/Logo.jpg" width={60} height={60} />
                </Link>
                <Image
                  alt="frame"
                  width={400}
                  height={200}
                  src="/Frame7567.jpg"
                  style={{ marginLeft: "20%", marginTop: "40px" }}
                />

                <h1
                  className="title-font font-bold text-xl text-[#001233] mb-4 mt-10"
                  style={{ marginLeft: "20%" }}
                >
                  Business Logo
                </h1>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "40px",
                    marginLeft: "20%",
                  }}
                >
                  <div
                    id="preview"
                    style={{
                      height: "150px",
                      width: "150px",
                      backgroundColor: "lightgray",
                      borderRadius: "10px",
                      marginRight: "20px",
                      backgroundImage: `url(${previewImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* Image will be displayed here */}
                  </div>

                  <div>
                    <div className="file-input-wrapper">
                      <input
                        type="file"
                        id="custom-file-input"
                        className="file-input"
                        onChange={handleFileChange}
                      />
                      <label
                        htmlFor="custom-file-input"
                        className="custom-file-label"
                        style={{ borderRadius: "70px", padding: "20px" }}
                      >
                        Choose a File
                      </label>
                    </div>
                  </div>
                </div>

                <br />
                <h1 style={{ marginLeft: "20%" }}>
                  Dont have a logo? Select any of the avatars?
                </h1>
                <br />
                <div id="avater">
                  <div
                    style={{
                      backgroundColor: "#FF595A",
                      textAlign: "center",
                    }}
                  >
                    A
                  </div>
                  <div
                    style={{
                      backgroundColor: "#678240",
                      textAlign: "center",
                    }}
                  >
                    A
                  </div>
                  <div
                    style={{
                      backgroundColor: "#439EBF",
                      textAlign: "center",
                    }}
                  >
                    A
                  </div>
                  <div
                    style={{
                      backgroundColor: "#F58428",
                      textAlign: "center",
                    }}
                  >
                    A
                  </div>
                </div>
                <div style={{ textAlign: "center", marginTop: "15%" }}>
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
          <div>
            <Image alt="frame" width={200} height={200} src="/Frame750.jpg" />
          </div>
        </div>
      </div>
    </>
  );
}

export default PageSix;
