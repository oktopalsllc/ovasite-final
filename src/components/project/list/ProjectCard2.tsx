import { useParams } from "next/navigation";
import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { Project } from "@prisma/client";

function ProjectCard2({ project }: { project: Project }) {
  const hParams = useParams();
  const { orgId } = hParams;
  const orgValue = orgId.toString() || "";

  const convertDate = (date: Date) => {
    const dateObject: Date = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "2-digit",
    };
    const customFormat = dateObject.toLocaleDateString("en-US", options);
    return customFormat;
  };

  return (
    <>
      {/* <pre>{JSON.stringify(project, null, 2)}</pre> */}
      <div className="border border-gray-200 shadow-lg rounded-lg bg-white">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 border-b border-gray-200 p-4 ">
          <h3 className="font-bold text-xl">{project.name}</h3>
          <div className="flex items-center space-x-4">
            <span
              className={`bg-green-200 border border-green-400 text-green-700 text-xs font-semibold rounded-3xl px-2 py-1`}
            >
              {project.status}
            </span>
            <HiDotsVertical classname="" />
          </div>
        </div>

        {/* Body */}
        <div className="px-4 py-2 space-y-3">
          <div className="">
            <span className="font-bold">Start Date:</span>{" "}
            {convertDate(project.startDate)}
          </div>
          <div className="">
            <span className="font-bold">End Date:</span>{" "}
            {convertDate(project.endDate)}
          </div>
        </div>
        <div className="px-4 py-2">
          <div className="block font-bold">Description</div>
          <div className="block">{project.description || "No description"}</div>
        </div>
      </div>
    </>
  );
}

export default ProjectCard2;
