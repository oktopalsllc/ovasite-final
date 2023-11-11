export default function adminLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  return (
    <section> 
      {children}
    </section>
  )
}