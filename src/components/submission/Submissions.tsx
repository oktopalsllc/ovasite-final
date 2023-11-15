import { GetFormById, GetFormWithSubmissions } from "@/actions/form";
import { submissionService } from "@/services/submission-service/submission.service";
import FormLinkShare from "@/components/form/FormLinkShare";
import VisitBtn from "@/components/form/VisitBtn";
import React, { ReactNode, useState, useEffect } from "react";
// import { StatsCard } from "../../page";
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

export default function Submissions({ projectId }: { projectId: string }) {
    // return (
    //     <div className="container pt-10">
    //         <SubmissionsTable projectId={projectId} />
    //     </div>
    // );
    const [submissions, setSubmissions] = useState([]);
    const tokenString = typeof window !== 'undefined' ? localStorage.getItem('token') : "";
    const token = tokenString?.toString() || "";
    const hparams = useParams();
    const { orgId } = hparams;
    const [loaded, setLoaded] = useState(false);
    // const form = await GetFormWithSubmissions(id);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const submissions = await submissionService.getProjectSubmission(orgId.toString() || "", projectId, token)
                setSubmissions(submissions);
                setLoaded(true);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [orgId, projectId, token]);

    // if (!form) {
    //     throw new Error("form not found");
    // }
    const convertDate = (date: Date) => {
        const dateObject: Date = new Date(date);
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: '2-digit' };
        const customFormat = dateObject.toLocaleDateString('en-US', options);
        return customFormat;
    };

    if (loaded) {
        const rows: Row[] = [];
        submissions.forEach((submission: any) => {
            rows.push({
                title: submission.title,
                submissionId: submission.id,
                formBy: submission.employee?.fullName || submission.creatorId,
                submittedAt: submission.createdAt,
            });
        });
        return (
            <>
                {submissions.length > 0 ?
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="uppercase">
                                        Title
                                    </TableHead>
                                    <TableHead className="uppercase">
                                        Form By
                                    </TableHead>
                                    <TableHead className="uppercase">Submitted on</TableHead>
                                    <TableHead className="text-muted-foreground text-right uppercase">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell><Link href={`/orgs/${orgId}/projects/${projectId}/submissions/${row.submissionId}`}>{row.title}</Link></TableCell>
                                        <TableCell>{row.formBy}</TableCell>
                                        <TableCell className="text-muted-foreground text-right">
                                            {convertDate(row.submittedAt)}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-right">
                                            <Badge title="View Submission" variant={"outline"}><Link  href={`/orgs/${orgId}/projects/${projectId}/submissions/${row.submissionId}`}>{<LuView className="text-blue-600 w-10 h-5" />}</Link></Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    :
                    <h1 className="text-2xl font-bold my-4">No submissions</h1>
                }
            </>
        )
    }
    else{
        return <div className="flex mt-14 justify-center"><ImSpinner2 className="animate-spin h-12 w-12" /></div>
    }


};


type Row = { [key: string]: string | Date } & {
    title: string;
    submissionId: string;
    formBy: string;
    submittedAt: Date;
};
