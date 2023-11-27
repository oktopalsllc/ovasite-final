import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return <div className="flex flex-col flex-grow">{children}</div>;
}

export default layout;
