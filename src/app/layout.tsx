import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Toaster } from "@/components/form/ui/toaster";
import { ThemeProvider } from "@/components/form/providers/ThemeProvider";
import DesignerContextProvider from "@/components/form/context/DesignerContext";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader />
        <DesignerContextProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </DesignerContextProvider>
      </body>
    </html>
  )
}
