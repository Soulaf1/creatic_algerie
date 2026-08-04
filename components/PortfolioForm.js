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
  categorie: "",
};

export default function PortfolioForm({
  project = null,
  onSuccess,
  onCancel,
}) {
  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
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
        categorie: project.categorie || "",
      });

      setImageFile(null);
      setImagePreview(project.image || "");
    } else {
      setForm(initialForm);
      setImageFile(null);
      setImagePreview("");
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

  function handleImageChange(e) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Veuillez sélectionner une image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("L'image ne doit pas dépasser 5 Mo.");
      return;
    }

    setError("");
    setImageFile(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("titre", form.titre);
      formData.append("problematique", form.problematique);
      formData.append("solution", form.solution);
      formData.append("resultat", form.resultat);
      formData.append("categorie", form.categorie);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const url = isEditing
        ? `/api/admin/portfolio/${project._id}`
        : "/api/admin/portfolio";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
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
          className={`mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 ${inter.className}`}
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
            placeholder="Ex. DzPay"
            className={`w-full rounded-lg border border-[#C5D4F0] bg-white px-4 py-3 text-[#444651] outline-none focus:border-[#052E78] ${inter.className}`}
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
            placeholder="Ex. Application mobile"
            className={`w-full rounded-lg border border-[#C5D4F0] bg-white px-4 py-3 text-[#444651] outline-none focus:border-[#052E78] ${inter.className}`}
          />
        </div>

        {/* Image */}
        <div>
          <label
            className={`block text-sm font-medium text-[#052E78] mb-2 ${inter.className}`}
          >
            Image du projet
          </label>

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={handleImageChange}
            required={!isEditing}
            className={`w-full rounded-lg border border-[#C5D4F0] bg-white px-4 py-3 text-sm text-[#444651] file:mr-4 file:rounded-md file:border-0 file:bg-[#E5EEFF] file:px-4 file:py-2 file:text-[#052E78] ${inter.className}`}
          />

          <p className={`mt-1 text-xs text-[#777] ${inter.className}`}>
            JPG, PNG, WEBP ou GIF — 5 Mo maximum.
          </p>

          {imagePreview && (
            <div className="mt-4">
              <p
                className={`mb-2 text-xs font-medium text-[#052E78] ${inter.className}`}
              >
                Aperçu
              </p>

              <div className="h-40 w-full max-w-sm overflow-hidden rounded-xl bg-[#E5EEFF]">
                <img
                  src={imagePreview}
                  alt="Aperçu du projet"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}
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
            placeholder="Quel problème devait être résolu ?"
            className={`w-full resize-none rounded-lg border border-[#C5D4F0] bg-white px-4 py-3 text-[#444651] outline-none focus:border-[#052E78] ${inter.className}`}
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
            placeholder="Quelle solution avez-vous proposée ?"
            className={`w-full resize-none rounded-lg border border-[#C5D4F0] bg-white px-4 py-3 text-[#444651] outline-none focus:border-[#052E78] ${inter.className}`}
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
            placeholder="Quel a été le résultat obtenu ?"
            className={`w-full resize-none rounded-lg border border-[#C5D4F0] bg-white px-4 py-3 text-[#444651] outline-none focus:border-[#052E78] ${inter.className}`}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className={`rounded-lg border border-[#C5D4F0] px-5 py-2.5 text-[#052E78] transition hover:bg-[#E5EEFF] ${inter.className}`}
          >
            Annuler
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`rounded-lg bg-[#22C55E] px-5 py-2.5 font-medium text-white transition hover:bg-[#1fb454] disabled:opacity-60 ${inter.className}`}
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