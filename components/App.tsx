import React, { useRef, useState, useEffect } from 'react';
import Header from './Header';
import HeroSection from './sections/HeroSection';
import ClientsSection from './sections/ClientsSection';
import ServicesHighlightSection from './sections/ServicesHighlightSection';
import AboutSection from './sections/AboutSection';
import StatsSection from './sections/StatsSection';
import HowItWorksSection from './sections/HowItWorksSection';
import DifferentiatorsSection from './sections/DifferentiatorsSection';
import ServicesDetailSection from './sections/ServicesDetailSection';
import TestimonialsSection from './sections/TestimonialsSection';
import ContactSection from './sections/ContactSection';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import { EditableContentProvider, useEditableContent } from '../contexts/EditableContentContext';
import AdminPanel from './AdminPanel';
import WorkWithUsModal from './WorkWithUsModal';
import ContactUsModal from './ContactUsModal';

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
  const [isWorkWithUsModalOpen, setIsWorkWithUsModalOpen] = useState(false);
  const [isContactUsModalOpen, setIsContactUsModalOpen] = useState(false);
  
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
            <div className="text-2xl font-bold italic">Carregando V.S Vistorias...</div>
        </div>
    );
  }

  return (
    <div className="bg-white text-gray-800">
      <Header 
        sectionRefs={sectionRefs} 
        scrollToSection={scrollToSection} 
        onScheduleClick={handleScheduleClick}
        onWorkWithUsClick={() => setIsWorkWithUsModalOpen(true)}
        onContactUsClick={() => setIsContactUsModalOpen(true)}
      />
      <main>
        <div ref={sectionRefs.home}>
          <HeroSection onScheduleClick={handleScheduleClick} />
        </div>
        <ClientsSection />
        <ServicesHighlightSection onViewServicesClick={handleViewServicesClick}/>
        <div ref={sectionRefs.about} className="scroll-target">
          <AboutSection />
        </div>
        <StatsSection />
        <div ref={sectionRefs.services} className="scroll-target">
          <ServicesDetailSection onScheduleClick={handleScheduleClick}/>
        </div>
        <div ref={sectionRefs.howItWorks} className="scroll-target">
          <HowItWorksSection />
        </div>
        <div ref={sectionRefs.differentiators} className="scroll-target">
          <DifferentiatorsSection />
        </div>
        <div ref={sectionRefs.testimonials} className="scroll-target">
          <TestimonialsSection />
        </div>
        <div ref={sectionRefs.contact} className="scroll-target">
          <ContactSection />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      {isEditMode && <AdminPanel />}
      <WorkWithUsModal 
        isOpen={isWorkWithUsModalOpen} 
        onClose={() => setIsWorkWithUsModalOpen(false)} 
      />
       <ContactUsModal
        isOpen={isContactUsModalOpen}
        onClose={() => setIsContactUsModalOpen(false)}
      />
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