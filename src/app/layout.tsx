import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Raleway } from 'next/font/google';
import '@/styles/globals.css';
import { Toaster } from '@/components/form/ui/toaster';
import { ThemeProvider } from '@/components/form/providers/ThemeProvider';
import DesignerContextProvider from '@/components/form/context/DesignerContext';
import NextTopLoader from 'nextjs-toploader';
import { constructMetadata } from '@/lib/utils';

// const inter = Inter({ subsets: ['latin'] })
const raleway = Raleway({ subsets: ['latin'] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={raleway.className}>
        <NextTopLoader />
        <DesignerContextProvider>
          {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange> */}
          {children}
          <Toaster />
          {/* </ThemeProvider> */}
        </DesignerContextProvider>
      </body>
    </html>
  );
}
