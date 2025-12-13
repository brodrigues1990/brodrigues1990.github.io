'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { ShowcaseSection } from '@/components/sections/ShowcaseSection';
import { LogosSection } from '@/components/sections/LogosSection';
import { TechStackSection } from '@/components/sections/TechStackSection';
import { TimelineSection } from '@/components/sections/TimelineSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950">
      <HeroSection />
      <ShowcaseSection />
      <LogosSection />
      <TechStackSection />
      <TimelineSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
