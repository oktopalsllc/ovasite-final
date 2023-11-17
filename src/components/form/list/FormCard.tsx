import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/form/ui/card";
import { Form } from "@prisma/client";
import { Badge } from "@/components/form/ui/badge";
import { formatDistance } from "date-fns";
import { Button } from "@/components/form/ui/button";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import UpdateBtn from "../UpdateBtn";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";

function FormCard({ form }: { form: Form }) {

    return (
        <Card className="bg-white">
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
                            <LuView className="text-muted-foreground" />
                            <span>{form.visits.toLocaleString()}</span>
                            <FaWpforms className="text-muted-foreground" />
                            <span>{form.subCount.toLocaleString()}</span>
                        </span>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
                {form.description || "No description"}
            </CardContent>
            <CardFooter>
                {form.published && (                    
                    <Button asChild className="text-white bg-[#001333] hover:bg-[#7f8185] hover:cursor-pointer hover:border-dashed w-full mt-4 gap-4">
                        <Link href={`/orgs/${form.organizationId}/projects/${form.projectId}/forms/${form.id}`}>
                            View submissions <BiRightArrowAlt />
                        </Link>
                    </Button>
                )}
                {!form.published && (
                    <div className="w-full">
                        <UpdateBtn formObj={form} />
                        <Button asChild variant={"secondary"} className="mt-2 w-full text-sm text-white bg-[#28a891] hover:bg-[#78dcca] hover:cursor-pointer hover:border-dashed">
                            <Link href={`/orgs/${form.organizationId}/projects/${form.projectId}/forms/builder/${form.id}`}>
                                Build form
                            </Link>
                        </Button>
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}

export default FormCard;