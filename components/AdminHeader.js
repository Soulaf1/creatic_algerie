"use client";

import { Hanken_Grotesk, Inter } from "next/font/google";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function AdminHeader({ title }) {
  return (
    <header className="flex items-center justify-between px-8 py-6 bg-[#E5EEFF]">

      {/* Titre */}
      <h1
        className={`text-3xl font-bold text-[#052E78] ${hanken.className}`}
      >
        {title}
      </h1>

      {/* Profil admin */}
      <div className="flex items-center gap-3">

        <div className="text-right">

          <p
            className={`text-[#052E78] font-semibold text-sm ${hanken.className}`}
          >
            Admin Creatic
          </p>

          <p
            className={`text-[#444651] text-xs ${inter.className}`}
          >
            Super Administrateur
          </p>

        </div>

        <div className="w-10 h-10 rounded-full bg-[#052E78] flex items-center justify-center text-white font-bold">
          AC
        </div>

      </div>

    </header>
  );
}