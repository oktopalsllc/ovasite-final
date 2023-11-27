'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { ImSpinner2 } from "react-icons/im";
import { LuView } from "react-icons/lu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/form/ui/table";
import { Badge } from "@/components/form/ui/badge";
import { Separator } from "@/components/form/ui/separator";
import { projectService } from '@/services/project-service/project.service';
import Link from 'next/link';

export default function Projects({ orgId }: { orgId: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loaded, setLoaded] = useState(false);
  const fetchData = useCallback(async () => {
    try {
      const tokenString =
        typeof window !== 'undefined' ? localStorage.getItem('token') : '';
      const token = tokenString?.toString() || '';
      const fetchedProjects = await projectService.getProjects(orgId, token);
      setProjects(fetchedProjects);
      setLoaded(true);
    } catch (error) {
      console.error(error);
    }
  }, [orgId]);

  useEffect(() => {
    fetchData();
  });

  const convertDate = (date: Date) => {
    const dateObject: Date = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: '2-digit',
    };
    const customFormat = dateObject.toLocaleDateString('en-US', options);
    return customFormat;
  };

  return (
    <div className="container w-full overflow-x-auto ">
      <h2 className='text-xl font-bold col-span-2'>
        Projects
      </h2>      
      <Separator className="my-6" />
      {loaded ?
        <>
          {projects.length > 0 ?
            <Table className="bg-white rounded-md border">
              <TableHeader>
                <TableRow>
                  <TableHead className="uppercase font-bold">
                    Name
                  </TableHead>
                  <TableHead className="uppercase font-bold">Created On</TableHead>
                  <TableHead className="uppercase font-bold">Last Modified</TableHead>
                  <TableHead className="font-bold -mr-2text-muted-foreground text-right uppercase">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project, index) => (
                  <TableRow key={index}>
                    <TableCell>{project.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {convertDate(project.createdAt)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {convertDate(project.updatedAt)}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-right flex flex-row justify-end gap-1">
                      <Badge title="View Details" variant={"outline"}>
                        <Link href={`/orgs/${orgId}/projects/${project.id}`}><LuView
                          className="text-blue-600 bg-white rounded-md hover:cursor-pointer w-10 h-4"
                        /></Link>
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            :
            <h1 className='text-md font-bold my-4'>No projects created</h1>

          }
        </>
        :
        <div className="w-full flex mt-14 justify-center mb-20"><ImSpinner2 className="animate-spin h-12 w-12" /></div>
      }
    </div>
  )
}