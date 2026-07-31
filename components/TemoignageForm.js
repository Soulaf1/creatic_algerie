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
  nom: "",
  entreprise: "",
  citation: "",
  etoiles: 5,
};

export default function TemoignageForm({
  testimonial = null,
  onSuccess,
  onCancel,
}) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = Boolean(testimonial);

  useEffect(() => {
    if (testimonial) {
      setForm({
        nom: testimonial.nom || "",
        entreprise: testimonial.entreprise || "",
        citation: testimonial.citation || "",
        etoiles: testimonial.etoiles || 5,
      });
    } else {
      setForm(initialForm);
    }

    setError("");
  }, [testimonial]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: name === "etoiles" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url = isEditing
        ? `/api/admin/temoignages/${testimonial._id}`
        : "/api/admin/temoignages";

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
      console.error("Erreur formulaire témoignage :", error);
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
          {isEditing ? "Modifier le témoignage" : "Ajouter un témoignage"}
        </h2>

        <p className={`text-sm text-[#444651] mt-1 ${inter.className}`}>
          {isEditing
            ? "Modifiez les informations du témoignage."
            : "Ajoutez un nouveau témoignage client."}
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
        {/* Nom */}
        <div>
          <label
            className={`block text-sm font-medium text-[#052E78] mb-2 ${inter.className}`}
          >
            Nom complet
          </label>

          <input
            type="text"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            required
            placeholder="Ex. Mourad Hamidi"
            className={`w-full rounded-lg border border-[#C5D4F0] px-4 py-3 text-[#444651] outline-none focus:border-[#052E78] ${inter.className}`}
          />
        </div>

        {/* Entreprise / poste */}
        <div>
          <label
            className={`block text-sm font-medium text-[#052E78] mb-2 ${inter.className}`}
          >
            Entreprise / Poste
          </label>

          <input
            type="text"
            name="entreprise"
            value={form.entreprise}
            onChange={handleChange}
            required
            placeholder="Ex. CEO, TechNova Algeria"
            className={`w-full rounded-lg border border-[#C5D4F0] px-4 py-3 text-[#444651] outline-none focus:border-[#052E78] ${inter.className}`}
          />
        </div>

        {/* Citation */}
        <div>
          <label
            className={`block text-sm font-medium text-[#052E78] mb-2 ${inter.className}`}
          >
            Témoignage
          </label>

          <textarea
            name="citation"
            value={form.citation}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Écrivez le témoignage du client..."
            className={`w-full resize-none rounded-lg border border-[#C5D4F0] px-4 py-3 text-[#444651] outline-none focus:border-[#052E78] ${inter.className}`}
          />
        </div>

        {/* Étoiles */}
        <div>
          <label
            className={`block text-sm font-medium text-[#052E78] mb-2 ${inter.className}`}
          >
            Étoiles
          </label>

          <select
            name="etoiles"
            value={form.etoiles}
            onChange={handleChange}
            required
            className={`w-full rounded-lg border border-[#C5D4F0] px-4 py-3 text-[#444651] outline-none focus:border-[#052E78] ${inter.className}`}
          >
            <option value={1}>1 étoile</option>
            <option value={2}>2 étoiles</option>
            <option value={3}>3 étoiles</option>
            <option value={4}>4 étoiles</option>
            <option value={5}>5 étoiles</option>
          </select>
        </div>

        {/* Boutons */}
        <div className="flex justify-end gap-3 pt-3">
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
              : "Ajouter le témoignage"}
          </button>
        </div>
      </form>
    </div>
  );
}