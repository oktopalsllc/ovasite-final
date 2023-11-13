import React from "react";
import Link from "next/link";
import "@/styles/styles.css";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="w-10/12 lg:w-9/12 mx-auto py-6">
      <div className="flex justify-between items-center">
        <a className="text-[#FF595A]">
          <span className="text-xl">OvaSite</span>
        </a>

        <div className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a className="text-gray-500">
            <Image
              src="/ig.svg"
              alt="instagram"
              width={48}
              height={48}
              className="w-8 h-8 md:w-12 md:h-12 text-black"
            />
          </a>
          <a className="ml-3 text-gray-500">
            <Image
              src="/fb.svg"
              alt="faceboook"
              width={48}
              height={48}
              className="w-8 h-8 md:w-12 md:h-12 text-black"
            />
          </a>
          <a className="ml-3 text-gray-500">
            <Image
              src="/x.svg"
              alt="x"
              width={48}
              height={48}
              className="w-8 h-8 md:w-12 md:h-12 text-black"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
