'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from '@/contexts/ThemeContext';

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const { theme, colors } = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current, {
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="border-t py-12 px-4 md:px-8"
      style={{
        borderTopColor: theme === 'dark' ? '#374151' : '#e5e7eb',
        background: theme === 'dark'
          ? 'linear-gradient(to right, #111827, #1f2937, #111827)'
          : 'linear-gradient(to right, #f3f4f6, #e5e7eb, #f3f4f6)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: colors.foreground }}>
              Portfolio 3D
            </h3>
            <p style={{ color: colors.muted }}>
              Um portfólio moderno e interativo com tecnologias de ponta.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4" style={{ color: colors.foreground }}>
              Links Rápidos
            </h4>
            <ul className="space-y-2">
              {['Início', 'Projetos', 'Sobre', 'Contato'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="transition-colors"
                    style={{ color: colors.muted }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = colors.muted;
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold mb-4" style={{ color: colors.foreground }}>
              Redes Sociais
            </h4>
            <div className="flex gap-4">
              {[
                { icon: '🐙', label: 'GitHub' },
                { icon: '💼', label: 'LinkedIn' },
                { icon: '🐦', label: 'Twitter' },
              ].map((social) => (
                <button
                  key={social.label}
                  className="w-10 h-10 rounded-lg transition-all flex items-center justify-center text-lg transform hover:scale-110"
                  style={{
                    backgroundColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = theme === 'dark' ? '#374151' : '#e5e7eb';
                  }}
                  title={social.label}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t pt-8" style={{ borderTopColor: theme === 'dark' ? '#374151' : '#e5e7eb' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm" style={{ color: colors.muted }}>
              © {currentYear} Portfolio 3D. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              {['Privacidade', 'Termos', 'Cookies'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm transition-colors"
                  style={{ color: colors.muted }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.foreground;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = colors.muted;
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
