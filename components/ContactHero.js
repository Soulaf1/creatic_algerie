import { Hanken_Grotesk, Poppins, Inter } from "next/font/google";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function ContactHero() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">

       {/* Badge */}
<div className={`inline-flex items-center gap-2 border border-[#444651] text-green-500 text-xs px-3 py-1.5 rounded-full mb-3 ${inter.className}`}>
  ⏱ CONTACTEZ-NOUS
</div>

{/* Title */}
<h1 className={`mt-4 max-w-2xl text-3xl sm:text-4xl font-bold leading-tight text-[#052E78] ${hanken.className}`}>
  Parlez-nous de<br />votre projet.
</h1>

{/* Description */}
<p className={`mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-[#444651] ${inter.className}`}>
  Nous transformons vos idées complexes en solutions digitales élégantes.
  Notre équipe d'experts à Alger est prête à relever votre prochain défi technique.
</p>
      </div>
    </section>
  );
}