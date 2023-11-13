import {
    // GetFormStats, 
    GetForms
  } from "@/actions/form";
  import { useEffect, useState } from "react";
  import { Form } from "@prisma/client";
  import { ImSpinner2 } from "react-icons/im";
  import FormCard from "./FormCard";

  async function FormCards({  projectId }: { projectId: string }) {
    const [forms, setForms] = useState<Form[]>([]);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
      const fetchData = async () => {
        try {
          
          const fetchedForms = await GetForms(projectId);
          setForms(fetchedForms);
          setLoaded(true);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, [projectId]);
    return (
      <>
        {loaded
          ?
          <>
            {forms.map((form) => (
              <FormCard key={form.id} form={form} />
            ))}
          </> :  <div className="flex mt-14 justify-center"><ImSpinner2 className="animate-spin h-12 w-12" /></div>
        }
      </>
    );
  }

  export default FormCards