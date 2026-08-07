"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Hanken_Grotesk, Inter } from "next/font/google";

import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";
import StatsCards from "./StatsCards";
import { useSearchParams } from "next/navigation";
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

useEffect(() => {
  async function loadDashboardData() {
    try {
      const [projectsResponse, testimonialsResponse] = await Promise.all([
        fetch("/api/admin/portfolio"),
        fetch("/api/admin/temoignages"),
      ]);

      if (!projectsResponse.ok || !testimonialsResponse.ok) {
        throw new Error("Impossible de charger les données.");
      }

      const projectsData = await projectsResponse.json();
      const testimonialsData = await testimonialsResponse.json();

      setProjects(Array.isArray(projectsData) ? projectsData : []);
      setTestimonials(
        Array.isArray(testimonialsData) ? testimonialsData : []
      );
    } catch (error) {
      console.error("Erreur chargement dashboard :", error);
      setProjects([]);
      setTestimonials([]);
    }
  }

  loadDashboardData();
}, []);

  return (
    <div className="flex min-h-screen bg-[#E5EEFF]">
      <Sidebar />

      <main className="flex-1 ml-64">
        <AdminHeader title="Tableau de bord" />

        <div className="p-8 space-y-8">
          {/* Statistiques */}
          <StatsCards
            projectsCount={projects.length}
            testimonialsCount={testimonials.length}
          />

          {/* Projets + Actions rapides */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* Derniers projets */}
            <section className="xl:col-span-2 bg-white rounded-2xl shadow-[0_0_15px_rgba(5,46,120,0.08)] overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <h2
                  className={`text-[#052E78] font-semibold text-lg ${hanken.className}`}
                >
                  Dernières activités Portfolio
                </h2>

                <Link
                  href="/admin/portfolio"
                  className={`text-[#22C55E] text-sm font-medium hover:underline ${inter.className}`}
                >
                  Voir tout
                </Link>
              </div>

              <div className="p-6">
                {projects.length > 0 ? (
                  <div className="space-y-4">
                    {projects.slice(0, 3).map((project, index) => (
                      <div
                        key={project._id || index}
                        className="flex items-center gap-4"
                      >
                      
                   {/* Image */}
<div className="w-14 h-14 rounded-lg overflow-hidden bg-[#E5EEFF] shrink-0">
  {project.image ? (
    <img
      src={project.image}
      alt={project.titre || "Projet"}
      className="w-full h-full object-cover"
      onError={(e) => e.target.style.display = 'none'}
    />
  ) : null}
</div>

                        {/* Infos */}
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-[#052E78] font-semibold text-sm truncate ${hanken.className}`}
                          >
                            {project.titre || "Projet sans titre"}
                          </p>

                          <p
                            className={`text-[#444651] text-xs mt-1 ${inter.className}`}
                          >
                            {project.categorie || "Non catégorisé"}
                          </p>
                        </div>

                        {/* Statut */}
                        <span
                          className={`bg-green-100 text-green-600 px-2.5 py-1 rounded-full text-xs font-medium ${inter.className}`}
                        >
                          ACTIF
                        </span>

                        {/* Modifier */}
                        <Link
                          href={`/admin/portfolio?edit=${project._id}`}
                          className={`text-[#052E78] text-sm ${inter.className}`}
                        >
                          Modifier
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p
                    className={`text-sm text-[#444651] ${inter.className}`}
                  >
                    Aucun projet pour le moment.
                  </p>
                )}
              </div>
            </section>

            {/* Actions rapides */}
            <section className="bg-white rounded-2xl shadow-[0_0_15px_rgba(5,46,120,0.08)] p-6 h-fit">
              <h2
                className={`text-[#052E78] font-semibold text-lg mb-5 ${hanken.className}`}
              >
                Actions rapides
              </h2>

              <div className="space-y-3">
                <Link
                  href="/admin/portfolio?mode=create"
                  className={`flex items-center gap-3 w-full bg-[#E5EEFF] hover:bg-[#D9E6FF] text-[#052E78] rounded-xl px-4 py-3 transition ${inter.className}`}
                >
                  <span className="text-[#22C55E] text-xl">+</span>
                  Nouveau projet
                </Link>

                <Link
                  href="/admin/temoignages?mode=create"
                  className={`flex items-center gap-3 w-full bg-[#E5EEFF] hover:bg-[#D9E6FF] text-[#052E78] rounded-xl px-4 py-3 transition ${inter.className}`}
                >
                  <span className="text-[#22C55E] text-xl">+</span>
                  Nouveau témoignage
                </Link>
              </div>
            </section>
          </div>

          {/* Derniers témoignages */}
          <section className="bg-white rounded-2xl shadow-[0_0_15px_rgba(5,46,120,0.08)] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2
                className={`text-[#052E78] font-semibold text-lg ${hanken.className}`}
              >
                Derniers témoignages
              </h2>

              <Link
                href="/admin/temoignages"
                className={`text-[#22C55E] text-sm font-medium hover:underline ${inter.className}`}
              >
                Voir tout
              </Link>
            </div>

            <div className="p-6">
              {testimonials.length > 0 ? (
                <div className="space-y-4">
                  {testimonials.slice(0, 3).map((testimonial, index) => (
                    <div
                      key={testimonial._id || index}
                      className="bg-[#E5EEFF] rounded-xl p-5"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-[#052E78] text-white flex items-center justify-center font-semibold text-sm">
                          {testimonial.nom
                            ?.split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase() || "AC"}
                        </div>

                        <div>
                          <p
                            className={`text-[#052E78] font-semibold text-sm ${hanken.className}`}
                          >
                            {testimonial.nom || "Client"}
                          </p>

                          <p
                            className={`text-[#444651] text-xs ${inter.className}`}
                          >
                            {testimonial.entreprise ||
                              testimonial.poste ||
                              "Client CREATIC"}
                          </p>
                        </div>
                      </div>

                      <p
                        className={`text-[#444651] text-sm italic leading-relaxed ${inter.className}`}
                      >
                        "{testimonial.citation || "Aucun commentaire."}"
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p
                  className={`text-sm text-[#444651] ${inter.className}`}
                >
                  Aucun témoignage pour le moment.
                </p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}