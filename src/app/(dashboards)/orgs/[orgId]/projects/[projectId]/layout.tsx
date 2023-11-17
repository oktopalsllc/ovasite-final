import Logo from "@/components/form/Logo";
// import { UserButton } from "@clerk/nextjs";
import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-[100vh] min-w-full bg-background max-h-screen">
      <nav className="flex justify-between items-center border-b border-border h-[60px] px-4">
       
        <div className="flex gap-4 items-center">
          
          {/* <UserButton afterSignOutUrl="/sign-in" /> */}
        </div>
      </nav>
      <main className="">{children}</main>
    </div>
  );
}

export default Layout;
