"use client";
import UpdateProject from "./UpdateProject";
import ProjectEmployee from "./ProjectEmployee";
import { Separator } from "@/components/form/ui/separator";

export default function Settings({ projectId, orgId }: { projectId: string, orgId: string }) {

    return(
        <div className="container">
            <h2 className='text-xl font-bold col-span-2'>
                Settings
            </h2>
            <Separator className="my-3" />
            <div className="container flex justify-center flex-col gap-10">
        
                <UpdateProject id={projectId} orgId={orgId}/>
                <ProjectEmployee id={projectId} orgId={orgId}/>
            </div>
            <Separator className="my-6" />
            <div className="container flex justify-center flex-col">
        
            </div>

        </div>
    );
}