import React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const ValueCard: React.FC<{ title: string; }> = ({ title }) => (
    <div className="bg-gray-100 p-4 rounded-lg text-center transition-all duration-300 hover:bg-red-50 hover:shadow-md h-full flex items-center justify-center">
        <p className="font-semibold text-gray-700">{title}</p>
    </div>
);

const AboutSection: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section ref={sectionRef} className="bg-white py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className={`fade-in-up ${isVisible ? 'is-visible' : ''}`}>
            <img 
              src="https://picsum.photos/seed/vsvistorias-equipe/800/600"
              alt="Equipe V.S Vistorias em reunião estratégica"
              className="rounded-lg shadow-2xl w-full h-auto object-cover"
            />
          </div>
          <div className={`fade-in-up ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '150ms' }}>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">Sobre</h2>
            <div className="space-y-4 text-gray-600">
                <p>
                    Fundada em 2016, na cidade de Goiânia, estado de Goiás, a V.S Vistorias atua na realização de vistorias veiculares com cobertura em todo o território nacional.
                </p>
                <p>
                    A empresa opera com foco em conformidade legal, precisão técnica e confiabilidade, seguindo rigorosamente as normas vigentes e adotando procedimentos padronizados que asseguram a qualidade e a integridade dos laudos emitidos.
                </p>
                <p>
                    Com equipe qualificada e processos estruturados, a V.S Vistorias mantém o compromisso com a excelência técnica, a transparência das informações e a segurança operacional, atendendo clientes e parceiros em âmbito nacional.
                </p>
            </div>
            
            <div className="mt-8 space-y-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 text-red-600">Missão</h3>
                    <p className="text-gray-600">Executar vistorias veiculares com rigor técnico, imparcialidade e conformidade normativa, garantindo laudos confiáveis em todo o território nacional.</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 text-red-600">Visão</h3>
                    <p className="text-gray-600">Ser referência nacional em vistorias veiculares, reconhecida pela excelência técnica, credibilidade institucional e abrangência operacional.</p>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-red-600">Valores</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <ValueCard title="Conformidade Legal" />
                    <ValueCard title="Precisão Técnica" />
                    <ValueCard title="Ética Profissional" />
                    <ValueCard title="Responsabilidade Operacional" />
                    <ValueCard title="Padronização de Processos" />
                    <ValueCard title="Transparência nas Informações" />
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;