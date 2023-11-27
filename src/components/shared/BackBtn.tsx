"use client";

import { useRouter } from "next/navigation";
import { FaChevronLeft } from 'react-icons/fa';
import { Button } from "../form/ui/button";

export default function BackBtn() {

    const router = useRouter();
    function handleBack() {
        router.back();
    }
    return (
        <Button className="flex w-[80px] outline-black hover:bg-blue-300 hover:cursor-pointer hover:border-dashed p-2 bg-blue-500 text-sm font-bold rounded-md text-white"
            onClick={handleBack}>
            <FaChevronLeft className='text-white h-4 w-4 mr-2' /> Back
        </Button>
    );
};