/* eslint-disable react-hooks/exhaustive-deps */
"use cLient";
import React, { useState, useEffect, useCallback } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { inviteSchema, inviteSchemaType } from "@/schemas/employee";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "@/components/form/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/form/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/form/ui/form";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/form/ui/table";
import { Separator } from "@/components/form/ui/separator";
import { toast } from "@/components/form/ui/use-toast";
import { useTransition } from "react";
import { FaSpinner, FaTrash } from "react-icons/fa";
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
import { Input } from "@/components/form/ui/input";
import { inviteService } from '@/services/invite-service/invite.service';
import { getOrgInvites, deleteInvite } from '@/services/employee-service/employee.service';
import { Badge } from "@/components/form/ui/badge";

interface inviteField {
    inviteId: string;
    email: string;
    role: string;
    createdAt: string;
    expirationDate: string;
}

export default function Invites({ orgId }: { orgId: string }) {

    const [loaded, setLoaded] = useState(false);
    const [loading, startTransition] = useTransition();
    const [invites, setInvites] = useState<inviteField[]>([]);


    const invitation = useForm<inviteSchemaType>({
        resolver: zodResolver(inviteSchema),
    });


    function convertISOToInputDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }

    const getAllInvites = useCallback(async () => {
        try {
            const response = await getOrgInvites(orgId,);
            if (response && Array.isArray(response)) {
                const invites = response
                    .map((invite) => ({
                        inviteId: invite.id as string,
                        email: invite.email as string,
                        role: invite.role as string,
                        createdAt: convertISOToInputDate(invite.createdAt),
                        expirationDate: convertISOToInputDate(invite.expirationDate)
                    }));
                setInvites(invites);
                setLoaded(true);
            }

        }
        catch (err) {
            console.log(err);
        }
    }, [orgId]);

    useEffect(() => {
        getAllInvites();
    }, []);

    async function onSubmit(values: inviteSchemaType) {
        // Assuming values contain employeeId and roleId
        try {
            const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
            // Call the service to update the role for the employee
            const inviteSent = await inviteService.sendInvite(orgId, values, token as string);
            const { msg, status } = inviteSent;
            if (status) {
                // Handle success response
                toast({
                    title: "Success",
                    description: msg,
                });
                getAllInvites();
            }
            else {
                // Handle error response
                toast({
                    title: "Error",
                    description: "Something went wrong, please try again later",
                    variant: "destructive",
                });
            }
        } catch (error) {
            // Handle error response
            toast({
                title: "Error",
                description: "Something went wrong, please try again later",
                variant: "destructive",
            });
        }
    }

    async function deleteInvitation(id: string) {
        try {
            const deletedInvite = await deleteInvite(id);
            if (deletedInvite) {
                getAllInvites();
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

    const roleOptions = [
        { value: 'ADMIN', label: 'Admin' },
        { value: 'MEMBER', label: 'Member' },
        { value: 'GUEST', label: 'Guest' },
    ];

    return (
        <>
            {loaded ?
                <div className="container">
                    <div className="flex lg:flex-row md:flex-row gap-4 justify-between container">
                        <h2 className='text-xl font-bold col-span-2'>
                            Pending Invites
                        </h2>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className="group border shadow-lg border-primary/20 h-[40px] w-[150px] bg-[#001333] text-white items-center justify-center flex flex-row hover:bg-[#7f8185]  hover:cursor-pointer hover:border-dashed gap-2"
                                >
                                    <p className="font-bold text-md text-muted-foreground group-hover:text-primary">Send Invite</p>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white">
                                <DialogHeader>
                                    <DialogTitle>Invite an Employee</DialogTitle>
                                </DialogHeader>
                                <Form {...invitation}>
                                    <form onSubmit={invitation.handleSubmit(onSubmit)} className="space-y-2">
                                        <FormField
                                            control={invitation.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem className="mb-2">
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input type='email' {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={invitation.control}
                                            name="role"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Select Role</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => {
                                                                invitation.setValue("role", value);
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
                                    <Button onClick={invitation.handleSubmit(onSubmit)} disabled={invitation.formState.isSubmitting} className="text-white bg-[#001333] hover:bg-[#7f8185] hover:cursor-pointer hover:border-dashed w-full mt-4">
                                        {!invitation.formState.isSubmitting && <span>Send</span>}
                                        {invitation.formState.isSubmitting && <ImSpinner2 className="animate-spin" />}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <Separator className="my-6" />
                    {invites.length > 0 ?
                        <div className="container overflow-x-auto rounded-md border">
                            <Table className="bg-white">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="uppercase text-sm truncate md:truncate">
                                            Email
                                        </TableHead>
                                        <TableHead className="uppercase text-sm">
                                            Role
                                        </TableHead><TableHead className="uppercase text-sm">
                                            Sent On
                                        </TableHead><TableHead className="uppercase text-sm">
                                            Expiry Date
                                        </TableHead>
                                        <TableHead className="text-muted-foreground text-sm uppercase text-right">
                                            Action
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {invites.map((invite) => (
                                        <TableRow key={invite.inviteId}>
                                            <TableCell className="text-sm">{invite.email}</TableCell>
                                            <TableCell className="text-sm">{invite.role}</TableCell>
                                            <TableCell className="text-sm">
                                                {invite.createdAt}
                                            </TableCell><TableCell className="text-sm">
                                                {invite.expirationDate}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-right">
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Badge title="Delete Invite" variant={"outline"}>
                                                            <FaTrash className="text-peach_primary bg-white rounded-md hover:cursor-pointer w-10 h-4" />
                                                        </Badge>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent className="bg-white">
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you sure you want to delete this invitation?</AlertDialogTitle>
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
                                                                        deleteInvitation(invite.inviteId);
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
                        :
                        <>

                            <h3 className="text-md font-bold my-4">No pending invites</h3>
                        </>
                    }
                </div>
                :

                <div className="w-full flex mt-14 justify-center mb-20"><ImSpinner2 className="animate-spin h-12 w-12" /></div>
            }
        </>
    );
}