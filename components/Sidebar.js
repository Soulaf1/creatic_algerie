"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  LogOut,
} from "lucide-react";

import { Hanken_Grotesk, Inter } from "next/font/google";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    router.push("/admin/login");
    router.refresh();
  }

  const links = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Portfolio",
      href: "/admin/portfolio",
      icon: Briefcase,
    },
    {
      title: "Témoignages",
      href: "/admin/temoignages",
      icon: MessageSquare,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#052E78] flex flex-col">

      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <h1
          className={`text-white text-xl font-bold ${hanken.className}`}
        >
          CREATIC-ALGERIE
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
  <Link
    href="/admin/dashboard"
    className="flex items-center gap-3 rounded-lg bg-green-500 px-4 py-3 text-white"
  >
    Dashboard
  </Link>

  <Link
    href="/admin/portfolio"
    className="mt-3 flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-white"
  >
    Portfolio
  </Link>

  <Link
    href="/admin/temoignages"
    className="mt-3 flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-white"
  >
    Témoignages
  </Link>
</nav>

      {/* Déconnexion */}
      <div className="border-t border-white/10 px-4 py-5">

        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 text-red-400 hover:text-red-300 transition ${inter.className}`}
        >
          <LogOut size={18} />

          Déconnexion
        </button>

      </div>

      {/* Profil */}
      <div className="border-t border-white/10 px-4 py-5">

        <div className="flex items-center gap-3">

          <div className="h-10 w-10 rounded-full bg-[#22C55E] flex items-center justify-center text-white font-bold">
            AC
          </div>

          <div>

            <p
              className={`text-white font-semibold text-sm ${hanken.className}`}
            >
              Admin Creatic
            </p>

            <p
              className={`text-white/60 text-xs ${inter.className}`}
            >
              Super Administrateur
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}