import React, { useState, useEffect } from 'react';
import type { SectionRefs } from '../App';
import CTAButton from './CTAButton';

interface HeaderProps {
  sectionRefs: SectionRefs;
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ sectionRefs, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


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
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/90 backdrop-blur-sm shadow-xl' : 'bg-gray-900'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-red-600">
          V.S Vistorias
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
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-800/95 backdrop-blur-sm">
          <nav className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map((link) => (
              <button
                key={link.title}
                onClick={() => handleNavClick(link.ref)}
                className="text-white hover:text-red-600 transition-colors duration-300 font-medium py-2"
              >
                {link.title}
              </button>
            ))}
            <CTAButton onClick={() => handleNavClick(sectionRefs.contact)}>Agendar Vistoria</CTAButton>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;