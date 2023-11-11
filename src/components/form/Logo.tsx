import Link from "next/link";
import React from "react";
import Image from "next/image";

function Logo() {
  return (
    <Link
      href={"/"}
      className="font-bold text-3xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer"
    >
      <Image alt="Logo" src="/Logo.png" width={60} height={60} />
    </Link>
  );
}

export default Logo;
