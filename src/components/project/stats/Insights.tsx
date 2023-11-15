import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/form/ui/card";
import { Skeleton } from "@/components/form/ui/skeleton";
import { ReactNode, Suspense } from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { Separator } from "@/components/form/ui/separator";
import { Badge } from "@/components/form/ui/badge";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { useParams } from "next/navigation";
import { projectService } from "@/services/project-service/project.service";
import { ImSpinner2 } from "react-icons/im";


export default function Insights({ projectId }: { projectId: string }) {


    return (
        <div className="container">
            <Suspense fallback={<StatsCards loading={true} />}>
                <CardStatsWrapper projectId={projectId} />
            </Suspense>
            <Separator className="my-6" />

        </div>
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
            try{
                const stats = await projectService.getProjectStats(orgValue, projectId, token);
                if (stats) {
                    setStats(stats);
                    setLoaded(true)
                }
            }
            catch(err){
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
                <div className="flex mt-14 justify-center"><ImSpinner2 className="animate-spin h-12 w-12" /></div>
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
                helperText="Total forms created"
                value={data?.visits.toLocaleString() || ""}
                loading={loading}
                className="shadow-md shadow-blue-600"
            />
            <StatsCard
                title="Total Visits"
                icon={<LuView className="text-[#001333]" />}
                helperText="Total form visits of all forms"
                value={data?.visits.toLocaleString() || ""}
                loading={loading}
                className="shadow-md shadow-[#001333]"
            />

            <StatsCard
                title="Total Submissions"
                icon={<FaWpforms className="text-yellow-600" />}
                helperText="Total submissions of all forms"
                value={data?.subCount.toLocaleString() || ""}
                loading={loading}
                className="shadow-md shadow-yellow-600"
            />

            <StatsCard
                title="Submission Rate"
                icon={<HiCursorClick className="text-green-600" />}
                helperText="Visits that result in form submission"
                value={data?.submissionRate.toLocaleString() + "%" || ""}
                loading={loading}
                className="shadow-md shadow-green-600"
            />

            <StatsCard
                title="Declined Submissions"
                icon={<TbArrowBounce className="text-red-600" />}
                helperText="Form visits that leaves without feedback"
                value={data?.submissionRate.toLocaleString() + "%" || ""}
                loading={loading}
                className="shadow-md shadow-red-600"
            />

            <StatsCard
                title="Total Reports"
                icon={<FaWpforms className="text-[#3f3cbb]" />}
                helperText="Reports created about the project"
                value={data?.reports.toLocaleString() || ""}
                loading={loading}
                className="shadow-md shadow-[#3f3cbb]"
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
