'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function TimelineSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
          Linha do Tempo
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500/20 to-pink-500/20 transform -translate-x-1/2"></div>

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
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 ring-8 ring-gray-900"></div>
                </div>

                <div className="flex-1 p-6 rounded-lg border border-orange-500/30 bg-gradient-to-br from-orange-900/10 to-orange-800/5">
                  <div className="text-sm font-bold text-orange-400 mb-2">
                    {exp.year}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-gray-400">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
