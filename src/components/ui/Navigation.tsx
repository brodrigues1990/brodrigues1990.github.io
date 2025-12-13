'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Navigation() {
  const navRef = useRef<HTMLNavElement>(null);

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
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gray-900/80 border-b border-gray-800"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Portfolio
        </h1>

        <div className="flex items-center gap-8">
          <ul className="hidden md:flex gap-8">
            {['Início', 'Projetos', 'Stack', 'Contato'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-purple-400 transition-colors font-medium"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
            Contato
          </button>
        </div>
      </div>
    </nav>
  );
}
