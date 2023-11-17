import React from "react";
import Link from "next/link";
import "@/styles/styles.css";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="text-gray-600 body-font bg-[white]">
      <div className="container px-5 py-5 mx-auto flex items-center sm:flex-row flex-col">
        <Link href='/' className="flex title-font font-bold items-center md:justify-start justify-center text-[#FF595A]">

         <Image alt="Logo" src="/Logo.png" width={40} height={40} />
        </Link>
        <div className="pl-20 sm:ml-4 sm:flex sm:flex-row sm:items-center sm:space-x-4 sm:mt-0 mt-4">
            <Link className="mr-5 hover:text-[#FF595A]" href="/">
                Home
              </Link>
              <Link className="mr-5 hover:text-[#FF595A]" href="/about">
                About
              </Link>
              <Link className="mr-5 hover:text-[#FF595A]" href="/features">
                Features
              </Link>
              <Link className="mr-5 hover:text-[#FF595A]" href="/pricing">
                Pricing
              </Link>
        </div>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">

          <Link href='https://twitter.com/oktopals' target="_blank" className="ml-3">
            <Image
              src="/twitterx.svg"
              alt="x"
              width={20}
              height={15}
            />
          </Link>
          <Link href='https://www.linkedin.com/company/httpswwwlinkedincomoktopalsllc' target="_blank" className="ml-3">
            <Image
              src="/linkedinThin.svg"
              alt="linkedin"
              width={25}
              height={25}
            />
          </Link>
          <Link href='https://www.linkedin.com/company/httpswwwlinkedincomoktopalsllc' target="_blank" className="ml-3">
            <Image
              src="/mailThin.svg"
              alt="mail"
              width={20}
              height={25}
            />
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;