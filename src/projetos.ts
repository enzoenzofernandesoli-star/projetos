/**
 * Os cinco serviços da casa. Quatro vêm da seção de serviços do site
 * principal — Sites, Visibilidade, Sistemas e Suporte — e "Sistemas" foi
 * desdobrado em Aplicativos e Sistemas, que são vendas diferentes: um é
 * produto para o cliente final, o outro é ferramenta de operação.
 */
export const servicos = [
  {
    id: "sites",
    nome: "Sites",
    resumo: "Sites e landing pages. Identidade visual, imagens e textos.",
  },
  {
    id: "aplicativos",
    nome: "Aplicativos",
    resumo: "Produtos digitais com área logada, para web e celular.",
  },
  {
    id: "sistemas",
    nome: "Sistemas",
    resumo: "Gestão, automações e integrações sob medida.",
  },
  {
    id: "visibilidade",
    nome: "Visibilidade",
    resumo: "Google, Maps e SEO. Presença nas buscas e análise de resultados.",
  },
  {
    id: "suporte",
    nome: "Suporte",
    resumo: "Manutenção e atualizações. Atendimento por WhatsApp após a entrega.",
  },
] as const;

export type ServicoId = (typeof servicos)[number]["id"];

export type Projeto = {
  nome: string;
  tipo: string;
  descricao: string;
  servico: ServicoId;
  /** Captura de tela. Ausente nos itens ilustrativos, que ganham um painel. */
  capa?: string;
  /** Endereço público. Ausente quando o projeto não está publicado ou é interno. */
  url?: string;
  /** Motivo de não haver janela ao vivo. Só existe quando `url` está ausente. */
  restricao?: string;
  /**
   * Item ilustrativo, criado para a aba não ficar vazia. NÃO é trabalho
   * entregue a cliente. Para tirar todos de uma vez:
   * `projetos.filter((p) => !p.ilustrativo)`.
   */
  ilustrativo?: boolean;
};

/**
 * Endereços verificados em 08/09/2026 por requisição HTTP: respondem 200,
 * não enviam X-Frame-Options nem frame-ancestors, e — isto é o que importa —
 * o conteúdo devolvido cita o nome do próprio projeto.
 *
 * Só o status não serve de prova. `prospector.vercel.app` responde 200 e
 * pertence a outra empresa: um jogo. Endereço curto em domínio compartilhado
 * quase sempre já tem dono, então confira o corpo da resposta antes de
 * apontar um card para ele.
 */
