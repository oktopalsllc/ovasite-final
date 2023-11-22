"use client";
import { useRouter } from "next/navigation";
import { Button } from "../form/ui/button";
import { useEffect, useState } from "react";
import { projectService } from "@/services/project-service/project.service";
import { toast } from "../form/ui/use-toast";
import { useTransition } from "react";
import { FaSpinner } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../form/ui/alert-dialog";

export default function DeleteBtn({id, orgId}:{id: string, orgId: string}){
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [loading, startTransition] = useTransition();
  
    useEffect(() => {
      setMounted(true);
    }, []);
  
    if (!mounted) {
      return null; // avoiding window not defined error
    }
    
    async function deleteProject() {
        try {
            const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
            const deleteProject = await projectService.deleteProject(orgId, id, token as string);
            const { message, status, deletedProject } = deleteProject;
            if (status) {
                toast({
                    title: "Success",
                    description: message,
                });
                router.push(`/orgs/${deletedProject.organizationId}/projects`);
            }
            else {
                toast({
                    title: "Error",
                    description: "Something went wrong, please try again later",
                    variant: "destructive",
                });
            }
        } 
        catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong, please try again later",
                variant: "destructive",
            });
        }
    }

    return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="lg:w-[200px] w-full text-white bg-peach_primary hover:bg-[#fe5000] hover:cursor-pointer hover:border-dashed"
    
            >
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete this project?</AlertDialogTitle>
              <AlertDialogDescription className="text-red-500">
                This action cannot be undone. After deleting this project, all the forms, submissions and reports relating to it will be deleted. <br />
                Make sure to export necesary data &#40;form submission data and report data&#41; before deleting.
                <br />
    
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-white bg-peach_primary hover:bg-peach_secondary hover:cursor-pointer hover:border-dashed">Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="text-white bg-[#28a891] hover:bg-[#78dcca] hover:cursor-pointer hover:border-dashed"
                disabled={loading}
                onClick={(e) => {
                  e.preventDefault();
                  startTransition(deleteProject);
                }}
              >
                Proceed {loading && <FaSpinner className="animate-spin" />}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
}