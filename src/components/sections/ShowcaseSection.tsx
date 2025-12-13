'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        gsap.from(card, {
          opacity: 0,
          y: 100,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });

        gsap.to(card, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const cards = [
    {
      title: 'Seção Hero (Principal)',
      description: 'Seção Principal Imersiva em 3D',
      icon: '🎨',
    },
    {
      title: 'Seção de Destaque (Showcase)',
      description: 'Destaque suas competências com ícones 3D flutuantes',
      icon: '✨',
    },
    {
      title: 'Carrossel de Logos (Provas Sociais)',
      description: 'Mostre suas competências e experiências',
      icon: '🏆',
    },
    {
      title: 'Cartões de Destaque (Feature Cards)',
      description: 'Exiba seus melhores projetos',
      icon: '🎯',
    },
  ];

  return (
    <section ref={containerRef} className="py-20 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Seção de Destaque
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="group relative p-8 rounded-xl border border-green-500/30 bg-gradient-to-br from-green-900/10 to-green-800/5 hover:border-green-400/60 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {card.description}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Saiba mais
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
