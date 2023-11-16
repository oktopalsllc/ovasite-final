"use client";

import React, { useState } from "react";
import PageOne from "@/components/signup/PageOne";
import PageThree from "@/components/signup/PageThree";
import PageFour from "@/components/signup/PageFour";
import PageFive from "@/components/signup/PageFive";
import PageSix from "@/components/signup/PageSix";
import PageSeven from "@/components/signup/PageSeven";
import PageEight from "@/components/signup/PageEight";
import PageTwo from "./PageTwo";

function PagesController() {
  // const [currentStep, setCurrentStep] = useState(1);

  // const handleNext = () => {
  //   setCurrentStep(currentStep + 1);
  // };

  // const handleBack = () => {
  //   setCurrentStep(currentStep - 1);
  // };
  // //! ================================================================================

  // const options = [
  //   { label: "LinkedIn", value: "linkedin" },
  //   { label: "Facebook", value: "facebook" },
  //   { label: "Instagram", value: "instagram" },
  //   { label: "Affiliate", value: "affiliate" },
  //   { label: "Twitter(X)", value: "twitter" },
  //   { label: "Referrals", value: "referrals" },
  // ];

  return (
    <>
      <div>
        {/* first page */}
        <PageOne />
        {/* second page */}
        {/* <PageTwo /> */}
        {/* third page */}
        {/* <PageThree /> */}
        {/* Fourth Page */}
        {/* <PageFour /> */}

        {/* fifth page */}
        {/* <PageFive /> */}

        {/* sixth page */}
        {/* <PageSix /> */}

        {/* seventh page  */}
        {/* <PageSeven /> */}

        {/* eighth page */}
        {/* <PageEight /> */}
      </div>
    </>
  );
}

export default PagesController;
