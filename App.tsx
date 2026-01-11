import React, { useRef } from 'react';
import Header from './components/Header';
import HeroSection from './components/sections/HeroSection';
import ClientsSection from './components/sections/ClientsSection';
import ServicesHighlightSection from './components/sections/ServicesHighlightSection';
import AboutSection from './components/sections/AboutSection';
import StatsSection from './components/sections/StatsSection';
import HowItWorksSection from './components/sections/HowItWorksSection';
import DifferentiatorsSection from './components/sections/DifferentiatorsSection';
import ServicesDetailSection from './components/sections/ServicesDetailSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export interface SectionRefs {
  home: React.RefObject<HTMLDivElement>;
  about: React.RefObject<HTMLDivElement>;
  services: React.RefObject<HTMLDivElement>;
  howItWorks: React.RefObject<HTMLDivElement>;
  differentiators: React.RefObject<HTMLDivElement>;
  testimonials: React.RefObject<HTMLDivElement>;
  contact: React.RefObject<HTMLDivElement>;
}

const App: React.FC = () => {
  const sectionRefs: SectionRefs = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    services: useRef<HTMLDivElement>(null),
    howItWorks: useRef<HTMLDivElement>(null),
    differentiators: useRef<HTMLDivElement>(null),
    testimonials: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  const handleScheduleClick = () => {
    scrollToSection(sectionRefs.contact);
  };

  return (
    <div className="bg-white text-gray-800">
      <Header sectionRefs={sectionRefs} scrollToSection={scrollToSection} />
      <main>
        <div ref={sectionRefs.home}>
          <HeroSection onScheduleClick={handleScheduleClick} />
        </div>
        <ClientsSection />
        <ServicesHighlightSection onScheduleClick={handleScheduleClick}/>
        <div ref={sectionRefs.about}>
          <AboutSection />
        </div>
        <StatsSection />
        <div ref={sectionRefs.services}>
          <ServicesDetailSection onScheduleClick={handleScheduleClick}/>
        </div>
        <div ref={sectionRefs.howItWorks}>
          <HowItWorksSection />
        </div>
        <div ref={sectionRefs.differentiators}>
          <DifferentiatorsSection />
        </div>
        <div ref={sectionRefs.testimonials}>
          <TestimonialsSection />
        </div>
        <div ref={sectionRefs.contact}>
          <ContactSection />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default App;
