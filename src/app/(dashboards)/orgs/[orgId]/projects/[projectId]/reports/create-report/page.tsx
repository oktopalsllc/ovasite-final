"use client"
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { useParams } from "next/navigation";
import { toast } from "@/components/form/ui/use-toast";
import { reportService } from "@/services/report-service/report.service";
import { ImSpinner2 } from "react-icons/im";

const tokenString = typeof window !== 'undefined' ? localStorage.getItem('token') : "";
const token = tokenString?.toString() || "";

export default function Report({ params }: { params: { id: string } }) {
    const { id } = params;
    const [title, setTitle] = useState("");
    const [reportDate, setReportDate] = useState("")
    const [updatedDate, setUpdatedDate] = useState("");
    const [empName, setEmpName] = useState("");
    const [execSum, setExecSum] = useState("");
    const [introduction, setIntro] = useState("");
    const [dataMethod, setMethod] = useState("");
    const [conclusion, setConclusion] = useState("");
    const [challenge, setChallenge] = useState("");
    const [reportId, setReportId] = useState("");
    const [orgName, setOrgName] = useState("");
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
                    setEmpName(report.employee.name);
                    setExecSum(reportData.executiveSummary);
                    setIntro(reportData.introduction);
                    setMethod(reportData.dataCollectionMethod);
                    setConclusion(reportData.conclusion);
                    setChallenge(reportData.challengeRecommendation);
                    setReportId(report.id);
                    setOrgName(report.org.name);
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
        const content = `Organization Name: ${orgName}\n\n Project Name: ${projectName}\n\n  Title: ${title}\n\n Date: ${convertDate(reportDate)}\n\n Last Updated: ${convertDate(updatedDate)}\n\n Reported By: ${empName}\n\n Introduction: ${introduction}\n\n Data Collection Methodology: ${dataMethod}\n\n Challenges and Recommendation: ${challenge}\n\n Executive Summary: ${execSum}\n\n Conclusion: ${conclusion}`;

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
            const { message, success } = response.data;
            if (success) {
                toast({
                    title: "Success",
                    description: message,
                });
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

    return (
        <>
            {loaded ? <>
                <div className="p-8 bg-[#EBEAEA]">
                    <div className="flex justify-center gap-5">
                        <h1 className="font-semibold">
                            {orgName != "" && orgName != null && orgName != undefined ? orgName : "Organization Name"}
                        </h1>
                        <div className="flex flex-col">
                            <h1 className="font-semibold">Reported By: {empName}</h1>
                            <h1 className="font-semibold">Created On: {convertDate(reportDate)} </h1>
                            <h1 className="font-semibold">Last Modified: {convertDate(updatedDate)} </h1>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h1 className="font-semibold">Title</h1>
                    <input
                        type="text"
                        title="Report Title"
                        className="h-[35px] w-[350px] rounded-md p-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="p-10">
                    <h1 className="mb-5 font-semibold">Introduction</h1>
                    <textarea
                        name=""
                        id=""
                        title="introduction"
                        cols={30}
                        rows={10}
                        value={introduction}
                        onChange={(e) => setIntro(e.target.value)}
                        className=" w-full p-2 bg-white border-gray-300 rounded-md"
                    ></textarea>
                </div>

                <div className="bg-gray-100 p-10">                   

                    <div className="p-10">
                        <h1 className="mb-5 font-semibold">Data Collection Methodology</h1>
                        <textarea
                            name=""
                            id=""
                            title="datacollectionmethodology"
                            cols={30}
                            rows={10}
                            value={dataMethod}
                            onChange={(e) => setMethod(e.target.value)}
                            className=" w-full p-2 bg-white border-gray-300 rounded-md"
                        ></textarea>
                    </div>

                    <div className="p-10">
                        <h1 className="mb-5 font-semibold">Challenges & Recommendation</h1>
                        <textarea
                            name=""
                            id=""
                            title="challengesandrecommendation"
                            cols={30}
                            rows={10}
                            value={conclusion}
                            onChange={(e) => setConclusion(e.target.value)}
                            className=" w-full p-2 bg-white border-gray-300 rounded-md"
                        ></textarea>
                    </div>
                    <div className="p-10">
                        <h1 className="mb-5 font-semibold">Executive Summary</h1>
                        <textarea
                            name="executivesummary"
                            id=""
                            title="executivesummary"
                            cols={30}
                            rows={10}
                            value={execSum}
                            onChange={(e) => setExecSum(e.target.value)}
                            className=" w-full p-2 bg-white rounded-md border-2 border-gray-300 "
                        ></textarea>
                    </div>
                    <div className="p-10">
                        <h1 className="mb-5 font-semibold">Conclusion</h1>
                        <textarea
                            name=""
                            id=""
                            title="conclusion"
                            cols={30}
                            rows={10}
                            value={challenge}
                            onChange={(e) => setChallenge(e.target.value)}
                            className=" w-full p-2 bg-white border-gray-300 rounded-md"
                        ></textarea>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button className="outline-black p-2 bg-red-500 text-xs rounded-md text-white"
                            onClick={handleGenerate}>
                            Update Report
                        </button>
                        <button
                            onClick={handleDownload}
                            className="bg-[#FF595A] text-white p-2 rounded-md text-xs"
                        >
                            Download Report
                        </button>
                    </div>
                </div>
            </> : <div className="flex mt-14 justify-center"><ImSpinner2 className="animate-spin h-12 w-12" /></div>
            }
        </>
    );
}