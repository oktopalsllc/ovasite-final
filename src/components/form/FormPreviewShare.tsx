"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImShare } from "react-icons/im";
import { toast } from "./ui/use-toast";
import { Form } from "@prisma/client";

function FormPreviewShare({ form }: { form: Form }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // avoiding window not defined error
  }

  const shareLink = `${window.location.origin}/orgs/${form.organizationId}/projects/${form.projectId}/forms/preview/${form.id}`;
  
  return (
    <div className="flex w-full lg:flex-row flex-col flex-grow gap-4 items-center">
      <Input className="bg-white" value={shareLink} readOnly />
      <Button
        className="lg:w-[250px] w-full text-white bg-[#001333] hover:bg-[#7f8185] hover:cursor-pointer hover:border-dashed"
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast({
            title: "Copied!",
            description: "Link copied to clipboard",
          });
        }}
      >
        <ImShare className="mr-2 h-4 w-4" />
        Share preview
      </Button>
    </div>
  );
}

export default FormPreviewShare;
