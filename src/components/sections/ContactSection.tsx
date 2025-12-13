'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useTheme } from '@/contexts/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formRef.current) {
      gsap.to(formRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        onComplete: () => {
          setIsSubmitted(true);
          gsap.to(formRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: 0.5,
          });
        },
      });
    }
  };

  return (
    <section ref={containerRef} className="py-20 px-4 md:px-8 relative">
      <div className="max-w-2xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
          }}
        >
          Seção de Contato
        </h2>
        <p className="text-center mb-12" style={{ color: colors.muted }}>
          Envie uma mensagem e entraremos em contato em breve
        </p>

        {isSubmitted ? (
          <div
            ref={formRef}
            className="text-center p-12 rounded-lg border"
            style={{
              borderColor: `${colors.primary}30`,
              background: `linear-gradient(to bottom right, ${colors.primary}20, ${colors.accent}10)`,
            }}
          >
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: colors.foreground }}>
              Mensagem Enviada!
            </h3>
            <p className="mb-6" style={{ color: colors.muted }}>
              Obrigado por entrar em contato. Responderemos em breve.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-2 rounded-lg text-white font-bold hover:shadow-lg transition-all"
              style={{
                backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
              }}
            >
              Enviar Outra Mensagem
            </button>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6 p-8 rounded-lg border"
            style={{
              borderColor: `${colors.primary}30`,
              background: `linear-gradient(to bottom right, ${colors.primary}10, ${colors.secondary}10)`,
            }}
          >
            <div>
              <label className="block font-bold mb-2" style={{ color: colors.foreground }}>
                Nome
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors"
                style={{
                  backgroundColor: `${colors.background}80`,
                  borderColor: colors.muted,
                  color: colors.foreground,
                }}
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label className="block font-bold mb-2" style={{ color: colors.foreground }}>
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors"
                style={{
                  backgroundColor: `${colors.background}80`,
                  borderColor: colors.muted,
                  color: colors.foreground,
                }}
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block font-bold mb-2" style={{ color: colors.foreground }}>
                Mensagem
              </label>
              <textarea
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors resize-none"
                style={{
                  backgroundColor: `${colors.background}80`,
                  borderColor: colors.muted,
                  color: colors.foreground,
                }}
                placeholder="Sua mensagem aqui..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg text-white font-bold hover:shadow-lg transition-all transform hover:scale-105"
              style={{
                backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
              }}
            >
              Enviar Mensagem
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
