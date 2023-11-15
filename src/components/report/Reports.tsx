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
        <div className="container pt-10">
            <div className="grid gric-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CreateReportBtn projectId={projectId} />
            </div>
            <Separator className="my-6" />
            <>
            {reports.length > 0 ?
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="uppercase">
                                    Title
                                </TableHead>
                                <TableHead className="uppercase">
                                    Report By
                                </TableHead>
                                <TableHead className="uppercase">Created on</TableHead>
                                <TableHead className="text-muted-foreground uppercase text-right">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell><Link href={`/orgs/${orgId}/projects/${projectId}/reports/${row.reportId}`}>{row.title}</Link></TableCell>
                                    <TableCell>{row.reportBy}</TableCell>
                                    <TableCell>
                                        {/* {formatDistance(row.submittedAt, new Date(), {
                                            addSuffix: true,
                                        })} */}
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
                <h1 className="text-2xl font-bold my-4">No reports created</h1>
            }
        </>
            
        </div>
        
    )
    }
    else{
        return <div className="flex mt-14 justify-center"><ImSpinner2 className="animate-spin h-12 w-12" /></div>
    }
};

type Row = { [key: string]: string | Date } & {
    title: string;
    reportId: string;
    reportBy: string;
    submittedAt: Date;
};