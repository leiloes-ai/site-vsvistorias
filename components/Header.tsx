import React, { useState, useEffect } from 'react';
import type { SectionRefs } from './App';
import CTAButton from './CTAButton';
import { useEditableContent } from '../contexts/EditableContentContext';
import ImageEditorModal from './ImageEditorModal';

interface HeaderProps {
  sectionRefs: SectionRefs;
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
  onScheduleClick: () => void;
  onWorkWithUsClick: () => void;
  onContactUsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ sectionRefs, scrollToSection, onScheduleClick, onWorkWithUsClick, onContactUsClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isEditMode, content, setContent } = useEditableContent();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isContactMenuOpen, setIsContactMenuOpen] = useState(false);
  const [isMobileContactOpen, setIsMobileContactOpen] = useState(false);

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
    { title: 'Qualidade', ref: sectionRefs.differentiators },
  ];

  const handleNavClick = (ref: React.RefObject<HTMLDivElement>) => {
    scrollToSection(ref);
    setIsMenuOpen(false);
  };

  const handleScheduleAndCloseMenu = () => {
    onScheduleClick();
    setIsMenuOpen(false);
  };
  
  const handleWorkWithUsAndCloseMenu = () => {
    onWorkWithUsClick();
    setIsMenuOpen(false);
    setIsContactMenuOpen(false);
  };
  
  const handleContactUsAndCloseMenu = () => {
    onContactUsClick();
    setIsMenuOpen(false);
    setIsContactMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-lg shadow-xl border-b border-white/10' : 'bg-gray-900'}`}>
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
        <div className="relative flex items-center group">
          <button 
            onClick={() => handleNavClick(sectionRefs.home)} 
            className="flex items-center gap-4 text-2xl md:text-3xl font-bold text-red-600 tracking-tight hover:text-red-500 transition-colors"
          >
            {content.logo && (
              <img 
                src={content.logo.src} 
                alt={content.logo.alt} 
                className="h-16 md:h-20 w-auto object-contain" 
              />
            )}
            <span className="hidden sm:inline">V.S Vistorias</span>
          </button>
          
          {isEditMode && (
            <button
              onClick={() => setIsEditorOpen(true)}
              className="ml-3 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-colors"
              title="Trocar Logo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              className="text-white hover:text-red-500 transition-colors duration-300 font-medium relative py-2 after:content-[''] after:absolute after:left-1/2 after:right-1/2 after:-bottom-0.5 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300 hover:after:left-0 hover:after:right-0"
            >
              {link.title}
            </button>
          ))}
          <div className="relative" onMouseEnter={() => setIsContactMenuOpen(true)} onMouseLeave={() => setIsContactMenuOpen(false)}>
            <button
              className="flex items-center gap-1 text-white hover:text-red-500 transition-colors duration-300 font-medium relative py-2 after:content-[''] after:absolute after:left-1/2 after:right-1/2 after:-bottom-0.5 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300 hover:after:left-0 hover:after:right-0"
            >
              Fale Conosco
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isContactMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {isContactMenuOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56">
                <div className="bg-gray-800 rounded-lg shadow-2xl border border-white/10 overflow-hidden">
                  <button onClick={handleContactUsAndCloseMenu} className="block w-full text-left px-4 py-3 text-sm text-white hover:bg-red-600/50 transition-colors">Fale Conosco</button>
                  <button onClick={handleWorkWithUsAndCloseMenu} className="block w-full text-left px-4 py-3 text-sm text-white hover:bg-red-600/50 transition-colors">Trabalhe Conosco</button>
                </div>
              </div>
            )}
          </div>
          <a 
            href="https://vsvistorias.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white font-medium border border-white/40 rounded-lg py-2 px-5 hover:bg-white/10 transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Área Restrita
          </a>
          <CTAButton onClick={onScheduleClick} className="py-2 px-5">Agendar</CTAButton>
        </nav>
        
        <div className="lg:hidden flex items-center gap-4">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none p-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-800/98 backdrop-blur-md absolute top-full left-0 w-full shadow-2xl">
          <nav className="flex flex-col items-center space-y-2 py-8">
            {navLinks.map((link) => (
              <button
                key={link.title}
                onClick={() => handleNavClick(link.ref)}
                className="text-white hover:text-red-600 transition-colors duration-300 text-lg font-medium py-3"
              >
                {link.title}
              </button>
            ))}
            <div>
                <button
                    onClick={() => setIsMobileContactOpen(!isMobileContactOpen)}
                    className="flex items-center gap-2 text-white hover:text-red-600 transition-colors duration-300 text-lg font-medium py-3"
                >
                    Fale Conosco
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${isMobileContactOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {isMobileContactOpen && (
                    <div className="flex flex-col items-center bg-gray-900/50 rounded-lg mt-1 py-2">
                        <button onClick={handleContactUsAndCloseMenu} className="text-white hover:text-red-600 transition-colors duration-300 text-base font-medium py-2">Fale Conosco</button>
                        <button onClick={handleWorkWithUsAndCloseMenu} className="text-white hover:text-red-600 transition-colors duration-300 text-base font-medium py-2">Trabalhe Conosco</button>
                    </div>
                )}
            </div>
            <a
              href="https://vsvistorias.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-2 text-white hover:text-red-600 transition-colors duration-300 text-lg font-medium py-2 border-t border-gray-700/50 mt-4 w-4/5 pt-6 text-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Área Restrita
            </a>
            <div className="pt-4">
              <CTAButton onClick={handleScheduleAndCloseMenu}>Agendar Vistoria</CTAButton>
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