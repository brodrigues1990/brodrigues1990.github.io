'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function TechStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      iconRefs.current.forEach((icon, index) => {
        if (!icon) return;

        gsap.from(icon, {
          opacity: 0,
          scale: 0,
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });

        gsap.to(icon, {
          y: -15,
          duration: 3 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const technologies = [
    {
      name: 'React',
      icon: '⚛️',
      description: 'Library JavaScript moderna',
    },
    {
      name: 'TypeScript',
      icon: '📘',
      description: 'Type safety',
    },
    {
      name: 'Three.js',
      icon: '🎲',
      description: '3D Graphics',
    },
    {
      name: 'GSAP',
      icon: '⚡',
      description: 'Animações suaves',
    },
    {
      name: 'Tailwind CSS',
      icon: '🎨',
      description: 'Utility-first CSS',
    },
    {
      name: 'Next.js',
      icon: '▲',
      description: 'React Framework',
    },
  ];

  return (
    <section ref={containerRef} className="py-20 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Tech Stack
        </h2>
        <p className="text-center text-gray-400 mb-16">
          Ferramentas e tecnologias utilizadas
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {technologies.map((tech, index) => (
            <div
              key={index}
              ref={(el) => {
                iconRefs.current[index] = el;
              }}
              className="flex flex-col items-center gap-4 group cursor-pointer"
            >
              <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                <div className="relative text-4xl md:text-5xl transform group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-white text-sm md:text-base">
                  {tech.name}
                </h3>
                <p className="text-xs text-gray-500 group-hover:text-gray-400">
                  {tech.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
