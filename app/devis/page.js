'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Hanken_Grotesk, Poppins, Inter } from 'next/font/google';
import { Zap, FileText, Users, Phone, MessageCircle, Mail } from 'lucide-react';

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

export default function DevisPage() {
  const [cahierDesCharges, setCahierDesCharges] = useState(false);
  const [fichier, setFichier] = useState(null);

  return (
    <main className="bg-white py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Titre */}
        <div className="mb-8">
          <div className={`inline-flex items-center gap-2 border border-[#444651] text-green-500 text-xs px-3 py-1.5 rounded-full mb-3 ${inter.className}`}>
            ⏱ Réponse sous 24-48h
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold text-[#052E78] mb-2 ${hanken.className}`}>
            Demandez votre devis gratuit
          </h1>
          <p className={`text-[#444651] text-sm sm:text-base ${inter.className}`}>
            Devis personnalisé et sans engagement. Partagez-nous vos ambitions digitales et recevez une proposition technique et financière détaillée.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Formulaire */}
          <div className="flex-1 flex flex-col gap-6">

            {/* Informations de contact */}
            <div className="border border-gray-200 rounded-2xl p-6">
              <h2 className={`text-[#052E78] font-bold text-lg mb-6 border-l-4 border-[#052E78] pl-3 ${hanken.className}`}>
                Informations de contact
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`text-[#052E78] text-sm font-medium mb-1 block ${inter.className}`}>Nom et prénom *</label>
                  <input type="text" placeholder="Ex: Mohamed Amine" className={`w-full bg-[#E5EEFF] border-none rounded-lg px-4 py-2.5 text-sm text-[#444651] focus:outline-none focus:ring-2 focus:ring-[#052E78] ${inter.className}`} />
                </div>
                <div>
                  <label className={`text-[#052E78] text-sm font-medium mb-1 block ${inter.className}`}>Entreprise / Organisation</label>
                  <input type="text" placeholder="Nom de votre société" className={`w-full bg-[#E5EEFF] border-none rounded-lg px-4 py-2.5 text-sm text-[#444651] focus:outline-none focus:ring-2 focus:ring-[#052E78] ${inter.className}`} />
                </div>
                <div>
                  <label className={`text-[#052E78] text-sm font-medium mb-1 block ${inter.className}`}>Téléphone *</label>
                  <input type="tel" placeholder="0500 XX XX XX" className={`w-full bg-[#E5EEFF] border-none rounded-lg px-4 py-2.5 text-sm text-[#444651] focus:outline-none focus:ring-2 focus:ring-[#052E78] ${inter.className}`} />
                </div>
                <div>
                  <label className={`text-[#052E78] text-sm font-medium mb-1 block ${inter.className}`}>Email *</label>
                  <input type="email" placeholder="contact@exemple.com" className={`w-full bg-[#E5EEFF] border-none rounded-lg px-4 py-2.5 text-sm text-[#444651] focus:outline-none focus:ring-2 focus:ring-[#052E78] ${inter.className}`} />
                </div>
                <div className="sm:col-span-2">
                  <label className={`text-[#052E78] text-sm font-medium mb-1 block ${inter.className}`}>Wilaya / Ville</label>
                  <input type="text" placeholder="Ex: Alger, Oran..." className={`w-full bg-[#E5EEFF] border-none rounded-lg px-4 py-2.5 text-sm text-[#444651] focus:outline-none focus:ring-2 focus:ring-[#052E78] ${inter.className}`} />
                </div>
              </div>
            </div>

            {/* Détails du projet */}
            <div className="border border-gray-200 rounded-2xl p-6">
              <h2 className={`text-[#052E78] font-bold text-lg mb-6 border-l-4 border-[#052E78] pl-3 ${hanken.className}`}>
                Détails du projet
              </h2>
              <div className="flex flex-col gap-4">

                {/* Type + Budget sur la même ligne */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`text-[#052E78] text-sm font-medium mb-1 block ${inter.className}`}>Type de service *</label>
                    <select className={`w-full bg-[#E5EEFF] border-none rounded-lg px-4 py-2.5 text-sm text-[#444651] focus:outline-none focus:ring-2 focus:ring-[#052E78] ${inter.className}`}>
                      <option>Création de site web</option>
                      <option>Refonte de site existant</option>
                      <option>E-commerce</option>
                      <option>Plateforme spécifique (métier)</option>
                      <option>Application mobile (Android, iOS)</option>
                      <option>Marketing digital</option>
                      <option>SEO / Référencement</option>
                      <option>Identité visuelle / Branding</option>
                      <option>Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className={`text-[#052E78] text-sm font-medium mb-1 block ${inter.className}`}>Budget estimatif</label>
                    <select className={`w-full bg-[#E5EEFF] border-none rounded-lg px-4 py-2.5 text-sm text-[#444651] focus:outline-none focus:ring-2 focus:ring-[#052E78] ${inter.className}`}>
                      <option>Moins de 100 000 DA</option>
                      <option>100 000 – 200 000 DA</option>
                      <option>200 000 – 400 000 DA</option>
                      <option>Plus de 400 000 DA</option>
                      <option>À définir avec l'agence</option>
                    </select>
                  </div>
                </div>

                {/* Délai */}
                <div>
                  <label className={`text-[#052E78] text-sm font-medium mb-1 block ${inter.className}`}>Délai souhaité</label>
                  <select className={`w-full bg-[#E5EEFF] border-none rounded-lg px-4 py-2.5 text-sm text-[#444651] focus:outline-none focus:ring-2 focus:ring-[#052E78] ${inter.className}`}>
                    <option>Urgent (moins d'1 mois)</option>
                    <option>1-3 mois</option>
                    <option>Flexible</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className={`text-[#052E78] text-sm font-medium mb-1 block ${inter.className}`}>Description du projet *</label>
                  <textarea
                    rows={5}
                    placeholder="Décrivez votre projet, vos objectifs, et tout élément qui nous aidera à mieux comprendre votre besoin..."
                    className={`w-full bg-[#E5EEFF] border-none rounded-lg px-4 py-2.5 text-sm text-[#444651] focus:outline-none focus:ring-2 focus:ring-[#052E78] resize-none ${inter.className}`}
                  />
                </div>

                {/* Cahier des charges */}
                <div>
                  <label className={`flex items-center gap-2 cursor-pointer ${inter.className}`}>
                    <input
                      type="checkbox"
                      checked={cahierDesCharges}
                      onChange={(e) => setCahierDesCharges(e.target.checked)}
                      className="w-4 h-4 accent-[#052E78]"
                    />
                    <span className={`text-[#444651] text-sm ${inter.className}`}>
                      Avez-vous déjà un cahier des charges ?
                    </span>
                  </label>
                  {cahierDesCharges && (
                    <div className="mt-3">
                      <label className={`block text-[#052E78] text-sm font-medium mb-1 ${inter.className}`}>Joindre votre fichier</label>
                      <input
                        type="file"
                        onChange={(e) => setFichier(e.target.files[0])}
                        className={`w-full bg-[#E5EEFF] border border-dashed border-[#052E78] rounded-lg px-4 py-3 text-sm text-[#444651] cursor-pointer ${inter.className}`}
                      />
                      {fichier && (
                        <p className={`text-green-500 text-xs mt-1 ${inter.className}`}>✓ {fichier.name}</p>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Bouton + texte réassurance */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className={`text-[#444651] text-xs ${inter.className}`}>
                🔒 Vos informations restent confidentielles. Aucun engagement de votre part.
              </p>
              <button className={`bg-[#052E78] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#041f52] transition-all duration-300 hover:scale-105 whitespace-nowrap ${poppins.className}`}>
                Envoyer ma demande
              </button>
            </div>

          </div>

          {/* Sidebar droite */}
          <div className="lg:w-80 flex flex-col gap-6">

  {[
  { icon: <Zap size={16} />, titre: 'Réponse rapide', desc: 'Nous répondons à chaque demande en moins de 48 heures.' },
  { icon: <FileText size={16} />, titre: 'Devis 100% personnalisé', desc: 'Pas de pack standard, une solution adaptée à votre budget.' },
  { icon: <Users size={16} />, titre: 'Équipe locale & disponible', desc: 'Rencontrez nos experts dans tous les bureaux à Alger.' },
].map((item, i) => (
  <div key={i} className="flex items-start gap-3 ">
    <span className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center text-green-500 flex-shrink-0">
      {item.icon}
    </span>
    <div>
      <p className={`text-[#052E78] font-semibold text-sm ${hanken.className}`}>{item.titre}</p>
      <p className={`text-[#444651] text-xs ${inter.className}`}>{item.desc}</p>
    </div>
  </div>
))}

 {/* Besoin d'aide */}
<div className="bg-[#052E78] rounded-2xl p-6">
  <h3 className={`text-white font-bold text-base mb-4 ${hanken.className}`}>
    Besoin d'aide ?
  </h3>
  <div className="flex flex-col gap-3 mb-4">
    {[
      { icon: <Phone size={16} />, text: '+213 (0) 23 00 00 00' },
      { icon: <MessageCircle size={16} />, text: 'WhatsApp Direct' },
      { icon: <Mail size={16} />, text: 'contact@creatic-algerie.com' },
    ].map((item, i) => (
      <div key={i} className={`flex items-center gap-2 text-white text-sm ${inter.className}`}>
        <span className="text-white">{item.icon}</span>
        {item.text}
      </div>
    ))}
  </div>
  <Link
    href="/portfolio"
    className={`block text-center border-2 border-white text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-white hover:text-[#052E78] transition-colors mt-4 ${poppins.className}`}
  >
    Voir nos réalisations
  </Link>
</div>

          </div>

        </div>
      </div>
    </main>
  );
}