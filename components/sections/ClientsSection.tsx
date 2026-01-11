import React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const ClientLogo: React.FC<{ name: string; }> = ({ name }) => (
    <div className="mx-auto flex h-full items-center justify-center px-4 py-2">
        <span className="text-xl font-bold text-gray-500 grayscale transition-all duration-300 hover:grayscale-0 hover:text-gray-800 lg:text-2xl font-poppins">
            {name}
        </span>
    </div>
);


const ClientsSection: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

    const clients = [
        { name: 'Santander' },
        { name: 'Grupo Leilo' },
        { name: 'Seguradora Itau' },
        { name: 'Base Veiculos' },
        { name: 'RJS Consult' },
        { name: 'Alfa Motors' },
        { name: 'Grupo Autovia' },
    ];

    return (
        <section ref={sectionRef} className="bg-gray-100 py-16 overflow-hidden">
            <div className="container mx-auto px-6 text-center">
                <h2 className={`text-sm font-bold uppercase text-gray-500 tracking-widest mb-10 fade-in-up ${isVisible ? 'is-visible' : ''}`}>
                    Confiança de Grandes Nomes do Mercado
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-x-10 md:gap-x-16 gap-y-6">
                    {clients.map((client, index) => (
                        <div key={index} className={`fade-in-up ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: `${index * 100}ms` }}>
                             <ClientLogo name={client.name} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientsSection;