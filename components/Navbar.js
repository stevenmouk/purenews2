import React from "react";
import { Playfair_Display, Bodoni_Moda } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const playfair = Playfair_Display({ subsets: ["latin"], weight: "600" });
const bodi = Bodoni_Moda({ subsets: ["latin"], weight: "600" });

export default function Navbar() {
  return (
    <div
      className={`${bodi.className} sm:text-6xl text-4xl  w-full flex items-center sm:justify-center justify-staart pb-6  pt-8`}
    >
      {/* <Image className=" ml-8" src="/images/logo.svg" height="50" width="75"></Image> */}

      <Link href="/" className="cursor-pointer">
        <div className="text-[#e7131a] hidden sm:inline ">Wealthy Explorer</div>
      </Link>
      <Link href="/" className="cursor-pointer">
        <div className="text-[#e7131a] sm:hidden ml-3 ">WE</div>
      </Link>
      {/* <hr className="text-black" /> */}
    </div>
  );
}
