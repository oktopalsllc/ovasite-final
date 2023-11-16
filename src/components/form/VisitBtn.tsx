"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

function VisitBtn({ shareUrl }: { shareUrl: string }) {
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
      className="w-[150px] text-white bg-[#28a891] hover:bg-[#78dcca] hover:cursor-pointer hover:border-dashed"
      onClick={() => {
        window.open(shareLink, "_blank");
      }}
    >
      Visit
    </Button>
  );
}

export default VisitBtn;
