"use client"
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { useParams, useRouter } from "next/navigation";
import { toast } from "@/components/form/ui/use-toast";
import { reportService } from "@/services/report-service/report.service";
import { ImSpinner2 } from "react-icons/im";
import { Separator } from "@/components/form/ui/separator";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/form/ui/form";

const tokenString = typeof window !== 'undefined' ? localStorage.getItem('token') : "";
const token = tokenString?.toString() || "";

export default function Report({ params }: { params: { id: string } }) {
    const { id } = params;
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [reportDate, setReportDate] = useState("")
    const [updatedDate, setUpdatedDate] = useState("");
    const [empName, setEmpName] = useState("");
    const [empId, setEmpId] = useState("");
    const [execSum, setExecSum] = useState("");
    const [introduction, setIntro] = useState("");
    const [dataMethod, setMethod] = useState("");
    const [conclusion, setConclusion] = useState("");
    const [challenge, setChallenge] = useState("");
    const [reportId, setReportId] = useState("");
    const [orgName, setOrgName] = useState("");
    const [orgMail, setOrgMail] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [projectName, setProjectName] = useState("");
    const urlParams = useParams();
    const { orgId } = urlParams;
    const orgValue = orgId.toString() || "";

    const convertDate = (date: string) => {
        const dateObject: Date = new Date(date);
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: '2-digit' };
        const customFormat = dateObject.toLocaleDateString('en-US', options);
        return customFormat;
    };
    // useeffect to get report
    useEffect(() => {
        async function getOrg() {
            try {
                const report = await reportService.getReport(orgValue, id, token);

                if (report) {
                    const reportData = JSON.parse(report.reportData);
                    setTitle(report.title);
                    setReportDate(report.createdAt.toString());
                    setUpdatedDate(report.updatedAt.toString());
                    setEmpName(report.employee.fullName);
                    setEmpId(report.employee.email);
                    setExecSum(reportData.executiveSummary);
                    setIntro(reportData.introduction);
                    setMethod(reportData.dataCollectionMethod);
                    setConclusion(reportData.conclusion);
                    setChallenge(reportData.challengeRecommendation);
                    setReportId(report.id);
                    setOrgName(report.organization.name);

                    setOrgMail(report.organization.email);
                    setProjectName(report.project.name);
                    setLoaded(true);
                }
                else {
                    console.log("Can't get org");
                }

            }
            catch (e) {
                console.error("Error:", e);
            }
        };

        getOrg();
    });

    const handleDownload = () => {
        // Create a new PDF document
        const doc = new jsPDF();

        // Set content for the PDF
        const content = `Organization Name: ${orgName != null ? orgName : orgMail}\n\n Project Name: ${projectName}\n\n  Title: ${title}\n\n Date: ${convertDate(reportDate)}\n\n Last Updated: ${convertDate(updatedDate)}\n\n Reported By: ${empName != null ? empName : empId}\n\n Introduction: ${introduction}\n\n Data Collection Methodology: ${dataMethod}\n\n Challenges and Recommendation: ${challenge}\n\n Executive Summary: ${execSum}\n\n Conclusion: ${conclusion}`;

        // Add the content to the PDF
        doc.text(content, 10, 10);

        // Save the PDF as a file
        doc.save("Downloaded-Report.pdf");
    };
    const handleGenerate = async () => {
        try {
            const reportData = {
                introduction: introduction,
                dataCollectionMethod: dataMethod,
                challengeRecommendation: challenge,
                executiveSummary: execSum,
                conclusion: conclusion
            }
            const response = await reportService.updateReport(orgValue, reportId, title, JSON.stringify(reportData), token);
            const { message, status } = response;
            if (status) {
                toast({
                    title: "Success",
                    description: message,
                });
                window.location.reload();
                router.refresh();
            }
            else {
                toast({
                    title: "Error",
                    description: "Something went wrong, please try again later",
                    variant: "destructive",
                });
            }
        }
        catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Something went wrong, please try again later",
                variant: "destructive",
            });
        }
    }

    const handleDelete = async () => {
        try {
            const response = await reportService.deleteReport(orgValue, reportId, token);
            const { message, status } = response;
            if (status) {
                toast({
                    title: "Success",
                    description: message,
                });
                router.back();
            }
            else {
                toast({
                    title: "Error",
                    description: "Something went wrong, please try again later",
                    variant: "destructive",
                });
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    function handleBack() {
        router.back();
    }

    return (
        <div className="h-[100vh] bg-white overflow-y-auto px-10 mb-10">
            {loaded ? <>
                <div className="py-10 border-b border-muted">
                    <div className="flex lg:flex-row md:flex-row gap-4 justify-between container">
                        <h1 className="text-4xl font-bold col-span-2">
                            Report
                        </h1>
                        <button className=" w-[80px] outline-black hover:bg-blue-300 hover:cursor-pointer hover:border-dashed p-2 bg-blue-500 text-sm rounded-md text-white"
                            onClick={handleBack}>
                            Back
                        </button>
                    </div>
                    <Separator className="my-3" />
                    <div className="flex flex-col gap-5">

                        <h1 className="font-semibold text-lg">
                            {orgName != "" && orgName != null && orgName != undefined ? orgName : orgMail}
                        </h1>
                        <div className="flex flex-col lg:flex-row gap-10 lg:gap-10">
                            <h1 className="font-semibold">Report By: {empName != null ? empName : empId}</h1>
                            <h1 className="font-semibold">Created On: {convertDate(reportDate)} </h1>
                            <h1 className="font-semibold">Last Modified: {convertDate(updatedDate)} </h1>
                        </div>
                    </div>
                </div>
                
                <Separator className="my-3" />

                <div className="bg-white ">
                    <div className="">
                        <h1 className="font-semibold">Title</h1>
                        <input
                            type="text"
                            title="Report Title"
                            className="lg:h-[35px] lg:w-[350px] rounded-md p-2 mb-3"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="">
                        <h1 className="mb-3 font-semibold">Introduction</h1>
                        <textarea
                            name=""
                            id=""
                            title="introduction"
                            cols={10}
                            rows={5}
                            value={introduction}
                            onChange={(e) => setIntro(e.target.value)}
                            className=" w-full mb-3 p-2 bg-white border-gray-300 rounded-md"
                        ></textarea>
                    </div>

                    <div className="">
                        <h1 className="mb-3 font-semibold">Data Collection Methodology</h1>
                        <textarea
                            name=""
                            id=""
                            title="datacollectionmethodology"
                            cols={10}
                            rows={5}
                            value={dataMethod}
                            onChange={(e) => setMethod(e.target.value)}
                            className=" w-full mb-3 p-2 bg-white border-gray-300 rounded-md"
                        ></textarea>
                    </div>

                    <div className="">
                        <h1 className="mb-3 font-semibold">Challenges & Recommendation</h1>
                        <textarea
                            name=""
                            id=""
                            title="challengesandrecommendation"
                            cols={10}
                            rows={5}
                            value={conclusion}
                            onChange={(e) => setConclusion(e.target.value)}
                            className=" w-full mb-3 p-2 bg-white border-gray-300 rounded-md"
                        ></textarea>
                    </div>
                    <div className="">
                        <h1 className="mb-3 font-semibold">Executive Summary</h1>
                        <textarea
                            name="executivesummary"
                            id=""
                            title="executivesummary"
                            cols={10}
                            rows={5}
                            value={execSum}
                            onChange={(e) => setExecSum(e.target.value)}
                            className=" w-full mb-3 p-2 bg-white rounded-md border-2 border-gray-300 "
                        ></textarea>
                    </div>
                    <div className="">
                        <h1 className="mb-3 font-semibold">Conclusion</h1>
                        <textarea
                            name=""
                            id=""
                            title="conclusion"
                            cols={10}
                            rows={5}
                            value={challenge}
                            onChange={(e) => setChallenge(e.target.value)}
                            className=" lg:w-full md:w-full w-full mb-3 p-2 bg-white border-gray-300 rounded-md"
                        ></textarea>
                    </div>
                    <div className="flex lg:flex-row md:flex-row flex-col lg:justify-end md:justify-end align-center gap-4 mb-10 mt-5">
                        <button className="outline-black text-sm lg:w-[100px] md:w-[100px] w-full p-2 hover:bg-green-300 bg-green-500 hover:cursor-pointer hover:border-dashed rounded-md text-white"
                            onClick={handleGenerate}>
                            Update
                        </button>
                        <button
                            onClick={handleDownload}
                            className="bg-blue-500 text-sm lg:w-[100px] md:w-[100px] w-full hover:bg-blue-300 hover:cursor-pointer hover:border-dashed text-white p-2 rounded-md"
                        >
                            Download
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-sm lg:w-[100px] md:w-[100px] w-full hover:bg-[#fe5000] hover:cursor-pointer hover:border-dashed text-white p-2 rounded-md"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </> : <div className="flex mt-14 justify-center"><ImSpinner2 className="animate-spin h-12 w-12" /></div>
            }
        </div>
    );
}