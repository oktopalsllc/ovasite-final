import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <div className="bg-cover bg-center h-screen" style={{ backgroundImage: "url('backgroundImage.svg')" }}>
        <main className="relative isolate">
          <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8 text-white">
            <p className="text-4xl font-bold leading-8 text-[#FF595A]">404</p>
            <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-5xl">Page not found</h1>
            <p className="mt-4 text-base sm:mt-6">Sorry, we couldn’t find the page you’re looking for.</p>
            <div className="mt-10 flex justify-center">
              <Link href="/"
                className="text-sm font-semibold leading-7 text-[#FF595A]"

              >
                <span aria-hidden="true" className='text-xl font-serif'>&larr;</span> Back to home
                
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}