import React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  isVisible: boolean;
  delay: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description, isVisible, delay }) => (
    <div className={`relative pl-16 fade-in-up ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: delay }}>
        <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-red-600 text-white font-bold text-2xl shadow-lg">
            {number}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const HowItWorksSection: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });
    
    const steps = [
        {
            number: '1',
            title: 'Agendamento Rápido',
            description: 'Entre em contato por telefone, WhatsApp ou formulário e agende sua vistoria com flexibilidade e conveniência.',
        },
        {
            number: '2',
            title: 'Inspeção Técnica Rigorosa',
            description: 'Nossos especialistas qualificados realizam uma inspeção completa, utilizando tecnologia de ponta e seguindo processos padronizados.',
        },
        {
            number: '3',
            title: 'Análise e Validação',
            description: 'Todas as informações coletadas são minuciosamente analisadas e cruzadas com bancos de dados oficiais para garantir a precisão.',
        },
        {
            number: '4',
            title: 'Emissão do Laudo',
            description: 'Você recebe um laudo técnico completo, claro e objetivo, com validade legal e todas as informações necessárias para sua segurança.',
        },
    ];
  return (
    <section ref={sectionRef} className="bg-white py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 fade-in-up ${isVisible ? 'is-visible' : ''}`}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nosso Processo é Simples e Transparente</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Desenvolvemos um fluxo de trabalho eficiente para garantir agilidade sem abrir mão do rigor técnico.
          </p>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-red-100 rounded-full hidden md:block"></div>
            <div className="space-y-16">
                {steps.map((step, index) => (
                    <StepCard key={step.number} {...step} isVisible={isVisible} delay={`${150 + index * 150}ms`} />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
