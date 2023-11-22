'use client';

import { projectSchema, projectSchemaType } from '@/schemas/project';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import { Button } from '../form/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../form/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../form/ui/form';
import { Input } from '../form/ui/input';
import { Textarea } from '../form/ui/textarea';
import { toast } from '../form/ui/use-toast';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { projectService } from '@/services/project-service/project.service';

function CreateProjectBtn({ orgId }: { orgId: string }) {
  const router = useRouter();
  const project = useForm<projectSchemaType>({
    resolver: zodResolver(projectSchema),
  });

  async function onSubmit(values: projectSchemaType) {
    try {
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('token') : '';
      const responseData = await projectService.createProject(
        orgId,
        values,
        token as string
      );
      const { message, status, newProject } = responseData;
      const projectId = newProject.id as string;
      if (status) {
        toast({
          title: 'Success',
          description: message,
        });
        router.push(`/orgs/${orgId}/projects/${projectId}`);
      } else {
        toast({
          title: 'Error',
          description: 'Something went wrong, please try again later',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again later',
        variant: 'destructive',
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className='group border shadow-lg border-primary/20 p-4 bg-[#001333] text-white items-center justify-center flex flex-row hover:bg-[#7f8185]  hover:cursor-pointer hover:border-dashed gap-2'
        >
          <BsFileEarmarkPlus className='h-5 w-5 text-muted-foreground group-hover:text-primary' />
          <p className='font-bold text-xs text-muted-foreground group-hover:text-primary hidden md:block'>
            New project
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-white'>
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
        </DialogHeader>
        <Form {...project}>
          <form onSubmit={project.handleSubmit(onSubmit)} className='space-y-2'>
            <FormField
              control={project.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Not less than 4 characters'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={project.control}
                name='startDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
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
              name='description'
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
          <Button
            onClick={project.handleSubmit(onSubmit)}
            disabled={project.formState.isSubmitting}
            className='text-white bg-[#001333] hover:bg-[#7f8185] hover:cursor-pointer hover:border-dashed w-full mt-4'
          >
            {!project.formState.isSubmitting && <span>Save</span>}
            {project.formState.isSubmitting && (
              <ImSpinner2 className='animate-spin' />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateProjectBtn;
