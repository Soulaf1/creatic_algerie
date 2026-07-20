import Image from 'next/image';
import Link from 'next/link';
import { Hanken_Grotesk, Poppins, Inter } from 'next/font/google';
import CTAServices from '@/components/CTAServices';

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

export default function ServicesPage() {
  return (
    <main>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[500px] md:min-h-[600px]">
        <Image
          src="/herosection2.png"
          alt="Services CREATIC-ALGERIE"
          fill
          className="object-cover object-center pointer-events-none"
          priority
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-32 flex flex-col justify-center min-h-[500px] md:min-h-[600px]">
          <div className={`inline-flex items-center gap-2 border border-[#052E78] text-[#052E78] text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full mb-4 sm:mb-6 w-fit ${hanken.className}`}>
            <span className="text-green-500">⊙</span>
            Expertise Technologique
          </div>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-[#052E78] leading-tight mb-4 sm:mb-6 max-w-xl ${hanken.className}`}>
            Nos Services Digitaux
          </h1>
          <p className={`text-[#444651] text-sm sm:text-base mb-6 sm:mb-8 max-w-md leading-relaxed ${inter.className}`}>
            Des solutions sur mesure pour accompagner votre croissance et transformer votre vision en réalité numérique performante avec CREATIC-ALGERIE.
          </p>
          <Link
            href="/devis"
            className={`inline-block w-fit bg-[#052E78] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-[#041f52] transition-all duration-300 hover:scale-105 ${poppins.className}`}
          >
            Demander un devis
          </Link>
        </div>
        <svg className="absolute bottom-0 left-0 w-full h-[120px] sm:h-[170px] z-10 pointer-events-none" viewBox="0 0 1440 170" preserveAspectRatio="none">
          <path fill="#fff" d="M0,80 C180,140 350,150 540,105 C760,55 930,55 1120,105 C1270,145 1370,135 1440,95 L1440,170 L0,170 Z" />
        </svg>
      </section>

      {/* Service 1 — Sites Web */}
      <section className="bg-[#EFF4FF] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-10 sm:gap-16">
          <div className="flex-1">
            <div className="w-12 h-12 bg-[#052E78] rounded-xl flex items-center justify-center text-2xl mb-4">🌐</div>
            <h2 className={`text-2xl sm:text-3xl font-bold text-[#052E78] mb-4 ${hanken.className}`}>
              Sites Web & Landing Pages
            </h2>
            <p className={`text-[#444651] text-sm sm:text-base mb-6 leading-relaxed ${inter.className}`}>
              Nous concevons des interfaces modernes qui captent l'attention et convertissent vos visiteurs en clients.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {['Responsive Design', 'SEO Avancé', 'Haute Performance', 'UX/UI Stratégique'].map((point, i) => (
                <div key={i} className={`flex items-center gap-2 text-[#444651] text-sm ${inter.className}`}>
                  <span className="w-5 h-5 rounded-full border-2 border-[#052E78] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#052E78] text-xs">✓</span>
                  </span>
                  {point}
                </div>
              ))}
            </div>
          </div>
