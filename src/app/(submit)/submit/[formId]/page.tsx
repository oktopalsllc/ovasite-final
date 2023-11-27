import { GetFormById, UpdateFormVisits } from "@/actions/form";
import { FormElementInstance } from "@/components/form/FormElements";
import FormSubmitComponent from "@/components/form/FormSubmitComponent";
import React from "react";

async function SubmitPage({
  params,
}: {
  params: {
    formId: string;
  };
}) {
  const form = await GetFormById(params.formId);

  async function updateVisit() {
    await UpdateFormVisits(params.formId);
  }

  if (!form) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-peach_primary rounded">
          <h1 className="text-2xl font-bold">Form not found</h1>
          <p className="text-muted-foreground">The form you are looking for does not exist or has been deleted</p>
        </div>
      </div>
    );
  }
  if (!form.closed) {
    updateVisit();

    const formContent = JSON.parse(form.formData) as FormElementInstance[];

    return <FormSubmitComponent formUrl={params.formId} content={formContent} />;
  }
  else {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-peach_primary rounded">
          <h1 className="text-2xl font-bold">Form closed</h1>
          <p className="text-muted-foreground">This form has closed and is no longer taking any responses.</p>
        </div>
      </div>
    );
  }
}

export default SubmitPage;
