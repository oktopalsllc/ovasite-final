"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/form/ui/card";
import { Form } from "@prisma/client";
import { Badge } from "@/components/form/ui/badge";
import { formatDistance } from "date-fns";
import { Button } from "@/components/form/ui/button";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { useParams } from "next/navigation";

function FormCard({ form }: { form: Form }) {

    const hParams = useParams();
    const { orgId, projectId } = hParams;
    const orgValue = orgId.toString() || "";
    const projectValue = projectId.toString() || "";
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-between">
                    <span className="truncate font-bold">{form.title}</span>
                    {form.published && <Badge>Published</Badge>}
                    {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
                </CardTitle>
                <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
                    {formatDistance(form.createdAt, new Date(), {
                        addSuffix: true,
                    })}
                    {form.published && (
                        <span className="flex items-center gap-2">
                            {/* <LuView className="text-muted-foreground" />
                <span>{form.visits.toLocaleString()}</span>
                <FaWpforms className="text-muted-foreground" />
                <span>{form.subCount.toLocaleString()}</span> */}
                        </span>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
                {form.description || "No description"}
            </CardContent>
            <CardFooter>
                {form.published && (
                    <Button asChild className="w-full mt-2 text-md gap-4">
                        <Link href={`/orgs/${orgValue}/projects/${projectValue}/forms/${form.id}`}>
                            View submissions <BiRightArrowAlt />
                        </Link>
                    </Button>
                )}
                {!form.published && (
                    <Button asChild variant={"secondary"} className="w-full mt-2 text-md gap-4">
                        <Link href={`/orgs/${orgValue}/projects/${projectValue}/forms/builder/${form.id}`}>
                            Edit form <FaEdit />
                        </Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}

export default FormCard;