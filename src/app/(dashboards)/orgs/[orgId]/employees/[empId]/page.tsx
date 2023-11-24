"use client";

import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useIsMounted } from "@/hooks/useIsMounted";
import { orgService } from "@/services/org-service/org.service";
import { useRouter } from "next/navigation";
import { getCurrentEmployee } from "@/services/employee-service/employee.service";
import { toast } from "@/components/form/ui/use-toast";
import { ImSpinner2 } from "react-icons/im";

const schema = yup.object({
  fullName: yup.string().required("Full Name name is required"),
  email: yup.string().required("Email is required"),
  contactNumber: yup.string().required("Contact number is required"),
  address: yup.string().required("Address is required"),
});

function EmployeeProfle({
  params,
}: {
  params: {
    orgId: string;
    empId: string;
  };
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { orgId, empId } = params;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IEmployeeUpdateProfile>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any, e: any) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await orgService.updateEmployeeProfiledata(
        data,
        orgId,
        empId
      );

      if (response.success) {
        setIsLoading(false);
        router.back();
      } else {
        const error = response.error;
        setIsLoading(false);
        toast({
          title: "Error",
          description: error,
        });
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 place-content-center mx-auto max-w-sm lg:w-96 h-screen">

        <form onSubmit={handleSubmit(onSubmit)} className="pt-6 bg-white p-6 rounded-md">
          <h3 className="text-xl font-semibold mb-4">Update Profile</h3>
          <div className="my-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Full name"
              {...register("fullName")}
            />
            <div className="text-red-600 text-xs mt-2">
              {errors.fullName && <span>{errors.fullName?.message}</span>}
            </div>
          </div>
          <div className="my-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            <div className="text-red-600 text-xs mt-2">
              {errors.email && <span>{errors.email?.message}</span>}
            </div>
          </div>
          <div className="my-4">
            <label
              htmlFor="contactNumber"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Contact Number
            </label>
            <input
              id="contactNumber"
              type="text"
              placeholder="Contact Number"
              {...register("contactNumber")}
            />
            <div className="text-red-600 text-xs mt-2">
              {errors.contactNumber && (
                <span>{errors.contactNumber?.message}</span>
              )}
            </div>
          </div>
          <div className="my-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              placeholder="Address"
              {...register("address")}
            />
            <div className="text-red-600 text-xs mt-2">
              {errors.address && <span>{errors.address?.message}</span>}
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="flex items-center w-full justify-center rounded-md bg-[#FF595A] px-3 py-1.5 text-sm font-bold leading-6 text-[white] shadow-sm hover:bg-[#fe5000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#001233]"
            >
              Save
              {isLoading && <ImSpinner2 className="ml-4 animate-spin" />}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EmployeeProfle;
