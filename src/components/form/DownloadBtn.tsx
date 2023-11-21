"use client";
import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import {
    GetFormWithSubmissions
} from "@/actions/form";
import { toast } from "@/components/form/ui/use-toast";
import { FormElementInstance } from "@/components/form/FormElements";

const DownloadButton = ({ id }: { id: string }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleCSVDownload = async () => {
        setIsLoading(true);
        try {

            const form = await GetFormWithSubmissions(id);
            if (!form) {
                toast({
                    title: "Error",
                    description: "Something went wrong, please try again later",
                    variant: "destructive",
                });
                setIsLoading(false);
                return;
            }
            const formElements = JSON.parse(form.formData || '[]') as FormElementInstance[];

            const convertDate = (date: Date) => {
                const dateObject: Date = new Date(date);
                const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: '2-digit' };
                const customFormat = dateObject.toLocaleDateString('en-US', options);
                return customFormat;
            };

            // Function to escape and quote the field
            const escapeField = (field: any) => {
                if (field === null || field === undefined) return '""';
                const escaped = field.toString().replace(/"/g, '""');
                return `"${escaped}"`;
            };

            // Headers for CSV file
            const headers = ["Title", "Form By", "Submitted On", "Location", "Description", ...formElements.map(e => e.extraAttributes?.label || '')];

            // Mapping over each submission to create a row
            const csvRows = form.submissions.map(submission => {
                const content = JSON.parse(submission.submissionData);
                const geolocation = JSON.parse(submission.geolocation || '{}');
                const dataRow = [
                    submission.title,
                    form.employee?.fullName || form.creatorId,
                    convertDate(submission.createdAt),
                    geolocation.display_name || "",
                    submission.description,
                    ...formElements.map(e => escapeField(content[e.id] || ''))
                ];
                return dataRow;
            });

            // Combining headers and rows
            const csvContent = [
                headers,
                ...csvRows
            ].map(row => row.map(escapeField).join(",")).join("\n");

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "Submissions.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setIsLoading(false);
        }
        catch (e) {
            console.log(e);
            toast({
                title: "Error",
                description: "Something went wrong, please try again later",
                variant: "destructive",
            });
            setIsLoading(false);
            return;
        }
    };

    return (
        <button
            className="w-[150px] flex justify-center outline-black hover:bg-green-400 hover:cursor-pointer hover:border-dashed p-2 bg-green-500 text-sm rounded-md text-white"
            onClick={handleCSVDownload}
            disabled={isLoading}>
            {isLoading ? <FaSpinner className="animate-spin" /> : 'Download CSV'}
        </button>
    );
};

export default DownloadButton;
