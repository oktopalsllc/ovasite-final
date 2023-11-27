
// import Footer from '@/components/landing/Footer';
import Footer from '@/components/orgs/Footer';
import ScrollToTop from '@/components/landing/ScrollToTop';
import Navbar from '@/components/landing/Navbar';
export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Navbar />
      {children}
      <ScrollToTop />
      <Footer />
    </section>
  )
}