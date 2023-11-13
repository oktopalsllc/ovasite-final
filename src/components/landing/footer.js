import React from "react";
import Link from "next/link";
import "@/styles/styles.css";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="text-gray-600 body-font bg-[white]">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <Link href='/' className="flex title-font font-bold items-center md:justify-start justify-center text-[#FF595A]">

          <span className="ml-3 text-xl">OvaSite</span>
        </Link>

        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">

          <Link href='https://twitter.com/oktopals' target="_blank" className="ml-3">
            <Image
              src="/twitterx.svg"
              alt="x"
              width={30}
              height={25}
            />
          </Link>
          <Link href='https://www.linkedin.com/company/httpswwwlinkedincomoktopalsllc' target="_blank" className="ml-3">
            <Image
              src="/linkedinThin.svg"
              alt="linkedin"
              width={30}
              height={30}
            />
          </Link>
          <Link href='https://www.linkedin.com/company/httpswwwlinkedincomoktopalsllc' target="_blank" className="ml-3">
            <Image
              src="/mailThin.svg"
              alt="mail"
              width={30}
              height={30}
            />
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;