"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {formService} from "@/services/form-service/form.service";

function VisitBtn({ shareUrl }: { shareUrl: object }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // avoiding window not defined error
  }

  // const shareLink = `${window.location.origin}/submit/${shareUrl}`;
  
  const shareLink = `http://localhost:3000/submit/${shareUrl}`;
  return (
    <Button
      className="w-[90px] text-white bg-peach_primary hover:bg-peach_secondary hover:cursor-pointer hover:border-dashed"
    //   onClick={() => {
    //     window.open(shareLink, "_blank");
    //   }}
    >
      Delete
    </Button>
  );
}

export default VisitBtn;
