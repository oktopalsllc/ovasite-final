"use client";
import { useState, useCallback, useEffect } from "react";
import { projectEmp, projectEmpType, 
    projectRoleType,
    projectRole, } from "@/schemas/projectEmp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "../form/ui/button";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/form/ui/table";
import { Badge } from "@/components/form/ui/badge";
import { Separator } from "../form/ui/separator";
import { toast } from "../form/ui/use-toast";
import { useTransition } from "react";
import { FaSpinner, FaTrash, FaEdit } from "react-icons/fa";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../form/ui/alert-dialog";
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

interface employeeField {
    employeeId: string;
    employeeName: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

interface orgEmployeesField {
    employeeId: string;
    employeeName: string;
}

export default function ProjectEmployee({ id, orgId }: { id: string, orgId: string }) {
    const tokenString = typeof window !== 'undefined' ? localStorage.getItem('token') : "";
    const token = tokenString?.toString() || "";
    const [loaded, setLoaded] = useState(false);
    const [employees, setEmployees] = useState<employeeField[]>([]);
    const [newEmployees, setNewEmployees] = useState<orgEmployeesField[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<employeeField | null>(null);
    const [loading, startTransition] = useTransition();
    const project = useForm<projectEmpType>({
        resolver: zodResolver(projectEmp),
    });
    const empProject = useForm<projectRoleType>({
        resolver: zodResolver(projectRole),
    });


    function convertISOToInputDate(isoString: string): string {
        const date = new Date(isoString);
        return date.toISOString().split('T')[0];
    }

    const fetchData = useCallback(async () => {
        try {
            const orgEmployees = await projectService.getOrgEmployees(orgId, id, token as string);
            const projEmployees = await projectService.getProjectEmps(orgId, id, token as string);
            if (projEmployees && Array.isArray(projEmployees)) {
                const employees = projEmployees.map((employee) => ({
                    employeeId: employee.employee.id as string,
                    employeeName: employee.employee?.fullName as string || employee.employee.id as string,
                    role: employee.role as string,
                    createdAt: convertISOToInputDate(employee.createdAt),
                    updatedAt: convertISOToInputDate(employee.updatedAt)
                }));
                if (orgEmployees.length > 0 && Array.isArray(orgEmployees)) {
                    const newEmployees = orgEmployees.map((employee) => ({
                        employeeId: employee.id as string,
                        employeeName: employee?.fullName as string || employee.id as string,
                    }));
                    setNewEmployees(newEmployees);
                }
                setEmployees(employees);
                setLoaded(true);
            }
        }
        catch (error) {
            console.error(error);
        }
    }, [orgId, id, token]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    async function deleteProject(empId: string) {
        try {
            const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
            const deleteProjectAssociation = await projectService.removeEmployee(orgId, id, empId, token as string);
            const { status } = deleteProjectAssociation;
            if (status) {
                fetchData();
                toast({
                    title: "Success",
                    description: "Employee removed successfully",
                });
            }
            else {
                toast({
                    title: "Error",
                    description: "Something went wrong, please try again later",
                    variant: "destructive",
                });
            }
        }
        catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong, please try again later",
                variant: "destructive",
            });
        }
    }

    async function onSubmit(values: projectEmpType) {
        // Assuming values contain employeeId and roleId
        try {
            const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
            // Call the service to update the role for the employee
            await projectService.addProjectEmp(orgId, id, values, token as string);
            // Handle success response
            toast({
                title: "Success",
                description: "Employee attached successfully",
            });
            fetchData();
        } catch (error) {
            // Handle error response
            toast({
                title: "Error",
                description: "Something went wrong, please try again later",
                variant: "destructive",
            });
        }
    }

    const roleOptions = [
        { value: 'MANAGER', label: 'Manager' },
        { value: 'SUPERVISOR', label: 'Supervisor' },
        { value: 'FIELD_AGENT', label: 'Field Agent' },
        { value: 'GUEST', label: 'Guest' },
    ];

