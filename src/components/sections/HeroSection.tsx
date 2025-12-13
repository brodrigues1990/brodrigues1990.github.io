'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      });

      gsap.to(textRef.current, {
        y: 0,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          markers: false,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 relative overflow-hidden pt-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div ref={textRef} className="text-center mb-8">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent mb-6">
          Desenvolvedor Criativo
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Seção Principal Imersiva em 3D
        </p>
      </div>

      <div ref={subtitleRef} className="text-center max-w-2xl">
        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
          Causa um forte impacto inicial com um modelo de sala 3D, partículas e texto animado.
        </p>
      </div>

      <div className="absolute bottom-10 animate-bounce">
        <svg
          className="w-6 h-6 text-purple-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
