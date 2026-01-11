import React, { useState, useEffect } from 'react';
import CTAButton from '../CTAButton';

interface HeroSectionProps {
  onScheduleClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScheduleClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] text-white flex items-center bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
      <img 
        src="assets/images/vistoria-profissional.jpg"
        alt="Mecânico profissional inspecionando o motor de um carro" 
        className="absolute inset-0 w-full h-full object-cover ken-burns"
      />
      <div className="relative container mx-auto px-6 z-10">
        <div className={`max-w-3xl text-left transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}>
             V.S Vistorias
          </h1>
          <p className="text-xl md:text-2xl font-medium mb-8" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>
            Especialista em Laudos ECV, Cautelar e Precificação para Frotas, Leilões e Particulares.
          </p>
          <CTAButton onClick={onScheduleClick}>Agendar Vistoria</CTAButton>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;