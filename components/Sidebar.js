"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: "▦",
  },
  {
    name: "Portfolio",
    href: "/admin/portfolio",
    icon: "🗂",
  },
  {
    name: "Témoignages",
    href: "/admin/temoignages",
    icon: "💬",
  },
  {
    name: "Paramètres",
    href: "/admin/settings",
    icon: "⚙",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#052E78] flex flex-col">

      <div className="px-6 py-7 border-b border-white/10">

        <h1
          className={`text-white text-lg font-bold ${hanken.className}`}
        >
          CREATIC-ALGERIE
        </h1>

      </div>

      <nav className="flex-1 px-4 py-6 flex flex-col gap-2">

        {links.map((link) => {

          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex items-center gap-3
                rounded-xl
                px-4
                py-3
                transition-all

                ${
                  active
                    ? "bg-[#22C55E] text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }

                ${inter.className}
              `}
            >
              <span>{link.icon}</span>

              {link.name}
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}