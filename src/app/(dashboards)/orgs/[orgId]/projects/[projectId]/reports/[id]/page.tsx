"use client"
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { useParams, useRouter } from "next/navigation";
import { toast } from "@/components/form/ui/use-toast";
import { reportService } from "@/services/report-service/report.service";
import { FaSpinner } from "react-icons/fa";
import { Separator } from "@/components/form/ui/separator";
import { ImSpinner2 } from "react-icons/im";
import DeleteBtn from "@/components/report/DeleteBtn";

const tokenString = typeof window !== 'undefined' ? localStorage.getItem('token') : "";
const token = tokenString?.toString() || "";

type Report = {
    id: string;
    title: string;
    reportData: string;
    creatorId: string;
    organizationId: string;
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
    employee: Employee;
    organization: Organization;
    project: Project;
  };

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
    const [report, setReport] = useState<Report>();
    const [orgName, setOrgName] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [projectName, setProjectName] = useState("");
    const urlParams = useParams();
    const { orgId } = urlParams;
    const orgValue = orgId.toString() || "";
    const [btnLoad, setLoading] = useState(false);
    const [pdfLoad, setPdfLoading] = useState(false);
    const [csvLoad, setCsvLoading] = useState(false);

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
                    setReport(report);
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
        setPdfLoading(true);
        // Create a new PDF document
        const doc = new jsPDF();

        // Set content for the PDF
        const content = `Organization Name: ${orgName != null ? orgName : "Organization Report"}\n\n Project Name: ${projectName}\n\n  Title: ${title}\n\n Date: ${convertDate(reportDate)}\n\n Last Updated:${convertDate(updatedDate)}\n\n Reported By: ${empName != null ? empName : empId}\n\n Introduction:\n\n ${introduction}\n\n Data Collection Methodology:\n\n ${dataMethod}\n\n Challenges and Recommendation:\n\n ${challenge}\n\n Executive Summary:\n\n ${execSum}\n\n Conclusion:\n\n ${conclusion}`;
        // Define the maximum width for text
        const maxWidth = 180; // adjust as needed

        // Split text to fit within maxWidth
        const wrappedText = doc.splitTextToSize(content, maxWidth);

        doc.setFontSize(10);
        // Add the wrapped text to the PDF
        doc.text(wrappedText, 10, 10);

        // Save the PDF as a file
        doc.save("Downloaded-Report.pdf");
        setPdfLoading(false);
    };

    const handleUpdate = async () => {
        try { 
            setLoading(true);
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
                setLoading(false);
                // router.refresh();
                window.location.reload();
            }
            else {
                toast({
                    title: "Error",
                    description: "Something went wrong, please try again later",
                    variant: "destructive",
                }); 
                setLoading(false);
            }
        }
        catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Something went wrong, please try again later",
                variant: "destructive",
            }); 
            setLoading(false);
        }
    }

    const handleCSVDownload = () => {
        setCsvLoading(true);
        // Function to escape and enclose each field in double quotes
        const escapeCSVField = (field: string) => {
            if (field === null || field === undefined) return '""';
            const escapedField = field.toString().replace(/"/g, '""'); // Escape double quotes
            return `"${escapedField}"`; // Enclose in double quotes
        };

        const csvContent = [
            ["Title", "Report Date", "Updated Date", "Employee Name", "Employee ID", "Executive Summary", "Introduction", "Data Collection Method", "Conclusion", "Challenges & Recommendations", "Organization Name"],
            [title, convertDate(reportDate), convertDate(updatedDate), empName, empId, execSum, introduction, dataMethod, conclusion, challenge, orgName]
        ].map(row => row.map(escapeCSVField).join(",")).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "ReportData.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setCsvLoading(false);
    };



    function handleBack() {
        router.back();
    }

    return (
        <div className="h-[100vh] w-3/4 overflow-y-auto px-10 mb-10">
            {loaded ? <>
                <div className="py-10 border-b border-muted">
                    <div className="flex lg:flex-row md:flex-row gap-4 justify-between container">
                        <h1 className="text-2xl font-bold col-span-2">
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
                            {orgName != "" && orgName != null && orgName != undefined ? orgName : "Organization"}
                        </h1>
                        <div className="flex flex-col lg:flex-row gap-10 lg:gap-10">
                            <h1 className="font-semibold">Report By: {empName != null ? empName : empId}</h1>
                            <h1 className="font-semibold">Created On: {convertDate(reportDate)} </h1>
                            <h1 className="font-semibold">Last Modified: {convertDate(updatedDate)} </h1>
                        </div>
                    </div>
                </div>

                <Separator className="my-3" />

                <div>
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
                        <button className="flex justify-center outline-black text-center text-sm lg:w-[100px] md:w-[100px] w-full p-2 hover:bg-green-300 bg-green-500 hover:cursor-pointer hover:border-dashed rounded-md text-white"
                            onClick={handleUpdate}>
                            {btnLoad ? <>
                                <FaSpinner className="mt-1 animate-spin" /></> : <>Update</>}
                        </button>
                        <button
                            onClick={handleDownload}
                            className="flex justify-center bg-blue-500 text-center text-sm lg:w-[100px] md:w-[100px] w-full hover:bg-blue-300 hover:cursor-pointer hover:border-dashed text-white p-2 rounded-md"
                        >
                            {pdfLoad ? <>
                                <FaSpinner className="mt-1 animate-spin" /></> : <>PDF</>}
                        </button>
                        <button
                            onClick={handleCSVDownload}
                            className="flex justify-center bg-yellow-500 text-center text-sm lg:w-[100px] md:w-[100px] w-full hover:bg-yellow-300 hover:cursor-pointer hover:border-dashed text-white p-2 rounded-md"
                        >
                            {csvLoad ? <>
                                <FaSpinner className="mt-1 animate-spin" /></> : <>CSV</>}
                        </button>
                        {report && <DeleteBtn report={report} />}
                    </div>
                </div>
            </> : <div className="flex mt-14 justify-center"><ImSpinner2 className="animate-spin h-12 w-12" /></div>
            }
        </div>
    );
}