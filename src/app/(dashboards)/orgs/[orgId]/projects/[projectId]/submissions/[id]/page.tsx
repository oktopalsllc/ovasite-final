"use client";
import { submissionService } from "@/services/submission-service/submission.service";
import FormLinkShare from "@/components/form/FormLinkShare";
import VisitBtn from "@/components/form/VisitBtn";
import React, { ReactNode, useState, useEffect } from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { ElementsType, FormElementInstance } from "@/components/form/FormElements";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/form/ui/table";
import { format, formatDistance } from "date-fns";
import { Badge } from "@/components/form/ui/badge";
import { Checkbox } from "@/components/form/ui/checkbox";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ImSpinner2 } from "react-icons/im";
// import { Submission } from "@prisma/client";

export default function Submission({ params }: { params: { id: string } }) {
    const { id } = params;
    const [submission, setSubmission] = useState<Submission>();
    const tokenString = typeof window !== 'undefined' ? localStorage.getItem('token') : "";
    const token = tokenString?.toString() || "";
    const hparams = useParams();
    const { orgId } = hparams;
    const [loaded, setLoaded] = useState(false);

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
        console.log("🚀 ~ file: page.tsx:48 ~ Submission ~ submission:", submission)
        const geoLocation = JSON.parse(submission.geolocation || '[]');
        console.log("🚀 ~ file: page.tsx:48 ~ Submission ~ geoLocation:", geoLocation)
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
            ...content,
            submittedAt: submission.createdAt,
        });
        return (
            <>
                <h1 className="text-2xl font-bold my-4">Submission</h1>
                <h2 className="text-lg font-medium my-4">Title: <span className="font-light">{submission.title}</span></h2>
                <h2 className="text-lg font-medium my-4">Form by: <span className="font-light">{submission.employee?.fullName || submission.creatorId}</span></h2>
                <h2 className="text-lg font-medium my-4">Submitted on: <span className="font-light">{convertDate(submission.createdAt)}</span></h2>
                <p className="text-lg font-medium my-4">Description: <span className="font-light">{submission.description}</span></p>
                <div className="rounded-md border">
                    <Table>                        
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
            </>
        );
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