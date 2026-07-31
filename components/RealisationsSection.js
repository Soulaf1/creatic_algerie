'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Hanken_Grotesk, Inter } from 'next/font/google';

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export default function RealisationsSection() {
  const [realisations, setRealisations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((data) => {
        // On prend seulement les 3 premiers projets
        setRealisations(Array.isArray(data) ? data.slice(0, 3) : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className={`text-[#444651] text-sm ${inter.className}`}>Chargement...</p>
        </div>
      </section>
    );
  }

  if (realisations.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-[#052E78] mb-2 ${hanken.className}`}>
              Nos Réalisations Récentes
            </h2>
            <p className={`text-[#444651] text-sm sm:text-base ${inter.className}`}>
              Un aperçu de notre expertise à travers nos derniers succès.
            </p>
          </div>
          <Link
            href="/portfolio"
            className={`text-[#052E78] font-semibold hover:underline whitespace-nowrap text-base sm:text-lg ${hanken.className}`}
          >
            Explorer le portfolio →
          </Link>
        </div>

        {/* Cartes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {realisations.map((projet, index) => (
            <div
              key={projet._id || index}
              className="bg-white rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-transform duration-300 cursor-pointer overflow-hidden"
            >
              {/* Image */}
              <div className="w-full h-44 sm:h-48 relative">
                <Image
                  src={projet.image}
                  alt={projet.titre}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-contain p-2"
                />
                {/* Badge */}
                <div className={`absolute top-3 left-3 bg-white/90 text-[#052E78] text-xs font-bold px-3 py-1 rounded-full ${inter.className}`}>
                  ● {projet.categorie}
                </div>
              </div>

              {/* Contenu */}
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`text-[#052E78] font-bold text-lg sm:text-xl ${hanken.className}`}>
                    {projet.titre}
                  </h3>
                  <span className="text-gray-400 text-lg">↗</span>
                </div>

                <p className={`text-[#444651] text-sm mb-4 ${inter.className}`}>
                  {projet.secteur}
                </p>

                <div className="mb-2">
                  <span className={`text-[#052E78] text-xs font-bold ${hanken.className}`}>PROBLÈME</span>
                  <p className={`text-[#444651] text-sm ${inter.className}`}>{projet.problematique}</p>
                </div>

                <div className="mb-4">
                  <span className={`text-[#052E78] text-xs font-bold ${hanken.className}`}>SOLUTION</span>
                  <p className={`text-[#444651] text-sm ${inter.className}`}>{projet.solution}</p>
                </div>

                <div className="flex items-center gap-2 border-t border-gray-100 pt-3">
                  <span className={`text-[#444651] text-xs ${inter.className}`}>↗ Impact Mesurable</span>
                  <span className={`text-green-500 font-bold text-sm ml-auto ${inter.className}`}>
                    {projet.resultat}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}