"use client";
import { useState, useEffect } from "react";
import { Separator } from "@/components/form/ui/separator";
import FormCards from "@/components/form/list/FormCards";
import Submissions from "@/components/submission/Submissions";
import Reports from "@/components/report/Reports";
import Insights from "@/components/project/stats/Insights";
import Settings from "@/components/project/Setings";
import { useParams } from "next/navigation";
import { ImSpinner2 } from "react-icons/im";
import { projectService } from "@/services/project-service/project.service";

export default function Project({ params,
}: {
  params: {
    projectId: string;
  };
}) {
  const urlParams = useParams();
  const { orgId } = urlParams;
  const orgValue = orgId.toString() || "";
  const projectId = params.projectId;
  const items = [
    { id: 1, name: 'Forms' },
    { id: 2, name: 'Submissions' },
    { id: 3, name: 'Reports' },
    { id: 4, name: 'Insights' },
    { id: 5, name: 'Settings' },
  ];

  const [active, setActive] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [project, setName] = useState<Project>();
  const tokenString = typeof window !== 'undefined' ? localStorage.getItem('token') : "";
  const token = tokenString?.toString() || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const project = await projectService.getProject(orgValue, projectId, token);
        if (project) {
          setName(project);
          setLoaded(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [orgValue, projectId, token]);

  const ActiveItem = () => {
    switch (active) {
      case 1:
        return <FormCards projectId={projectId} />;
      case 2:
        return <Submissions projectId={projectId} />;
      case 3:
        return <Reports projectId={projectId} />;
      case 4:
        return <Insights projectId={projectId} />;
      case 5:
        return <Settings project={project} />;
      default:
        return <FormCards projectId={projectId} />;
    }
  };
  return (
    <>
      {loaded ?
        <div className="container pt-4">
          <h2 className="text-2xl font-bold col-span-2">
            Project: {project?.name}
          </h2>
          <Separator className="my-3" />
          <div className="container flex align-middle overflow-x-auto">
            {items.map((item, i) => {
              return (
                <div
                  key={i}
                  className={`m-2 p-2 text-center text-xs md:text-sm lg:text-md hover:bg-gray-300 hover:text-gray-800 w-full`}
                  onClick={(i) => {
                    setActive(item.id);
                  }}>
                  {item.name}
                </div>
              );
            })}
          </div>
          <Separator className="my-3" />
          <h3 className="text-xl font-bold col-span-2">
            {items.find((item) => item.id === active)?.name ?? 'Default Name'}
          </h3>
          <Separator className="my-3" />
          <div className="flex flex-row">
            {ActiveItem()}
          </div>
        </div>
        :
        <div className="flex mt-14 justify-center"><ImSpinner2 className="animate-spin h-12 w-12" /></div>
      }
    </>
  );
}