<div className="flex-1 relative w-full min-h-[200px] sm:h-[320px] rounded-2xl overflow-hidden">            <Image src="/website.png" alt="Sites Web" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-4" />
          </div>
        </div>
      </section>

      {/* Service 2 — E-commerce */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row-reverse items-center gap-10 sm:gap-16">
          <div className="flex-1">
            <div className="w-12 h-12 bg-[#052E78] rounded-xl flex items-center justify-center text-2xl mb-4">🛒</div>
            <h2 className={`text-2xl sm:text-3xl font-bold text-[#052E78] mb-4 ${hanken.className}`}>
              Solutions E-commerce
            </h2>
            <p className={`text-[#444651] text-sm sm:text-base mb-6 leading-relaxed ${inter.className}`}>
              Vendez vos produits en ligne avec une plateforme sécurisée et facile à gérer.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { icon: '🔒', titre: 'Paiement sécurisé', desc: 'Intégration de passerelles locales.' },
                { icon: '📦', titre: 'Gestion de stock', desc: 'Suivi automatisé en temps réel.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-[#EFF4FF] rounded-xl px-4 py-3">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className={`text-[#052E78] font-semibold text-sm ${hanken.className}`}>{item.titre}</p>
                    <p className={`text-[#444651] text-xs ${inter.className}`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 relative w-full min-h-[200px] sm:h-[320px] bg-[#EFF4FF] rounded-2xl overflow-hidden">
            <Image src="/ecommerce.png" alt="E-commerce" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-4" />
          </div>
        </div>
      </section>

      {/* Service 3 — Apps Mobiles */}
      <section className="bg-[#EFF4FF] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-10 sm:gap-16">
          <div className="flex-1">
            <div className="w-12 h-12 bg-[#052E78] rounded-xl flex items-center justify-center text-2xl mb-4">📱</div>
            <h2 className={`text-2xl sm:text-3xl font-bold text-[#052E78] mb-4 ${hanken.className}`}>
              Applications Mobiles
            </h2>
            <p className={`text-[#444651] text-sm sm:text-base mb-6 leading-relaxed ${inter.className}`}>
              Une présence mobile native ou multiplateforme pour rester proche de vos utilisateurs.
            </p>
            <div className="flex flex-wrap gap-3">
              {['iOS', 'Android', 'Flutter'].map((tag, i) => (
                <span key={i} className={`bg-white border border-[#052E78]/20 text-[#052E78] text-sm px-4 py-1.5 rounded-full ${inter.className}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
<div className="flex-1 relative w-full min-h-[200px] sm:h-[320px] rounded-2xl overflow-hidden">            <Image src="/appmobile.png" alt="Apps Mobiles" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-4" />
          </div>
        </div>
      </section>

      {/* Service 4 — Maintenance */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row-reverse items-center gap-10 sm:gap-16">
          <div className="flex-1">
            <div className="w-12 h-12 bg-[#052E78] rounded-xl flex items-center justify-center text-2xl mb-4">🔧</div>
            <h2 className={`text-2xl sm:text-3xl font-bold text-[#052E78] mb-4 ${hanken.className}`}>
              Maintenance & Support
            </h2>
            <p className={`text-[#444651] text-sm sm:text-base mb-6 leading-relaxed ${inter.className}`}>
              Votre infrastructure digitale mérite une attention constante. Nous assurons la pérennité de vos outils.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {['Sécurité proactive', 'Mises à jour', 'Monitoring', 'Support Prioritaire'].map((point, i) => (
                <div key={i} className={`flex items-center gap-2 text-[#444651] text-sm ${inter.className}`}>
                  <span className="w-5 h-5 rounded-full border-2 border-[#052E78] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#052E78] text-xs">✓</span>
                  </span>
                  {point}
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 relative w-full min-h-[200px] sm:h-[320px] bg-[#EFF4FF] rounded-2xl overflow-hidden">
            <Image src="/maintenance.png" alt="Maintenance" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-4" />
          </div>
        </div>
      </section>

      {/* Service 5 — Hébergement */}
<section className="bg-[#EFF4FF] py-16 sm:py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-10 sm:gap-16">
    <div className="flex-1">
      <div className="w-12 h-12 bg-[#052E78] rounded-xl flex items-center justify-center text-2xl mb-4">🖥️</div>
      <h2 className={`text-2xl sm:text-3xl font-bold text-[#052E78] mb-4 ${hanken.className}`}>
        Hébergement Web
      </h2>
      <p className={`text-[#444651] text-sm sm:text-base mb-6 leading-relaxed ${inter.className}`}>
        Un service d'hébergement exclusivement réservé à nos clients. Profitez d'une infrastructure fiable, rapide et sécurisée pour héberger votre site ou application.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {['Haute disponibilité', 'SSL inclus', 'Sauvegardes automatiques', 'Support dédié'].map((point, i) => (
          <div key={i} className={`flex items-center gap-2 text-[#444651] text-sm ${inter.className}`}>
            <span className="w-5 h-5 rounded-full border-2 border-[#052E78] flex items-center justify-center flex-shrink-0">
              <span className="text-[#052E78] text-xs">✓</span>
            </span>
            {point}
          </div>
        ))}
      </div>
    </div>
<div className="flex-1 relative w-full min-h-[200px] sm:h-[320px] rounded-2xl overflow-hidden">      <Image src="/hebergement.png" alt="Hébergement Web" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain" />
    </div>
  </div>
</section>
<CTAServices />
    </main>
  );
}