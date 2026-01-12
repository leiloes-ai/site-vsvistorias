import React, { useState } from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { useEditableContent } from '../../contexts/EditableContentContext';
import ImageEditorModal from '../ImageEditorModal';

const ValueCard: React.FC<{ title: string; }> = ({ title }) => (
    <div className="bg-gray-100 p-4 rounded-lg text-center transition-all duration-300 hover:bg-red-50 hover:shadow-md h-full flex items-center justify-center">
        <p className="font-semibold text-gray-700">{title}</p>
    </div>
);

const AboutSection: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.2 });
    const { isEditMode, content, setContent } = useEditableContent();
    const [isEditorOpen, setIsEditorOpen] = useState(false);

    const handleSaveImage = (newImageSrc: string) => {
        setContent(prevContent => {
          if (!prevContent) return null;
          return {
            ...prevContent,
            aboutTeam: {
                ...prevContent.aboutTeam,
                src: newImageSrc,
            },
          }
        });
        setIsEditorOpen(false);
    };
    
    if (!content) return null;

  return (
    <>
      <section ref={sectionRef} className="bg-white py-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className={`relative group fade-in-up ${isVisible ? 'is-visible' : ''}`}>
              <img 
                src={content.aboutTeam.src}
                alt={content.aboutTeam.alt}
                className="rounded-lg shadow-2xl w-full h-auto object-cover"
              />
              {isEditMode && (
                <>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-300 rounded-lg"></div>
                  <button
                      onClick={() => setIsEditorOpen(true)}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 text-white px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-black/80 transition-all duration-300 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100"
                      aria-label="Alterar imagem da equipe"
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Alterar Imagem
                  </button>
                </>
              )}
            </div>
            <div className={`fade-in-up ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '150ms' }}>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">Sobre</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
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
                      <p className="text-gray-600 leading-relaxed">Executar vistorias veiculares com rigor técnico, imparcialidade e conformidade normativa, garantindo laudos confiáveis em todo o território nacional.</p>
                  </div>
                  <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 text-red-600">Visão</h3>
                      <p className="text-gray-600 leading-relaxed">Ser referência nacional em vistorias veiculares, reconhecida pela excelência técnica, credibilidade institucional e abrangência operacional.</p>
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
      {isEditorOpen && content && (
        <ImageEditorModal
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          onSave={handleSaveImage}
          initialImageSrc={content.aboutTeam.src}
        />
      )}
    </>
  );
};

export default AboutSection;