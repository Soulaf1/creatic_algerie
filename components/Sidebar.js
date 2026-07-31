"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  Settings,
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
  {
    title: "Paramètres",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });

      router.replace("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  }

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-[#052E78]">
      
      {/* Logo */}
      <div className="border-b border-white/10 px-6 py-6">
        <h1
          className={`text-xl font-bold text-white ${hanken.className}`}
        >
          CREATIC-ALGERIE
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="flex flex-col gap-2">

          {links.map((link) => {
            const Icon = link.icon;

            const active =
              link.href === "/admin/dashboard"
                ? pathname === "/admin/dashboard"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  flex items-center gap-3
                  rounded-lg
                  px-4 py-3
                  transition-all
                  ${
                    active
                      ? "bg-[#22C55E] text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }
                  ${inter.className}
                `}
              >
                <Icon size={18} />
                <span>{link.title}</span>
              </Link>
            );
          })}

        </div>
      </nav>

      {/* Déconnexion */}
      <div className="border-t border-white/10 px-4 py-5">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 text-red-400 transition hover:text-red-300 ${inter.className}`}
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>

      {/* Profil */}
      <div className="border-t border-white/10 px-4 py-5">
        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#22C55E] font-bold text-white">
            AC
          </div>

          <div>
            <p
              className={`text-sm font-semibold text-white ${hanken.className}`}
            >
              Admin Creatic
            </p>

            <p
              className={`text-xs text-white/60 ${inter.className}`}
            >
              Super Administrateur
            </p>
          </div>

        </div>
      </div>

    </aside>
  );
}