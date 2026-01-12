import React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const TestimonialCard: React.FC<{ quote: string; name: string; role: string;}> = ({ quote, name, role }) => (
    <div className="bg-white p-8 rounded-lg shadow-lg h-full flex flex-col text-left">
        <svg className="w-10 h-10 text-red-100 mb-4 flex-shrink-0" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M9.333 8h-4.667c-1.473 0-2.667 1.194-2.667 2.667v9.333c0 1.473 1.194 2.667 2.667 2.667h6.667v-12h-4.667zM27.333 8h-4.667c-1.473 0-2.667 1.194-2.667 2.667v9.333c0 1.473 1.194 2.667 2.667 2.667h6.667v-12h-4.667z"></path>
        </svg>
        <p className="text-gray-600 italic mb-6 flex-grow">"{quote}"</p>
        <div className="flex-shrink-0">
            <p className="font-bold text-gray-900">{name}</p>
            <p className="text-sm text-red-600 font-semibold">{role}</p>
        </div>
    </div>
);


const TestimonialsSection: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

    const testimonials = [
        {
            quote: 'A vistoria cautelar da V.S Vistorias foi essencial para uma compra segura. A equipe é extremamente profissional e o laudo é incrivelmente detalhado. Recomendo!',
            name: 'Mariana Costa',
            role: 'Cliente Particular',
        },
        {
            quote: 'Gerenciamos uma grande frota e a parceria com a V.S Vistorias otimizou nossos processos de avaliação e venda de ativos. Agilidade e confiança definem o serviço.',
            name: 'Carlos Almeida',
            role: 'Gerente de Frotas, Frota São Luis',
        },
        {
            quote: 'Para nossos leilões, a precisão dos laudos é fundamental. A V.S Vistorias entrega um trabalho de excelência, com padronização e credibilidade que valorizam os lotes.',
            name: 'Fernanda Lima',
            role: 'Coordenadora, Leilões SuperBid',
        },
    ];

    return (
        <section ref={sectionRef} className="bg-gray-100 py-20 overflow-hidden">
            <div className="container mx-auto px-6 text-center">
                <div className={`fade-in-up ${isVisible ? 'is-visible' : ''}`}>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">O Que Nossos Clientes Dizem</h2>
                    <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
                        Resultados que falam por si. A satisfação de quem confia em nosso trabalho é nossa maior conquista.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className={`fade-in-up ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: `${150 + index * 150}ms` }}>
                           <TestimonialCard {...testimonial} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
