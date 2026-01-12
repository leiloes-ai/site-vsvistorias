import React from 'react';
import CTAButton from '../CTAButton';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { useEditableContent } from '../../contexts/EditableContentContext';

const ContactSection: React.FC = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const { content } = useEditableContent();
  
  if (!content) return null;

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const serviceType = formData.get('service');
    alert(`Solicitação para "${serviceType}" enviada com sucesso! Nossa equipe entrará em contato em breve.`);
    e.currentTarget.reset();
  };

  return (
    <section ref={sectionRef} className="bg-gray-50 py-20 text-gray-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 fade-in-up ${isVisible ? 'is-visible' : ''}`}>
          <h2 className="text-4xl font-bold mb-4">Entre em Contato</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Pronto para garantir a segurança do seu veículo? Fale com nossos especialistas. Preencha o formulário ou entre em contato via WhatsApp.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: Form */}
            <form 
              onSubmit={handleFormSubmit} 
              className={`bg-white p-8 rounded-2xl shadow-xl border border-gray-200 space-y-4 fade-in-up flex flex-col ${isVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: '150ms' }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Agende Sua Vistoria</h3>
              <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                  <input type="text" name="name" id="name" required className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all" />
              </div>
              <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" name="email" id="email" required className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all" />
              </div>
              <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
                  <input type="tel" name="phone" id="phone" required className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all" />
              </div>
              <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Modalidade de Vistoria</label>
                  <select 
                      id="service"
                      name="service"
                      required
                      defaultValue=""
                      className="mt-1 block w-full appearance-none px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                      style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: 'right 0.5rem center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '1.5em 1.5em',
                          paddingRight: '2.5rem',
                      }}
                  >
                      <option value="" disabled>Selecione o serviço de interesse</option>
                      {content.services.map((service, index) => (
                          <option key={index} value={service.title}>{service.title}</option>
                      ))}
                  </select>
              </div>
              <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensagem (opcional)</label>
                  <textarea name="message" id="message" rows={3} className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"></textarea>
              </div>
              <div className="pt-2 mt-auto">
                  <CTAButton type="submit" onClick={() => {}} className="w-full !py-4">
                      Enviar Solicitação
                  </CTAButton>
              </div>
            </form>

            {/* Right Column: Info + Map */}
            <div className="space-y-8">
              <div className={`bg-white p-8 rounded-2xl shadow-xl border border-gray-200 space-y-4 fade-in-up ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '300ms' }}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Nossas Informações</h3>
                  <div>
                      <h4 className="text-lg font-bold text-red-600 mb-2">Contato Direto</h4>
                      <p className="text-gray-700 mb-1 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                          contato@vsvistorias.com.br
                      </p>
                      <p className="text-gray-700 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                          (62) 99554-3173
                      </p>
                  </div>
                  <div className="pt-2">
                      <h4 className="text-lg font-bold text-red-600 mb-2">Endereço</h4>
                      <p className="text-gray-700 flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          Avenida Uru, N° 63, St. dos Afonsos, Goiânia- GO
                      </p>
                  </div>
              </div>
              <div className={`h-80 lg:h-[400px] w-full bg-gray-300 rounded-lg shadow-md overflow-hidden border-4 border-white fade-in-up ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '450ms' }}>
                <iframe
                  src={content.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  title="Mapa de Localização V.S Vistorias"
                ></iframe>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;