"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Hanken_Grotesk, Inter } from "next/font/google";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function Footer() {
  const pathname = usePathname();

  // Ne pas afficher le footer dans l'admin
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-[#E5EEFF]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/Logo.png"
                alt="CREATIC-ALGERIE"
                width={40}
                height={40}
              />
              <span className={`text-[#052E78] font-semibold text-base ${hanken.className}`}>
                CREATIC-ALGERIE
              </span>
            </Link>

            <p className={`text-[#444651] text-sm leading-relaxed ${inter.className}`}>
              L'agence digitale de référence
              <br />
              pour les PME en Algérie.
              <br />
              Engineering moderne,
              <br />
              impact local,
              <br />
              excellence technologique.
            </p>
          </div>

          {/* Liens */}
          <div>
            <h3 className={`text-[#052E78] font-semibold mb-4 ${hanken.className}`}>
              LIENS RAPIDES
            </h3>

            <ul className={`space-y-2 text-[#444651] ${inter.className}`}>
  <li>
    <Link href="/" className="hover:text-[#052E78] transition">
      Accueil
    </Link>
  </li>

  <li>
    <Link href="/services" className="hover:text-[#052E78] transition">
      Services
    </Link>
  </li>

  <li>
    <Link href="/portfolio" className="hover:text-[#052E78] transition">
      Portfolio
    </Link>
  </li>

  <li>
    <Link href="/apropos" className="hover:text-[#052E78] transition">
      À propos
    </Link>
  </li>

  <li>
    <Link href="/contact" className="hover:text-[#052E78] transition">
      Contact
    </Link>
  </li>
</ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className={`text-[#052E78] font-semibold mb-4 ${hanken.className}`}>
              CONTACT
            </h3>

            <ul className={`space-y-3 text-[#444651] ${inter.className}`}>
  <li>+213 (0) 555136900</li>
  <li>contact@creatic-algerie.dz</li>
  <li>Alger, Algérie</li>
</ul>
          </div>

          {/* Réseaux */}
          <div>
            <h3 className={`text-[#052E78] font-semibold mb-4 ${hanken.className}`}>
              SUIVEZ-NOUS
            </h3>

            <div className="flex gap-3">
  {/* Instagram */}
  <a
    href="https://www.instagram.com/creaticalgerie"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 bg-[#052E78] rounded-lg flex items-center justify-center text-white hover:bg-[#274690] transition"
  >
    <FaInstagram size={20} />
  </a>

  {/* Facebook */}
  <a
    href="https://facebook.com/CreaticAlgerie"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 bg-[#052E78] rounded-lg flex items-center justify-center text-white hover:bg-[#274690] transition"
  >
    <FaFacebookF size={20} />
  </a>
</div>
          </div>

        </div>

        <div
  className={`border-t border-[#c5d4f0] mt-8 pt-6 text-center text-sm text-[#444651] ${inter.className}`}
>
  Copyright © 2026 CREATIC-ALGERIE. Tous droits réservés.
</div>
      </div>
    </footer>
  );
}