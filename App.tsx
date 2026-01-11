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
import { EditableContentProvider, useEditableContent } from './contexts/EditableContentContext';
import AdminPanel from './components/AdminPanel';

export interface SectionRefs {
  home: React.RefObject<HTMLDivElement>;
  about: React.RefObject<HTMLDivElement>;
  services: React.RefObject<HTMLDivElement>;
  howItWorks: React.RefObject<HTMLDivElement>;
  differentiators: React.RefObject<HTMLDivElement>;
  testimonials: React.RefObject<HTMLDivElement>;
  contact: React.RefObject<HTMLDivElement>;
}

const AppContent: React.FC = () => {
  const { isEditMode, content, loading } = useEditableContent();
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

  const handleViewServicesClick = () => {
    scrollToSection(sectionRefs.services);
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
            <div className="text-2xl font-bold">Carregando V.S Vistorias...</div>
        </div>
    );
  }

  return (
    <div className="bg-white text-gray-800">
      <Header sectionRefs={sectionRefs} scrollToSection={scrollToSection} />
      <main>
        <div ref={sectionRefs.home}>
          <HeroSection onScheduleClick={handleScheduleClick} />
        </div>
        <ClientsSection />
        <ServicesHighlightSection onViewServicesClick={handleViewServicesClick}/>
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
      {isEditMode && <AdminPanel />}
    </div>
  );
}


const App: React.FC = () => {
  return (
    <EditableContentProvider>
      <AppContent />
    </EditableContentProvider>
  );
};


export default App;