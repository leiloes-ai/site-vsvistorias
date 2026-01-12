import React, { useState } from 'react';
import CTAButton from '../CTAButton';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { useEditableContent } from '../../contexts/EditableContentContext';

const ContactSection: React.FC = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const { content } = useEditableContent();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle form submission, e.g., send to an API
    alert('Obrigado pelo seu contato! Em breve retornaremos.');
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };
  
  if (!content) return null;

  return (
    <section ref={sectionRef} className="bg-gray-50 py-20 text-gray-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 fade-in-up ${isVisible ? 'is-visible' : ''}`}>
          <h2 className="text-4xl font-bold mb-4">Agende Sua Vistoria</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Pronto para garantir a segurança do seu veículo? Fale com nossos especialistas. Preencha o formulário ou entre em contato via WhatsApp.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className={`space-y-6 fade-in-up ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '150ms' }}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
              <input type="text" name="name" id="name" required className="mt-1 block w-full px-4 py-3 bg-white border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" value={formData.name} onChange={handleChange} />
            </div>
             <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" id="email" required className="mt-1 block w-full px-4 py-3 bg-white border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" value={formData.email} onChange={handleChange} />
            </div>
             <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone / WhatsApp</label>
              <input type="tel" name="phone" id="phone" required className="mt-1 block w-full px-4 py-3 bg-white border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" value={formData.phone} onChange={handleChange} />
            </div>
             <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700">Serviço Desejado</label>
              <select name="service" id="service" required className="mt-1 block w-full px-4 py-3 bg-white border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" value={formData.service} onChange={handleChange}>
                <option value="">Selecione um serviço</option>
                <option value="ecv-sp">Laudo ECV SP</option>
                <option value="transferencia-go">Vistoria Transferencia GO</option>
                <option value="cautelar">Vistoria Cautelar</option>
                <option value="lacrada">Vistorias Lacrada</option>
                <option value="precificacao">Precificação Veicular</option>
                <option value="frotas">Atendimento para Frotas</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensagem</label>
              <textarea name="message" id="message" rows={4} className="mt-1 block w-full px-4 py-3 bg-white border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" value={formData.message} onChange={handleChange}></textarea>
            </div>
            <div>
              <CTAButton type="submit" onClick={() => {}} className="w-full">Enviar Agendamento</CTAButton>
            </div>
          </form>

          <div className={`space-y-8 fade-in-up ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '300ms' }}>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-red-600 mb-2">Informações de Contato</h3>
                <p className="text-gray-700 mb-1"><strong>Email:</strong> contato@vsvistorias.com.br</p>
                <p className="text-gray-700"><strong>Telefone:</strong> (62) 99554 3173</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-red-600 mb-2">Endereço</h3>
                <p className="text-gray-700">Avenida Uru, N° 63, St. dos Afonsos, Goiânia- GO</p>
            </div>
            <div className="w-full h-80 bg-gray-300 rounded-lg shadow-md overflow-hidden border-4 border-white">
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