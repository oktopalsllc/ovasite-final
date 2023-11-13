"use client";
import {
    useRouter,
    redirect,
    usePathname,
    useSearchParams,
  } from "next/navigation";
  import { useEffect, useState } from "react";

export default function Projects({params}: {
    params: {
      orgId: string;
    };
  }){
    const {orgId} = params;
    console.log("🚀 ~ file: page.tsx:16 ~ orgId:", orgId)
    const router = useRouter();
    return <h3>paste id for top abeg</h3>
}