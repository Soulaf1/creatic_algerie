"use client";

import { useEffect, useState } from "react";
import { Hanken_Grotesk, Inter } from "next/font/google";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const initialForm = {
  titre: "",
  problematique: "",
  solution: "",
  resultat: "",
  image: "",
  categorie: "",
};

export default function PortfolioForm({
  project = null,
  onSuccess,
  onCancel,
}) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = Boolean(project);

  useEffect(() => {
    if (project) {
      setForm({
        titre: project.titre || "",
        problematique: project.problematique || "",
        solution: project.solution || "",
        resultat: project.resultat || "",
        image: project.image || "",
        categorie: project.categorie || "",
      });
    } else {
      setForm(initialForm);
    }

    setError("");
  }, [project]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url = isEditing
        ? `/api/admin/portfolio/${project._id}`
        : "/api/admin/portfolio";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            (isEditing
              ? "Erreur lors de la modification."
              : "Erreur lors de la création.")
        );
      }

      onSuccess(data);
    } catch (error) {
      console.error("Erreur formulaire Portfolio :", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0_0_15px_rgba(5,46,120,0.08)] p-6">
      <div className="mb-6">
        <h2
          className={`text-xl font-bold text-[#052E78] ${hanken.className}`}
        >
          {isEditing ? "Modifier le projet" : "Ajouter un projet"}
        </h2>

        <p className={`text-sm text-[#444651] mt-1 ${inter.className}`}>
          {isEditing
            ? "Modifiez les informations du projet."
            : "Remplissez les informations du nouveau projet."}
        </p>
      </div>

      {error && (
        <div
          className={`mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 ${inter.className}`}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Titre */}
        <div>
          <label
            className={`block text-sm font-medium text-[#052E78] mb-2 ${inter.className}`}
          >
            Titre
          </label>

          <input
            type="text"
            name="titre"
            value={form.titre}
            onChange={handleChange}
            required
            className={`w-full rounded-lg border border-[#C5D4F0] bg-white px-4 py-3 text-[#444651] outline-none focus:border-[#052E78] ${inter.className}`}
            placeholder="Ex. DzPay"
          />
        </div>

        {/* Catégorie */}
        <div>
          <label
            className={`block text-sm font-medium text-[#052E78] mb-2 ${inter.className}`}
          >
            Catégorie
          </label>

          <input
            type="text"
            name="categorie"
            value={form.categorie}
            onChange={handleChange}
            required
            className={`w-full rounded-lg border border-[#C5D4F0] bg-white px-4 py-3 text-[#444651] outline-none focus:border-[#052E78] ${inter.className}`}
            placeholder="Ex. Application mobile"
          />
        </div>

        {/* Image */}
        <div>
          <label
            className={`block text-sm font-medium text-[#052E78] mb-2 ${inter.className}`}
          >
            Image
          </label>

          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            required
            className={`w-full rounded-lg border border-[#C5D4F0] bg-white px-4 py-3 text-[#444651] outline-none focus:border-[#052E78] ${inter.className}`}
            placeholder="/dzpay.png"
          />

          <p className={`mt-1 text-xs text-[#777] ${inter.className}`}>
            Pour l'instant, indique le chemin de l'image située dans
            <code className="ml-1">public/</code>.
          </p>
        </div>

        {/* Problématique */}
        <div>
          <label
            className={`block text-sm font-medium text-[#052E78] mb-2 ${inter.className}`}
          >
            Problématique
          </label>

          <textarea
            name="problematique"
            value={form.problematique}
            onChange={handleChange}
            required
            rows={4}
            className={`w-full resize-none rounded-lg border border-[#C5D4F0] bg-white px-4 py-3 text-[#444651] outline-none focus:border-[#052E78] ${inter.className}`}
            placeholder="Quel problème devait être résolu ?"
          />
        </div>

        {/* Solution */}
        <div>
          <label
            className={`block text-sm font-medium text-[#052E78] mb-2 ${inter.className}`}
          >
            Solution
          </label>

          <textarea
            name="solution"
            value={form.solution}
            onChange={handleChange}
            required
            rows={4}
            className={`w-full resize-none rounded-lg border border-[#C5D4F0] bg-white px-4 py-3 text-[#444651] outline-none focus:border-[#052E78] ${inter.className}`}
            placeholder="Quelle solution avez-vous proposée ?"
          />
        </div>

        {/* Résultat */}
        <div>
          <label
            className={`block text-sm font-medium text-[#052E78] mb-2 ${inter.className}`}
          >
            Résultat
          </label>

          <textarea
            name="resultat"
            value={form.resultat}
            onChange={handleChange}
            required
            rows={4}
            className={`w-full resize-none rounded-lg border border-[#C5D4F0] bg-white px-4 py-3 text-[#444651] outline-none focus:border-[#052E78] ${inter.className}`}
            placeholder="Quel a été le résultat obtenu ?"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className={`rounded-lg border border-[#C5D4F0] px-5 py-2.5 text-[#052E78] hover:bg-[#E5EEFF] transition ${inter.className}`}
          >
            Annuler
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`rounded-lg bg-[#22C55E] px-5 py-2.5 font-medium text-white hover:bg-[#1fb454] transition disabled:opacity-60 ${inter.className}`}
          >
            {loading
              ? "Enregistrement..."
              : isEditing
              ? "Enregistrer les modifications"
              : "Ajouter le projet"}
          </button>
        </div>
      </form>
    </div>
  );
}