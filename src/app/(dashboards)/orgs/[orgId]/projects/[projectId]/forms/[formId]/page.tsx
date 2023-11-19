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
import { FormElementInstance } from "@/components/form/FormElements";
import { FaSpinner } from "react-icons/fa";
import { toast } from "@/components/form/ui/use-toast";
import DownloadButton from "@/components/form/DownloadBtn";

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
    <div className="h-[100vh] overflow-y-auto ml-10 scroll-smooth scrollbar-thin">
      <div className="py-10 border-b border-muted">
        <h2 className="text-2xl font-bold col-span-2">Form</h2>
        <Separator className="my-3" />
        <div className="flex lg:flex-row md:flex-row flex-col gap-4 justify-between container">
          <h1 className="text-xl font-bold truncate">{form.title}</h1>
          <div className="flex lg:flex-row md:flex-row flex-col gap-2">
            {!form.closed &&
              <>
                <VisitBtn shareUrl={form.id} />
                <CloseFormBtn form={form} />
              </>
            }
            <DeleteBtn form={form} />
          </div>
        </div>
        <Separator className="my-3" />
        <h1 className="text-lg font-bold truncate">Created by: {form.employee?.fullName || form.creatorId}</h1>
      </div>
      <div className="px-2 py-4 border-b border-muted">
        {!form.closed &&
          <div className="container flex gap-2 items-center justify-between">
            <FormLinkShare shareUrl={form.id} />
          </div>
        }
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

  // function handleCSVDownloadInitiate() {
  //   // Append a query parameter to indicate loading
  //   window.location.href = `${window.location.pathname}?downloading=true`;
  // }

  const handleCSVDownload = async () => {
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
          submission.title,
          form.employee?.fullName || form.creatorId,
          convertDate(submission.createdAt),
          geolocation.display_name || "",
          submission.description,
          ...formElements.map(e => escapeField(content[e.id] || ''))
        ];
        return dataRow;
      });

      // Combining headers and rows
      const csvContent = [
        headers,
        ...csvRows
      ].map(row => row.map(escapeField).join(",")).join("\n");

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "Submissions.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    catch (e) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    }
    // finally {
    //   // Remove the query parameter
    //   const url = new URL(window.location.href);
    //   url.searchParams.delete('downloading');
    //   window.history.pushState({}, '', url);
    // }
  };

  // const isDownloading = new URLSearchParams(window.location.search).has('downloading');
  // if (isDownloading) {
  //   handleCSVDownload();
  // }


  return (
    <div>
      <div className="flex lg:flex-row md:flex-row gap-4 flex-col justify-between my-4 container">
        <h1 className="text-2xl font-bold col-span-2">
          Submissions
        </h1>
        {/* <button className="w-[150px] outline-black hover:bg-green-400 hover:cursor-pointer hover:border-dashed p-2 bg-green-500 text-sm rounded-md text-white"
          onClick={handleCSVDownloadInitiate}>
          {isDownloading ? <FaSpinner className="animate-spin" /> : "Download CSV"}
        </button> */}
        <DownloadButton handleCSVDownload={handleCSVDownload} />  
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
        value={data?.bounceRate.toLocaleString() + "%" || ""}
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
