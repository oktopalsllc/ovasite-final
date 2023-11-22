"use client";
import {
    projectUpdate,
    projectStatus,
    projectStatusType,
    projectUpdateType
} from "@/schemas/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "../form/ui/button";
import { useEffect, useState, useCallback } from "react";
import { projectService } from "@/services/project-service/project.service";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription
} from "../form/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../form/ui/form";
import { Input } from "../form/ui/input";
import { Textarea } from "../form/ui/textarea";
import {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator
} from "../form/ui/select";
import { toast } from "../form/ui/use-toast";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/form/ui/card";
import DeleteBtn from "./DeleteBtn";
import DownloadBtn from "./DownloadBtn";

type ProjectData = {
    id: string;
    name: string;
    description: string;
    expectedDuration: string;
    status: string;
    startDate: string;
    endDate: string;
    creatorId: string;
    organizationId: string;
    createdAt: string;
    updatedAt: string;
    isCompleted: boolean;
}

export default function UpdateProject({ id, orgId }: { id: string; orgId: string }) {
    const [loaded, setLoaded] = useState(false);
    const [projectData, setData] = useState<ProjectData>();
    const project = useForm<projectUpdateType>({
        resolver: zodResolver(projectUpdate),
    });

    const completed = useForm<projectStatusType>({
        resolver: zodResolver(projectStatus),
    });
    
    function convertISOToInputDate(isoString: string): string {
        const date = new Date(isoString);
        return date.toISOString().split('T')[0];
    }

    const fetchData = useCallback(async () => {
        try {
            const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
            const projectObj = await projectService.getProject(orgId, id, token as string);
            const projectData = {
                id: projectObj.id,
                name: projectObj.name,
                description: projectObj.description,
                expectedDuration: projectObj.expectedDuration,
                status: projectObj.status,
                startDate: convertISOToInputDate(projectObj.startDate),
                endDate: projectObj.endDate,
                creatorId: projectObj.creatorId,
                organizationId: projectObj.organizationId,
                createdAt: convertISOToInputDate(projectObj.createdAt),
                updatedAt: convertISOToInputDate(projectObj.updatedAt),
                isCompleted: projectObj.isCompleted
            };

            setData(projectData);
            project.reset({
                ...projectData
            });
            setLoaded(true);
        } catch (error) {
            console.error(error);
        }
    }, [orgId, id, setData, project, setLoaded]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    async function updateProject(values: projectUpdateType) {
        try {
            const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
            const responseData = await projectService.updateProject(orgId, id, values, token as string);
            const { message, status } = responseData;
            if (status) {
                toast({
                    title: "Success",
                    description: message,
                });
                fetchData();
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

    const statusOptions = [
        { value: 'Successful', label: 'Successful' },
        { value: 'Failed', label: 'Failed' },
        { value: 'Inconclusive', label: 'Inconclusive' },
    ];

    async function markCompleted(values: projectStatusType) {
        try {
            const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
            const responseData = await projectService.updateStatus(orgId, id, values, token as string);
            const { message, status } = responseData;
            if (status) {
                toast({
                    title: "Success",
                    description: message,
                });
                fetchData();
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

    if (loaded) {
        if (projectData) {
            return (
                <div className="w-full flex mt-14 justify-center">
                    <Card className="bg-white lg:w-3/4" >
                        <CardHeader>
                            <CardTitle className="flex lg:items-center lg:flex-row md:flex-row flex-col gap-2 justify-between mb-3">
                                <span className="font-bold">Project Name: <span className="font-normal">{projectData.name}</span></span>
                                <span className="font-bold">Status: <span className="font-normal">{projectData.status}</span></span>
                                <span className="font-bold">Expected Duration: <span className="font-normal">{projectData.expectedDuration}</span></span>
                            </CardTitle>
                            <CardDescription className="mt-3 flex lg:flex-row md:flex-row flex-col lg:items-center justify-between text-muted-foreground text-sm">
                                <span className="font-bold">Created on: <span className="font-normal">{projectData.createdAt}</span> </span>
                                <span className="font-bold"> Last updated: <span className="font-normal">{projectData.updatedAt}</span></span>
                                <span className="font-bold">Start Date: <span className="font-normal">{projectData.startDate}</span> </span>
                                {projectData.isCompleted && <span className="font-bold"> End Date: <span className="font-normal">{convertISOToInputDate(projectData.endDate)}</span></span>}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className=" text-sm text-muted-foreground ">
                            <span className="font-bold">Description: <span className="font-normal">{projectData.description || "No description"}</span></span>
                        </CardContent>
                        <CardFooter>
                            {projectData.isCompleted && (
                                <div className="w-full flex flex-row justify-center gap-2 mt-2">
                                    <DeleteBtn id={id} orgId={orgId} />
                                </div>
                            )}
                            {!projectData.isCompleted && (
                                <div className="w-full flex lg:flex-row flex-col justify-center gap-2 mt-6">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className="border border-primary/20 lg:w-[200px] w-full bg-[#001333] text-white items-center hover:bg-[#7f8185] hover:cursor-pointer hover:border-dashed"
                                            >
                                                Update
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-white">
                                            <DialogHeader>
                                                <DialogTitle>Update project</DialogTitle>
                                            </DialogHeader>
                                            <Form {...project}>
                                                <form onSubmit={project.handleSubmit(updateProject)} className="space-y-2">
                                                    <FormField
                                                        control={project.control}
                                                        name="name"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Name</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Not less than 4 characters" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <FormField
                                                            control={project.control}
                                                            name="startDate"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Start Date</FormLabel>
                                                                    <FormControl>
                                                                        <Input type="date" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={project.control}
                                                            name="expectedDuration"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Expected Duration</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="Example: 2 weeks / 6 months / 3 years" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                    <FormField
                                                        control={project.control}
                                                        name="description"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Description</FormLabel>
                                                                <FormControl>
                                                                    <Textarea rows={4} {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </form>
                                            </Form>
                                            <DialogFooter>
                                                <Button onClick={project.handleSubmit(updateProject)} disabled={project.formState.isSubmitting} className="text-white bg-[#001333] hover:bg-[#7f8185] hover:cursor-pointer hover:border-dashed w-full mt-4">
                                                    {!project.formState.isSubmitting && <span>Save</span>}
                                                    {project.formState.isSubmitting && <ImSpinner2 className="animate-spin" />}
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className="border border-primary/20 lg:w-[200px] w-full bg-yellow-600 text-white items-center hover:bg-yellow-400 hover:cursor-pointer hover:border-dashed"
                                            >
                                                Mark as Completed
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-white">
                                            <DialogHeader>
                                                <DialogTitle>Update status</DialogTitle>
                                                <DialogDescription>
                                                    Be certain you want to close this project because this action cannot be undone
                                                </DialogDescription>
                                            </DialogHeader>
                                            <Form {...completed}>
                                                <form onSubmit={completed.handleSubmit(markCompleted)} className="space-y-2">

                                                    <FormField
                                                        control={completed.control}
                                                        name="status"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Status</FormLabel>
                                                                <FormControl>
                                                                    <Select
                                                                        onValueChange={(value) => field.onChange(value)}
                                                                        value={field.value}
                                                                    >
                                                                        <SelectTrigger aria-label="Status">
                                                                            <SelectValue placeholder="Select a status" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectGroup className="bg-white">
                                                                                {statusOptions.map((option) => (
                                                                                    <SelectItem key={option.value} value={option.value}>
                                                                                        {option.label}
                                                                                    </SelectItem>
                                                                                ))}
                                                                            </SelectGroup>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                </form>
                                            </Form>
                                            <DialogFooter className="mt-10">
                                                <Button onClick={completed.handleSubmit(markCompleted)} disabled={completed.formState.isSubmitting} className="text-white bg-[#001333] hover:bg-[#7f8185] hover:cursor-pointer hover:border-dashed w-full mt-4">
                                                    {!completed.formState.isSubmitting && <span>Save</span>}
                                                    {completed.formState.isSubmitting && <ImSpinner2 className="animate-spin" />}
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    <DownloadBtn id={id} orgId={orgId} />
                                    <DeleteBtn id={id} orgId={orgId} />
                                </div>
                            )}
                        </CardFooter>
                    </Card>
                </div>
            )
        }
    }
    else {
        return <div className="w-full flex mt-14 justify-center"><ImSpinner2 className="animate-spin h-12 w-12" /></div>
    }
}