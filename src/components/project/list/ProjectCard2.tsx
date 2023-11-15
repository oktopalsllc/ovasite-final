import { useParams } from "next/navigation";
import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { Project } from "@prisma/client";
import Link from "next/link";

function DropdownMenu({ project }: { project: Project }) {
  const hParams = useParams();
  const { orgId } = hParams;
  const orgValue = orgId.toString() || "";
  return (
    <div className="absolute top-0 right-8 w-24">
      <div className="space-y-2 bg-white rounded-md shadow-md p-3 text-start">
        <p className="text-gray-500 hover:text-black text-sm text-start font-bold cursor-pointer">
          <Link href={`/orgs/${orgValue}/projects/${project.id}`}>View</Link>
        </p>
        <p className="text-gray-500 hover:text-black text-sm text-start font-bold cursor-pointer">
          Edit
        </p>
        <p className="text-gray-500 hover:text-black text-sm text-start font-bold cursor-pointer">
          Delete
        </p>
      </div>
    </div>
  );
}

function ProjectCard2({ project }: { project: Project }) {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
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
        <div className="w-full flex justify-between items-center mb-6 border-b border-gray-200 p-6 ">
          <h3 className="font-bold text-sm md:text-xl truncate w-1/2">{project.name}</h3>
          <div className="flex justify-end items-center space-x-4 w-1/2">
            <div
              className={`${
                project.isCompleted
                  ? "bg-green-200 border border-green-400 text-green-700"
                  : "bg-blue-200 border border-blue-400 text-blue-700"
              } text-xs font-semibold rounded-3xl px-2 py-1 block`}
            >
              {project.isCompleted ? "Completed" : project.status}
            </div>
            <div className="relative">
              <div className={`${showDropdown ? "block" : "hidden"}`}>
                <DropdownMenu project={project} />
              </div>
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                className="px-1 py-2 cursor-pointer rounded-lg border bg-gray-100"
              >
                <HiDotsVertical classname="" />
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-2 space-y-2">
          <div className="">
            <span className="font-bold">Start Date:</span>{" "}
            {convertDate(project.startDate)}
          </div>
          <div className="">
            <span className="font-bold">End Date:</span>{" "}
            {convertDate(project.endDate)}
          </div>
        </div>
        <div className="px-6 py-6">
          <div className="block font-bold ">Description</div>
          <div className="block truncate">
            {project.description || "No description"}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectCard2;
