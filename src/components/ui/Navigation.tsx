'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ThemeSwitch } from './ThemeSwitch';
import { useTheme } from '@/contexts/ThemeContext';

export function Navigation() {
  const navRef = useRef<HTMLNavElement>(null);
  const { theme, colors } = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: 'power3.out',
      });

      let lastScrollY = 0;
      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down
          gsap.to(navRef.current, {
            yPercent: -100,
            duration: 0.3,
            overwrite: 'auto',
          });
        } else {
          // Scrolling up
          gsap.to(navRef.current, {
            yPercent: 0,
            duration: 0.3,
            overwrite: 'auto',
          });
        }

        lastScrollY = currentScrollY;
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    });

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors ${
        theme === 'dark'
          ? 'bg-gray-900/80 border-gray-800'
          : 'bg-white/80 border-gray-200'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <h1
          className="text-2xl font-bold bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
          }}
        >
          Portfolio
        </h1>

        <div className="flex items-center gap-6">
          <ul className="hidden md:flex gap-8">
            {['Início', 'Projetos', 'Stack', 'Contato'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="transition-colors font-medium"
                  style={{
                    color: theme === 'dark' ? '#d1d5db' : '#4b5563',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme === 'dark' ? '#d1d5db' : '#4b5563';
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <ThemeSwitch />

          <button
            className="px-6 py-2 rounded-lg text-white font-bold hover:shadow-lg transition-all"
            style={{
              backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
              boxShadow: `0 0 20px ${colors.primary}50`,
            }}
          >
            Contato
          </button>
        </div>
      </div>
    </nav>
  );
}
