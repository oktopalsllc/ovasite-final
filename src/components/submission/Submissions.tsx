import { submissionService } from "@/services/submission-service/submission.service";
import React, { useState, useEffect } from "react";
import { LuView } from "react-icons/lu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/form/ui/table";
import { Badge } from "@/components/form/ui/badge";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ImSpinner2 } from "react-icons/im";
import { Separator } from "../form/ui/separator";

export default function Submissions({ projectId }: { projectId: string }) {
    const [submissions, setSubmissions] = useState([]);
    const tokenString = typeof window !== 'undefined' ? localStorage.getItem('token') : "";
    const token = tokenString?.toString() || "";
    const hparams = useParams();
    const { orgId } = hparams;
    const [loaded, setLoaded] = useState(false);

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
                    <>
                        <div className="container overflow-x-auto ">
                            <h2 className='text-xl font-bold col-span-2'>
                                Submissions
                            </h2>
                            <Separator className="my-6" />
                            <Table className="bg-white rounded-md border">
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
                                            <TableCell className="text-muted-foreground">
                                                {convertDate(row.submittedAt)}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-right">
                                                <Badge title="View Submission" variant={"outline"}><Link href={`/orgs/${orgId}/projects/${projectId}/submissions/${row.submissionId}`}>{<LuView className="text-blue-600 w-10 h-5" />}</Link></Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </>
                    :
                    <div className="container overflow-x-auto ">
                        <h2 className='text-xl font-bold col-span-2'>
                            Submissions
                        </h2>
                        <Separator className="my-6" />
                        <h3 className="text-md font-bold my-4">No submissions</h3>
                    </div>
                }
            </>
        )
    }
    else {
        return <div className="w-full flex mt-14 justify-center"><ImSpinner2 className="animate-spin h-12 w-12" /></div>
    }


};


type Row = { [key: string]: string | Date } & {
    title: string;
    submissionId: string;
    formBy: string;
    submittedAt: Date;
};
