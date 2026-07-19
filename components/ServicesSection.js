import Image from 'next/image';
import Link from 'next/link';
import { Hanken_Grotesk, Inter } from 'next/font/google';

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
});

const services = [
  {
    image: '/website.png',
    titre: 'Sites Web',
    description: 'Vitrines institutionnelles et plateformes corporate à haute performance.',
  },
  {
    image: '/ecommerce.png',
    titre: 'E-commerce',
    description: 'Solutions de vente en ligne optimisées pour le marché algérien et international.',
  },
  {
    image: '/appmobile.png',
    titre: 'Apps Mobiles',
    description: 'Applications iOS et Android natives ou cross-platform fluides et intuitives.',
  },
  {
    image: '/maintenance.png',
    titre: 'Maintenance',
    description: 'Support technique réactif et mises à jour de sécurité pour pérenniser vos actifs.',
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-[#052E78] mb-2 ${hanken.className}`}>
              Nos Services Experts
            </h2>
            <p className={`text-[#444651] text-sm sm:text-base ${inter.className}`}>
              Des solutions d'ingénierie sur mesure pour votre croissance.
            </p>
          </div>
          <Link
            href="/services"
            className={`text-[#052E78] font-semibold hover:underline whitespace-nowrap text-base sm:text-lg ${hanken.className}`}
          >
            en savoir plus →
          </Link>
        </div>

        {/* Cartes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-transform duration-300 cursor-pointer overflow-hidden"
            >
              {/* Image */}
              <div className="w-full h-40 sm:h-44 relative">
                <Image
                  src={service.image}
                  alt={service.titre}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>

              {/* Texte */}
              <div className="p-4">
                <h3 className={`text-[#052E78] font-bold text-base sm:text-lg mb-2 ${hanken.className}`}>
                  {service.titre}
                </h3>
                <p className={`text-[#444651] text-sm leading-relaxed ${inter.className}`}>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}