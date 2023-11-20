"use client";

import { useParams, useRouter } from "next/navigation";

export default function BackBtn() {

    const router = useRouter();
    function handleBack() {
        router.back();
    }
    return (
        <button className=" w-[80px] outline-black hover:bg-blue-300 hover:cursor-pointer hover:border-dashed p-2 bg-blue-500 text-sm rounded-md text-white"
            onClick={handleBack}>
            Back
        </button>
    );
};