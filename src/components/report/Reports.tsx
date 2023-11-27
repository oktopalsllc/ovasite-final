import { reportService } from "@/services/report-service/report.service";
import React, { ReactNode } from "react";
import { LuView } from "react-icons/lu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/form/ui/table";
import { Badge } from "@/components/form/ui/badge";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Separator } from "../form/ui/separator";
import CreateReportBtn from "./CreateReportBtn";
import { useState, useEffect } from "react";
import { ImSpinner2 } from "react-icons/im";

export default function Reports({ projectId }: { projectId: string }) {
    const tokenString = typeof window !== 'undefined' ? localStorage.getItem('token') : "";
    const token = tokenString?.toString() || "";
    const hparams = useParams();
    const [reports, setReports] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const { orgId } = hparams;
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const reports = await reportService.getProjectReports(orgId.toString() || "", projectId, token);
                setReports(reports);
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

    if(loaded){
        const rows: Row[] = [];
    if (reports.length > 0) {
        reports.forEach((report: any) => {
            rows.push({
                title: report.title,
                reportId: report.id,
                reportBy: report.employee?.fullName || report.creatorId,
                submittedAt: report.createdAt,
            });
        });
    }

    return (
        <div className="container">
            <div className="flex lg:flex-row md:flex-row gap-4 justify-between container">
            <h2 className='text-xl font-bold col-span-2'>
              Reports
            </h2>
                <CreateReportBtn projectId={projectId} />
            </div>
            <Separator className="my-6" />
            <>
            {reports.length > 0 ?
                <div className="container overflow-x-auto rounded-md border">
                    <Table className="bg-white">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="uppercase text-sm truncate md:truncate">
                                    Title
                                </TableHead>
                                <TableHead className="uppercase text-sm">
                                    Report By
                                </TableHead>
                                <TableHead className="uppercase text-sm">Created on</TableHead>
                                <TableHead className="text-muted-foreground text-sm uppercase text-right">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell className="truncate text-sm"><Link href={`/orgs/${orgId}/projects/${projectId}/reports/${row.reportId}`}>{row.title}</Link></TableCell>
                                    <TableCell className="truncate text-sm">{row.reportBy}</TableCell>
                                    <TableCell className="truncate text-sm">
                                        {convertDate(row.submittedAt)}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-right">
                                        <Badge title="View Report" variant={"outline"}><Link  href={`/orgs/${orgId}/projects/${projectId}/reports/${row.reportId}`}>{<LuView className="text-blue-600 w-10 h-5" />}</Link></Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                :
                <h1 className="text-md font-bold my-4">No reports created</h1>
            }
        </>
            
        </div>
        
    )
    }
    else{
        return <div className="w-full flex mt-14 justify-center"><ImSpinner2 className="animate-spin h-12 w-12" /></div>
    }
};

type Row = { [key: string]: string | Date } & {
    title: string;
    reportId: string;
    reportBy: string;
    submittedAt: Date;
};