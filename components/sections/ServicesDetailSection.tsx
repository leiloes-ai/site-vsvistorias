import React, { useState } from 'react';
import CTAButton from '../CTAButton';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { AppImages } from '../../assets/images';
import ImageEditorModal from '../ImageEditorModal';
import { useEditMode } from '../../contexts/EditModeContext';

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
    const { isEditMode } = useEditMode();

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

const initialServicesData = [
  {
    title: 'Laudo ECV SP',
    description: 'A Vistoria de Identificação Veicular (ECV) é obrigatória em processos de transferência em São Paulo. Verificamos a autenticidade dos itens de identificação do veículo (chassi, motor, placas) e sua conformidade com o padrão do fabricante e o registro nacional.',
    benefits: ['Conformidade total com a legislação de SP.', 'Segurança contra fraudes e adulterações.', 'Agilidade no processo de transferência.'],
    imageUrl: AppImages.services.ecvSp.src,
    imageAlt: AppImages.services.ecvSp.alt,
    reverse: false,
  },
  {
    title: 'Vistoria Transferencia GO',
    description: 'Realizamos a Vistoria de Transferência em conformidade com as exigências do DETRAN-GO. O laudo atesta a autenticidade dos itens de identificação e as condições do veículo, sendo indispensável para a regularização no estado.',
    benefits: ['Atendimento completo às normas do DETRAN-GO.', 'Processo de transferência rápido e sem burocracia.', 'Laudo oficial para regularização do veículo em Goiás.'],
    imageUrl: AppImages.services.transferenciaGo.src,
    imageAlt: AppImages.services.transferenciaGo.alt,
    reverse: true,
  },
  {
    title: 'Vistoria Cautelar',
    description: 'Uma análise minuciosa que vai além da identificação, avaliando a estrutura, originalidade de pintura, pontos de solda, e histórico de sinistros. Ideal para quem busca segurança máxima na compra de um veículo seminovo.',
    benefits: ['Identificação de reparos estruturais e avarias.', 'Prevenção de prejuízos com veículos sinistrados.', 'Maior poder de negociação na compra e venda.'],
    imageUrl: AppImages.services.cautelar.src,
    imageAlt: AppImages.services.cautelar.alt,
    reverse: false,
  },
   {
    title: 'Vistorias Lacrada',
    description: 'Serviço especializado na inspeção de lacres e selos de segurança em veículos de carga, frotas e contêineres, assegurando a inviolabilidade e conformidade do transporte. Essencial para logística e segurança.',
    benefits: ['Garante a integridade da carga transportada.', 'Previne fraudes e violações durante o trajeto.', 'Assegura conformidade com normas de transporte e seguro.'],
    imageUrl: AppImages.services.lacrada.src,
    imageAlt: AppImages.services.lacrada.alt,
    reverse: true,
  },
  {
    title: 'Precificação Veicular',
    description: 'Utilizamos metodologia técnica e análise de mercado para determinar o valor justo de um veículo. Consideramos fatores como conservação, quilometragem, opcionais e demanda, fornecendo um laudo preciso para negociações.',
    benefits: ['Avaliação imparcial e baseada em dados.', 'Base sólida para negociações de compra, venda ou seguro.', 'Evita perdas financeiras por avaliações incorretas.'],
    imageUrl: AppImages.services.precificacao.src,
    imageAlt: AppImages.services.precificacao.alt,
    reverse: false,
  },
  {
    title: 'Atendimento para Frotas e Leilões',
    description: 'Oferecemos soluções customizadas para empresas, frotistas e casas de leilão. Nossos processos padronizados e atendimento ágil garantem a gestão eficiente e a segurança jurídica na avaliação de grandes volumes de veículos.',
    benefits: ['Processos otimizados para alto volume.', 'Padronização e controle de qualidade.', 'Laudos detalhados para suporte em leilões e gestão de frotas.'],
    imageUrl: AppImages.services.frotasLeiloes.src,
    imageAlt: AppImages.services.frotasLeiloes.alt,
    reverse: true,
  },
];


const ServicesDetailSection: React.FC<ServicesDetailSectionProps> = ({ onScheduleClick }) => {
    const [headerRef, isHeaderVisible] = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });
    const [services, setServices] = useState(initialServicesData);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingImage, setEditingImage] = useState<{ index: number; src: string } | null>(null);

    const handleEditImage = (index: number, src: string) => {
        setEditingImage({ index, src });
        setIsEditorOpen(true);
    };

    const handleSaveImage = (newImageUrl: string) => {
        if (editingImage) {
            const updatedServices = [...services];
            updatedServices[editingImage.index] = { ...updatedServices[editingImage.index], imageUrl: newImageUrl };
            setServices(updatedServices);
        }
        setIsEditorOpen(false);
        setEditingImage(null);
    };

    const handleCloseEditor = () => {
        setIsEditorOpen(false);
        setEditingImage(null);
    }

  return (
    <section className="bg-slate-900 py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div ref={headerRef} className={`text-center mb-16 fade-in-up ${isHeaderVisible ? 'is-visible' : ''}`}>
          <h2 className="text-4xl font-bold text-white mb-4">Serviços Especializados</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Cada serviço é executado com rigor técnico e atenção aos detalhes, proporcionando a clareza e a segurança que você precisa.
          </p>
        </div>
        <div className="space-y-24">
          {services.map((service, index) => (
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