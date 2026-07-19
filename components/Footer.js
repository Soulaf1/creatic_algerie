import Link from 'next/link';
import Image from 'next/image';
import { Hanken_Grotesk, Inter } from 'next/font/google';

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
});

export default function Footer() {
  return (
    <footer className="bg-[#E5EEFF]">
      <div className="max-w-7xl mx-auto px-4 py-12">
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

          {/* Colonne 1 - Logo + description */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/Logo.png"
                alt="CREATIC-ALGERIE"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className={`text-[#052E78] font-semibold text-base ${hanken.className}`}>
                CREATIC-ALGERIE
              </span>
            </Link>
            <p className={`text-[#444651] text-sm leading-relaxed ${inter.className}`}>
              L'agence digitale de référence<br />
  pour les PME en Algérie.<br />
  Engineering moderne, <br /> 
  impact local,<br />
  excellence technologique.
            </p>
          </div>

          {/* Colonne 2 - Liens rapides */}
          <div>
            <h3 className={`text-[#052E78] font-semibold text-base mb-4 ${hanken.className}`}>
              LIENS RAPIDES
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'Accueil', href: '/' },
                { label: 'Services', href: '/services' },
                { label: 'Portfolio', href: '/portfolio' },
                { label: 'À propos', href: '/apropos' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-[#444651] hover:text-[#052E78] text-sm transition-colors ${hanken.className}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

      {/* Colonne 3 - Contact */}
<div>
  <h3 className={`text-[#052E78] font-semibold text-base mb-4 ${hanken.className}`}>
    CONTACT
  </h3>
  <ul className={`space-y-3 text-[#444651] text-sm ${inter.className}`}>
    <li className="flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#052E78] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
      </svg>
      +213 (0) 23 XX XX XX
    </li>
    <li className="flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#052E78] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
      contact@creatic-algerie.dz
    </li>
    <li className="flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#052E78] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
      Alger, Algérie
    </li>
  </ul>
</div>
          {/* Colonne 4 - Réseaux sociaux */}
          <div>
            <h3 className={`text-[#052E78] font-semibold text-base mb-4 ${hanken.className}`}>
              SUIVEZ-NOUS
            </h3>
            <div className="flex gap-3">
              {/* Facebook */}
              <a href="#" className="w-10 h-10 bg-[#052E78] rounded-lg flex items-center justify-center hover:bg-[#041f52] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#E5EEFF]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-10 h-10 bg-[#052E78] rounded-lg flex items-center justify-center hover:bg-[#041f52] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#E5EEFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="w-10 h-10 bg-[#052E78] rounded-lg flex items-center justify-center hover:bg-[#041f52] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#E5EEFF]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className={`border-t border-[#c5d4f0] mt-8 pt-6 text-center text-[#444651] text-sm ${inter.className}`}>
          Copyright © 2026 CREATIC-ALGERIE. Tous droits réservés.
        </div>

      </div>
    </footer>
  );
}