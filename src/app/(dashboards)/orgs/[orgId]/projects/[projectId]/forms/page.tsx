"use client";
import { Skeleton } from "@/components/form/ui/skeleton";
import { Suspense } from "react";
import { Separator } from "@/components/form/ui/separator";
import CreateFormBtn from "@/components/form/CreateFormBtn";
import  FormCards  from "@/components/form/list/FormCards";

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
