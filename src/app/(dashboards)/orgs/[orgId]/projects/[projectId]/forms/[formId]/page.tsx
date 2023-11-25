import {
  GetFormById,
  GetFormStats,
  GetFormWithSubmissions
} from "@/actions/form";
import FormLinkShare from "@/components/form/FormLinkShare";
import FormPreviewShare from "@/components/form/FormPreviewShare";
import VisitBtn from "@/components/form/VisitBtn";
import React, { ReactNode, Suspense } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/form/ui/card";
import { Skeleton } from "@/components/form/ui/skeleton";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/form/ui/table";
import { formatDistance } from "date-fns";
import { Badge } from "@/components/form/ui/badge";
import { Separator } from "@/components/form/ui/separator";
import DeleteBtn from "@/components/form/DeleteBtn";
import Link from "next/link";
import CloseFormBtn from "@/components/form/CloseFormBtn";
import DownloadButton from "@/components/form/DownloadBtn";
import BackBtn from "@/components/shared/BackBtn";
import PreviewBtn from "@/components/form/PreviewBtn";

async function FormDetailPage({
  params,
}: {
  params: {
    formId: string;
  };
}) {
  const { formId } = params;
  const form = await GetFormById(formId);
  if (!form) {
    throw new Error("form not found");
  }

  return (
    <div className=" px-2">
      <div className="py-10 border-b border-muted">
        <div className="flex lg:flex-row md:flex-row gap-4 justify-between container">
          <h1 className="text-2xl font-bold col-span-2">Form</h1>
          <BackBtn />
        </div>
        <Separator className="my-3" />
        <div className="flex lg:flex-row md:flex-row flex-col gap-4 justify-between container">
          <h2 className="text-xl font-bold truncate">{form.title}</h2>
          <h2 className="text-lg font-bold truncate">Created by: {form.employee?.fullName || form.creatorId}</h2>
        </div>
      </div>
      {!form.closed &&
        <div className="px-2 py-4 border-b border-muted">
          <div className="container flex lg:flex-row md:flex-row flex-col gap-2 items-center justify-between">
            <FormLinkShare shareUrl={form.id} />
              <VisitBtn shareUrl={form.id} />
              <CloseFormBtn form={form} />
              <DeleteBtn form={form} />
          </div>
          <Separator className="my-3" />
        </div>
      }      
      <div className="px-2 py-4 border-b border-muted">
        <div className="container flex lg:flex-row flex-col gap-2 items-center justify-between">
          <FormPreviewShare form={form} />
          <PreviewBtn form={form}/>
          {form.closed &&
            <DeleteBtn form={form} />
          }
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
      submittedAt: submission.createdAt,
    });
  });


  return (
    <div>
      <div className="flex lg:flex-row md:flex-row gap-4 flex-col justify-between my-4 container">
        <h1 className="text-2xl font-bold col-span-2">
          Submissions
        </h1>
        {form.submissions.length > 0 && <DownloadButton id={id} />}
      </div>
      <div className="rounded-md border">
        <Table className="bg-white mb-10">
          <TableHeader>
            <TableRow>
              <TableHead className="uppercase">
                Title
              </TableHead>
              <TableHead className="uppercase">Submitted on</TableHead>
              <TableHead className="text-muted-foreground text-right uppercase">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell><Link href={`orgs/${form.organizationId}/projects/${id}/submissions/${row.submissionId}`}>{row.title}</Link></TableCell>
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
        className="bg-white shadow-md shadow-blue-600"
      />

      <StatsCard
        title="Total Submissions"
        icon={<FaWpforms className="text-yellow-600" />}
        helperText="Total responses from form"
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
        className="bg-white shadow-md shadow-yellow-600"
      />

      <StatsCard
        title="Successful Submissions"
        icon={<HiCursorClick className="text-green-600" />}
        helperText="Total visist that submitted the form"
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="bg-white shadow-md shadow-green-600"
      />

      <StatsCard
        title="Declined Submissions"
        icon={<TbArrowBounce className="text-red-600" />}
        helperText="Visits that did not submit the form"
        value={data?.submissions === 0 || data?.submissions === undefined ? "0%" : data?.bounceRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="bg-white shadow-md shadow-red-600"
      />
    </div>
  );
}

function StatsCard({
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
