"use client";
import Header from "@/components/orgs/Header";
import SidebarMenu from "@/components/orgs/SidebarMenu";
import { SidebarNav } from "@/components/orgs/SidebarNav";

export default function OrgsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
