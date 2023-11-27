import { Project } from "@prisma/client";
import { useParams } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/form/ui/card";
import { Badge } from "@/components/form/ui/badge";
import { formatDistance } from "date-fns";
import { Button } from "@/components/form/ui/button";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";

export default function ProjectCard({ project }: { project: Project }) {

    const hParams = useParams();
    const { orgId } = hParams;
    const orgValue = orgId.toString() || "";

    const convertDate = (date: Date) => {
        const dateObject: Date = new Date(date);
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: '2-digit' };
        const customFormat = dateObject.toLocaleDateString('en-US', options);
        return customFormat;
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-between">
                    <span className="truncate font-bold">{project.name}</span>
                    {project.isCompleted && <Badge>Completed<br />Status: {project.status}</Badge>}
                    {!project.isCompleted && <Badge variant={"destructive"}>Status: {project.status}</Badge>}
                </CardTitle>
                <br />
                <CardDescription className="text-muted-foreground text-sm">
                    {convertDate(project.createdAt)} - {project.expectedDuration}
                </CardDescription>
            </CardHeader>
            <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
                {project.description || "No description"}
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full mt-2 text-md gap-4">
                    <Link href={`/orgs/${orgValue}/projects/${project.id}`}>
                        View Project <BiRightArrowAlt />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}