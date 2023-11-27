import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod";
import { orgSchema, orgSchemaType } from '@/schemas/org';
import { useForm } from "react-hook-form";
import { orgService } from '@/services/org-service/org.service';
import { useState, useEffect, useCallback } from 'react';
import { toast } from "@/components/form/ui/use-toast";
import {
  getCurrentOrg
} from '@/services/employee-service/employee.service';
import { ImSpinner2 } from "react-icons/im";
import { useDropzone } from "react-dropzone";
import Image from 'next/image';

export default function Settings({ orgId }: { orgId: string }) {
  const [loaded, setLoaded] = useState(false);
  const [org, setOrg] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const onDrop = useCallback(async (acceptedFile: File[]) => {
    if (acceptedFile && acceptedFile.length > 0) {
      const file = acceptedFile[0];      
      setLogoFile(file);
      const reader = new FileReader();

      reader.onload = () => {
        setImageUrl(reader.result as string);
      };

      reader.readAsDataURL(file);
    }

  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive } = useDropzone({
      onDrop,
      accept: { "image/*": ['.png', '.PNG', '.jpg', '.JPG', '.jpeg', '.JPEG'] },
      maxSize: 512000,
      maxFiles: 1
    });

  const orgForm = useForm<orgSchemaType>({
    resolver: zodResolver(orgSchema),
  });

  const onSubmit = async (values: orgSchemaType, e: any) => {
    console.log(logoFile)
    e.preventDefault();
    try {
      const formData = new FormData();
      if (logoFile) {
        formData.append('logo', logoFile);
      }      
      const data = {
        ...values,
        formData
      };
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('token') : '';
      setIsLoading(true);
      const response = await orgService.updateOrg(orgId, data, token as string);

      if (response.status) {

        toast({
          title: "Success",
          description: response.message,
        })
        currentOrg();
        setIsLoading(false);
      } else {
        toast({
          title: "Error",
          description: 'Something went wrong, please try again later',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const currentOrg = useCallback(async () => {
    try {
      const org = await getCurrentOrg(orgId);
      if (org) {
        setOrg(org);
        setLoaded(true);
      }
    }
    catch (err) {
      console.log(err)
    }
  }, [orgId]);

  useEffect(() => {
    currentOrg();
  }, [currentOrg]);

  useEffect(() => {
    if (loaded) {
      orgForm.setValue('name', org.name);
      orgForm.setValue('address', org.address);
    }
  }, [loaded, org, orgForm]);

  return (
    <div className='container w-full p-4 flex flex-col gap-10'>
      {loaded ?
        <>
          {/* Header */}
          <div className='flex items-center justify-center flex-col py-2'>
            <h1 className='text-xl font-bold'>{org.name}</h1>
            {org.logo && <Image src={org.logo} width={100} height={100} alt="logo" />}
            {!org.logo &&
              <p className='block text-sm font-medium leading-6 text-gray-900'>No logo</p>}
          </div>
          {/* Small Square Div and Text Input */}
          <div className='flex items-center justify-center mx-auto w-full'>
            <form onSubmit={orgForm.handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Organisation name"
                  {...orgForm.register("name")}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  required
                  placeholder="Organisation address"
                  {...orgForm.register("address")}
                />
              </div>
              <div>
                <p className='block text-sm font-medium leading-6 text-gray-900'>Upload new logo:</p>
                <div {...getRootProps()} className="hover:cursor-pointer mb-4">
                  <input {...getInputProps()} />
                  <div className=' border border-gray-700 p-2 mt-2 rounded-md flex flex-col gap-2'>
                    <p className='block text-sm font-medium leading-6 text-gray-900'>
                      Upload File: .jpg, .jpeg, .png,  MAX 500kb
                    </p>
                    <center>
                      {!imageUrl &&
                        <Image
                          src="/upload.png"
                          width={50}
                          height={50}
                          alt="file upload"
                        />
                      }
                      {imageUrl && (
                        <Image width={50} height={50} src={imageUrl} alt="preview" />
                      )}
                    </center>
                    <div>
                      {isDragActive ? (
                        <p className='block text-sm text-center font-medium leading-6 text-gray-900'>Drop file(s) here ...</p>
                      ) : (
                        <>
                          <p className='block text-sm text-center font-medium leading-6 text-gray-900'>Drag & Drop File</p>
                          <p className='block text-sm text-center font-medium leading-6 text-gray-900'>or Browse media on your device</p>
                        </>
                      )}

                    </div>
                  </div>
                </div>

              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="flex items-center w-full justify-center rounded-md bg-[#FF595A] px-3 py-1.5 text-sm font-bold leading-6 text-[white] shadow-sm hover:bg-[#fe5000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#001233]"
                >
                  Update
                  {isLoading && <ImSpinner2 className="ml-4 animate-spin" />}
                </button>
              </div>
            </form>
          </div>
        </>
        :
        <div className="w-full flex mt-14 justify-center"><ImSpinner2 className="animate-spin h-12 w-12" /></div>

      }
    </div>
  );
};
