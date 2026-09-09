export type Projeto = {
  nome: string;
  tipo: string;
  descricao: string;
  capa: string;
  /** Endereço público. Ausente quando o projeto não está publicado ou é interno. */
  url?: string;
  /** Motivo de não haver janela ao vivo. Só existe quando `url` está ausente. */
  restricao?: string;
  categoria: "Site de negócio" | "Produto digital" | "Sistema interno" | "Conceito";
};

/**
 * Endereços verificados por requisição HTTP em 08/09/2026: todos responderam
 * 200 e nenhum envia X-Frame-Options ou frame-ancestors, então a janela ao
 * vivo funciona. Os dois sem `url` foram verificados no mesmo dia.
 */
export const projetos: Projeto[] = [
  {
    nome: "Pousada da Nívea",
    tipo: "Hotelaria",
    descricao:
      "Site de hospedagem com apresentação dos quartos, localização e contato direto pelo WhatsApp.",
    capa: "/capas/pousada-da-nivea.png",
    url: "https://pousadadanivea.vercel.app",
    categoria: "Site de negócio",
  },
  {
    nome: "Barbearia Buenos Aires",
    tipo: "Barbearia · Centro de São Paulo",
    descricao:
      "Institucional com serviços, equipe e agendamento. Barbearia clássica na Quirino de Andrade.",
    capa: "/capas/barbearia-buenos-aires.png",
    url: "https://barbearia-buenos-aires.vercel.app",
    categoria: "Site de negócio",
  },
  {
    nome: "Care For Men",
    tipo: "Barbearia premium · Jardins",
    descricao:
      "Barbearia de alto padrão. Estética escura, foco em experiência e reserva de horário.",
    capa: "/capas/care-for-men.png",
    url: "https://care-for-men.vercel.app",
    categoria: "Site de negócio",
  },
  {
    nome: "Ana Magalhães",
    tipo: "Biomedicina estética · São Paulo",
    descricao:
      "Institucional de estética facial e corporal, com procedimentos, resultados e contato.",
    capa: "/capas/ana-magalhaes.png",
    url: "https://ana-magalhaes.vercel.app",
    categoria: "Site de negócio",
  },
  {
    nome: "Maria Flor",
    tipo: "Moda feminina",
    descricao:
      "Vitrine de moda com catálogo visual e atendimento direto pelo WhatsApp.",
    capa: "/capas/maria-flor.png",
    url: "https://maria-flor.vercel.app",
    categoria: "Site de negócio",
  },
  {
    nome: "Imobilis Momentom",
    tipo: "Imóveis de alto padrão · Fortaleza",
    descricao:
      "Apresentação editorial de imóveis de altíssimo padrão, com navegação cinematográfica.",
    capa: "/capas/imobilis-momentum.png",
    url: "https://imobilis-momentum.vercel.app",
    categoria: "Conceito",
  },
  {
    nome: "Apoio ao Autismo",
    tipo: "Tecnologia assistiva",
    descricao:
      "Landing do aplicativo de comunicação e rotina para famílias e terapeutas.",
    capa: "/capas/apoio-autismo.png",
    url: "https://apoio-autismo.vercel.app",
    categoria: "Produto digital",
  },
  {
    nome: "Arsenal de Prompts",
    tipo: "Infoproduto",
    descricao:
      "Página de venda do pacote de prompts para social media, com oferta e checkout.",
    capa: "/capas/arsenal-de-prompts.png",
    url: "https://arsenal-de-prompts.vercel.app",
    categoria: "Produto digital",
  },
  {
    nome: "Viveci App",
    tipo: "Aplicativo de treinos · Área logada",
    descricao:
      "Aplicativo de treino com área do aluno, ficha e acompanhamento de evolução.",
    capa: "/capas/viveci-app.jpg",
    url: "https://viveci-app.vercel.app",
    categoria: "Produto digital",
  },
  {
    nome: "Prospector",
    tipo: "Prospecção · Sistema próprio",
    descricao:
      "Ferramenta de prospecção que encontra negócios sem site e organiza a abordagem.",
    capa: "/capas/prospector.png",
    url: "https://prospector.vercel.app",
    categoria: "Sistema interno",
  },
  {
    nome: "Agenda Viveci",
    tipo: "CRM e agenda · Sistema interno",
    descricao:
      "Command Center com CRM, quadro de tarefas e agenda. Uso interno do estúdio.",
    capa: "/capas/agenda-viveci.jpg",
    restricao: "Acesso restrito — exige login",
    categoria: "Sistema interno",
  },
  {
    nome: "Pare a Queda",
    tipo: "Infoproduto",
    descricao:
      "Material sobre queda de cabelo, com página de oferta e criativos de anúncio.",
    capa: "/capas/calvicie.png",
    restricao: "Ainda não publicado",
    categoria: "Produto digital",
  },
];

export const categorias = [
  "Todos",
  "Site de negócio",
  "Produto digital",
  "Sistema interno",
  "Conceito",
] as const;
