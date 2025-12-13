'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

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
      className="border-t border-gray-800 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-12 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Portfolio 3D</h3>
            <p className="text-gray-400">
              Um portfólio moderno e interativo com tecnologias de ponta.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {['Início', 'Projetos', 'Sobre', 'Contato'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              {[
                { icon: '🐙', label: 'GitHub' },
                { icon: '💼', label: 'LinkedIn' },
                { icon: '🐦', label: 'Twitter' },
              ].map((social) => (
                <button
                  key={social.label}
                  className="w-10 h-10 rounded-lg bg-gray-700 hover:bg-purple-600 transition-colors flex items-center justify-center text-lg transform hover:scale-110 transition-transform"
                  title={social.label}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} Portfolio 3D. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              {['Privacidade', 'Termos', 'Cookies'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
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
