import React, { useState, useEffect } from 'react';
import CTAButton from '../CTAButton';
import { AppImages } from '../../assets/images';
import { useEditMode } from '../../contexts/EditModeContext';
import ImageEditorModal from '../ImageEditorModal';

interface HeroSectionProps {
  onScheduleClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScheduleClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isEditMode } = useEditMode();
  const [heroImageSrc, setHeroImageSrc] = useState(AppImages.heroBackground.src);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSaveImage = (newImageSrc: string) => {
    setHeroImageSrc(newImageSrc);
    setIsEditorOpen(false);
  };


  return (
    <>
      <section className="relative h-screen min-h-[700px] text-white flex items-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        <img 
          src={heroImageSrc}
          alt={AppImages.heroBackground.alt} 
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
        {isEditMode && (
          <button
            onClick={() => setIsEditorOpen(true)}
            className="absolute top-4 right-4 z-20 bg-black/60 text-white px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-black/80 transition-all duration-300 flex items-center gap-2"
            aria-label="Editar imagem de fundo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Editar Fundo
          </button>
        )}
      </section>
      {isEditorOpen && (
        <ImageEditorModal
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          onSave={handleSaveImage}
          initialImageSrc={heroImageSrc}
        />
      )}
    </>
  );
};

export default HeroSection;