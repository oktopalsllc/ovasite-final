/* eslint-disable react-hooks/exhaustive-deps */
"use cLient";
import React, { useState, useEffect, useCallback } from 'react';
import {
  currentEmployee,
  getOrgEmployees,
  changeRole,
  deleteEmployee
} from '@/services/employee-service/employee.service';
import { zodResolver } from "@hookform/resolvers/zod";
import { empRoleSchema, empRoleType } from '@/schemas/employee';
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { LuView } from "react-icons/lu";
import { Button } from "@/components/form/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/form/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/form/ui/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/form/ui/table";
import { Badge } from "@/components/form/ui/badge";
import { Separator } from "@/components/form/ui/separator";
import { toast } from "@/components/form/ui/use-toast";
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
} from "@/components/form/ui/alert-dialog";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/form/ui/select";
import Image from 'next/image';

interface employeeField {
  employeeId: string;
  employeeName: string;
  email: string;
  role: string;
  contactNumber: string;
  address: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

const EmployeeManagement = ({ orgId, emp }: { orgId: string, emp: any }) => {
  const [employees, setEmployees] = useState<employeeField[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<employeeField | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [loading, startTransition] = useTransition();
  const tokenString =
    typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  const token = tokenString?.toString() || '';
  const empRoleForm = useForm<empRoleType>({
    resolver: zodResolver(empRoleSchema),
  });

  function convertISOToInputDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toISOString().split('T')[0];
  }

  const getAllEmployees = useCallback(async () => {
    try {
      const response = await getOrgEmployees(orgId, token);
      if (response && Array.isArray(response)) {
        const filteredEmployees = response
          .filter((employee) => employee.role.toString() !== "OWNER")
          .map((employee) => ({
            employeeId: employee.id as string,
            employeeName: employee.name as string,
            email: employee.email as string,
            role: employee.role as string,
            contactNumber: employee.contactNumber as string,
            address: employee.address as string,
            avatar: employee.avatar as string,
            createdAt: convertISOToInputDate(employee.createdAt),
            updatedAt: convertISOToInputDate(employee.updatedAt)
          }));

        setEmployees(filteredEmployees);
        setLoaded(true);
      }

    }
    catch (err) {
      console.log(err);
    }
  }, [orgId, token]);

  useEffect(() => {
    getAllEmployees();
  }, []);

  const roleOptions = [
    { value: 'ADMIN', label: 'Admin' },
    { value: 'MEMBER', label: 'Member' },
    { value: 'GUEST', label: 'Guest' },
  ];

  const handleRoleUpdateSubmit = async (value: empRoleType) => {
    if (selectedEmployee) {
      try {
        const data = {
          empId: selectedEmployee.employeeId,
          role: value.role
        }
        const changedRole = await changeRole(orgId, data, token as string);
        const {status} = changedRole;
        if (status) {
          getAllEmployees();
          setSelectedEmployee(null);
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
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong, please try again later",
          variant: "destructive",
        });
      }
    }
  };
  async function deleteEmp(empId: string) {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
      const deletedEmp = await deleteEmployee(orgId, empId, token as string);
      const { status } = deletedEmp;
      if (status) {
        getAllEmployees();
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
  return (
    <>
      {loaded ?
        <>
          {employees.length > 0 ?
            <div className="container w-full overflow-x-auto ">
              <h2 className='text-xl font-bold col-span-2'>
                Employees
              </h2>
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
                      <Badge title="View Details" variant={"outline"}>
                          <Dialog>
                            <DialogTrigger asChild>
                              <LuView
                                className="text-blue-600 bg-white rounded-md hover:cursor-pointer w-10 h-4"
                                onClick={() => {
                                  setSelectedEmployee(employee);
                                }}
                              />
                            </DialogTrigger>
                            <DialogContent className="bg-white">
                              <DialogHeader>
                                <DialogTitle>Bio of {selectedEmployee?.employeeName || selectedEmployee?.employeeId}</DialogTitle>
                              </DialogHeader>
                              {selectedEmployee?.avatar ? <Image src={selectedEmployee.avatar} alt="avatar" width={200} height={200} className="rounded-md" /> : <></>}<br />
                              <p className='text-sm'>Email: {selectedEmployee?.email}</p>
                              <p className='text-sm'>Contact: {selectedEmployee?.contactNumber}</p>
                              <p className='text-sm'>Address: <br />{selectedEmployee?.address}</p>
                            </DialogContent>
                          </Dialog>
                        </Badge>
                        {emp.role === 'OWNER' &&
                          <>
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
                                  <Form {...empRoleForm}>
                                    <form onSubmit={empRoleForm.handleSubmit(handleRoleUpdateSubmit)} className="space-y-2">
                                      <FormField control={empRoleForm.control}
                                        name="role"
                                        render={({ field }) => (
                                          <FormControl>
                                            <Select
                                              onValueChange={(value) => {
                                                empRoleForm.setValue("role", value);
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
                                    <Button onClick={empRoleForm.handleSubmit(handleRoleUpdateSubmit)} disabled={empRoleForm.formState.isSubmitting} className="text-white bg-[#001333] hover:bg-[#7f8185] hover:cursor-pointer hover:border-dashed w-full mt-4">
                                      {!empRoleForm.formState.isSubmitting && <span>Update</span>}
                                      {empRoleForm.formState.isSubmitting && <ImSpinner2 className="animate-spin" />}
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </Badge>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Badge title="Delete Employee" variant={"outline"}>
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
                                        deleteEmp(employee.employeeId);
                                      });
                                    }}
                                  >
                                    Proceed {loading && <FaSpinner className="animate-spin" />}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            :
            <div className="container overflow-x-auto ">
              <h2 className='text-xl font-bold col-span-2'>
                Employees
              </h2>
              <Separator className="my-6" />
              <h3 className="text-md font-bold my-4">No employees</h3>
              <Separator className="my-6" />
              <p className='text-sm'>Get started by inviting employees using the invites tab.</p>
            </div>
          }
        </>
        :
        <div className="w-full flex mt-14 justify-center mb-20"><ImSpinner2 className="animate-spin h-12 w-12" /></div>
      }
    </>
  );
};

export default EmployeeManagement;
