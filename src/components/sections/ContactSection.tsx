'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Seção de Contato
        </h2>
        <p className="text-center text-gray-400 mb-12">
          Envie uma mensagem e entraremos em contato em breve
        </p>

        {isSubmitted ? (
          <div ref={formRef} className="text-center p-12 rounded-lg border border-green-500/30 bg-gradient-to-br from-green-900/20 to-green-800/10">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-white mb-2">Mensagem Enviada!</h3>
            <p className="text-gray-400 mb-6">
              Obrigado por entrar em contato. Responderemos em breve.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              Enviar Outra Mensagem
            </button>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6 p-8 rounded-lg border border-cyan-500/30 bg-gradient-to-br from-cyan-900/10 to-blue-900/10"
          >
            <div>
              <label className="block text-white font-bold mb-2">Nome</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label className="block text-white font-bold mb-2">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-white font-bold mb-2">Mensagem</label>
              <textarea
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                placeholder="Sua mensagem aqui..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-105"
            >
              Enviar Mensagem
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
