import React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

interface DifferentiatorCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const DifferentiatorCard: React.FC<DifferentiatorCardProps> = ({ icon, title, description }) => (
  <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl text-left transition-all duration-500 ease-in-out hover:-translate-y-2 hover:scale-[1.02] group border-l-4 border-slate-700 hover:border-red-500 shadow-lg hover:shadow-2xl hover:shadow-black/30">
    <div className="flex items-start mb-4">
      <div className="text-white bg-red-600 p-3 rounded-lg mr-4 mt-1 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <div>
         <h3 className="text-xl font-bold text-white mb-1 tracking-tight">{title}</h3>
         <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const DifferentiatorsSection: React.FC = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const differentiators = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      title: 'Tecnologia Aplicada',
      description: 'Utilizamos equipamentos modernos e softwares integrados para uma análise mais precisa e ágil.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20" /></svg>,
      title: 'Especialização Técnica',
      description: 'Nossa equipe é constantemente treinada e atualizada sobre as mais recentes tecnologias e legislações do setor.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
      title: 'Conformidade Legal',
      description: 'Atuamos em total conformidade com as normas e regulamentações, garantindo a validade de nossos laudos.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
      title: 'Profissionais Qualificados',
      description: 'Contamos com um time de vistoriadores experientes, comprometidos com a ética e a precisão em cada detalhe.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
      title: 'Processos Padronizados',
      description: 'Garantimos consistência e qualidade em todas as vistorias através de checklists e metodologias rigorosas.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
      title: 'Atendimento Transparente',
      description: 'Comunicamos de forma clara e objetiva cada etapa do processo, tirando todas as dúvidas de nossos clientes.',
    },
  ];

  return (
    <section ref={sectionRef} className="bg-premium-dark py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 fade-in-up ${isVisible ? 'is-visible' : ''}`}>
          <h2 className="text-4xl font-bold text-white mb-4">Nossos Pilares de Qualidade</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            A excelência em cada detalhe é o que nos diferencia. Estes são os fundamentos que garantem a sua segurança e satisfação.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentiators.map((item, index) => (
             <div key={index} className={`fade-in-up ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: `${index * 100}ms` }}>
                <DifferentiatorCard {...item} />
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentiatorsSection;