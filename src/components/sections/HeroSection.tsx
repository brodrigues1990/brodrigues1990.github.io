'use client';

import { useTheme } from '@/contexts/ThemeContext';
import BrTag3D from '@/components/ui/BrTag3D';
import ShaderImage from '@/components/ui/ShaderImage';

export function HeroSection() {
  const { theme, colors } = useTheme();

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-between px-4 md:px-8 relative overflow-hidden transition-colors"
      style={{ backgroundColor: colors.background }}
    >
      {/* Background hands image with shaders */}
      <div className="absolute inset-0 opacity-50 pointer-events-none animate-fade-in animation-delay-1" style={{ top: '-200px' }}>
        <ShaderImage
          src="/adamsCreationNoBg.png"
          className="w-full h-full"
          intervalMs={22500}
        />
      </div>

      {/* Top Section - Text */}
      {/* <div className="flex-1 flex flex-col items-center justify-start pt-32 pb-8 relative z-10">
        <div ref={textRef} className="text-center mb-6">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight"
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

      {/* Center Section - 3D Element (Below the text) */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none pb-24 animate-slide-in-up animation-delay-2">
        <div className="relative w-full h-[60vh] md:h-[70vh] max-w-3xl">
          {/* Glow effect behind the 3D object */}
          <div className="absolute inset-0 flex items-center justify-center animate-blur-in animation-delay-3">
            <div
              className="w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl opacity-60"
              style={{
                background: `radial-gradient(circle, ${colors.primary}40, ${colors.secondary}20, transparent)`,
              }}
            ></div>
          </div>
          
          {/* 3D <br> Tag - Centered and rotating */}
          <div className="w-full h-full pointer-events-auto">
            <BrTag3D className="w-full h-full" />
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
