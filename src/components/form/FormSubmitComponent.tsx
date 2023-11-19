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
  const [formClosed, setFormClose] = useState(false);
  const [loading, setLoaded] = useState(false);
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

  const getForm = useCallback(async () => {
    try {
      const form = await GetFormById(formUrl);
      if (form) {
        setFormClose(form.closed);
        setLoaded(true);
      }
    } catch (error) {
      console.error('Failed to fetch form:', error);
      // Handle the error appropriately
    }
  }, [formUrl]);
  

  useEffect(() => {
    getForm();
    getGeolocation()
      .then((result) => {
        setLocation(JSON.parse(result) as { latitude: number; longitude: number });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [getForm]);

  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.extraAttributes?.label] || "";
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
      {loading ?
        <>
          {formClosed ?
            <div className="flex justify-center w-full h-full items-center p-8">
              <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-peach_primary rounded">
                <h1 className="text-2xl font-bold">Form closed</h1>
                <p className="text-muted-foreground">This form has closed is no longer taking any responses.</p>
              </div>
            </div> : 
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
          }
        </> : <div className="flex mt-14 justify-center"><ImSpinner2 className="animate-spin h-12 w-12" /></div>
      }
    </>
  );
}

export default FormSubmitComponent;
