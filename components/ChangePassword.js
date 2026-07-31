"use client";

import { useState } from "react";
import { Hanken_Grotesk, Inter } from "next/font/google";

import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function ChangePassword() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch(
        "/api/admin/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Impossible de modifier le mot de passe."
        );
      }

      setSuccess(data.message);

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Erreur changement mot de passe :", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-[#E5EEFF]">
      <Sidebar />

      <main className="flex-1 ml-64">
        <AdminHeader title="Changer le mot de passe" />

        <div className="p-8">
          <div className="max-w-2xl bg-white rounded-2xl p-8 shadow-[0_0_15px_rgba(5,46,120,0.08)]">
            <div className="mb-6">
              <h2
                className={`text-xl font-bold text-[#052E78] ${hanken.className}`}
              >
                Sécurité du compte
              </h2>

              <p
                className={`mt-2 text-sm text-[#444651] ${inter.className}`}
              >
                Modifiez le mot de passe de votre compte administrateur.
              </p>
            </div>

            {success && (
              <div
                className={`mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 ${inter.className}`}
              >
                {success}
              </div>
            )}

            {error && (
              <div
                className={`mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 ${inter.className}`}
              >
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Ancien mot de passe */}
              <div>
                <label
                  className={`mb-2 block text-sm font-medium text-[#052E78] ${inter.className}`}
                >
                  Ancien mot de passe
                </label>

                <input
                  type="password"
                  name="currentPassword"
                  value={form.currentPassword}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className={`w-full rounded-lg border border-[#C5D4F0] px-4 py-3 text-[#444651] outline-none focus:border-[#052E78] ${inter.className}`}
                />
              </div>

              {/* Nouveau mot de passe */}
              <div>
                <label
                  className={`mb-2 block text-sm font-medium text-[#052E78] ${inter.className}`}
                >
                  Nouveau mot de passe
                </label>

                <input
                  type="password"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className={`w-full rounded-lg border border-[#C5D4F0] px-4 py-3 text-[#444651] outline-none focus:border-[#052E78] ${inter.className}`}
                />

                <p
                  className={`mt-1 text-xs text-[#777] ${inter.className}`}
                >
                  Minimum 8 caractères.
                </p>
              </div>

              {/* Confirmation */}
              <div>
                <label
                  className={`mb-2 block text-sm font-medium text-[#052E78] ${inter.className}`}
                >
                  Confirmer le nouveau mot de passe
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className={`w-full rounded-lg border border-[#C5D4F0] px-4 py-3 text-[#444651] outline-none focus:border-[#052E78] ${inter.className}`}
                />
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className={`rounded-lg bg-[#22C55E] px-6 py-3 font-medium text-white transition hover:bg-[#1fb454] disabled:cursor-not-allowed disabled:opacity-60 ${inter.className}`}
                >
                  {loading
                    ? "Modification..."
                    : "Modifier le mot de passe"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}