export const projetos: Projeto[] = [
  // ---------------- Sites ----------------
  {
    nome: "Pousada da Nívea",
    tipo: "Hotelaria",
    descricao:
      "Site de hospedagem com apresentação dos quartos, localização e contato direto pelo WhatsApp.",
    servico: "sites",
    capa: "/capas/pousada-da-nivea.png",
    url: "https://pousadadanivea.vercel.app",
  },
  {
    nome: "Barbearia Buenos Aires",
    tipo: "Barbearia · Centro de São Paulo",
    descricao:
      "Institucional com serviços, equipe e agendamento. Barbearia clássica na Quirino de Andrade.",
    servico: "sites",
    capa: "/capas/barbearia-buenos-aires.png",
    url: "https://barbearia-buenos-aires.vercel.app",
  },
  {
    nome: "Care For Men",
    tipo: "Barbearia premium · Jardins",
    descricao:
      "Barbearia de alto padrão. Estética escura, foco em experiência e reserva de horário.",
    servico: "sites",
    capa: "/capas/care-for-men.png",
    url: "https://care-for-men.vercel.app",
  },
  {
    nome: "Ana Magalhães",
    tipo: "Biomedicina estética · São Paulo",
    descricao:
      "Institucional de estética facial e corporal, com procedimentos, resultados e contato.",
    servico: "sites",
    capa: "/capas/ana-magalhaes.png",
    url: "https://ana-magalhaes.vercel.app",
  },
  {
    nome: "Maria Flor",
    tipo: "Moda feminina",
    descricao:
      "Vitrine de moda com catálogo visual e atendimento direto pelo WhatsApp.",
    servico: "sites",
    capa: "/capas/maria-flor.png",
    url: "https://maria-flor.vercel.app",
  },
  {
    nome: "Imobilis Momentom",
    tipo: "Imóveis de alto padrão · Fortaleza",
    descricao:
      "Apresentação editorial de imóveis de altíssimo padrão, com navegação cinematográfica.",
    servico: "sites",
    capa: "/capas/imobilis-momentum.png",
    url: "https://imobilis-momentum.vercel.app",
  },
  {
    nome: "Arsenal de Prompts",
    tipo: "Página de venda",
    descricao:
      "Landing do pacote de prompts para social media, com oferta, prova e checkout.",
    servico: "sites",
    capa: "/capas/arsenal-de-prompts.png",
    url: "https://arsenal-de-prompts.vercel.app",
  },
  {
    nome: "Pare a Queda",
    tipo: "Página de venda",
    descricao:
      "Material sobre queda de cabelo, com página de oferta e criativos de anúncio.",
    servico: "sites",
    capa: "/capas/calvicie.png",
    restricao: "Ainda não publicado",
  },

  // ---------------- Aplicativos ----------------
  {
    nome: "Viveci App",
    tipo: "Aplicativo de treinos · Área logada",
    descricao:
      "Aplicativo de treino com área do aluno, ficha e acompanhamento de evolução.",
    servico: "aplicativos",
    capa: "/capas/viveci-app.jpg",
    url: "https://viveci-app.vercel.app",
  },
  {
    nome: "Apoio ao Autismo",
    tipo: "Tecnologia assistiva",
    descricao:
      "Aplicativo de comunicação e rotina para famílias e terapeutas, com landing e APK.",
    servico: "aplicativos",
    capa: "/capas/apoio-autismo.png",
    url: "https://apoio-autismo.vercel.app",
  },
  {
    nome: "Clube do Aluno",
    tipo: "Área de membros",
    descricao:
      "Área logada para venda de acesso recorrente: aulas, materiais e progresso do assinante.",
    servico: "aplicativos",
    restricao: "Exemplo do que entregamos",
    ilustrativo: true,
  },

  // ---------------- Sistemas ----------------
  {
    nome: "Prospector",
    tipo: "Prospecção · Sistema próprio",
    descricao:
      "Ferramenta que encontra negócios sem site, organiza a abordagem e dispara em sequência.",
    servico: "sistemas",
    capa: "/capas/prospector.png",
    restricao: "Acesso restrito — exige login",
  },
  {
    nome: "Agenda Viveci",
    tipo: "CRM e agenda · Sistema interno",
    descricao:
      "Command Center com CRM, quadro de tarefas e agenda. Uso interno do estúdio.",
    servico: "sistemas",
    capa: "/capas/agenda-viveci.jpg",
    restricao: "Acesso restrito — exige login",
  },
  {
    nome: "Agendamento com confirmação",
    tipo: "Automação de atendimento",
    descricao:
      "Cliente marca horário pelo site e recebe confirmação e lembrete no WhatsApp, sem ninguém digitar.",
    servico: "sistemas",
    restricao: "Exemplo do que entregamos",
    ilustrativo: true,
  },
  {
    nome: "Painel de pedidos",
    tipo: "Gestão sob medida",
    descricao:
      "Quadro de pedidos com status, responsável e histórico, integrado ao que o negócio já usa.",
    servico: "sistemas",
    restricao: "Exemplo do que entregamos",
    ilustrativo: true,
  },

  // ---------------- Visibilidade ----------------
  {
    nome: "Perfil no Google",
    tipo: "Google Empresas e Maps",
    descricao:
      "Ficha completa, fotos, horário, serviços e avaliações — para o negócio aparecer na busca do bairro.",
    servico: "visibilidade",
    restricao: "Exemplo do que entregamos",
    ilustrativo: true,
  },
  {
    nome: "SEO local",
    tipo: "Busca orgânica",
    descricao:
      "Estrutura, títulos e conteúdo pensados para as buscas que trazem cliente da região.",
    servico: "visibilidade",
    restricao: "Exemplo do que entregamos",
    ilustrativo: true,
  },
  {
    nome: "Relatório de resultados",
    tipo: "Análise mensal",
    descricao:
      "Quantas pessoas acharam o site, por onde chegaram e quantas foram para o WhatsApp.",
    servico: "visibilidade",
    restricao: "Exemplo do que entregamos",
    ilustrativo: true,
  },

  // ---------------- Suporte ----------------
  {
    nome: "Manutenção mensal",
    tipo: "Depois da entrega",
    descricao:
      "Atualização de conteúdo, fotos e preços sempre que o negócio muda. Sem fila e sem chamado.",
    servico: "suporte",
    restricao: "Exemplo do que entregamos",
    ilustrativo: true,
  },
  {
    nome: "Atendimento no WhatsApp",
    tipo: "Canal direto",
    descricao:
      "Falar com quem fez o site, não com um suporte genérico. Ajuste pequeno sai no mesmo dia.",
    servico: "suporte",
    restricao: "Exemplo do que entregamos",
    ilustrativo: true,
  },
];
