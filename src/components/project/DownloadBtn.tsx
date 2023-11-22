"use client";
import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { toast } from "@/components/form/ui/use-toast";
import { projectService } from '@/services/project-service/project.service';
import { Button } from "../form/ui/button";

const DownloadBtn = ({ id, orgId }: { id: string, orgId: string }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = async () => {
        try {
            setIsLoading(true);
            const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
            const data = await projectService.exportProject(orgId, id, token as string);


            // Create a URL for the blob
            const fileURL = window.URL.createObjectURL(new Blob([data]));
            const fileLink = document.createElement('a');

            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'project.csv'); // Set the file name for download
            document.body.appendChild(fileLink);

            fileLink.click(); // Trigger the download

            if (fileLink.parentNode) {
                fileLink.parentNode.removeChild(fileLink);
            } // Clean up
            setIsLoading(false);
        }
        catch (err) {
            console.log(err);
            toast({
                title: "Error",
                description: "Something went wrong, please try again later",
                variant: "destructive",
            });
            setIsLoading(false);
            return;
        }
    }

    return (
        <Button
            className="lg:w-[200px] w-full outline-black hover:bg-green-400 hover:cursor-pointer hover:border-dashed p-2 bg-green-500 text-sm rounded-md text-white"
            onClick={handleDownload}
            disabled={isLoading}>
            {isLoading ? <FaSpinner className="animate-spin" /> : 'Download CSV'}
        </Button>
    );
}
export default DownloadBtn;