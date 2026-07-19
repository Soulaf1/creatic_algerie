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

export default function CTASection() {
  return (
    <section className="bg-white py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-[#E5EEFF] rounded-2xl shadow-[0_0_30px_rgba(5,46,120,0.1)] px-6 sm:px-8 py-8 sm:py-10 text-center">

          <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold text-[#052E78] mb-3 ${hanken.className}`}>
            Prêt à lancer votre projet ?
          </h2>

          <p className={`text-[#444651] text-sm mb-6 max-w-lg mx-auto leading-relaxed ${inter.className}`}>
            Discutons-en dès aujourd'hui. Notre équipe d'experts est prête à analyser vos besoins et à vous proposer la meilleure stratégie numérique.
          </p>

          <Link
            href="/devis"
            className={`inline-block bg-[#052E78] text-white px-5 sm:px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#041f52] transition-all duration-300 hover:scale-105 ${poppins.className}`}
          >
            Demander un devis ➤
          </Link>

        </div>
      </div>
    </section>
  );
}