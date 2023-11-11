
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
export default function LandingLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  return (
    <section> 
      <Header/>
      {children}
      <Footer/>
    </section>
  )
}