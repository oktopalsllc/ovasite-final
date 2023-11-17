
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImSpinner2 } from "react-icons/im";
import { Separator } from "../form/ui/separator";
import { toast } from "@/components/form/ui/use-toast";
import { projectService } from "@/services/project-service/project.service";
import { useRouter } from "next/navigation";

interface projectField {
    name: string;
    description: string;
    expectedDuration: string;
    startDate: string;
    endDate: string;
    status: string;
    isCompleted: boolean;
}

interface employeeField {
    employeeId: string;
    role: string;
}

export default function Settings({ project }: { project: Project | undefined }) {
    const router = useRouter();

    const [loaded, setLoaded] = useState(false);
    const [employees, setEmployees] = useState([]);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

    const fetchData = async () => {
        try {
            if (project) {
                const orgEmployees = await projectService.getOrgEmployees(project?.organizationId as string, project?.id as string, token as string);
                if (orgEmployees) {
                    setEmployees(orgEmployees);
                    setLoaded(true);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {

        fetchData();
    });

    const projectFields = {
        name: project?.name,
        description: project?.description,
        expectedDuration: project?.expectedDuration,
        startDate: project?.startDate,
        endDate: project?.endDate,
        status: project?.status,
        isCompleted: project?.isCompleted,
    };

    const projectEmployees = {
        employeeId: project?.projectAssociations.map((projectAssociation) => {
            return projectAssociation.employeeId
        }),
        employeeName: project?.projectAssociations.map((projectAssociation) => {
            return projectAssociation.employee.fullName
        }),
        role: project?.projectAssociations.map((projectAssociation) => {
            return projectAssociation.role
        })
    };
    const { name, description, expectedDuration, startDate, endDate, status, isCompleted } = projectFields;

    const projectSchema = yup.object({
        name: yup.string().required("Project name is required"),
        description: yup.string().required("Project description is required"),
        expectedDuration: yup.string().required("Project description is required"),
        startDate: yup.string().required("Project description is required"),
        endDate: yup.string().required("Project description is required"),
        status: yup.string().required("Project description is required"),
        isCompleted: yup.boolean().required("Project description is required"),
    });

    const employeeSchema = z.object({
        employeeId: z.string(),
        role: z.string(),
    });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<projectField>({
        resolver: yupResolver(projectSchema),
    });

    const pEmployee = useForm<employeeField>({
        resolver: zodResolver(employeeSchema),
    });

    const onSubmit = async (data: any, e: any) => {
        e.preventDefault();

        try {
            const response = await projectService.updateProject(
                project?.organizationId as string,
                project?.id as string,
                data,
                token as string
            );
            const { message, status } = response;
            if (status) {
                toast({
                    title: "Success",
                    description: message,
                });
                router.push("/orgs");
            }
            else {
                toast({
                    title: "Error",
                    description: "Something went wrong, try again later",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong, try again later",
                variant: "destructive",
            });
            console.error(error);
        }
    };
    function convertISOToInputDate(isoString: string): string {
        const date = new Date(isoString);
        return date.toISOString().split('T')[0];
    }

    return (
        <>
            {loaded ?
                <>
                    <div className="grid grid-cols-1 place-content-center mx-auto max-w-sm lg:w-96 h-screen">

                        <form onSubmit={handleSubmit(onSubmit)} className="pt-6 bg-white p-6 shadow-md shadow-[#FF595A] rounded-md">
                            <h3 className="text-xl font-semibold mb-4">Project Information</h3>
                            <div className="my-4">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    {...register("name")}
                                />
                                <div className="text-red-600 text-xs mt-2">
                                    {errors.name && <span>{errors.name?.message}</span>}
                                </div>
                            </div>
                            <div className="my-4">
                                <label
                                    htmlFor="expectedDuration"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Expected Duration
                                </label>
                                <input
                                    id="expectedDuration"
                                    type="text"
                                    value={expectedDuration}
                                    placeholder="Expected Duration"
                                    {...register("expectedDuration")}
                                />
                                <div className="text-red-600 text-xs mt-2">
                                    {errors.expectedDuration && <span>{errors.expectedDuration?.message}</span>}
                                </div>
                            </div>
                            <div className="my-4">
                                <label
                                    htmlFor="startDate"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Start Date
                                </label>
                                <input
                                    id="startDate"
                                    type="date"
                                    value={startDate ? convertISOToInputDate(startDate.toString()) : ''}
                                    {...register("startDate")}
                                />
                                <div className="text-red-600 text-xs mt-2">
                                    {errors.startDate && <span>{errors.startDate?.message}</span>}
                                </div>
                            </div>
                            <div className="my-4">
                                <label
                                    htmlFor="endDate"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    End Date
                                </label>
                                <input
                                    id="endDate"
                                    type="date"
                                    value={endDate ? convertISOToInputDate(endDate.toString()) : ''}
                                    {...register("endDate")}
                                />
                                <div className="text-red-600 text-xs mt-2">
                                    {errors.endDate && <span>{errors.endDate?.message}</span>}
                                </div>
                            </div>
                            <div className="my-4">
                                <label
                                    htmlFor="status"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Status
                                </label>
                                <select
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={status}
                                    id="status"
                                    {...register("status")}
                                >
                                    <option value="In progress">In progress</option>
                                    <option value="Success">Success</option>
                                    <option value="Failed">Failed</option>
                                </select>
                                <div className="text-red-600 text-xs mt-2">
                                    {errors.status && (
                                        <span>{errors.status?.message}</span>
                                    )}
                                </div>
                            </div>
                            <div className="my-4">
                                <label
                                    htmlFor="isCompleted"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Completed?
                                </label>
                                <select
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={isCompleted?.toString()}
                                    id="isCompleted"
                                    {...register("isCompleted")}
                                >
                                    <option value="true">Completed</option>
                                    <option value="false">On going</option>
                                </select>
                                <div className="text-red-600 text-xs mt-2">
                                    {errors.isCompleted && <span>{errors.isCompleted?.message}</span>}
                                </div>
                            </div>
                            <div className="my-4">
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Expected Duration
                                </label>
                                <textarea
                                    id="description"
                                    value={description}
                                    rows={10}
                                    {...register("description")}
                                />
                                <div className="text-red-600 text-xs mt-2">
                                    {errors.description && <span>{errors.description?.message}</span>}
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-4">
                                <button
                                    type="submit"
                                    className="flex justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-bold leading-6 text-[white] shadow-sm hover:bg-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#001233]"
                                >
                                    Update
                                </button>
                                <button
                                    // onClick={handleDelete}
                                    className="bg-red-500 text-[white] px-3 py-1.5 text-sm font-bold rounded-md"
                                >
                                    Delete Project
                                </button>
                            </div>
                        </form>
                    </div>
                    <Separator className="my-6" />
                    <div className="grid grid-cols-1 place-content-center mx-auto max-w-sm lg:w-96 h-screen">
                        <form className="pt-6 bg-white p-6 shadow-md shadow-[#FF595A] rounded-md">                            
                            <h3 className="text-xl font-semibold mb-4">Attach Employee</h3>
                            <div className="my-4">
                                <label
                                    htmlFor="employee"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Employee
                                </label>
                                <select
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    id="employee"
                                    {...register("status")}
                                >
                                    <option value="">Select</option>
                                    <option value="Success">Success</option>
                                    <option value="Failed">Failed</option>
                                </select>
                                <div className="text-red-600 text-xs mt-2">
                                    {errors.status && (
                                        <span>{errors.status?.message}</span>
                                    )}
                                </div>
                            </div>
                            <div className="my-4">
                                <label
                                    htmlFor="role"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Employee
                                </label>
                                <select
                                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    id="role"
                                    {...register("status")}
                                >
                                    <option value="">Select</option>
                                    <option value="MANAGER">Manager</option>
                                    <option value="SUPERVISOR">Supervisor</option>
                                    <option value="FIELD_AGENT">Field Agent</option>
                                    <option value="GUEST">Guest</option>
                                </select>
                                <div className="text-red-600 text-xs mt-2">
                                    {errors.status && (
                                        <span>{errors.status?.message}</span>
                                    )}
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end gap-4">
                                <button
                                    type="submit"
                                    className="flex justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-bold leading-6 text-[white] shadow-sm hover:bg-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#001233]"
                                >
                                    Attach
                                </button>
                            </div>       
                        </form>
                    </div>
                </>
                :
                <div className="flex mt-14 justify-center"><ImSpinner2 className="animate-spin h-12 w-12" /></div>
            }
        </>
    );
}