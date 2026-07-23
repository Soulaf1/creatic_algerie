"use client";
import { useState } from "react";

import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600"],
});

export default function ContactSection() {
    const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const [loading, setLoading] = useState(false);
const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      alert("✅ Votre message a été envoyé !");

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } else {
      alert("❌ Une erreur est survenue.");
    }
  } catch (error) {
    console.error(error);
    alert("❌ Impossible d'envoyer le message.");
  }

  setLoading(false);
};
  return (
    <section className="bg-[#EFF4FF] py-16 lg:py-20">
     <div className="max-w-[110rem] mx-auto px-4 lg:px-6">
<div className="grid grid-cols-1 lg:grid-cols-[2fr_0.95fr] gap-10 items-start">

          {/* ===================== FORMULAIRE ===================== */}

          <div className="bg-white rounded-3xl shadow-sm p-8">

            <form
             onSubmit={handleSubmit}
             className="space-y-6"
                >           

              {/* Nom + Email */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>

                  <label
                    className={`block text-sm text-[#444651] mb-2 ${inter.className}`}
                  >
                    Nom complet
                  </label>

                 <input
                 type="text"
                 name="name"
                 value={formData.name}
                 onChange={(e) =>
                 setFormData({ ...formData, name: e.target.value })
                    }
  placeholder="Ex: Mohamed Amine"
  className={`w-full rounded-lg border border-[#C4C6D3] bg-[#F4F7FF] px-4 py-4 text-[#444651] placeholder:text-[#6B7280] outline-none transition-all duration-300 focus:border-[#274690] focus:ring-2 focus:ring-[#274690]/10 ${inter.className}`}
/>

                </div>

                <div>

                  <label
                    className={`block text-sm text-[#444651] mb-2 ${inter.className}`}
                  >
                    Email professionnel
                  </label>

                  <input
                    type="email"
                    placeholder="m.amine@entreprise.dz"
                    className={`w-full rounded-lg border border-[#C4C6D3] bg-[#F4F7FF] px-4 py-4 text-[#444651] placeholder:text-[#6B7280] outline-none transition-all duration-300 focus:border-[#274690] focus:ring-2 focus:ring-[#274690]/10 ${inter.className}`}
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                     setFormData({ ...formData, email: e.target.value })
                    }
                  />

                </div>

              </div>

              {/* Téléphone */}

              <div>

                <label
                  className={`block text-sm text-[#444651] mb-2 ${inter.className}`}
                >
                  Téléphone
                </label>

                <input
                  type="text"
                  placeholder="+213 (0) ..."
                  className={`w-full rounded-lg border border-[#C4C6D3] bg-[#F4F7FF] px-4 py-4 text-[#444651] placeholder:text-[#6B7280] outline-none transition-all duration-300 focus:border-[#274690] focus:ring-2 focus:ring-[#274690]/10 ${inter.className}`}
               name="phone"
                value={formData.phone}
                onChange={(e) =>
                 setFormData({ ...formData, phone: e.target.value })
                    }
 />

              </div>

              {/* Message */}

              <div>

                <label
                  className={`block text-sm text-[#444651] mb-2 ${inter.className}`}
                >
                  Votre message
                </label>

                <textarea
                  rows={4}
                  placeholder="Dites-nous en plus sur vos objectifs et vos besoins techniques..."
                  className={`w-full resize-none rounded-lg border border-[#C4C6D3] bg-[#F4F7FF] px-4 py-4 text-[#444651] placeholder:text-[#6B7280] outline-none transition-all duration-300 focus:border-[#274690] focus:ring-2 focus:ring-[#274690]/10 ${inter.className}`}
                  name="message"
                  value={formData.message}
                  onChange={(e) =>
                 setFormData({ ...formData, message: e.target.value })
                }/>

              </div>

              {/* Bouton */}

             <button
  type="submit"
  disabled={loading}
  className={`inline-flex items-center gap-3 rounded-xl bg-[#052E78] px-8 py-4 text-white font-medium transition-all duration-300 hover:bg-[#041f52] hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed ${poppins.className}`}
>
  {loading ? "Envoi..." : "Envoyer le message"}

  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 12h14M13 5l7 7-7 7"
    />
  </svg>
</button>

            </form>

          </div>

          {/* ===================== CARTE COORDONNÉES ===================== */}
{/* ===================== CARTE COORDONNÉES ===================== */}

<div className="relative overflow-hidden rounded-3xl bg-[#274690] shadow-lg self-start">
  {/* Décoration */}

  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border-[0.8rem] border-[#3B5BA5]/30" />
  <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border-[0.5rem] border-[#3B5BA5]/30" />

<div className="px-10 pt-8 pb-8 flex flex-col">
    <h2
      className={`text-white text-4xl font-semibold mb-10 ${poppins.className}`}
    >
      Coordonnées
    </h2>

    {/* Téléphone */}

    <div className="flex gap-4 mb-8">

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#9EF5BC"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 2H9a2 2 0 00-2 2v16a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2z"
          />
        </svg>

      </div>

      <div>

        <p
          className={`text-[#A0B8FF] text-sm mb-1 ${inter.className}`}
        >
          Appelez-nous
        </p>

        <h3
          className={`text-white text-2xl font-semibold leading-tight ${poppins.className}`}
        >
          +213 (0) 550 00 00 00
        </h3>

      </div>

    </div>

    {/* Email */}

    <div className="flex gap-4 mb-8">

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#9EF5BC"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 4h16v16H4z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 7l8 6 8-6"
          />
        </svg>

      </div>

      <div>

        <p
          className={`text-[#A0B8FF] text-sm mb-1 ${inter.className}`}
        >
          E-mail
        </p>

        <h3
          className={`text-white text-[2rem] leading-tight font-semibold break-words ${poppins.className}`}
        >
          contact@creatic-
          <br />
          algerie.dz
        </h3>

      </div>

    </div>

    {/* Bureau */}

    <div className="flex gap-4">

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#9EF5BC"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21s-6-4.35-6-10a6 6 0 1112 0c0 5.65-6 10-6 10z"
          />
          <circle
            cx="12"
            cy="11"
            r="2"
          />
        </svg>

      </div>

      <div>

        <p
          className={`text-[#A0B8FF] text-sm mb-1 ${inter.className}`}
        >
          Bureau
        </p>

        <h3
          className={`text-white text-2xl font-semibold leading-tight ${poppins.className}`}
        >
          Hydra, Alger,
          <br />
          Algérie
        </h3>

      </div>

    </div>

    {/* Bouton */}

    <div className="mt-auto pt-10">

      <button
        className={`w-full rounded-xl bg-[#052E78] py-4 text-white font-medium transition hover:bg-[#04255f] ${poppins.className}`}
      >
        💬 Discuter sur WhatsApp
      </button>

    </div>

  </div>

</div>

        </div>

      </div>
    </section>
  );
}