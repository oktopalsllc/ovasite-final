import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return <div className="flex w-full flex-grow mx-auto overflow-y-auto h-[100vh] ">{children}</div>;
}

export default layout;
