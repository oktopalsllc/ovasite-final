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
    <div className="mt-20 flex w-full h-full flex-col items-center justify-center gap-4">
      <h2 className="text-destructive text-4xl">Something went wrong!</h2>
      <Button onClick={handleBack} className="text-white bg-peach_primary hover:bg-[#fe5000] hover:cursor-pointer hover:border-dashed">
        Refresh
      </Button>
    </div>
  );
}

export default ErrorPage;
