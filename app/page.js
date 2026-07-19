import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import ServicesSection from '@/components/ServicesSection';
import RealisationsSection from '@/components/RealisationsSection';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <RealisationsSection />
      <CTASection />
    </main>
  );
}