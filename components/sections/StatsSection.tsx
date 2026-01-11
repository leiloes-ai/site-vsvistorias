import React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import Counter from '../Counter';


const StatItem: React.FC<{ value: number; label: string; isVisible: boolean; suffix?: string; }> = ({ value, label, isVisible, suffix }) => (
    <div className="text-center">
        <p className="text-5xl md:text-6xl font-bold text-red-600">
            +<Counter end={value} isVisible={isVisible} />{suffix}
        </p>
        <p className="text-lg text-gray-400 mt-2">{label}</p>
    </div>
);

const StatsSection: React.FC = () => {
    const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.5, triggerOnce: true });

    const stats = [
        { value: 38653, label: 'Vistorias Realizadas' },
        { value: 9, label: 'Anos de Experiência' },
        { value: 98, label: 'de Conformidade', suffix: '%' },
    ];

    return (
        <section ref={sectionRef} className="bg-slate-900 py-20">
            <div className="container mx-auto px-6">
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-12 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    {stats.map((stat, index) => (
                        <StatItem key={index} {...stat} isVisible={isVisible} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;