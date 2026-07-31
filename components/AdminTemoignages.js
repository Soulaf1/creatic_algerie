"use client";

import { useEffect, useState } from "react";
import { Hanken_Grotesk, Inter } from "next/font/google";

import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";
import TemoignageForm from "./TemoignageForm";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});

function getInitials(name = "") {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "AC"
  );
}

function getAvatarColor(index) {
  const colors = [
    "bg-[#274690]",
    "bg-[#9EF5BC]",
    "bg-[#DCE6FF]",
  ];

  return colors[index % colors.length];
}

export default function AdminTemoignages() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  async function loadTestimonials() {
    try {
      setLoading(true);

      const response = await fetch("/api/admin/temoignages");

      if (!response.ok) {
        throw new Error("Impossible de récupérer les témoignages.");
      }

      const data = await response.json();

      setTestimonials(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erreur témoignages :", error);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTestimonials();
  }, []);

  function handleCreate() {
    setEditingTestimonial(null);
    setShowForm(true);
  }

  function handleEdit(testimonial) {
    setEditingTestimonial(testimonial);
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingTestimonial(null);
  }

  function handleFormSuccess(savedTestimonial) {
    setShowForm(false);
    setEditingTestimonial(null);

    setTestimonials((current) => {
      const exists = current.some(
        (item) => item._id === savedTestimonial._id
      );

      if (exists) {
        return current.map((item) =>
          item._id === savedTestimonial._id
            ? savedTestimonial
            : item
        );
      }

      return [savedTestimonial, ...current];
    });
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer ce témoignage ?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/temoignages/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Erreur lors de la suppression."
        );
      }

      setTestimonials((current) =>
        current.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error("Erreur suppression témoignage :", error);
      alert(error.message);
    }
  }

  return (
    <div className="flex min-h-screen bg-[#E5EEFF]">
      <Sidebar />

      <main className="flex-1 ml-64">
        <AdminHeader title="Gestion des Témoignages" />

        <div className="p-8">
          {showForm ? (
            <TemoignageForm
              testimonial={editingTestimonial}
              onSuccess={handleFormSuccess}
              onCancel={handleCancel}
            />
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2
                    className={`text-xl font-bold text-[#052E78] ${hanken.className}`}
                  >
                    Témoignages clients
                  </h2>

                  <p
                    className={`text-sm text-[#444651] mt-1 ${inter.className}`}
                  >
                    Gérez les témoignages affichés sur votre site.
                  </p>
                </div>

                <button
                  onClick={handleCreate}
                  className={`bg-[#22C55E] text-white px-5 py-3 rounded-lg font-medium hover:bg-[#1fb454] transition ${inter.className}`}
                >
                  + Ajouter un témoignage
                </button>
              </div>

              {/* Tableau */}
              <div className="bg-white rounded-2xl shadow-[0_0_15px_rgba(5,46,120,0.08)] overflow-hidden">
                {loading ? (
                  <div className="p-8 text-center">
                    <p
                      className={`text-[#444651] ${inter.className}`}
                    >
                      Chargement des témoignages...
                    </p>
                  </div>
                ) : testimonials.length === 0 ? (
                  <div className="p-8 text-center">
                    <p
                      className={`text-[#444651] mb-4 ${inter.className}`}
                    >
                      Aucun témoignage pour le moment.
                    </p>

                    <button
                      onClick={handleCreate}
                      className={`bg-[#22C55E] text-white px-5 py-2.5 rounded-lg ${inter.className}`}
                    >
                      Ajouter votre premier témoignage
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
                            Avatar
                          </th>

                          <th
                            className={`text-left px-6 py-4 text-sm font-semibold text-[#052E78] ${inter.className}`}
                          >
                            Nom
                          </th>

                          <th
                            className={`text-left px-6 py-4 text-sm font-semibold text-[#052E78] ${inter.className}`}
                          >
                            Entreprise / Poste
                          </th>

                          <th
                            className={`text-left px-6 py-4 text-sm font-semibold text-[#052E78] ${inter.className}`}
                          >
                            Étoiles
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
                        {testimonials.map((testimonial, index) => (
                          <tr
                            key={testimonial._id}
                            className="border-t border-gray-100 hover:bg-[#F8FAFF] transition"
                          >
                            {/* Avatar */}
                            <td className="px-6 py-4">
                              <div
                                className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold ${
                                  getAvatarColor(index)
                                } ${
                                  index === 1
                                    ? "text-[#052E78]"
                                    : "text-white"
                                }`}
                              >
                                {getInitials(testimonial.nom)}
                              </div>
                            </td>

                            {/* Nom */}
                            <td className="px-6 py-4">
                              <p
                                className={`text-sm font-semibold text-[#052E78] ${hanken.className}`}
                              >
                                {testimonial.nom}
                              </p>
                            </td>

                            {/* Entreprise */}
                            <td className="px-6 py-4">
                              <p
                                className={`text-sm text-[#444651] max-w-[220px] ${inter.className}`}
                              >
                                {testimonial.entreprise}
                              </p>
                            </td>

                            {/* Etoiles */}
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <span
                                    key={star}
                                    className={
                                      star <= testimonial.etoiles
                                        ? "text-[#FFB800]"
                                        : "text-gray-300"
                                    }
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                            </td>

                            {/* Date */}
                            <td className="px-6 py-4">
                              <span
                                className={`text-sm text-[#444651] ${inter.className}`}
                              >
                                {testimonial.createdAt
                                  ? new Date(
                                      testimonial.createdAt
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
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() =>
                                    handleEdit(testimonial)
                                  }
                                  className={`border border-[#052E78] text-[#052E78] px-3 py-1.5 rounded-md text-xs hover:bg-[#E5EEFF] transition ${inter.className}`}
                                >
                                  Modifier
                                </button>

                                <button
                                  onClick={() =>
                                    handleDelete(
                                      testimonial._id
                                    )
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