import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/form/ui/card";
import { Skeleton } from "@/components/form/ui/skeleton";
import { ReactNode, Suspense } from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { Separator } from "@/components/form/ui/separator";
import { useParams } from "next/navigation";
import { projectService } from "@/services/project-service/project.service";
import { ImSpinner2 } from "react-icons/im";
import { useChat } from "ai/react";
import {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectItem,
} from "../../form/ui/select";
import { GetAIForms } from "@/actions/form";
import { FormElementInstance } from "@/components/form/FormElements";
import { toast } from "@/components/form/ui/use-toast";
import axios from 'axios';

export default function Insights({ projectId }: { projectId: string }) {

    return (
        <div className="container">
            <h2 className='text-xl font-bold col-span-2'>
                Insights
            </h2>
            <Separator className="my-3" />
            <Suspense fallback={<StatsCards loading={true} />}>
                <CardStatsWrapper projectId={projectId} />
            </Suspense>
            <Separator className="my-6" />
            <Chat projectId={projectId} />

        </div>
    );
}

type Form = {
    id: string;
    title: string;
    formData: string;
    description: string;
    published: boolean;
    visits: number;
    subCount: number;
    creatorId: string;
    organizationId: string;
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
    employee: {
        id: string;
        fullName?: string | null | undefined;
    };
    submissions: {
        submissionData: string;
        geolocation: string | null;
        createdAt: Date;
    }[];
};

