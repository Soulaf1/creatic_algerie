"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Hanken_Grotesk, Poppins } from "next/font/google";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600"],
});

const links = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "À propos", href: "/apropos" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  // Ne pas afficher la navbar dans l'espace admin
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">

        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/Logo.png"
            alt="CREATIC-ALGERIE"
            width={45}
            height={45}
          />

          <span className={`text-[#052E78] font-semibold text-lg ${hanken.className}`}>
            CREATIC-ALGERIE
          </span>
        </Link>

        <ul className={`hidden md:flex items-center gap-8 ${hanken.className}`}>
          {links.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-[#444651] hover:text-[#052E78] hover:underline underline-offset-4 decoration-[#052E78]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/devis"
          className={`hidden md:block bg-[#052E78] text-white px-4 py-2 rounded-lg ${poppins.className}`}
        >
          Demander un devis
        </Link>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4">
          <ul className="flex flex-col gap-4">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/devis"
            onClick={() => setMenuOpen(false)}
            className="mt-4 block text-center bg-[#052E78] text-white rounded-lg py-2"
          >
            Demander un devis
          </Link>
        </div>
      )}
    </nav>
  );
}