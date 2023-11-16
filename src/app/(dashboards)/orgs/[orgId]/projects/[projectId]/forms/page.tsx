"use client";
import { 
  // GetFormStats, 
  GetForms } from "@/actions/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/form/ui/card";
import { Skeleton } from "@/components/form/ui/skeleton";
import { ReactNode, Suspense } from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { Separator } from "@/components/form/ui/separator";
import CreateFormBtn from "@/components/form/CreateFormBtn";
import { Form } from "@prisma/client";
import { Badge } from "@/components/form/ui/badge";
import { formatDistance } from "date-fns";
import { Button } from "@/components/form/ui/button";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import  FormCards  from "@/components/form/list/FormCards";
import { useParams } from "next/navigation";

export default function Forms({params}: {params : {projectId: string}}) {
  const {projectId} = params;
  return (
    <div className="container pt-4">
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Your forms</h2>
      <Separator className="my-6" />
      <div className="grid gric-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormBtn />
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards projectId={projectId} />
        </Suspense>
      </div>
    </div>
  );
}


function FormCardSkeleton() {
  return <Skeleton className="border-2 border-primary-/20 h-[190px] w-full" />;
}
