"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Form } from "@prisma/client";

function PreviewBtn({ form }: { form:Form }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // avoiding window not defined error
  }

  const shareLink = `${window.location.origin}/orgs/${form.organizationId}/projects/${form.projectId}/forms/preview/${form.id}`;
  
  return (
    <Button
      className="lg:w-[150px] w-full text-white bg-[#28a891] hover:bg-[#78dcca] hover:cursor-pointer hover:border-dashed"
      onClick={() => {
        window.open(shareLink, "_blank");
      }}
    >
      Preview
    </Button>
  );
}

export default PreviewBtn;
