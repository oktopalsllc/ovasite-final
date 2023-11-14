"use client";

import { projectSchema, projectSchemaType } from "@/schemas/project";
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
import { useRouter } from "next/navigation";
import { projectService } from "@/services/project-service/project.service";

function CreateProjectBtn({ orgId }: { orgId: string }) {
  const router = useRouter();
  const project = useForm<projectSchemaType>({
    resolver: zodResolver(projectSchema),
  });

  async function onSubmit(values: projectSchemaType) {
    try {      
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
      const responseData = await projectService.createProject(orgId, values, token as string);
      const { message, status, newProject } = responseData;
      const projectId = newProject.id as string;
      if(status) {
        toast({
          title: "Success",
          description: message,
        });
        router.push(`/orgs/${orgId}/projects/${projectId}`);
      }
      else{
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
          className="group border border-primary/20 h-[190px] bg-white items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
        >
          <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
          <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">Create new project</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
          <DialogDescription>Create a new project to start collecting responses</DialogDescription>
        </DialogHeader>
        <Form {...project}>
          <form onSubmit={project.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={project.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={project.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
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
          <Button onClick={project.handleSubmit(onSubmit)} disabled={project.formState.isSubmitting} className="w-full mt-4">
            {!project.formState.isSubmitting && <span>Save</span>}
            {project.formState.isSubmitting && <ImSpinner2 className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateProjectBtn;
