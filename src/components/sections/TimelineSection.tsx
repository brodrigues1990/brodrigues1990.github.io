'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useTheme } from '@/contexts/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

export function TimelineSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { colors } = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(timelineRef.current, {
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      itemRefs.current.forEach((item, index) => {
        if (!item) return;

        const isLeft = index % 2 === 0;

        gsap.from(item, {
          opacity: 0,
          x: isLeft ? -50 : 50,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const experiences = [
    {
      year: '2020',
      title: 'Primeiro Projeto',
      description: 'Iniciou jornada como desenvolvedor',
    },
    {
      year: '2021',
      title: 'Full Stack Developer',
      description: 'Especialização em React e Node.js',
    },
    {
      year: '2022',
      title: 'Lead Developer',
      description: 'Liderou equipe de 5 desenvolvedores',
    },
    {
      year: '2023',
      title: 'Web3 & 3D',
      description: 'Exploração de tecnologias emergentes',
    },
    {
      year: '2024',
      title: 'Freelancer Sênior',
      description: 'Projetos personalizados de alta qualidade',
    },
  ];

  return (
    <section ref={timelineRef} className="py-20 px-4 md:px-8 relative">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
          }}
        >
          Linha do Tempo
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2"
            style={{
              background: `linear-gradient(to bottom, ${colors.primary}20, ${colors.secondary}20)`,
            }}
          ></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className={`flex gap-8 items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="flex-1 hidden md:block"></div>

                <div className="flex justify-center">
                  <div
                    className="w-4 h-4 rounded-full ring-8"
                    style={{
                      background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                      ringColor: colors.background,
                    }}
                  ></div>
                </div>

                <div
                  className="flex-1 p-6 rounded-lg border"
                  style={{
                    borderColor: `${colors.primary}30`,
                    background: `linear-gradient(to bottom right, ${colors.primary}10, ${colors.accent}05)`,
                  }}
                >
                  <div className="text-sm font-bold mb-2" style={{ color: colors.primary }}>
                    {exp.year}
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: colors.foreground }}>
                    {exp.title}
                  </h3>
                  <p style={{ color: colors.muted }}>{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
