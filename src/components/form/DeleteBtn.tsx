"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {formService} from "@/services/form-service/form.service";
import { Form } from "@prisma/client";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { ImSpinner2 } from "react-icons/im";

function VisitBtn({ form }: { form: Form }) {
  const router = useRouter();
  const [loaded, setLoaded] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // avoiding window not defined error
  }

  async function handleDelete () {
    try {
      setLoaded(false);
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
      const deleteForm = await formService.deleteForm(form.organizationId, form.id, token as string);
      const {message, status, deletedForm} = deleteForm;
      if(status){
        setLoaded(true);
        toast({
          title: "Success",
          description: message,
        });
        router.push(`/orgs/${deletedForm.organizationId}/projects/${deletedForm.projectId}`);
      }
      else {
        setLoaded(true);
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
      setLoaded(true);
      toast({
        title: "Error",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
      return
    }
  }
  
  return (
    <Button
      className="w-[150px] text-white bg-peach_primary hover:bg-[#fe5000] hover:cursor-pointer hover:border-dashed"
      onClick={handleDelete}
    >
      {loaded ? "Delete" : <>
                            Deleting &nbsp;
                            <ImSpinner2 className="animate-spin" />
                          </>}
    </Button>
  );
}

export default VisitBtn;
