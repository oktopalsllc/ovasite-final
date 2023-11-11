import DesignerContextProvider from "@/components/form/context/DesignerContext";
import NextTopLoader from "nextjs-toploader";


export default function Projects({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NextTopLoader />
      <DesignerContextProvider>

        {children}
      </DesignerContextProvider>
    </>
  );
}
