'use client';
import { SidebarNav } from "@/components/orgs/SidebarNav";

export default function OrgsLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col md:flex-row"> 
      <SidebarNav activeLink={"projects"} />
      <section className=" bg-mobile-bg md:bg-ova_white md:ml-[25vw]  md:w-[75vw]">
        {children}
      </section>
    </section>
  )
}