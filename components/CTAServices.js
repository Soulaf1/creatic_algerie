import Link from 'next/link';
import { Hanken_Grotesk, Poppins, Inter } from 'next/font/google';

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600'],
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
});

export default function CTAServices() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-[#E5EEFF] rounded-2xl shadow-[0_0_30px_rgba(5,46,120,0.1)] px-6 sm:px-12 py-10 sm:py-14 text-center relative overflow-hidden">
          
          {/* Icône fusée */}
          <div className="absolute right-8 top-6 text-5xl opacity-20">🚀</div>

          <h2 className={`text-2xl sm:text-3xl font-bold text-[#052E78] mb-3 ${hanken.className}`}>
            Prêt à lancer votre projet ?
          </h2>

          <p className={`text-[#444651] text-sm mb-8 max-w-lg mx-auto leading-relaxed ${inter.className}`}>
            Contactez nos experts pour une consultation gratuite et obtenez une proposition adaptée à vos objectifs business avec CREATIC-ALGERIE.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/devis"
              className={`inline-block bg-[#052E78] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#041f52] transition-all duration-300 hover:scale-105 ${poppins.className}`}
            >
              Demander un devis →
            </Link>
            <Link
              href="/portfolio"
              className={`inline-block border-2 border-[#052E78] text-[#052E78] px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#052E78] hover:text-white transition-all duration-300 ${poppins.className}`}
            >
              Voir nos réalisations
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}