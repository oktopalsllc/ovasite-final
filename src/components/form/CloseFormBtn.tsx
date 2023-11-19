"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { formService } from "@/services/form-service/form.service";
import { CloseForm } from "@/actions/form";
import { Form } from "@prisma/client";
import { toast } from "./ui/use-toast";
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
} from "./ui/alert-dialog";

function CloseFormBtn({ form }: { form: Form }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, startTransition] = useTransition();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // avoiding window not defined error
  }

  async function handleClose() {
    try {
      const closeForm = await CloseForm(form.id);
      if (closeForm) {
        toast({
          title: "Success",
          description: "Form closed",
        });
        window.location.reload();
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
          className="lg:w-[150px] w-full text-white bg-yellow-500 hover:bg-yellow-300 hover:cursor-pointer hover:border-dashed"
        >
          Close Form
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to close this form?</AlertDialogTitle>
          <AlertDialogDescription className="text-red-500">
            This action cannot be undone. After closing this form, submissions cannot be collected with it anymore. <br />
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
              startTransition(handleClose);
            }}
          >
            Proceed {loading && <FaSpinner className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CloseFormBtn;

