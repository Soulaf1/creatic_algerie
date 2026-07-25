'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('admin_token', data.token);
      router.push('/admin');
    } else {
      setError(data.error || 'Identifiants incorrects');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #052E78 0%, #0a4db5 100%)' }}>

      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <Image src="/Logo.png" alt="CREATIC-ALGERIE" width={80} height={80} />
        </div>

        {/* TITRE */}
        <h1 className="text-2xl font-bold text-[#052E78] text-center mb-1"
          style={{ fontFamily: "var(--font-poppins)" }}>
          Espace Administrateur
        </h1>
        <p className="text-sm text-gray-900 text-center mb-6"
          style={{ fontFamily: "var(--font-inter)" }}>
          Connectez-vous pour gérer votre contenu
        </p>

        {/* FORMULAIRE */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* EMAIL */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#052E78]"
              style={{ fontFamily: "var(--font-poppins)" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@creatic-algerie.dz"
              required
              className="border border-gray-200 text-gray-900 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#052E78] transition-all"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>

          {/* MOT DE PASSE */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#052E78]"
              style={{ fontFamily: "var(--font-poppins)" }}>
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-gray-200 text-gray-900 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#052E78] transition-all pr-10"
                style={{ fontFamily: "var(--font-inter)" }}
              />
             <button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-900 hover:text-[#052E78]"
>
  {showPassword ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )}
</button>
            </div>
          </div>

          {/* ERREUR */}
          {error && (
            <p className="text-red-500 text-xs text-center"
              style={{ fontFamily: "var(--font-inter)" }}>
              {error}
            </p>
          )}

          {/* BOUTON */}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#00C853] text-white font-semibold py-3 rounded-lg hover:bg-[#00a844] transition-all duration-200 mt-2"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>

        </form>

        {/* NOTE BAS */}
        <p className="text-xs text-gray-900 text-center mt-6"
          style={{ fontFamily: "var(--font-inter)" }}>
          Accès réservé à l'équipe CREATIC-ALGERIE
        </p>

      </div>
    </div>
  );
}