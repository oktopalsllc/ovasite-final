import Link from "next/link";

export default function CreateProject() {
    return (
        <div className="flex w-full h-full flex-col items-center justify-center gap-4">
            <h2 className="text-destructive text-4xl">Holla!</h2>
                <Link href={"/"}>Go back to home</Link>
        </div>
    );
}