"use client";

import { reportSchema, reportSchemaType } from "@/schemas/report";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "../form/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../form/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form/ui/form";
import { Input } from "../form/ui/input";
import { Textarea } from "../form/ui/textarea";
import { toast } from "../form/ui/use-toast";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { useRouter, useParams } from "next/navigation";
import { reportService } from "@/services/report-service/report.service";

export default function CreateReportBtn({ projectId }: { projectId: string }) {
    const hparams = useParams();
    const { orgId } = hparams;
    const router = useRouter();
    const report = useForm<reportSchemaType>({
        resolver: zodResolver(reportSchema),
    });

    async function onSubmit(values: reportSchemaType) {
        try {
            const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
            const responseData = await reportService.createReport(orgId.toString() || "", projectId, values, token as string);
            const { message, status, newReport } = responseData;
            const reportId = newReport.id as string;
            if (status) {
                toast({
                    title: "Success",
                    description: message,
                });
                router.push(`/orgs/${orgId}/projects/${projectId}/reports/${reportId}`);
            }
            else {
                toast({
                    title: "Error",
                    description: "Something went wrong, please try again later",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong, please try again later",
                variant: "destructive",
            });
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={"outline"}
                    className="group border shadow-lg border-primary/20 h-[40px] bg-[#001333] text-white items-center justify-center flex flex-row hover:bg-[#7f8185]  hover:cursor-pointer hover:border-dashed gap-4"
                >
                    <BsFileEarmarkPlus title="Create report" className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                    <p className="font-bold text-lg text-muted-foreground group-hover:text-primary">Create new report</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>Create report</DialogTitle>
                </DialogHeader>
                <Form {...report}>
                    <form onSubmit={report.handleSubmit(onSubmit)} className="">
                        <FormField
                            control={report.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="mb-2">
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4 mb-2">
                            <FormField
                                control={report.control}
                                name="introduction"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Introduction</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={report.control}
                                name="dataCollectionMethod"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Data Collection Methodology</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-2">
                            <FormField
                                control={report.control}
                                name="challengeRecommendation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Challenges and Recommendation</FormLabel>
                                        <FormControl>
                                            <Textarea rows={2} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={report.control}
                                name="executiveSummary"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Executive Summary</FormLabel>
                                        <FormControl>
                                            <Textarea rows={2} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={report.control}
                            name="conclusion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Conclusion</FormLabel>
                                    <FormControl>
                                        <Textarea rows={3} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <Button onClick={report.handleSubmit(onSubmit)} disabled={report.formState.isSubmitting} className="text-white bg-[#001333] hover:bg-[#7f8185] hover:cursor-pointer hover:border-dashed w-full mt-4">
                        {!report.formState.isSubmitting && <span>Create</span>}
                        {report.formState.isSubmitting && <ImSpinner2 className="animate-spin" />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
