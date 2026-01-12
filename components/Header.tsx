import React, { useState, useEffect } from 'react';
import type { SectionRefs } from '../App';
import CTAButton from './CTAButton';
import { useEditableContent } from '../contexts/EditableContentContext';
import ImageEditorModal from './ImageEditorModal';

interface HeaderProps {
  sectionRefs: SectionRefs;
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ sectionRefs, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isEditMode, content, setContent } = useEditableContent();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!content) return null;

  const handleSaveLogo = (newLogoSrc: string) => {
    setContent(prevContent => {
      if (!prevContent) return null;
      return {
        ...prevContent,
        logo: {
          ...prevContent.logo,
          src: newLogoSrc,
        },
      }
    });
    setIsEditorOpen(false);
  };

  const navLinks = [
    { title: 'Início', ref: sectionRefs.home },
    { title: 'Sobre', ref: sectionRefs.about },
    { title: 'Serviços', ref: sectionRefs.services },
    { title: 'Pilares de Qualidade', ref: sectionRefs.differentiators },
    { title: 'Depoimentos', ref: sectionRefs.testimonials },
  ];

  const handleNavClick = (ref: React.RefObject<HTMLDivElement>) => {
    scrollToSection(ref);
    setIsMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-xl' : 'bg-gray-900'}`}>
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="relative flex items-center group">
          <button 
            onClick={() => handleNavClick(sectionRefs.home)} 
            className="flex items-center gap-4 text-2xl md:text-3xl font-bold text-red-600 tracking-tight hover:text-red-500 transition-colors"
          >
            {content.logo && (
              <img 
                src={content.logo.src} 
                alt={content.logo.alt} 
                className="h-16 md:h-24 w-auto object-contain" 
              />
            )}
            <span>V.S Vistorias</span>
          </button>
          
          {isEditMode && (
            <button
              onClick={() => setIsEditorOpen(true)}
              className="ml-3 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-colors"
              title="Trocar Logo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          )}
        </div>
        
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.title}
              onClick={() => handleNavClick(link.ref)}
              className="text-white hover:text-red-600 transition-colors duration-300 font-medium"
            >
              {link.title}
            </button>
          ))}
          <CTAButton onClick={() => handleNavClick(sectionRefs.contact)}>Agendar Vistoria</CTAButton>
        </nav>
        
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none p-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-800/98 backdrop-blur-md absolute top-full left-0 w-full shadow-2xl">
          <nav className="flex flex-col items-center space-y-4 py-8">
            {navLinks.map((link) => (
              <button
                key={link.title}
                onClick={() => handleNavClick(link.ref)}
                className="text-white hover:text-red-600 transition-colors duration-300 text-lg font-medium py-2"
              >
                {link.title}
              </button>
            ))}
            <div className="pt-4">
              <CTAButton onClick={() => handleNavClick(sectionRefs.contact)}>Agendar Vistoria</CTAButton>
            </div>
          </nav>
        </div>
      )}

      {isEditorOpen && content && (
        <ImageEditorModal
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          onSave={handleSaveLogo}
          initialImageSrc={content.logo.src}
        />
      )}
    </header>
  );
};

export default Header;