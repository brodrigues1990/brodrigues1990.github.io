'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import BrTag3D from '@/components/ui/BrTag3D';
import { useTheme } from '@/contexts/ThemeContext';
import adamsCreation from '@/assets/adamsCreationNoBg.png';

export function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const { theme, colors } = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power3.out',
      });

      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      });

      gsap.from(buttonRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.5,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-between px-4 md:px-8 relative overflow-hidden transition-colors"
      style={{ backgroundColor: colors.background }}
    >
      {/* Background hands image */}
      <div className="absolute inset-0 opacity-30 pointer-events-none -top-[320px]">
        <Image
          src={adamsCreation}
          alt="Adam's Creation Hands"
          fill
          className="object-cover"
          priority
          // style={{ filter: theme === 'dark' ? 'brightness(0.7)' : 'brightness(1.2)' }}
        />
      </div>

      {/* Top Section - Text */}
      {/* <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-8 relative z-10">
        <div ref={textRef} className="text-center mb-6">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight"
            style={{ color: colors.foreground }}
          >
            When intelligence reaches out
            <br />
            <span className="italic">to instinct,</span> the future takes shape
          </h1>
        </div>

        <div ref={subtitleRef} className="text-center max-w-xl mb-8">
          <p className="text-sm md:text-base leading-relaxed" style={{ color: colors.muted }}>
            an unlikely alliance - where human intuition
            <br />
            and algorithmic precision move as one
          </p>
        </div>

        <a
          ref={buttonRef}
          href="#showcase"
          className="inline-flex items-center gap-2 px-6 py-3 border rounded-full text-sm transition-all duration-300 group"
          style={{
            borderColor: colors.muted,
            color: colors.foreground,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.foreground;
            e.currentTarget.style.color = colors.background;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = colors.foreground;
          }}
        >
          See it in action
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
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div> */}

      {/* Center Section - 3D Element (Over the hands) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full h-[50vh] md:h-[60vh] max-w-2xl">
          {/* Glow effect behind the 3D object */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl opacity-60"
              style={{
                background: `radial-gradient(circle, ${colors.primary}40, ${colors.secondary}20, transparent)`,
              }}
            ></div>
          </div>
          
          {/* 3D <br> Tag - Centered and rotating */}
          <div className="w-full h-full pointer-events-auto">
            <BrTag3D
              fontSize={2.5}
              color={colors.primary}
              metalness={0.95}
              roughness={0.1}
              floatIntensity={0.08}
              rotationSpeed={0.5}
            />
          </div>
        </div>
      </div>

      {/* Bottom decorative icons */}
      {/* <div className="flex items-center justify-center gap-4 pb-8 relative z-10" style={{ color: colors.muted }}>
        <span className="text-xs tracking-widest">⊹</span>
        <span className="text-xs tracking-widest">◫</span>
        <span className="text-xs tracking-widest">⊹</span>
        <span className="text-xs tracking-widest">◎</span>
        <span className="text-xs tracking-widest">✓</span>
      </div> */}
    </section>
  );
}
