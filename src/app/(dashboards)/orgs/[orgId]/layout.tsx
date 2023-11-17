"use client";
import Header from "@/components/orgs/Header";
import SidebarMenu from "@/components/orgs/SidebarMenu";
import { SidebarNav } from "@/components/orgs/SidebarNav";
import Footer from "@/components/orgs/Footer";

export default function OrgsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <section className="flex flex-col md:flex-row bg-gray-100 h-full">
    //   {/* <SidebarNav activeLink={"projects"} /> */}
    //   <SidebarMenu />
    //   <section className="w-full">
    //     <Header />
    //     <div className="px-6 md:px-10">{children}</div>
    //     <Footer />
    //   </section>
    // </section>
    <section className="bg-gray-100 h-full w-full">
        <Header />
        <div className="px-6 md:px-10">{children}</div>
        <Footer />
      </section>
  );
}
