"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Hanken_Grotesk, Inter } from "next/font/google";

import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";
import PortfolioForm from "./PortfolioForm";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function AdminPortfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // null = tableau
  // "create" = création
  // objet = modification
  const [editingProject, setEditingProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const searchParams = useSearchParams();
  async function loadProjects() {
    try {
      setLoading(true);

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

  useEffect(() => {
    loadProjects();
  }, []);

  function handleCreate() {
    setEditingProject(null);
    setShowForm(true);
  }

  function handleEdit(project) {
    setEditingProject(project);
    setShowForm(true);
  }

  function handleFormSuccess(savedProject) {
    setShowForm(false);
    setEditingProject(null);

    setProjects((current) => {
      const exists = current.some(
        (project) => project._id === savedProject._id
      );

      if (exists) {
        return current.map((project) =>
          project._id === savedProject._id ? savedProject : project
        );
      }

      return [savedProject, ...current];
    });
  }

  function handleCancel() {
    setShowForm(false);
    setEditingProject(null);
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer ce projet ?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/portfolio/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la suppression.");
      }

      setProjects((current) =>
        current.filter((project) => project._id !== id)
      );
    } catch (error) {
      console.error("Erreur suppression :", error);
      alert(error.message);
    }
  }

  return (
    <div className="flex min-h-screen bg-[#E5EEFF]">
      <Sidebar />

      <main className="flex-1 ml-64">
        <AdminHeader title="Gestion du Portfolio" />

        <div className="p-8">
          {showForm ? (
            <PortfolioForm
              project={editingProject}
              onSuccess={handleFormSuccess}
              onCancel={handleCancel}
            />
          ) : (
            <>
              {/* En-tête */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2
                    className={`text-xl font-bold text-[#052E78] ${hanken.className}`}
                  >
                    Projets réalisés
                  </h2>

                  <p
                    className={`text-sm text-[#444651] mt-1 ${inter.className}`}
                  >
                    Gérez les projets affichés sur votre site.
                  </p>
                </div>

                <button
                  onClick={handleCreate}
                  className={`bg-[#22C55E] text-white px-5 py-3 rounded-lg font-medium hover:bg-[#1fb454] transition ${inter.className}`}
                >
                  + Ajouter un projet
                </button>
              </div>

              {/* Tableau */}
              <div className="bg-white rounded-2xl shadow-[0_0_15px_rgba(5,46,120,0.08)] overflow-hidden">
                {loading ? (
                  <div className="p-8 text-center">
                    <p
                      className={`text-[#444651] ${inter.className}`}
                    >
                      Chargement des projets...
                    </p>
                  </div>
                ) : projects.length === 0 ? (
                  <div className="p-8 text-center">
                    <p
                      className={`text-[#444651] mb-4 ${inter.className}`}
                    >
                      Aucun projet pour le moment.
                    </p>

                    <button
                      onClick={handleCreate}
                      className={`bg-[#22C55E] text-white px-5 py-2.5 rounded-lg ${inter.className}`}
                    >
                      Ajouter votre premier projet
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#E5EEFF]">
                        <tr>
                          <th
                            className={`text-left px-6 py-4 text-sm font-semibold text-[#052E78] ${inter.className}`}
                          >
                            Image
                          </th>

                          <th
                            className={`text-left px-6 py-4 text-sm font-semibold text-[#052E78] ${inter.className}`}
                          >
                            Titre
                          </th>

                          <th
                            className={`text-left px-6 py-4 text-sm font-semibold text-[#052E78] ${inter.className}`}
                          >
                            Catégorie
                          </th>

                          <th
                            className={`text-left px-6 py-4 text-sm font-semibold text-[#052E78] ${inter.className}`}
                          >
                            Date
                          </th>

                          <th
                            className={`text-right px-6 py-4 text-sm font-semibold text-[#052E78] ${inter.className}`}
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {projects.map((project) => (
                          <tr
                            key={project._id}
                            className="border-t border-gray-100 hover:bg-[#F8FAFF] transition"
                          >
                           {/* Image */}
<td className="px-6 py-4">
  <div className="w-14 h-12 rounded-lg overflow-hidden bg-[#E5EEFF]">
    {project.image ? (
      <img
        src={project.image}
        alt={project.titre}
        className="w-full h-full object-cover"
        onError={(e) => e.target.style.display = 'none'}
      />
    ) : null}
  </div>
</td>

                            {/* Titre */}
                            <td className="px-6 py-4">
                              <p
                                className={`text-sm font-semibold text-[#052E78] ${hanken.className}`}
                              >
                                {project.titre}
                              </p>
                            </td>

                            {/* Catégorie */}
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex rounded-full bg-[#E7F9EE] text-[#22C55E] px-3 py-1 text-xs font-medium ${inter.className}`}
                              >
                                {project.categorie}
                              </span>
                            </td>

                            {/* Date */}
                            <td className="px-6 py-4">
                              <span
                                className={`text-sm text-[#444651] ${inter.className}`}
                              >
                                {project.createdAt
                                  ? new Date(
                                      project.createdAt
                                    ).toLocaleDateString("fr-FR", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    })
                                  : "-"}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleEdit(project)}
                                  className={`border border-[#052E78] text-[#052E78] px-3 py-1.5 rounded-md text-xs hover:bg-[#E5EEFF] transition ${inter.className}`}
                                >
                                  Modifier
                                </button>

                                <button
                                  onClick={() =>
                                    handleDelete(project._id)
                                  }
                                  className={`border border-red-500 text-red-500 px-3 py-1.5 rounded-md text-xs hover:bg-red-50 transition ${inter.className}`}
                                >
                                  Supprimer
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}