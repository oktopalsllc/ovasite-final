'use client';
import Header from '@/components/orgs/Header';
import Footer from '@/components/orgs/Footer';
import ScrollToTop from '@/components/shared/ScrollToTop';

export default function OrgsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className=''>
      <Header />
      <div className='px-5 pt-20 lg:px-12 bg-gray-100 min-h-[100vh] w-full overflow-x-hidden'>
        {children}      
      </div>
      <ScrollToTop />
      <Footer />
    </section>
  );
}
