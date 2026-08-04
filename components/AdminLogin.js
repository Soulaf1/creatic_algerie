"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";
import Image from "next/image";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function LoginPage() {
    const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      setError(data.message);
      return;
    }

    //alert("Connexion réussie !");
    router.push("/admin/dashboard");
  } catch (error) {
    setError("Une erreur est survenue.");
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="min-h-screen bg-[#EFF4FF] flex items-center justify-center px-4">
        
        <div className="w-full max-w-[28rem] sm:max-w-[30rem] bg-white rounded-[2rem] shadow-lg border border-gray-200 px-6 py-8 sm:px-10 sm:py-10">

        {/* Logo */}

        <div className="flex justify-center mb-4">
          <Image
            src="/Logo.png"
            alt="Creatic"
            width={90}
            height={90}
            className="w-16 sm:w-20 h-auto"
          />
        </div>

        {/* Titre */}

        <h1
          className={`text-center text-3xl sm:text-4xl font-bold text-[#052E78] ${poppins.className}`}
        >
          Espace Administrateur
        </h1>

        <p
          className={`text-center text-gray-600 mt-2 mb-8 ${inter.className}`}
        >
          Identifiez-vous pour gérer votre plateforme.
        </p>

        {/* Formulaire */}

        <form
                 onSubmit={handleSubmit}
                 className="space-y-6"
                >

          {/* Email */}

          <div>

            <label
              className={`block text-xs uppercase tracking-wider text-gray-600 mb-2 ${inter.className}`}
            >
              Adresse Email
            </label>

            <input
             type="email"
             required
             autoComplete="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             className={`w-full rounded-lg bg-[#F4F7FF] border text-gray-600 border-[#D5D9E6] px-4 py-3 outline-none focus:border-[#052E78] ${inter.className}`}
            />
          </div>

          {/* Password */}

          <div>

            <label
              className={`block text-xs uppercase tracking-wider text-gray-600 mb-2 ${inter.className}`}
            >
              Mot de passe
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                 required
                 autoComplete="current-password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 placeholder="••••••••"
                 className={`w-full rounded-lg bg-[#F4F7FF] border text-gray-600 border-[#D5D9E6] px-4 py-3 pr-12 outline-none focus:border-[#052E78] ${inter.className}`}
                />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                👁
              </button>

            </div>

          </div>

          {/* Bouton */}
            {
            error && (
             <p className="text-red-500 text-sm">
               {error}
              </p>
            )
            }
          <button
  type="submit"
  disabled={loading}
  className={`w-full bg-[#052E78] text-white py-3 rounded-lg font-semibold hover:bg-[#041f52] transition disabled:opacity-60 disabled:cursor-not-allowed ${poppins.className}`}
>
  {loading ? "Connexion..." : "Se connecter →"}
</button>       
          

        </form>

        

  

        {/* Ligne */}

        <div className="border-t my-8"></div>

        <p
          className={`text-center text-xs tracking-widest text-gray-500 uppercase ${inter.className}`}
        >
          Accès réservé à l'équipe CREATIC-ALGERIE
        </p>

      </div>

    </section>
  );
}