    // Handle role update submission
    const handleRoleUpdateSubmit = async (value: projectRoleType) => {

        if (selectedEmployee) {
            try {
                const data = {
                    empId: selectedEmployee.employeeId,
                    role: value.role
                }
                await projectService.editEmpRole(orgId, id, data, token as string);
                toast({
                    title: "Success",
                    description: "Role updated successfully",
                });
                fetchData();
                setSelectedEmployee(null);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Something went wrong, please try again later",
                    variant: "destructive",
                });
            }
        }
    };

    if (loaded) {
        if (employees.length > 0) {
            return (
                <div className="w-full flex mt-14 justify-center mb-20">
                    <div className="container overflow-x-auto w-3/4 ">
                        <div className="flex lg:flex-row md:flex-row gap-4 justify-between container">
                            <h4 className='text-lg font-bold col-span-2'>
                                Attached Employees
                            </h4>
                            {newEmployees.length > 0 &&
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className="group border shadow-lg border-primary/20 h-[40px] w-[150px] bg-[#001333] text-white items-center justify-center flex flex-row hover:bg-[#7f8185]  hover:cursor-pointer hover:border-dashed gap-2"
                                        >
                                            <p className="font-bold text-md text-muted-foreground group-hover:text-primary">Attach Employee</p>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-white">
                                        <DialogHeader>
                                            <DialogTitle>Attach Employee</DialogTitle>
                                        </DialogHeader>
                                        <Form {...project}>
                                            <form onSubmit={project.handleSubmit(onSubmit)} className="space-y-2">
                                                <FormField
                                                    control={project.control}
                                                    name="employeeId"
                                                    render={({ field }) => (

                                                        <FormItem>
                                                            <FormLabel>Select Employee</FormLabel>
                                                            <FormControl>
                                                                <Select
                                                                    onValueChange={(value) => {
                                                                        project.setValue("employeeId", value);
                                                                    }}
                                                                >
                                                                    <SelectTrigger aria-label="Employee">
                                                                        <SelectValue placeholder="Select an employee" />
                                                                    </SelectTrigger>
                                                                    <SelectContent className="bg-white">
                                                                        <SelectGroup>
                                                                            {newEmployees.map((employee) => (
                                                                                <SelectItem key={employee.employeeId} value={employee.employeeId}>
                                                                                    {employee.employeeName}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={project.control}
                                                    name="role"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Select Role</FormLabel>
                                                            <FormControl>
                                                                <Select
                                                                    onValueChange={(value) => {
                                                                        project.setValue("role", value);
                                                                    }}
                                                                >
                                                                    <SelectTrigger aria-label="Role">
                                                                        <SelectValue placeholder="Select a role" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup
                                                                            className="bg-white">
                                                                            {roleOptions.map((role) => (
                                                                                <SelectItem key={role.value} value={role.value}>
                                                                                    {role.label}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </form>
                                        </Form>
                                        <DialogFooter>
                                            <Button onClick={project.handleSubmit(onSubmit)} disabled={project.formState.isSubmitting} className="text-white bg-[#001333] hover:bg-[#7f8185] hover:cursor-pointer hover:border-dashed w-full mt-4">
                                                {!project.formState.isSubmitting && <span>Attach</span>}
                                                {project.formState.isSubmitting && <ImSpinner2 className="animate-spin" />}
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            }
                        </div>
                        <Separator className="my-6" />
                        <Table className="bg-white rounded-md border">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="uppercase font-bold">
                                        Name
                                    </TableHead>
                                    <TableHead className="uppercase font-bold">
                                        Role
                                    </TableHead>
                                    <TableHead className="uppercase font-bold">Added on</TableHead>
                                    <TableHead className="uppercase font-bold">Last Modified</TableHead>
                                    <TableHead className="font-bold -mr-2text-muted-foreground text-right uppercase">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {employees.map((employee, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{employee.employeeName || employee.employeeId}</TableCell>
                                        <TableCell>{employee.role}</TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {employee.createdAt}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {employee.updatedAt}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-right flex flex-row justify-end gap-1">
                                            <Badge title="Update Role" variant={"outline"}>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <FaEdit
                                                            className="text-yellow-700 bg-white rounded-md hover:cursor-pointer w-10 h-4"
                                                            onClick={() => {
                                                                setSelectedEmployee(employee);
                                                            }}
                                                        />
                                                    </DialogTrigger>
                                                    <DialogContent className="bg-white">
                                                        <DialogHeader>
                                                            <DialogTitle>Update Role for {selectedEmployee?.employeeName || selectedEmployee?.employeeId}</DialogTitle>
                                                        </DialogHeader>
                                                        <Form {...empProject}>
                                                            <form onSubmit={empProject.handleSubmit(handleRoleUpdateSubmit)} className="space-y-2">                                
                                                                <FormField control={empProject.control}
                                                                    name="role"
                                                                    render={({ field }) => (
                                                                        <FormControl>
                                                                            <Select
                                                                                onValueChange={(value) => {
                                                                                    empProject.setValue("role", value);
                                                                                }}
                                                                            >
                                                                                <SelectTrigger aria-label="Role">
                                                                                    <SelectValue placeholder="Select a role" />
                                                                                </SelectTrigger>
                                                                                <SelectContent>
                                                                                    <SelectGroup
                                                                                        className="bg-white">
                                                                                        {roleOptions.map((role) => (
                                                                                            <SelectItem key={role.value} value={role.value}>
                                                                                                {role.label}
                                                                                            </SelectItem>
                                                                                        ))}
                                                                                    </SelectGroup>
                                                                                </SelectContent>
                                                                            </Select>
                                                                        </FormControl>

                                                                    )}
                                                                />
                                                            </form>
                                                        </Form>
                                                        <DialogFooter>
                                                            <Button onClick={empProject.handleSubmit(handleRoleUpdateSubmit)} disabled={empProject.formState.isSubmitting} className="text-white bg-[#001333] hover:bg-[#7f8185] hover:cursor-pointer hover:border-dashed w-full mt-4">
                                                                {!empProject.formState.isSubmitting && <span>Update</span>}
                                                                {empProject.formState.isSubmitting && <ImSpinner2 className="animate-spin" />}
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>

                                                </Dialog>
                                            </Badge>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Badge title="Update Role" variant={"outline"}>
                                                        <FaTrash className="text-peach_primary bg-white rounded-md hover:cursor-pointer w-10 h-4" />
                                                    </Badge>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="bg-white">
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure you want to remove this employee?</AlertDialogTitle>
                                                        <AlertDialogDescription className="text-red-500">
                                                            Be certain about your action before moving forward

                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel className="text-white bg-peach_primary hover:bg-peach_secondary hover:cursor-pointer hover:border-dashed">Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            className="text-white bg-[#28a891] hover:bg-[#78dcca] hover:cursor-pointer hover:border-dashed"
                                                            disabled={loading}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                startTransition(() => {
                                                                    deleteProject(employee.employeeId);
                                                                });
                                                            }}
                                                        >
                                                            Proceed {loading && <FaSpinner className="animate-spin" />}
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            );
        }
    }
    else {
        return <div className="w-full flex mt-14 justify-center mb-20"><ImSpinner2 className="animate-spin h-12 w-12" /></div>
    }
}