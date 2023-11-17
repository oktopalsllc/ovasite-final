"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../form/ui/button";
import { submissionService } from "@/services/submission-service/submission.service";
import { toast } from "../form/ui/use-toast";
import { useRouter } from "next/navigation";
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

function DeleteBtn({ submission }: { submission: Submission }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, startTransition] = useTransition();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // avoiding window not defined error
  }

  async function handleDelete() {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
      const deleteSub = await submissionService.deleteSubmission(submission.organizationId, submission.id, token as string);
      const { message, status, deletedSubmission } = deleteSub;
      if (status) {
        toast({
          title: "Success",
          description: message,
        });
        router.push(`/orgs/${deletedSubmission.organizationId}/projects/${deletedSubmission.projectId}`);
      }
      else {
        toast({
          title: "Error",
          description: "Something went wrong, please try again later",
          variant: "destructive",
        });
        return;
      }
    }
    catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
      return
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="lg:w-[150px] w-full text-white bg-peach_primary hover:bg-[#fe5000] hover:cursor-pointer hover:border-dashed"

        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this submission?</AlertDialogTitle>
          <AlertDialogDescription className="text-red-500">
            This action cannot be undone, export to csv before deleting. <br />
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
              startTransition(handleDelete);
            }}
          >
            Proceed {loading && <FaSpinner className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteBtn;

