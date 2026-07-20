import Link from 'next/link';
import Image from 'next/image';
import { Hanken_Grotesk, Poppins, Inter } from 'next/font/google';

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600'],
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
});

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[500px] md:min-h-[600px]">

      {/* Image de fond pleine largeur */}
      <Image
        src="/herosection.png"
        alt="Hero CREATIC-ALGERIE"
        fill
        className="object-cover object-center pointer-events-none"
        priority
      />

     

      {/* Contenu texte */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-32 flex flex-col justify-center min-h-[500px] md:min-h-[600px]">

        {/* Badge */}
        <div className={`inline-flex items-center gap-2 border border-white/30 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full mb-4 sm:mb-6 w-fit ${hanken.className}`}>
          <span className="text-green-400">⊙</span>
          Leader de la tech en Algérie
        </div>

        {/* Titre H1 — Hanken */}
        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4 sm:mb-6 max-w-xl ${hanken.className}`}>
          Digitalisez votre entreprise<br />
          avec l'excellence<br />
          technologique.
        </h1>

        {/* Sous-titre — Inter */}
        <p className={`text-gray-300 text-sm sm:text-base mb-6 sm:mb-8 max-w-md leading-relaxed ${inter.className}`}>
          Agence de développement web et mobile à Alger. Nous transformons vos idées en solutions numériques performantes adaptées au marché local et international.
        </p>

        {/* Boutons — Poppins */}
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <Link
            href="/devis"
            className={`bg-[#052E78] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-[#041f52] transition-colors ${poppins.className}`}
          >
            Demander un devis
          </Link>
          <Link
            href="/portfolio"
            className={`border border-white text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-white hover:text-[#05102E] transition-colors ${poppins.className}`}
          >
            Voir nos réalisations
          </Link>
        </div>
      </div>

      {/* Vague blanche */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[120px] sm:h-[170px] z-10 pointer-events-none"
        viewBox="0 0 1440 170"
        preserveAspectRatio="none"
      >
        <path
          fill="#fff"
          d="M0,80 C180,140 350,150 540,105 C760,55 930,55 1120,105 C1270,145 1370,135 1440,95 L1440,170 L0,170 Z"
        />
      </svg>

    </section>
  );
}