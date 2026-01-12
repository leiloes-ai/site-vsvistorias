import React, { useState, useEffect } from 'react';
import CTAButton from './CTAButton';

interface ContactUsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactUsModal: React.FC<ContactUsModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsSubmitted(false); // Reset form state when opened
            setFormData({ name: '', email: '', phone: '', message: '' });
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            console.log('Contact form submitted:', formData);
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
            <div 
                className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale" 
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Fale Conosco</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-full -mr-2 -mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                
                <div className="p-8 flex-grow overflow-y-auto">
                    {isSubmitted ? (
                        <div className="text-center py-10">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full mx-auto flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Mensagem Enviada!</h3>
                            <p className="text-gray-600 mb-6">Obrigado pelo seu contato! Nossa equipe retornará em breve.</p>
                            <CTAButton onClick={onClose} className="w-full">Fechar</CTAButton>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                             <div>
                                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                                <input type="text" name="name" id="contact-name" required className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all" value={formData.name} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" name="email" id="contact-email" required className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all" value={formData.email} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
                                <input type="tel" name="phone" id="contact-phone" required className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all" value={formData.phone} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                                <textarea name="message" id="contact-message" required rows={4} className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all" value={formData.message} onChange={handleChange}></textarea>
                            </div>
                            <div className="pt-2">
                                <CTAButton type="submit" onClick={() => {}} className="w-full !py-4" disabled={isSubmitting}>
                                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                                </CTAButton>
                            </div>
                        </form>
                    )}
                </div>
            </div>
            <style>{`
                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in-scale {
                    animation: fadeInScale 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </div>
    );
};

export default ContactUsModal;