import React from "react";
import { Playfair_Display, Bodoni_Moda } from "next/font/google";
import Image from "next/image";

const playfair = Playfair_Display({ subsets: ["latin"], weight: "600" });
const bodi = Bodoni_Moda({ subsets: ["latin"], weight: "600" });

export default function Navbar() {
  return (
    <div
      className={`${bodi.className} text-6xl w-full flex items-center justify-center pb-6  pt-8`}
    >
      {/* <Image className=" ml-8" src="/images/logo.svg" height="50" width="75"></Image> */}
      <div className="text-[#e7131a]">Wealthy Explorer</div>

      {/* <hr className="text-black" /> */}
    </div>
  );
}
