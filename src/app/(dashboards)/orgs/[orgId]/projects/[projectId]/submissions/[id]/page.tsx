"use client";
import { submissionService } from "@/services/submission-service/submission.service";
import React, { ReactNode, useState, useEffect } from "react";
import { ElementsType, FormElementInstance } from "@/components/form/FormElements";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/form/ui/table";
import { format} from "date-fns";
import { Badge } from "@/components/form/ui/badge";
import { Checkbox } from "@/components/form/ui/checkbox";
import { useParams } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import { toast } from "@/components/form/ui/use-toast";
import DeleteBtn from "@/components/submission/DeleteBtn";
import { ImSpinner2 } from "react-icons/im";
import { Separator } from "@/components/form/ui/separator";
import BackBtn from "@/components/shared/BackBtn";

export default function Submission({ params }: { params: { id: string } }) {
    const { id } = params;
    const [submission, setSubmission] = useState<Submission>();
    const tokenString = typeof window !== 'undefined' ? localStorage.getItem('token') : "";
    const token = tokenString?.toString() || "";
    const hparams = useParams();
    const { orgId } = hparams;
    const [loaded, setLoaded] = useState(false);
    const [csvLoad, setCsvLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const submission = await submissionService.getSubmission(orgId.toString() || "", id, token)
                setSubmission(submission);
                setLoaded(true);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id, orgId, token]);
    const convertDate = (date: Date) => {
        const dateObject: Date = new Date(date);
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: '2-digit' };
        const customFormat = dateObject.toLocaleDateString('en-US', options);
        return customFormat;
    };    

    if (submission) {
        const geoLocation = JSON.parse(submission.geolocation || '[]');
        const formElements = JSON.parse(submission.formData || '[]') as FormElementInstance[];
        const rows: {
            id: string;
            label: string;
            required: boolean;
            type: ElementsType;
        }[] = [];

        formElements.forEach((element) => {
            switch (element.type) {
                case "TextField":
                case "NumberField":
                case "TextAreaField":
                case "DateField":
                case "SelectField":
                case "CheckboxField":
                    rows.push({
                        id: element.id,
                        label: element.extraAttributes?.label,
                        required: element.extraAttributes?.required,
                        type: element.type,
                    });
                    break;
                default:
                    break;
            }
        });

        const cols: Col[] = [];
        const content = JSON.parse(submission.submissionData);
        cols.push({
            ...content
        });
        const handleCSVDownload = () => {
            setCsvLoaded(true);
            if (!submission) {
                toast({
                    title: "Error",
                    description: "Something went wrong, please try again later",
                    variant: "destructive",
                  });
                setCsvLoaded(false);
                return;
            }
        
            // Function to escape and quote the field
            const escapeField = (field: any) => {
                if (field === null || field === undefined) return '""';
                const escaped = field.toString().replace(/"/g, '""'); 
                return `"${escaped}"`;
            };
        
            const headers = ["Title", "Form By", "Submitted On", "Location", "Description", ...formElements.map(e => e.extraAttributes?.label)];
        
            const dataRow = [
                submission.title,
                submission.employee?.fullName || submission.creatorId,
                convertDate(submission.createdAt),
                geoLocation.display_name,
                submission.description,
                ...formElements.map(e => content[e.id])
            ];
        
            const csvContent = [
                headers,
                dataRow
            ].map(row => row.map(escapeField).join(",")).join("\n");
        
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "SubmissionData.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setCsvLoaded(false);
        };
        
        return (
            <div className="px-10 ml-20 w-3/4 mt-10">
                <div className="flex lg:flex-row md:flex-row gap-4 justify-between container">
                    <h1 className="text-2xl font-bold col-span-2">
                        Submission
                    </h1>
                    <BackBtn />
                </div>
                <Separator className="my-3" />
                <h2 className="text-lg font-medium my-4">Title: <span className="font-light">{submission.title}</span></h2>
                <h2 className="text-lg font-medium my-4">Form by: <span className="font-light">{submission.employee?.fullName || submission.creatorId}</span></h2>
                <h2 className="text-lg font-medium my-4">Submitted on: <span className="font-light">{convertDate(submission.createdAt)}</span></h2>
                <p className="text-lg font-medium my-4">Location: <span className="font-light">{geoLocation.display_name}</span><br/> <span className="text-xs text-red-400">*Note: Location might be inaccurate due to possible fluctuation of ip address of the respondent</span></p>
                <p className="text-lg font-medium my-4">Description: <span className="font-light">{submission.description}</span></p>
                <p></p>
                <div className="rounded-md border">
                    <h1 className="text-md font-bold my-4">Form response</h1>
                    <Table className="bg-white">                        
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id} >
                                    <TableCell>{row.label}</TableCell>
                                    {cols.map((col, index) => (
                                        <TableCell key={index}>
                                            <ColCell type={row.type} value={col[row.id]} />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex lg:flex-row md:flex-row flex-col lg:justify-end md:justify-end align-center gap-2 mb-10 mt-5">
                    <button
                        onClick={handleCSVDownload}
                        className="bg-yellow-500 text-sm lg:w-[150px] w-full h-9 hover:bg-yellow-300 hover:cursor-pointer hover:border-dashed text-white rounded-md"
                    >
                        {csvLoad ? <>
                            <FaSpinner className="mt-1 animate-spin" /></> : <>CSV</>}
                    </button>
                    <DeleteBtn submission={submission}/>

                </div>
            </div>
        );
    }
    else{
        return <div className="flex mt-14 justify-center"><ImSpinner2 className="animate-spin h-12 w-12" /></div>
    }
}

type Col = { [key: string]: string }

function ColCell({ type, value }: { type: ElementsType; value: string }) {
    let node: ReactNode = value;

    switch (type) {
        case "DateField":
            if (!value) break;
            const date = new Date(value);
            node = <Badge variant={"outline"}>{format(date, "dd/MM/yyyy")}</Badge>;
            break;
        case "CheckboxField":
            const checked = value === "true";
            node = <Checkbox checked={checked} disabled />;
            break;
    }

    return <TableCell>{node}</TableCell>;
}