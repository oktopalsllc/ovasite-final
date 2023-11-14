"use client";
import {
  // GetFormStats, 
  GetForms
} from "@/actions/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/form/ui/card";
import { Skeleton } from "@/components/form/ui/skeleton";
import { ReactNode, Suspense, useEffect, useState } from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { Separator } from "@/components/form/ui/separator";
import CreateFormBtn from "@/components/form/CreateFormBtn";
import FormCards from "@/components/form/list/FormCards";
import Submissions from "@/components/submission/Submissions";
import Reports from "@/components/report/Reports";
import Insights from "@/components/project/stats/Insights";

export default function Project({ params,
}: {
  params: {
    projectId: string;
  };
}) {
  const projectId = params.projectId;
  const items = [
    { id: 1, name: 'Forms' },
    { id: 2, name: 'Submissions' },
    { id: 3, name: 'Reports' },
    { id: 4, name: 'Insights' },
    { id: 5, name: 'Settings' },
  ];

  const [active, setActive] = useState(1);
  const ActiveItem = () => {
    switch (active) {
      case 1:
        return <FormCards projectId={projectId} />;
      case 2:
        return <Submissions projectId={projectId} />;
      case 3:
        return <Reports projectId={projectId} />;
      case 4:
        return <Insights projectId={projectId} />
      case 5:
        return <h1>Settings</h1>;
      default:
        return <FormCards projectId={projectId} />;
    }
  };
  return (
    <div className="container pt-4">
      {/* <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense> */}
      <h2 className="text-4xl font-bold col-span-2">
        Project
      </h2>
      <Separator className="my-6" />
      <div className="grid gric-cols-6 text-center md:grid-cols-6 lg:grid-cols-6 gap-6">
        {items.map((item, i) => {
          return (
            <div
              key={i}
              className={`m-2 p-2 md:text-lg lg:text-xl hover:bg-gray-300 hover:text-gray-800 w-full`}
              onClick={(i) => {
                setActive(item.id);
              }}>
              {item.name}
            </div>
          );
        })}
      </div>
      <Separator className="my-6" />
      <h3 className="text-3xl font-bold col-span-2">
        {items.find((item) => item.id === active)?.name ?? 'Default Name'}
      </h3>
      <Separator className="my-6" />
      {/* <div className="grid gric-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormBtn />
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards projectId={projectId} />
        </Suspense>
      </div> */}
      
      <Separator className="my-6" />
      <div className="flex flex-row">
        {ActiveItem()}
      </div>
    </div>
  );
}

// async function CardStatsWrapper() {
//   const hParams = useParams();
//   const { orgId } = hParams;
//   const stats = await GetFormStats(orgId.toString() || "");
//   return <StatsCards loading={false} data={stats} />;
// }

// interface StatsCardProps {
//   data?: Awaited<ReturnType<typeof GetFormStats>>;
//   loading: boolean;
// }

// function StatsCards(props: StatsCardProps) {
//   const { data, loading } = props;

//   return (
//     <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
//       <StatsCard
//         title="Total visits"
//         icon={<LuView className="text-blue-600" />}
//         helperText="All time form visits"
//         value={data?.visits.toLocaleString() || ""}
//         loading={loading}
//         className="shadow-md shadow-blue-600"
//       />

//       <StatsCard
//         title="Total submissions"
//         icon={<FaWpforms className="text-yellow-600" />}
//         helperText="All time form submissions"
//         value={data?.submissions.toLocaleString() || ""}
//         loading={loading}
//         className="shadow-md shadow-yellow-600"
//       />

//       <StatsCard
//         title="Submission rate"
//         icon={<HiCursorClick className="text-green-600" />}
//         helperText="Visits that result in form submission"
//         value={data?.submissionRate.toLocaleString() + "%" || ""}
//         loading={loading}
//         className="shadow-md shadow-green-600"
//       />

//       <StatsCard
//         title="Bounce rate"
//         icon={<TbArrowBounce className="text-red-600" />}
//         helperText="Visits that leaves without interacting"
//         value={data?.submissionRate.toLocaleString() + "%" || ""}
//         loading={loading}
//         className="shadow-md shadow-red-600"
//       />
//     </div>
//   );
// }

// export function StatsCard({
//   title,
//   value,
//   icon,
//   helperText,
//   loading,
//   className,
// }: {
//   title: string;
//   value: string;
//   helperText: string;
//   className: string;
//   loading: boolean;
//   icon: ReactNode;
// }) {
//   return (
//     <Card className={className}>
//       <CardHeader className="flex flex-row items-center justify-between pb-2">
//         <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
//         {icon}
//       </CardHeader>
//       <CardContent>
//         <div className="text-2xl font-bold">
//           {loading && (
//             <Skeleton>
//               <span className="opacity-0">0</span>
//             </Skeleton>
//           )}
//           {!loading && value}
//         </div>
//         <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
//       </CardContent>
//     </Card>
//   );
// }

function FormCardSkeleton() {
  return <Skeleton className="border-2 border-primary-/20 h-[190px] w-full" />;
}
