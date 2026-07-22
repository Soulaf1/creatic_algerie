
'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";

const CARDS_PER_PAGE = 3;

export default function Portfolio() {
  const [filtreActif, setFiltreActif] = useState("Tous");
  const [page, setPage] = useState(0);
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        setProjets(data);
        setLoading(false);
      });
  }, []);

  const projetsFiltres = filtreActif === "Tous"
    ? projets
    : projets.filter(p => p.categorie === filtreActif);

  const totalPages = Math.ceil(projetsFiltres.length / CARDS_PER_PAGE);
  const projetsPagines = projetsFiltres.slice(
    page * CARDS_PER_PAGE,
    (page + 1) * CARDS_PER_PAGE
  );

  const handleFiltre = (f) => {
    setFiltreActif(f);
    setPage(0);
  };

  if (loading) return <div className="text-center py-20 text-[#052E78]">Chargement...</div>;

  return (
    <main>

      {/* HERO */}
     <section className="relative overflow-hidden min-h-[500px] md:min-h-[600px]">
  <Image
    src="/portfoliopic.png"
    alt="Nos réalisations"
    fill
    priority
    className="object-cover object-center pointer-events-none"
  />

  <div className="relative z-20 px-4 sm:px-10 md:px-16 py-8 sm:py-12 md:py-20 flex flex-col justify-center min-h-[500px] md:min-h-[600px] max-w-xl">
    <h1
      className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#052E78] tracking-tight leading-tight mb-3 sm:mb-4 md:mb-6"
      style={{ fontFamily: "var(--font-poppins)" }}
    >
      Nos Réalisations
    </h1>

    <p
      className="hidden sm:block text-sm md:text-base text-[#444651] leading-relaxed mb-5 md:mb-8"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      Découvrez comment nous accompagnons les leaders du marché algérien
      dans leur transformation numérique à travers des solutions
      d'ingénierie logicielle de haute précision.
    </p>

    <div className="flex flex-wrap gap-2 md:gap-3">
      {["Tous", "Web", "Mobile", "E-commerce"].map((f) => (
        <button
          key={f}
          onClick={() => handleFiltre(f)}
          className={`whitespace-nowrap text-xs sm:text-sm font-medium px-3 sm:px-5 py-1.5 sm:py-2 rounded-2xl transition-all duration-200 border-none cursor-pointer ${
            filtreActif === f
              ? "bg-[#052E78] text-white"
              : "bg-[#E0E9F9] text-[#444651]"
          }`}
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {f}
        </button>
      ))}
    </div>
  </div>

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

      {/* CARTES */}
      <section className="px-4 sm:px-10 md:px-16 py-12 md:py-16 bg-white">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projetsPagines.map((projet) => (
            <div
  key={projet._id}
  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-xl transition-all duration-300 flex flex-col max-w-[430px] mx-auto w-full"
>
              {/* IMAGE */}
              <div className="relative bg-gray-100 h-44 md:h-52 overflow-hidden">
                <img
                  src={projet.image}
                  alt={projet.titre}
                  className="w-full h-full object-cover"
                />
                {/* BADGE CATEGORIE */}
                <div className="absolute top-3 left-3 bg-white rounded-full px-3 py-1 flex items-center gap-1.5 border border-gray-200 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#052E78]"></span>
                  <span className="text-[10px] font-bold text-[#052E78] tracking-wider"
                    style={{ fontFamily: "var(--font-poppins)" }}>
                    {projet.categorie.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* CONTENU */}
              <div className="p-5 flex flex-col flex-1">

                {/* TITRE + ICONE */}
                <div className="flex justify-between items-start mb-1">
                  <h3
                    className="text-xl md:text-2xl font-bold text-[#052E78]"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {projet.titre}
                  </h3>
                 <div className="w-12 h-12 rounded-xl bg-[#EEF2F7] flex items-center justify-center flex-shrink-0 ml-2">                    {projet.categorie === "E-commerce" ? "🛒" : projet.categorie === "Mobile" ? "💳" : "🏭"}
                  </div>
                </div>

                {/* SECTEUR */}
                <p className="text-sm text-gray-700 mb-3"
                  style={{ fontFamily: "var(--font-inter)" }}>
                  {projet.secteur}
                </p>

                {/* SEPARATEUR */}
                <hr className="border-gray-200 mb-4" />

                {/* PROBLEME */}
                <p className="text-[11px] font-bold text-[#052E78] tracking-widest mb-1"
                  style={{ fontFamily: "var(--font-poppins)" }}>
                  PROBLÈME
                </p>
                <p className="text-sm text-[#444651] mb-3 leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)" }}>
                  {projet.problematique}
                </p>

                {/* SOLUTION */}
                <p className="text-[11px] font-bold text-[#052E78] tracking-widest mb-1"
                  style={{ fontFamily: "var(--font-poppins)" }}>
                  SOLUTION
                </p>
                <p className="text-sm text-[#444651] mb-4 leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)" }}>
                  {projet.solution}
                </p>

                {/* IMPACT */}
<div className="mt-auto rounded-xl px-4 py-3 flex justify-between items-center" style={{ backgroundColor: "#DAE1FF33", border: "1px solid #DAE1FF" }}>  <span className="text-sm font-bold text-[#052E78] flex items-center gap-2"
    style={{ fontFamily: "var(--font-poppins)" }}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#052E78" strokeWidth="2.5">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
      <polyline points="16 7 22 7 22 13"/>
    </svg>
    Impact Mesurable
  </span>
  <span className="text-sm font-bold text-[#052E78]"
    style={{ fontFamily: "var(--font-poppins)" }}>
    {projet.resultat}
  </span>
</div>

              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-3 h-3 rounded-full transition-all duration-200 border-none cursor-pointer
                  ${page === i ? "bg-[#052E78] w-6" : "bg-[#E0E9F9]"}`}
              />
            ))}
          </div>
        )}

      </section>
      {/* CTA SECTION */}
<section className="bg-[#F0F4FF] py-12 md:py-20">
  
  <div className="bg-white py-12 md:py-16 px-6 text-center w-full">
    
    <h2
      className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#052E78] mb-4"
      style={{ fontFamily: "var(--font-poppins)" }}
    >
      Votre projet mérite l'excellence.
    </h2>

    <p
      className="text-sm md:text-base text-[#444651] mb-8 max-w-lg mx-auto leading-relaxed"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      Transformons ensemble vos défis commerciaux en avantages technologiques
      compétitifs avec CREATIC-ALGERIE.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <button
        className="px-8 py-3 bg-[#052E78] text-white font-semibold rounded-md hover:bg-[#041f52] transition-all duration-200 whitespace-nowrap"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        Demander un devis
      </button>
      <button
        className="px-8 py-3 bg-transparent text-[#052E78] font-semibold rounded-md border-2 border-[#052E78] hover:bg-[#052E78] hover:text-white transition-all duration-200 whitespace-nowrap"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        Voir nos services
      </button>
    </div>

  </div>

</section>

    </main>
  );
}