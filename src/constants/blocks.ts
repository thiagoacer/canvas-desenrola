import { BlockHelpContent } from '@/types/canvas';

export interface BlockDefinition {
  id: string;
  title: string;
  subtitle: string;
  helpContent: BlockHelpContent;
}

export const CANVAS_BLOCKS: BlockDefinition[] = [
  {
    id: 'atividades-principais',
    title: 'Atividades Principais',
    subtitle: 'O que entrego...',
    helpContent: {
      explanation: 'Descreva as principais atividades que seu negócio realiza para entregar valor aos clientes.',
      examples: ['Produção de produtos', 'Prestação de serviços', 'Consultoria especializada'],
      question: 'Quais são as atividades essenciais que fazem seu negócio funcionar?',
    },
  },
  {
    id: 'parcerias-fornecedores',
    title: 'Parcerias e Fornecedores',
    subtitle: 'Importantes',
    helpContent: {
      explanation: 'Liste os parceiros e fornecedores que são fundamentais para o funcionamento do seu negócio.',
      examples: ['Fornecedores de matéria-prima', 'Parceiros de distribuição', 'Prestadores de serviço'],
      question: 'Sem quais parceiros seu negócio não conseguiria operar?',
    },
  },
  {
    id: 'estrutura-minima',
    title: 'Estrutura Mínima',
    subtitle: 'Para fazer acontecer',
    helpContent: {
      explanation: 'Identifique os recursos mínimos necessários para seu negócio funcionar.',
      examples: ['Equipamentos', 'Espaço físico', 'Equipe mínima', 'Tecnologia'],
      question: 'O que você precisa ter, no mínimo, para começar a operar?',
    },
  },
  {
    id: 'solucoes-problemas',
    title: 'Soluções e Problemas',
    subtitle: 'Que a gente desenrola',
    helpContent: {
      explanation: 'Descreva os problemas que você resolve e as soluções que oferece aos clientes.',
      examples: ['Economia de tempo', 'Redução de custos', 'Aumento de produtividade'],
      question: 'Qual dor do cliente você alivia com seu produto ou serviço?',
    },
  },
  {
    id: 'fidelizacao-diferencial',
    title: 'Fidelização e Diferencial',
    subtitle: 'Como a gente se diferencia',
    helpContent: {
      explanation: 'Explique o que torna seu negócio único e como você mantém clientes fiéis.',
      examples: ['Atendimento personalizado', 'Qualidade superior', 'Preço competitivo'],
      question: 'Por que os clientes escolheriam você e não o concorrente?',
    },
  },
  {
    id: 'canais-divulgacao',
    title: 'Canais de Divulgação',
    subtitle: 'Onde vamos ser reconhecidos',
    helpContent: {
      explanation: 'Liste os canais que você usa para alcançar e se comunicar com seus clientes.',
      examples: ['Redes sociais', 'Site próprio', 'Indicações', 'Eventos'],
      question: 'Onde seus clientes ideais passam tempo e buscam informações?',
    },
  },
  {
    id: 'publico-alvo',
    title: 'Público-Alvo',
    subtitle: 'Onde estão e características',
    helpContent: {
      explanation: 'Defina quem são seus clientes ideais e suas características principais.',
      examples: ['Faixa etária', 'Localização', 'Interesses', 'Poder aquisitivo'],
      question: 'Quem é a pessoa que mais precisa do que você oferece?',
    },
  },
  {
    id: 'custos-margem',
    title: 'Custos e Margem',
    subtitle: 'Para garantir lucro',
    helpContent: {
      explanation: 'Identifique seus principais custos e defina suas margens de lucro.',
      examples: ['Custos fixos', 'Custos variáveis', 'Margem de lucro desejada'],
      question: 'Você sabe exatamente quanto custa entregar seu produto ou serviço?',
    },
  },
  {
    id: 'ambicao-metas',
    title: 'Ambição e Metas',
    subtitle: 'O que queremos atingir',
    helpContent: {
      explanation: 'Defina seus objetivos e metas de curto, médio e longo prazo.',
      examples: ['Faturamento mensal', 'Número de clientes', 'Expansão territorial'],
      question: 'Onde você quer que seu negócio esteja daqui a 1 ano?',
    },
  },
];

export const BLOCK_IDS = CANVAS_BLOCKS.map((block) => block.id);
