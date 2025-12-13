'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function LogosSection() {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const ctx = gsap.context(() => {
      gsap.from(carousel, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: carousel,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.to(carousel, {
        x: -100,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
    });

    return () => ctx.revert();
  }, []);

  const logos = ['🏢', '💼', '🚀', '🎯', '💡', '🔧', '📱', '⚙️'];

  return (
    <section className="py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Carrossel de Logos
        </h2>

        <div className="relative">
          <div
            ref={carouselRef}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...logos, ...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-32 h-32 flex items-center justify-center rounded-lg border border-green-500/30 bg-gradient-to-br from-green-900/20 to-green-800/10 hover:border-green-400/60 transition-colors"
              >
                <span className="text-5xl">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
