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

export default function StatsCards({
  projectsCount = 0,
  testimonialsCount = 0,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      
      {/* Projets */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_0_15px_rgba(5,46,120,0.08)]">
        <p
          className={`text-[#444651] text-xs font-semibold tracking-wide mb-2 ${inter.className}`}
        >
          PROJETS RÉALISÉS
        </p>

        <p
          className={`text-4xl font-bold text-[#052E78] mb-1 ${hanken.className}`}
        >
          {projectsCount}
        </p>

        <p className={`text-green-500 text-xs ${inter.className}`}>
          ↗ Projets livrés avec succès
        </p>
      </div>

      {/* Témoignages */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_0_15px_rgba(5,46,120,0.08)]">
        <p
          className={`text-[#444651] text-xs font-semibold tracking-wide mb-2 ${inter.className}`}
        >
          TÉMOIGNAGES CLIENTS
        </p>

        <p
          className={`text-4xl font-bold text-[#052E78] mb-1 ${hanken.className}`}
        >
          {testimonialsCount}
        </p>

        <p className={`text-green-500 text-xs ${inter.className}`}>
          ✓ Avis clients collectés
        </p>
      </div>

    </div>
  );
}