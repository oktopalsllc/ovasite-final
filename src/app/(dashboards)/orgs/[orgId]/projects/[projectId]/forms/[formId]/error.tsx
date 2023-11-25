"use client";

import { Button } from "@/components/form/ui/button";
import React, { useEffect } from "react";

function ErrorPage({ error }: { error: Error }) {
  function handleBack() {
    window.location.reload();
  }
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex w-full h-full pt-20 flex-col items-center justify-center gap-4">
      <h2 className="text-destructive text-4xl">Something went wrong!</h2>
      <Button onClick={handleBack} className="text-white bg-[#001333] hover:bg-[#7f8185] hover:cursor-pointer hover:border-dashed">
        Refresh
      </Button>
    </div>
  );
}

export default ErrorPage;
