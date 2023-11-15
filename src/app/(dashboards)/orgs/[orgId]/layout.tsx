'use client';
import SidebarMenu from "@/components/orgs/SidebarMenu";
import { SidebarNav } from "@/components/orgs/SidebarNav";

export default function OrgsLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col md:flex-row bg-gray-100"> 
      {/* <SidebarNav activeLink={"projects"} /> */}
      <SidebarMenu />
      <section className="px-10 md:w-[75vw]">
        {children}
      </section>
    </section>
  )
}