import {
  GetFormById,
  GetFormStats,
  GetFormWithSubmissions
} from "@/actions/form";
import FormLinkShare from "@/components/form/FormLinkShare";
import VisitBtn from "@/components/form/VisitBtn";
import React, { ReactNode, Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/form/ui/card";
import { Skeleton } from "@/components/form/ui/skeleton";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/form/ui/table";
import { format, formatDistance } from "date-fns";
import { Badge } from "@/components/form/ui/badge";
import { Separator } from "@/components/form/ui/separator";
import DeleteBtn from "@/components/form/DeleteBtn";
import Link from "next/link";
import { useRouter } from "next/navigation";

async function FormDetailPage({
  params,
}: {
  params: {
    formId: string;
  };
}) {
  const router = useRouter();
  const { formId } = params;
  const form = await GetFormById(formId);
  if (!form) {
    throw new Error("form not found");
  }
  function handleBack() {
    router.back();
  }

  return (
    <div className="h-[100vh] overflow-y-auto px-4">
      <div className="py-10 border-b border-muted">
        <h2 className="text-4xl font-bold col-span-2">Form</h2>
        <Separator className="my-3" />
        <div className="flex lg:flex-row md:flex-row flex-col gap-4 justify-between container">
          <h1 className="text-4xl font-bold truncate">{form.title}</h1>
          <div className="flex lg:flex-row md:flex-row flex-col gap-2">
            <button className=" w-[150px] outline-black hover:bg-blue-300 hover:cursor-pointer hover:border-dashed p-2 bg-blue-500 rounded-md text-white"
              onClick={handleBack}>
              Back
            </button>
            <VisitBtn shareUrl={form.id} />
            <DeleteBtn form={form} />
          </div>
        </div>
      </div>
      <div className="py-4 border-b border-muted">
        <div className="container flex gap-2 items-center justify-between">
          <FormLinkShare shareUrl={form.id} />
        </div>
      </div>
      <div className="container pt-4">
        <Suspense fallback={<StatsCards loading={true} />}>
          <CardStatsWrapper formId={form.id} />
        </Suspense>
      </div>
      <Separator className="my-3" />
      <div className="container pt-10">
        <SubmissionsTable id={form.id} />
      </div>
    </div>
  );
}

export default FormDetailPage;


type Row = { [key: string]: string | Date } & {
  title: string;
  submissionId: string;
  submittedBy: string;
  submittedAt: Date;
};

async function SubmissionsTable({ id }: { id: string }) {
  const form = await GetFormWithSubmissions(id);

  if (!form) {
    throw new Error("form not found");
  }

  const rows: Row[] = [];
  form.submissions.forEach((submission) => {
    rows.push({
      title: submission.title,
      submissionId: submission.id,
      submittedBy: form.employee?.fullName || submission.creatorId,
      submittedAt: submission.createdAt,
    });
  });

  return (
    <div>
      <h1 className="text-2xl font-bold my-4">Submissions</h1>
      <div className="rounded-md border">
        <Table className="mb-10">
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
                <TableCell><Link href={`orgs/${form.organizationId}/projects/${id}/submissions/${row.submissionId}`}>{row.title}</Link></TableCell>
                <TableCell>{row.submittedBy}</TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell className="text-muted-foreground text-right">
                  <Badge title="View Submission" variant={"outline"}><Link href={`/orgs/${form.organizationId}/projects/${form.projectId}/submissions/${row.submissionId}`}>{<LuView className="text-blue-600 w-10 h-5" />}</Link></Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

async function CardStatsWrapper({ formId }: { formId: string }) {
  const stats = await GetFormStats(formId);
  return <StatsCards loading={false} data={stats} />;
}

interface StatsCardProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

function StatsCards(props: StatsCardProps) {
  const { data, loading } = props;

  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Form Visits"
        icon={<LuView className="text-blue-600" />}
        helperText="Total form view"
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />

      <StatsCard
        title="Total Submissions"
        icon={<FaWpforms className="text-yellow-600" />}
        helperText="Total responses from form"
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-yellow-600"
      />

      <StatsCard
        title="Successful Submissions"
        icon={<HiCursorClick className="text-green-600" />}
        helperText="Total visist that submitted the form"
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-green-600"
      />

      <StatsCard
        title="Declined Submissions"
        icon={<TbArrowBounce className="text-red-600" />}
        helperText="Visits that did not submit the form"
        value={data?.bounceRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-red-600"
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
