import { projectService } from "@/services/project-service/project.service";
import { useEffect, useState } from "react";
import { Project } from "@prisma/client";
import { ImSpinner2 } from "react-icons/im";
import ProjectCard from "./ProjectCard";
import ProjectCard2 from "./ProjectCard2";

async function ProjectCards({ orgId }: { orgId: string }) {

    const [projects, setProjects] = useState<Project[]>([]);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const tokenString = typeof window !== 'undefined' ? localStorage.getItem('token') : "";
                const token = tokenString?.toString() || "";
                const fetchedProjects = await projectService.getProjects(orgId, token);
                setProjects(fetchedProjects);
                setLoaded(true);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [orgId]);
    return (
        <>
            {
                loaded ?
                    <>
                        {projects.map((project) => (
                            <ProjectCard2 key={project.id} project={project} />
                        ))}
                    </> : <div className="grid place-content-center"><ImSpinner2 className="animate-spin h-12 w-12" /></div>
            }
        </>
    );
};

export default ProjectCards;