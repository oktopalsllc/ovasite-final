"use client";
import { Skeleton } from "@/components/form/ui/skeleton";
import { Suspense } from "react";
import { Separator } from "@/components/form/ui/separator";
import CreateProjectBtn from "@/components/project/CreateProjectBtn";
import ProjectCards from "@/components/project/list/Projects";

export default function Projects({ params }: { params: { orgId: string } }) {
  const { orgId } = params;
  return (
    <>
      <div className="w-full mt-16">
          <Separator className="my-3" />
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-4xl font-bold col-span-2">Projects</h2>
          <CreateProjectBtn orgId={orgId} />
        </div>        
        <Separator className="my-2 md:my-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-4 md:py-8">
          <Suspense
            fallback={[1, 2, 3, 4].map((el) => (
              <ProjectCardSkeleton key={el} />
            ))}
          >
            <ProjectCards orgId={orgId} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

function ProjectCardSkeleton() {
  return <Skeleton className="border-2 border-primary-/20 h-[190px] w-full" />;
}
