"use client";

import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useIsMounted } from "@/hooks/useIsMounted";
import { orgService } from "@/services/org-service/org.service";
import { useRouter } from "next/navigation";
import { getCurrentEmployee } from "@/services/employee-service/employee.service";
import { ImSpinner2 } from "react-icons/im";

const schema = yup.object({
  name: yup.string().required("Oranisation name is required"),
  address: yup.string().required("Oranisation name is required"),
  orgEmail: yup.string().required("Oranisation name is required"),
});

function CreateOrg() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ICreateOrganisationForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any, e: any) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await orgService.createOrg2(data);

      if (response.success) {
        const { id: orgId, userId } = response.data;
        const employeeId = await getCurrentEmployee(orgId, userId);

        // Fetch and reset user orgs in localStorage
        const userOrgsResponse = await orgService.getUserOrgs();
        if (userOrgsResponse.success) {
          const { data: userOrgs } = userOrgsResponse;
          
          const userInfoFromLS = localStorage.getItem("userInfo");
          const objUserInfo = JSON.parse(userInfoFromLS as string);
          objUserInfo.organizations = userOrgs;
          localStorage.setItem("userInfo", JSON.stringify(objUserInfo));
        }

        setIsLoading(false);
        router.push(`/orgs/${orgId}/employee-profile/${employeeId}`);
      } else {
        const error = response.error;
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 place-content-center mx-auto max-w-sm lg:w-96 h-screen">
        <h3 className="text-xl font-semibold">Create Organisation</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="pt-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Organisation Name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Organisation name"
              {...register("name", { required: true })}
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
              autoComplete="address"
              required
              placeholder="Address"
              {...register("address", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="orgEmail"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Organisation Email
            </label>
            <input
              id="orgEmail"
              type="text"
              autoComplete="orgEmail"
              required
              placeholder="Email"
              {...register("orgEmail", { required: true })}
            />
          </div>

          <input
            defaultValue={"logo-1"}
            type="hidden"
            {...register("logo", { required: true })}
          />

          <div className="mt-6">
            <button
              type="submit"
              className="flex items-center w-full justify-center rounded-md bg-[#FF595A] px-3 py-1.5 text-sm font-bold leading-6 text-[white] shadow-sm hover:bg-[#fe5000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#001233]"
            >
              Create
              {isLoading && <ImSpinner2 className="ml-4 animate-spin" />}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateOrg;
