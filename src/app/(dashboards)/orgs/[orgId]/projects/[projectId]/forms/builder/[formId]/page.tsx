"use client";
import { Form } from "@prisma/client";
import { GetFormById } from "@/actions/form";
import FormBuilder from "@/components/form/FormBuilder";
import React, { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";

function BuilderPage({
  params,
}: {
  params: {
    formId: string;
  };
}) {
  const { formId } = params;
  const [form, setForm] = useState<Form | null>();

  const fetchData = async () => {
    try {
      const fetchedForm = await GetFormById(
        formId
      );
      if (!fetchedForm) {
        throw new Error("form not found");
      }
      setForm(fetchedForm);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

 
  if (form === null || form === undefined) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <ImSpinner2 className="animate-spin h-12 w-12" />
      </div>
    );
  }
  return <FormBuilder form={form} />;
}

export default BuilderPage;
