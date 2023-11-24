"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    inviteService
} from "@/services/invite-service/invite.service";
import { toast } from "@/components/form/ui/use-toast";
import { ImSpinner2 } from "react-icons/im";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Button } from "@/components/form/ui/button";
import Link from "next/link";
import { checkInvite, userExists } from "@/services/employee-service/employee.service";

const joinSchema = yup.object({
    fullName: yup.string().required("Full Name name is required"),
    email: yup.string().required("Email is required"),
    password: yup.string()
});

interface IJoinSchema {
    fullName: string;
    email: string;
    password?: string ;
}

export default function Join({ params }: { params: { inviteCode: string } }) {
    const { inviteCode } = params;
    const [userExist, setExists] = useState(false);
    const [validCode, setValidCode] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IJoinSchema>({
        resolver: yupResolver(joinSchema),
    });

    const checkUser = useCallback(async () => {
        try {
            const inviteValid = await checkInvite(inviteCode);
            if (inviteValid) {
                setValidCode(inviteValid);
                const user = await userExists(inviteCode);
                if (user) {
                    setExists(user);
                }
            }
            setLoaded(true);
        }
        catch (err) {
            console.error(err);
        }
    }, [inviteCode]);

    useEffect(() => {
        checkUser();
    },);

    const onSubmit = async (data: object, e: any) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const response = await inviteService.joinOrg(inviteCode, data);

            if (response.success) {
                setIsLoading(false);
                router.push("/orgs");
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

    function handleBack() {
        router.push("/");
    }
    return (
        <>
            {loaded ?
                <>
                    {validCode ?
                        <div className="grid grid-cols-1 place-content-center mx-auto max-w-sm lg:w-96 h-screen">

                            <form onSubmit={handleSubmit(onSubmit)} className="pt-6 bg-white p-6 rounded-md">
                                <h3 className="text-xl font-semibold mb-4">Join Organization</h3>
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
                                {!userExist &&

                                    <div className="my-4">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            password
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Password"
                                            required
                                            {...register("password")}
                                        />
                                        <div className="text-red-600 text-xs mt-2">
                                            {errors.password && <span>{errors.password?.message}</span>}
                                        </div>
                                    </div>
                                }
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
                        :
                        <div className="mt-20 flex w-full h-full flex-col items-center justify-center gap-4">
                            <h2 className="text-destructive text-4xl">This invitation has either expired or is invalid.</h2>
                            <Button variant={"link"} asChild className="text-white bg-peach_primary hover:bg-[#fe5000] hover:cursor-pointer hover:border-dashed">
                                <Link href='/' className="decoration-none">Home</Link>
                            </Button>
                        </div>}
                </> :
                <div className="mt-20 flex items-center justify-center w-full h-full">
                    <ImSpinner2 className="animate-spin h-12 w-12" />
                </div>
            }
        </>
    );
}