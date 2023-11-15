'use client';
import { SidebarNav } from "@/components/orgs/SidebarNav";

export default function OrgsLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-20 md:flex-row"> 
      <SidebarNav activeLink={"projects"} />
      <section className="px-10 bg-mobile-bg md:bg-ova_white md:ml-[25vw]  md:w-[75vw]">
        {children}
      </section>
    </section>
  )
}