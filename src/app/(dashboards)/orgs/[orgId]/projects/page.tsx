"use client";
import { Skeleton } from "@/components/form/ui/skeleton";
import { Suspense } from "react";
import { Separator } from "@/components/form/ui/separator";
import CreateProjectBtn from "@/components/project/CreateProjectBtn";
import ProjectCards from "@/components/project/list/Projects";

export default function Projects({ params }: { params: { orgId: string } }) {
  const { orgId } = params;
  return(
    <div className="container pt-4">
    <Separator className="my-6" />
    <h2 className="text-4xl font-bold col-span-2">Projects</h2>
    <Separator className="my-6" />
    <div className="grid gric-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CreateProjectBtn orgId={orgId}/>
      <Suspense
        fallback={[1, 2, 3, 4].map((el) => (
          <ProjectCardSkeleton key={el} />
        ))}
      >
        <ProjectCards orgId={orgId} />
      </Suspense>
    </div>
  </div>
  );
}


function ProjectCardSkeleton() {
  return <Skeleton className="border-2 border-primary-/20 h-[190px] w-full" />;
}