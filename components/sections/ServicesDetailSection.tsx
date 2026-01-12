import React, { useState } from 'react';
import CTAButton from '../CTAButton';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import ImageEditorModal from '../ImageEditorModal';
import { useEditableContent } from '../../contexts/EditableContentContext';

interface ServiceDetailProps {
  title: string;
  description: string;
  benefits: string[];
  imageUrl: string;
  imageAlt: string;
  reverse?: boolean;
  onScheduleClick: () => void;
  onEditImage: () => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ title, description, benefits, imageUrl, imageAlt, reverse = false, onScheduleClick, onEditImage }) => {
    const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.3, triggerOnce: true });
    const { isEditMode } = useEditableContent();

    return (
        <div ref={sectionRef} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:grid-flow-col-dense' : ''}`}>
            <div className={`relative group fade-in-up ${isVisible ? 'is-visible' : ''} ${reverse ? 'lg:col-start-2' : ''}`}>
                <img src={imageUrl} alt={imageAlt} className="rounded-lg shadow-2xl w-full h-auto object-cover max-h-96" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-300 rounded-lg"></div>
                {isEditMode && (
                  <button
                      onClick={onEditImage}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 text-white px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-black/80 transition-all duration-300 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100"
                      aria-label={`Alterar imagem do serviço ${title}`}
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Alterar Imagem
                  </button>
                )}
            </div>
            <div className={`fade-in-up ${isVisible ? 'is-visible' : ''} ${reverse ? 'lg:col-start-1' : ''}`} style={{ transitionDelay: '150ms' }}>
                <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
                <p className="text-gray-400 mb-6">{description}</p>
                <ul className="space-y-3 mb-8">
                    {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                        <svg className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span className="text-gray-300">{benefit}</span>
                    </li>
                    ))}
                </ul>
                <CTAButton onClick={onScheduleClick}>Agendar {title}</CTAButton>
            </div>
        </div>
    );
};

interface ServicesDetailSectionProps {
    onScheduleClick: () => void;
}

const ServicesDetailSection: React.FC<ServicesDetailSectionProps> = ({ onScheduleClick }) => {
    const [headerRef, isHeaderVisible] = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });
    const { content, setContent } = useEditableContent();
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingImage, setEditingImage] = useState<{ index: number; src: string } | null>(null);

    const handleEditImage = (index: number, src: string) => {
        setEditingImage({ index, src });
        setIsEditorOpen(true);
    };

    const handleSaveImage = (newImageUrl: string) => {
        if (editingImage) {
            setContent(prevContent => {
                if (!prevContent) return null;
                const newServices = [...prevContent.services];
                newServices[editingImage.index] = {
                    ...newServices[editingImage.index],
                    imageUrl: newImageUrl,
                };
                return { ...prevContent, services: newServices };
            });
        }
        setIsEditorOpen(false);
        setEditingImage(null);
    };

    const handleCloseEditor = () => {
        setIsEditorOpen(false);
        setEditingImage(null);
    }
    
    if (!content) return null;

  return (
    <section className="bg-premium-dark py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div ref={headerRef} className={`text-center mb-16 fade-in-up ${isHeaderVisible ? 'is-visible' : ''}`}>
          <h2 className="text-4xl font-bold text-white mb-4">Serviços Especializados</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Cada serviço é executado com rigor técnico e atenção aos detalhes, proporcionando a clareza e a segurança que você precisa.
          </p>
        </div>
        <div className="space-y-24">
          {content.services.map((service, index) => (
            <ServiceDetail 
                key={index} 
                {...service} 
                onEditImage={() => handleEditImage(index, service.imageUrl)}
                onScheduleClick={onScheduleClick} 
            />
          ))}
        </div>
      </div>
      {isEditorOpen && editingImage && (
        <ImageEditorModal 
            isOpen={isEditorOpen}
            onClose={handleCloseEditor}
            onSave={handleSaveImage}
            initialImageSrc={editingImage.src}
        />
      )}
    </section>
  );
};

export default ServicesDetailSection;