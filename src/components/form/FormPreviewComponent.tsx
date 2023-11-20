"use client";

import React, {  useRef} from "react";
import { Button } from "./ui/button";
import { FormElementInstance, FormElements } from "./FormElements";
import { HiCursorClick } from "react-icons/hi";

function FormPreviewComponent({ formUrl, content }: { content: FormElementInstance[]; formUrl: string }) {
  const formValues = useRef<{ [key: string]: string }>({});
  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div
        key={formUrl}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-peach_primary rounded"
      >
      <p className="text-lg font-bold text-center text-muted-foreground">Form preview</p>
      <p className="text-sm text-muted-foreground text-center">This is how your form looks like to respondents.<br/> You can close this page when you are done.</p>

        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
        <Button
          className="mt-8 text-white bg-peach_primary hover:bg-[#fe5000] hover:cursor-pointer hover:border-dashed"
          title="Not functional"
        >
              <HiCursorClick className="mr-2" />
              Submit
        </Button>
      </div>
    </div>
  );
}

export default FormPreviewComponent;