function Chat({ projectId }: { projectId: string }) {
    const [loaded, setLoaded] = useState(false);
    const [forms, setForms] = useState<Form[]>([]);
    const { messages, input, handleInputChange, handleSubmit } = useChat();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const forms: Form[] = await GetAIForms(projectId);
                setForms(forms);
                setLoaded(true);
            }
            catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [projectId]);

    const handleDropdownChange = (selectedItem: string) => {
        // Handle the selected item
        const selectedForm: Form | undefined = forms.find(form => form.id === selectedItem);
        loadCSV(selectedForm);
    };

    const loadCSV = async (form: Form | undefined) => {
        try {
            if (!form) {
                toast({
                    title: "Error",
                    description: "Something went wrong, please try again later",
                    variant: "destructive",
                });
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
                    form.title,
                    form.employee?.fullName || form.creatorId,
                    convertDate(submission.createdAt),
                    geolocation.display_name || "",
                    form.description,
                    ...formElements.map(e => escapeField(content[e.id] || ''))
                ];
                return dataRow;
            });

            // Combining headers and rows
            const csvContent = [
                headers,
                ...csvRows
            ].map(row => row.map(escapeField).join(",")).join("\n");
            const success = await startConversation(csvContent, form.title);
            if (success) {

                toast({
                    title: "Success",
                    description: "Data ready to start conversation",
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
        catch (e) {
            console.log(e);
            toast({
                title: "Error",
                description: "Something went wrong, please try again later",
                variant: "destructive",
            });
            return;
        }
    };


    const startConversation = async (csvData: string, formTitle: string): Promise<boolean> => {
        const apiUrl = '/api/chatting';

        const messageWithFormTitle = `I want to perform an analysis of this ${formTitle} submission`;

        try {
            await axios.post(apiUrl, { messages: [...messages, messageWithFormTitle], csvContent: csvData });
            return true; // Successful send
        } catch (error) {
            console.error('API Error:', error);
            return false; // Failed to send
        }
    };


    return (
        <>
            {loaded ?
                <div className="flex flex-col py-4 hidden">
                    <h2 className="text-lg font-bold">Chat with AI about your form submissions</h2>
                    <div className='mb-10'>
                        <p className='text-md font-bold mt-5'> Select a form</p>
                        <Select
                            onValueChange={(value) => {
                                handleDropdownChange(value);
                            }}>
                            <SelectTrigger aria-label="Form">
                                <SelectValue placeholder="Select a Form" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectGroup>
                                    {forms.map((form) => (
                                        <SelectItem key={form.id} value={form.id}>
                                            {form.title}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <>
                        <div className="mx-auto w-full z-10 max-w-md lg:max-w-xl px-5 pt-5 pb-10 flex flex-col justify-end stretch border bg-white border-gray-200">
                            {messages.map((m) => (
                                <div key={m.id}>
                                    {m.role === "user" ? (
                                        <div className="font-bold marker:my-5">User:</div>
                                    ) : (
                                        <div className="font-bold marker:my-5">AI:</div>
                                    )}
                                    <div className="my-2">{m.content}</div>
                                </div>
                            ))}

                            <div className="w-full">
                                <form onSubmit={handleSubmit} className="rounded-md">
                                    <div className="flex justify-between items-center w-full gap-x-4">
                                        <div className="flex-grow">
                                            <label>
                                                <input
                                                    title="input"
                                                    className="border w-full border-gray-300 rounded shadow-xl p-2"
                                                    value={input}
                                                    onChange={handleInputChange}
                                                />
                                            </label>
                                        </div>
                                        <button
                                            className="bg-red-500 text-white px-6 py-2 rounded-md"
                                            type="submit"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                </div>
                :
                <div className="w-full flex mt-14 justify-center hidden"><ImSpinner2 className="animate-spin h-12 w-12" /></div>
            }
        </>
    );
}

function CardStatsWrapper({ projectId }: { projectId: string }) {
    const params = useParams();
    const { orgId, } = params;
    const orgValue = orgId.toString() || "";
    const [stats, setStats] = useState<projectStats>();
    const [loaded, setLoaded] = useState(false);
    const tokenString = typeof window !== 'undefined' ? localStorage.getItem('token') : "";
    const token = tokenString?.toString() || "";
    useEffect(() => {
        const fetchData = async () => {
            try {
                const stats = await projectService.getProjectStats(orgValue, projectId, token);
                if (stats) {
                    setStats(stats);
                    setLoaded(true)
                }
            }
            catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [orgValue, projectId, token]);
    return (
        <>
            {loaded ?
                <StatsCards loading={false} data={stats} />
                :
                <div className="w-full flex mt-14 justify-center"><ImSpinner2 className="animate-spin h-12 w-12" /></div>
            }
        </>
    );
}
interface projectStats {
    visits: number,
    subCount: number,
    submissionRate: number,
    bounceRate: number,
    reports: number,
    forms: number
}

interface StatsCardProps {
    data?: Awaited<projectStats>;
    loading: boolean;
}

function StatsCards(props: StatsCardProps) {
    const { data, loading } = props;

    return (
        <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <StatsCard
                title="Total Forms"
                icon={<FaWpforms className="text-blue-600" />}
                helperText="Total forms published in this project"
                value={data?.forms.toLocaleString() || ""}
                loading={loading}
                className="bg-white shadow-md shadow-blue-600"
            />
            <StatsCard
                title="Total Visits"
                icon={<LuView className="text-[#001333]" />}
                helperText="Total form visits of all forms"
                value={data?.visits.toLocaleString() || ""}
                loading={loading}
                className="bg-white shadow-md shadow-[#001333]"
            />

            <StatsCard
                title="Total Submissions"
                icon={<FaWpforms className="text-yellow-600" />}
                helperText="Total submissions of all forms"
                value={data?.subCount.toLocaleString() || ""}
                loading={loading}
                className="bg-white shadow-md shadow-yellow-600"
            />

            <StatsCard
                title="Successful Submissions"
                icon={<HiCursorClick className="text-green-600" />}
                helperText="Visits that result in form submission"
                value={data?.submissionRate.toLocaleString() + "%" || ""}
                loading={loading}
                className="bg-white shadow-md shadow-green-600"
            />

            <StatsCard
                title="Declined Submissions"
                icon={<TbArrowBounce className="text-red-600" />}
                helperText="Form visits that leaves without feedback"
                value={data?.subCount === 0 || data?.subCount === undefined ? "0%" : data?.bounceRate.toLocaleString() + "%" || ""}
                loading={loading}
                className="bg-white shadow-md shadow-red-600"
            />

            <StatsCard
                title="Total Reports"
                icon={<FaWpforms className="text-[#3f3cbb]" />}
                helperText="Reports created about the project"
                value={data?.reports.toLocaleString() || ""}
                loading={loading}
                className="bg-white shadow-md shadow-[#3f3cbb]"
            />
        </div>
    );
}

export function StatsCard({
    title,
    value,
    icon,
    helperText,
    loading,
    className,
}: {
    title: string;
    value: string;
    helperText: string;
    className: string;
    loading: boolean;
    icon: ReactNode;
}) {
    return (
        <Card className={className}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {loading && (
                        <Skeleton>
                            <span className="opacity-0">0</span>
                        </Skeleton>
                    )}
                    {!loading && value}
                </div>
                <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
            </CardContent>
        </Card>
    );
}
