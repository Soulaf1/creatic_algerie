'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Hanken_Grotesk, Poppins } from 'next/font/google';

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600'],
});

const links = [
  { label: 'Accueil', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'À propos', href: '/apropos' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/Logo.png"
            alt="CREATIC-ALGERIE"
            width={45}
            height={45}
            className="object-contain"
          />
          <span className={`text-[#052E78] font-semibold text-lg ${hanken.className}`}>
            CREATIC-ALGERIE
          </span>
        </Link>

        {/* Navigation desktop */}
        <ul className={`hidden md:flex items-center gap-8 ${hanken.className}`}>
          {links.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-[#444651] hover:text-[#052E78] hover:underline underline-offset-4 decoration-[#052E78] font-medium transition-all text-base"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <Link
          href="/devis"
          className={`hidden md:block bg-[#052E78] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#041f52] transition-colors ${poppins.className}`}
        >
          Demander un devis
        </Link>

        {/* Bouton hamburger mobile */}
        <button
          className="md:hidden text-[#052E78]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className={`md:hidden bg-white border-t border-gray-100 px-4 py-4 ${hanken.className}`}>
          <ul className="flex flex-col gap-4">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[#444651] hover:text-[#052E78] font-medium block py-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/devis"
            className={`mt-4 block text-center bg-[#052E78] text-white px-4 py-2 rounded-lg text-sm font-medium ${poppins.className}`}
            onClick={() => setMenuOpen(false)}
          >
            Demander un devis
          </Link>
        </div>
      )}
    </nav>
  );
}