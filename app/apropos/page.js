import Image from 'next/image';
import Link from 'next/link';
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

export default function AProposPage() {
  return (
    <main>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[500px] md:min-h-[600px]">

        {/* Image de fond */}
        <Image
          src="/herosection.png"
          alt="À propos CREATIC-ALGERIE"
          fill
          className="object-cover object-center pointer-events-none"
          priority
        />

        {/* Overlay mobile uniquement */}
        <div className="absolute inset-0 bg-[#05102E]/50 pointer-events-none md:hidden" />

        {/* Contenu */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-32 flex flex-col justify-center min-h-[500px] md:min-h-[600px]">

          {/* Badge */}
          <div className={`inline-flex items-center gap-2 border border-white/30 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full mb-4 sm:mb-6 w-fit ${hanken.className}`}>
            NOTRE VISION
          </div>

          {/* Titre H1 — Hanken */}
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4 sm:mb-6 max-w-xl ${hanken.className}`}>
            Accompagner la transformation digitale des PME algériennes.
          </h1>

          {/* Sous-titre — Inter */}
          <p className={`text-gray-300 text-sm sm:text-base mb-6 sm:mb-8 max-w-md leading-relaxed ${inter.className}`}>
            Chez CREATIC-ALGERIE, nous croyons en un avenir numérique inclusif et performant pour chaque entreprise en Algérie. Notre expertise combine standards internationaux et compréhension fine du marché local pour des résultats concrets.
          </p>

          {/* Bouton — Poppins */}
          <Link
            href="/devis"
            className={`inline-block w-fit bg-[#052E78] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-[#041f52] transition-all duration-300 hover:scale-105 ${poppins.className}`}
          >
            Demander un devis
          </Link>

        </div>

        {/* Vague blanche */}
        <svg
          className="absolute bottom-0 left-0 w-full h-[120px] sm:h-[170px] z-10 pointer-events-none"
          viewBox="0 0 1440 170"
          preserveAspectRatio="none"
        >
          <path fill="#fff" d="M0,80 C180,140 350,150 540,105 C760,55 930,55 1120,105 C1270,145 1370,135 1440,95 L1440,170 L0,170 Z" />
        </svg>

      </section>

      {/* Section Méthodologie */}
<section className="bg-white py-16 sm:py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">

    {/* Titre */}
    <div className="text-center mb-8">
      <h2 className={`text-2xl sm:text-3xl font-bold text-[#052E78] mb-3 ${hanken.className}`}>
        Notre Méthodologie
      </h2>
      <p className={`text-[#444651] text-sm sm:text-base max-w-xl mx-auto ${inter.className}`}>
        L'approche structurée de CREATIC-ALGERIE garantit la réussite de votre projet digital à travers 6 étapes clés.
      </p>
    </div>

    {/* Étapes avec ligne pointillée */}
    <div className="hidden md:block relative">


   <div className="grid grid-cols-6 gap-4">
  {[
    { icon: '🔍', titre: 'CADRAGE', desc: 'Analyse approfondie de vos besoins et définition de la stratégie.', top: true },
    { icon: '✏️', titre: 'DESIGN', desc: "Conception de l'expérience utilisateur et interfaces visuelles.", top: false },
    { icon: '💻', titre: 'DÉVELOPPEMENT', desc: 'Codage robuste et intégration des fonctionnalités sur mesure.', top: true },
    { icon: '⚡', titre: 'TESTS', desc: 'Vérification rigoureuse des performances et de la sécurité.', top: false },
    { icon: '🚀', titre: 'DÉPLOIEMENT', desc: "Mise en ligne sécurisée et configuration de l'environnement.", top: true },
    { icon: '🎧', titre: 'SUIVI', desc: 'Accompagnement post-lancement et maintenance évolutive.', top: false },
  ].map((etape, i) => (
    <div key={i} className={`flex flex-col items-center text-center ${etape.top ? 'justify-end' : 'justify-start mt-16'}`} style={{ minHeight: '280px' }}>
      {/* Icône toujours en premier */}
      <div className="w-14 h-14 bg-[#052E78] rounded-2xl flex items-center justify-center text-white text-xl z-10 relative mb-4">
        {etape.icon}
      </div>
      {/* Texte toujours en dessous */}
      <h3 className={`text-[#052E78] font-bold text-xs mb-1 ${hanken.className}`}>{etape.titre}</h3>
      <p className={`text-[#444651] text-xs leading-relaxed ${inter.className}`}>{etape.desc}</p>
    </div>
  ))}
</div>
    </div>

    {/* Mobile — version simple */}
    <div className="md:hidden flex flex-col gap-6">
      {[
        { icon: '🔍', titre: 'CADRAGE', desc: 'Analyse approfondie de vos besoins et définition de la stratégie.' },
        { icon: '✏️', titre: 'DESIGN', desc: "Conception de l'expérience utilisateur et interfaces visuelles." },
        { icon: '💻', titre: 'DÉVELOPPEMENT', desc: 'Codage robuste et intégration des fonctionnalités sur mesure.' },
        { icon: '⚡', titre: 'TESTS', desc: 'Vérification rigoureuse des performances et de la sécurité.' },
        { icon: '🚀', titre: 'DÉPLOIEMENT', desc: "Mise en ligne sécurisée et configuration de l'environnement." },
        { icon: '🎧', titre: 'SUIVI', desc: 'Accompagnement post-lancement et maintenance évolutive.' },
      ].map((etape, i) => (
        <div key={i} className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#052E78] rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0">
            {etape.icon}
          </div>
          <div>
            <h3 className={`text-[#052E78] font-bold text-sm mb-1 ${hanken.className}`}>{etape.titre}</h3>
            <p className={`text-[#444651] text-xs leading-relaxed ${inter.className}`}>{etape.desc}</p>
          </div>
        </div>
      ))}
    </div>

  </div>
</section>
{/* Section Témoignages */}
<section className="bg-[#E5EEFF] py-16 sm:py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">

    {/* Titre */}
    <div className="text-center mb-12">
      <h2 className={`text-2xl sm:text-3xl font-bold text-[#052E78] mb-3 ${hanken.className}`}>
        Ils nous font confiance
      </h2>
      <p className={`text-[#444651] text-sm sm:text-base max-w-xl mx-auto ${inter.className}`}>
        Des entreprises algériennes qui ont choisi CREATIC-ALGERIE pour transformer leur présence digitale.
      </p>
    </div>

    {/* Cartes */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {[
        {
          initiales: 'RL',
          couleur: 'bg-green-500',
          nom: 'Ryad Lamine',
          poste: 'CEO @ TechAlgs',
          citation: "L'approche structurelle de CREATIC est inégalée. Ils ont refondu notre plateforme avec une précision chirurgicale, respectant chaque délai annoncé.",
        },
        {
          initiales: 'SM',
          couleur: 'bg-green-500',
          nom: 'Sarah Mansouri',
          poste: 'Directrice Marketing',
          citation: "Un partenaire stratégique plus qu'un simple prestataire. Leur compréhension du marché algérien a fait toute la différence pour notre lancement digital.",
        },
        {
          initiales: 'KB',
          couleur: 'bg-green-500',
          nom: 'Karim Belkadi',
          poste: 'Fondateur @ BioZen',
          citation: "L'équipe a su traduire nos idées complexes en une interface fluide et intuitive. Les retours de nos clients sont excellents depuis la mise en ligne.",
        },
      ].map((temoignage, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-6 shadow-[0_0_20px_rgba(5,46,120,0.08)] hover:-translate-y-2 transition-transform duration-300"
        >
          {/* Auteur en premier */}
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 ${temoignage.couleur} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${hanken.className}`}>
              {temoignage.initiales}
            </div>
            <div>
              <p className={`text-[#052E78] font-bold text-sm ${hanken.className}`}>{temoignage.nom}</p>
              <p className={`text-[#444651] text-xs ${inter.className}`}>{temoignage.poste}</p>
            </div>
          </div>

          {/* Étoiles */}
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, j) => (
              <span key={j} className="text-yellow-400 text-sm">★</span>
            ))}
          </div>

          {/* Citation */}
          <p className={`text-[#444651] text-sm leading-relaxed italic ${inter.className}`}>
            "{temoignage.citation}"
          </p>

        </div>
      ))}
    </div>

  </div>
</section>

{/* Section CTA */}
<section className="bg-white py-16 sm:py-20">
  <div className="max-w-4xl mx-auto px-4 sm:px-6">
    <div className="bg-[#052E78] rounded-2xl px-6 sm:px-12 py-10 sm:py-14 text-center">

      <h2 className={`text-2xl sm:text-3xl font-bold text-white mb-3 ${hanken.className}`}>
        Prêt à transformer votre entreprise ?
      </h2>

      <p className={`text-white/80 text-sm mb-8 max-w-lg mx-auto leading-relaxed ${inter.className}`}>
        Discutons de votre projet et élaborons ensemble la stratégie digitale qui propulsera votre PME vers de nouveaux sommets.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/devis"
          className={`inline-block bg-white text-[#052E78] px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#E5EEFF] transition-all duration-300 hover:scale-105 ${poppins.className}`}
        >
          Demander un devis
        </Link>
        <Link
          href="/portfolio"
          className={`inline-block border-2 border-white text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-white hover:text-[#052E78] transition-all duration-300 ${poppins.className}`}
        >
          Voir nos réalisations
        </Link>
      </div>

    </div>
  </div>
</section>

    </main>
  );
}