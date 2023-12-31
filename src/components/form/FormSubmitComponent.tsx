"use client";

import React, { useCallback, useRef, useState, useTransition, useEffect } from "react";
import { FormElementInstance, FormElements } from "./FormElements";
import { Button } from "./ui/button";
import { HiCursorClick } from "react-icons/hi";
import { toast } from "./ui/use-toast";
import { ImSpinner2 } from "react-icons/im";
import { SubmitForm } from "@/actions/form";
import { GetFormById } from "@/actions/form";

function FormSubmitComponent({ formUrl, content }: { content: FormElementInstance[]; formUrl: string }) {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  async function getGeolocation(): Promise<string> {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          const geolocation = {
            latitude,
            longitude
          };
          resolve(JSON.stringify(geolocation));
        }, (error) => {
          reject(error);
        });
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  }

  useEffect(() => {
    getGeolocation()
      .then((result) => {
        setLocation(JSON.parse(result) as { latitude: number; longitude: number });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, actualValue);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  }, [content]);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);
  
  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast({
        title: "Error",
        description: "please check the form for errors",
        variant: "destructive",
      });
      return;
    }

    try {
      const jsonContent = JSON.stringify({
        formValues: formValues.current,
        location: location
      });
      const submit = await SubmitForm(formUrl, jsonContent);
      if (submit) {
        setSubmitted(true);
      }
      else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-peach_primary rounded">
          <h1 className="text-2xl font-bold">Response collected</h1>
          <p className="text-muted-foreground">Thank you for your response, you can close this page now.</p>
        </div>
      </div>
    );
  }



  return (
    <>

      <div className="flex bg-white justify-center w-full h-full items-center p-8">
        <div
          key={renderKey}
          className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-peach_primary rounded"
        >
          {content.map((element) => {
            const FormElement = FormElements[element.type].formComponent;
            return (
              <FormElement
                key={element.id}
                elementInstance={element}
                submitValue={submitValue}
                isInvalid={formErrors.current[element.id]}
                defaultValue={formValues.current[element.extraAttributes?.label]}
              />
            );
          })}
          <Button
            className="mt-8 text-white bg-peach_primary hover:bg-[#fe5000] hover:cursor-pointer hover:border-dashed"
            onClick={() => {
              startTransition(submitForm);
            }}
            disabled={pending}
          >
            {!pending && (
              <>
                <HiCursorClick className="mr-2" />
                Submit
              </>
            )}
            {pending && <ImSpinner2 className="animate-spin" />}
          </Button>
        </div>
      </div>
    </>
  );
}

export default FormSubmitComponent;
