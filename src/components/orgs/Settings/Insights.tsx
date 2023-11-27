import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/form/ui/card";
import { Skeleton } from "@/components/form/ui/skeleton";
import { ReactNode, Suspense } from "react";
import { FaPaperPlane } from 'react-icons/fa';
import { FaWpforms } from "react-icons/fa";
import { MdWork } from 'react-icons/md';
import { FiClipboard } from 'react-icons/fi';
import { FaUserFriends } from 'react-icons/fa';
import { Separator } from "@/components/form/ui/separator";
import { ImSpinner2 } from "react-icons/im";
import { getOrgStats } from "@/services/employee-service/employee.service";
import { FiFileText } from 'react-icons/fi';

export default function Insights({ orgId }: { orgId: string }) {

    return (
        <div className="container">
            <h2 className='text-xl font-bold col-span-2'>
                Organization Insights
            </h2>
            <Separator className="my-3" />
            <Suspense fallback={<StatsCards loading={true} />}>
                <CardStatsWrapper orgId={orgId} />
            </Suspense>
            <Separator className="my-3" />
        </div>
    );
}

function CardStatsWrapper({ orgId }: { orgId: string }) {
    const [stats, setStats] = useState<orgStats>();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const stats = await getOrgStats(orgId);
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
    }, [orgId]);

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
interface orgStats {
    employees?: number,
    invites?: number,
    projects?: number,
    forms?: number,
    submissions?: number,
    reports?: number
}

interface StatsCardProps {
    data?: Awaited<orgStats>;
    loading: boolean;
}

function StatsCards(props: StatsCardProps) {
    const { data, loading } = props;

    return (
        <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <StatsCard
                title="Total Employees"
                icon={<FaUserFriends className="text-blue-600" />}
                helperText="Total employees within the organization including the owner."
                value={data?.employees?.toLocaleString() || "0"}
                loading={loading}
                className="bg-white shadow-md shadow-blue-600"
            />

            <StatsCard
                title="Total Invites"
                icon={<FaPaperPlane className="text-green-600" />}
                helperText="Total pending invites sent."
                value={data?.invites?.toLocaleString() || "0"}
                loading={loading}
                className="bg-white shadow-md shadow-green-600"
            />

            <StatsCard
                title="Total Projects"
                icon={<MdWork className="text-zinc-600" />}
                helperText="Total projects created within the organization."
                value={data?.projects?.toLocaleString() || "0"}
                loading={loading}
                className="bg-white shadow-md shadow-zinc-600"
            />

            <StatsCard
                title="Total Forms"
                icon={<FaWpforms className="text-blue-600" />}
                helperText="Total forms created within the organization, including published and drafts."
                value={data?.forms?.toLocaleString() || "0"}
                loading={loading}
                className="bg-white shadow-md shadow-[#001333]"
            />

            <StatsCard
                title="Total Submissions"
                icon={<FiFileText className="text-yellow-600" />}
                helperText="Total submissions of all forms that were published."
                value={data?.submissions?.toLocaleString() || ""}
                loading={loading}
                className="bg-white shadow-md shadow-yellow-600"
            />

            <StatsCard
                title="Total Reports"
                icon={<FiClipboard className="text-[#3f3cbb]" />}
                helperText="Total reports created within the organization"
                value={data?.reports?.toLocaleString() || ""}
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
