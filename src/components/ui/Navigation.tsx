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
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-all ${
        theme === 'dark'
          ? 'bg-black/50'
          : 'bg-white/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-center">
        <div className="flex items-center gap-8">
          <ul className="hidden md:flex gap-8 items-center">
            {[
              { label: 'Início', href: '#inicio' },
              { label: 'Projetos', href: '#projetos' },
              { label: 'Stack', href: '#stack' },
              { label: 'Contato', href: '#contato' }
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-sm transition-colors font-normal"
                  style={{
                    color: theme === 'dark' ? '#a1a1aa' : '#71717a',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme === 'dark' ? '#ffffff' : '#000000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme === 'dark' ? '#a1a1aa' : '#71717a';
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <ThemeSwitch />

          <button
            className="px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{
              backgroundColor: theme === 'dark' ? '#ffffff' : '#000000',
              color: theme === 'dark' ? '#000000' : '#ffffff',
            }}
            onClick={() => {
              document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Contato
          </button>
        </div>
      </div>
    </nav>
  );
}
