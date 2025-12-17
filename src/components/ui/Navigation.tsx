'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ThemeSwitch } from './ThemeSwitch';
import { useTheme } from '@/contexts/ThemeContext';

export function Navigation() {
  const navRef = useRef<HTMLElement>(null);
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
            y: -150,
            duration: 0.3,
            overwrite: 'auto',
          });
        } else {
          // Scrolling up
          gsap.to(navRef.current, {
            y: 0,
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
      className={`fixed top-6 left-0 right-0 mx-auto w-fit z-50 rounded-full backdrop-blur-md border transition-all ${
        theme === 'dark'
          ? 'bg-black/70 border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]'
          : 'bg-white/70 border-black/5 shadow-lg'
      }`}
    >
      <div className="px-6 py-3 flex items-center justify-center">
        <div className="flex items-center gap-6">
          <ul className="hidden md:flex gap-6 items-center">
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
