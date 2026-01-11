import React from 'react';
import CTAButton from '../CTAButton';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => (
  <div className="bg-slate-800 p-10 rounded-lg text-center transition-all duration-300 shadow-xl group hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:-translate-y-2 h-full flex flex-col items-center">
    <div className="text-red-500 mb-6 mx-auto w-20 h-20 flex items-center justify-center bg-slate-900 rounded-full transition-all duration-300 group-hover:bg-red-500 group-hover:text-white flex-shrink-0">{icon}</div>
    <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

interface ServicesHighlightSectionProps {
  onViewServicesClick: () => void;
}

const ServicesHighlightSection: React.FC<ServicesHighlightSectionProps> = ({ onViewServicesClick }) => {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const services = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      title: 'Laudo ECV SP',
      description: 'Emissão de Laudos de Vistoria de Identificação Veicular para transferências, conforme legislação de São Paulo.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h18m-7.5-15L21 6.5m0 0L16.5 12M21 6.5H3" /></svg>,
      title: 'Vistoria Transferencia GO',
      description: 'Laudo de Vistoria de Identificação Veicular específico para transferências no estado de Goiás, seguindo as normas do DETRAN-GO.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
      title: 'Vistoria Cautelar',
      description: 'Análise completa da originalidade e estrutura do veículo, identificando reparos e avarias.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>,
      title: 'Vistorias Lacrada',
      description: 'Verificação de selos e lacres de segurança para garantir a integridade de cargas e veículos.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>,
      title: 'Precificação Veicular',
      description: 'Avaliação técnica precisa do valor de mercado do seu veículo para compra, venda ou seguro.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
      title: 'Atendimento para Frotas e Leilões',
      description: 'Soluções customizadas para empresas, garantindo gestão eficiente e segurança na avaliação de grandes volumes.',
    }
  ];

  return (
    <section ref={sectionRef} className="bg-slate-900 py-20 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <div className={`fade-in-up ${isVisible ? 'is-visible' : ''}`}>
            <h2 className="text-4xl font-bold text-white mb-4">Nossas Soluções</h2>
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              Oferecemos um portfólio completo de vistorias e laudos para garantir a segurança, conformidade e o valor do seu patrimônio automotivo.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 max-w-7xl mx-auto">
          {services.map((service, index) => (
             <div key={index} className={`fade-in-up ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: `${index * 150}ms` }}>
                <ServiceCard {...service} />
             </div>
          ))}
        </div>
         <div className={`fade-in-up ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: `${services.length * 150}ms` }}>
            <CTAButton onClick={onViewServicesClick}>Conheça todos os serviços</CTAButton>
        </div>
      </div>
    </section>
  );
};

export default ServicesHighlightSection;