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
        <div
  className={`inline-flex items-center rounded-full border border-[#D8E3F4] bg-[#EEF3FF] px-8 py-4 ${hanken.className}`}
>
  <span className="text-base font-semibold tracking-[0.08em] text-[#052E78]">
    CONTACTEZ-NOUS
</span>
</div>

        {/* Title */}
        <h1
          className={`mt-6 max-w-2xl text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#052E78] ${poppins.className}`}
        >
          Parlez-nous de
          <br />
          votre projet.
        </h1>

        {/* Description */}
        <p
          className={`mt-6 max-w-2xl text-base md:text-lg leading-8 text-[#444651] ${inter.className}`}
        >
          Nous transformons vos idées complexes en solutions digitales élégantes.
          Notre équipe d'experts à Alger est prête à relever votre prochain défi
          technique.
        </p>

      </div>
    </section>
  );
}