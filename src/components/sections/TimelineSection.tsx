'use client';

import { useTheme } from '@/contexts/ThemeContext';

export function TimelineSection() {
  const { colors } = useTheme();

  const experiences = [
    {
      year: '2020',
      title: 'Primeiro Projeto',
      description: 'Iniciou jornada como desenvolvedor',
    },
    {
      year: '2021',
      title: 'Full Stack Developer',
      description: 'Especialização em React e Node.js',
    },
    {
      year: '2022',
      title: 'Lead Developer',
      description: 'Liderou equipe de 5 desenvolvedores',
    },
    {
      year: '2023',
      title: 'Web3 & 3D',
      description: 'Exploração de tecnologias emergentes',
    },
    {
      year: '2024',
      title: 'Freelancer Sênior',
      description: 'Projetos personalizados de alta qualidade',
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 relative">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent animate-fade-in animation-delay-1"
          style={{
            backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
          }}
        >
          Linha do Tempo
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2 animate-fade-in animation-delay-2"
            style={{
              background: `linear-gradient(to bottom, ${colors.primary}20, ${colors.secondary}20)`,
            }}
          ></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`flex gap-8 items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } ${index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'}`}
                style={{
                  animationDelay: `${0.1 + index * 0.15}s`,
                }}
              >
                <div className="flex-1 hidden md:block"></div>

                <div className="flex justify-center animate-blur-in" style={{ animationDelay: `${0.2 + index * 0.15}s` }}>
                  <div
                    className="w-4 h-4 rounded-full ring-8"
                    style={{
                      background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                      ringColor: colors.background,
                    }}
                  ></div>
                </div>

                <div
                  className="flex-1 p-6 rounded-lg border animate-slide-in-up"
                  style={{
                    borderColor: `${colors.primary}30`,
                    background: `linear-gradient(to bottom right, ${colors.primary}10, ${colors.accent}05)`,
                    animationDelay: `${0.3 + index * 0.15}s`,
                  }}
                >
                  <div className="text-sm font-bold mb-2" style={{ color: colors.primary }}>
                    {exp.year}
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: colors.foreground }}>
                    {exp.title}
                  </h3>
                  <p style={{ color: colors.muted }}>{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
