import { AppImages } from './images';

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

export const initialContent = {
  heroBackground: AppImages.heroBackground,
  aboutTeam: AppImages.aboutTeam,
  services: initialServicesData,
};
