import { Inter } from 'next/font/google';
import { Raleway } from 'next/font/google';
import '@/styles/globals.css';
import { Toaster } from '@/components/form/ui/toaster';
import { ThemeProvider } from '@/components/form/providers/ThemeProvider';
import DesignerContextProvider from '@/components/form/context/DesignerContext';
import NextTopLoader from 'nextjs-toploader';
import { constructMetadata } from '@/lib/utils';
import "reflect-metadata"
import Script from 'next/script';

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
        <Script id="tawk" strategy="lazyOnload">
          {`
         var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
         (function(){
         var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
         s1.async=true;
         s1.src='https://embed.tawk.to/655b1f3f91e5c13bb5b1ccc3/1hflv44cn';
         s1.charset='UTF-8';
         s1.setAttribute('crossorigin','*');
         s0.parentNode.insertBefore(s1,s0);
         })(); 
        `}
        </Script>
      </body>
    </html>
  );
}
