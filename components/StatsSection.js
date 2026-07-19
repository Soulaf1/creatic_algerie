import Image from 'next/image';
import { Hanken_Grotesk, Inter } from 'next/font/google';

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const stats = [
  { number: '150+', label: 'PROJETS LIVRÉS' },
  { number: '98%', label: 'SATISFACTION CLIENT' },
  { number: '8 Ans', label: "D'EXPÉRIENCE" },
];

export default function StatsSection() {
  return (
    <section className="bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Titre */}
        <div className="mb-8 sm:mb-12">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-[#052E78] mb-2 ${hanken.className}`}>
            Notre impact en quelques chiffres.
          </h2>
          <p className={`text-[#444651] text-sm sm:text-base ${inter.className}`}>
            Notre expérience résumée en quelques chiffres.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12">

          {/* Gauche — chiffres */}
          <div className="flex-1 w-full flex flex-col gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border border-gray-200 rounded-xl px-4 sm:px-6 py-4 sm:py-5 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
              >
                <span className={`text-2xl sm:text-3xl font-bold text-green-500 min-w-[80px] sm:min-w-[100px] ${hanken.className}`}>
                  {stat.number}
                </span>
               <span className={`text-[#052E78] font-bold text-base sm:text-lg tracking-wide ${hanken.className}`}>
         {stat.label}
          </span>
              </div>
            ))}
          </div>

          {/* Droite — images */}
          <div className="flex-1 w-full grid grid-cols-2 gap-4">

            {/* Grande image gauche */}
            <div className="row-span-2 flex items-center justify-center">
              <Image
                src="/client-satisfait.png"
                alt="Clients satisfaits"
                width={280}
                height={200}
                className="object-contain w-full"
              />
            </div>

            {/* Petite image haut droite */}
            <div className="flex items-center justify-center">
              <Image
                src="/experience.png"
                alt="Expérience"
                width={280}
                height={150}
                className="object-contain w-full"
              />
            </div>

            {/* Petite image bas droite */}
            <div className="flex items-center justify-center">
              <Image
                src="/projets.png"
                alt="Projets livrés"
                width={280}
                height={150}
                className="object-contain w-full"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}