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
                router.push(`/orgs/${orgId}/projects/reports/${reportId}`);
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
                    className="group border border-primary/20 h-[20px] bg-white items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
                >
                    <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
                    <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">Create new report</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create project</DialogTitle>
                    <DialogDescription>Create a new project to start collecting responses</DialogDescription>
                </DialogHeader>
                <Form {...report}>
                    <form onSubmit={report.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                            control={report.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        <FormField
                            control={report.control}
                            name="challengeRecommendation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Challenges and Recommendation</FormLabel>
                                    <FormControl>
                                        <Textarea rows={3} {...field} />
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
                                        <Textarea rows={3} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={report.control}
                            name="conclusion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Conclusion</FormLabel>
                                    <FormControl>
                                        <Textarea rows={5} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <Button onClick={report.handleSubmit(onSubmit)} disabled={report.formState.isSubmitting} className="w-full mt-4">
                        {!report.formState.isSubmitting && <span>Save</span>}
                        {report.formState.isSubmitting && <ImSpinner2 className="animate-spin" />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
