"use client";

import { useEffect, useState } from "react";

export default function AdminPortfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch("/api/admin/portfolio");

        if (!response.ok) {
          throw new Error("Impossible de récupérer les projets.");
        }

        const data = await response.json();

        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erreur Portfolio :", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return (
    <div className="min-h-screen bg-[#E5EEFF] p-8">
      <h1 className="text-3xl font-bold text-[#052E78] mb-8">
        Gestion du Portfolio
      </h1>

      {loading ? (
        <p className="text-[#444651]">
          Chargement...
        </p>
      ) : projects.length === 0 ? (
        <div className="bg-white rounded-2xl p-6">
          <p className="text-[#444651]">
            Aucun projet pour le moment.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="border-b border-gray-100 py-4"
            >
              <p className="font-semibold text-[#052E78]">
                {project.titre}
              </p>

              <p className="text-sm text-[#444651]">
                {project.categorie}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}