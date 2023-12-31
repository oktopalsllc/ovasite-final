import { GetFormContentByUrl } from "@/actions/form";
import { FormElementInstance } from "@/components/form/FormElements";
import FormPreviewComponent from "@/components/form/FormPreviewComponent";
import React from "react";

async function SubmitPage({
  params,
}: {
  params: {
    formId: string;
  };
}) {
  const form = await GetFormContentByUrl(params.formId);

  if (!form) {
    throw new Error("form not found");
  }

  const formContent = JSON.parse(form.formData) as FormElementInstance[];

  return <FormPreviewComponent formUrl={params.formId} content={formContent} />;
}

export default SubmitPage;
