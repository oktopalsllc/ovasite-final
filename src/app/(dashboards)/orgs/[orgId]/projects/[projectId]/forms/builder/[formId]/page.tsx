"use client";
import { Form } from "@prisma/client";
import { GetFormById } from "@/actions/form";
import FormBuilder from "@/components/form/FormBuilder";
import React, { useEffect, useState, useCallback } from "react";

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

  // const form = await GetFormById("clotepg8f0002ou4sknx7jc8q");
  // console.log(form);
  // if (!form) {
  //   throw new Error("form not found");
  // }
  if (form === null || form === undefined) {
    // You can render a loading state here
    return <div>Loading...</div>;
  }
  // console.log(form);
  return <FormBuilder form={form} />;
}

export default BuilderPage;
