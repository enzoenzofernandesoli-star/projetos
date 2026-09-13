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
  {
    id: "outros",
    nome: "Outros projetos",
    resumo: "Projetos recém-publicados aguardando classificação.",
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
  /** Endereço do projeto restrito: existe, mas não abre para o público. */
  dominio?: string;
  /** Entrou pelo sincronizador e ainda não passou por revisão humana. */
  revisar?: boolean;
  /** Data de entrada na vitrine. Novos projetos aparecem primeiro. */
  adicionadoEm?: string;
  /** Curadoria manual: maior valor coloca projetos mais fortes na frente. */
  prioridade?: number;
  /**
   * Conceito criado para a vitrine. NÃO é trabalho entregue a cliente. Fica
   * só no dado, sem aparecer para quem visita. Para separar depois:
   * `projetos.filter((p) => !p.ilustrativo)`.
   */
  ilustrativo?: boolean;
  /** Conceito: abre avisando que é exclusivo, em vez de carregar um site. */
  exclusivo?: boolean;
  /** Duas linhas da chamada desenhada na capa. */
  chamada?: [string, string];
  /** Arranjo da capa, para as ilustrações não se repetirem. */
  layout?: "editorial" | "central" | "galeria";
  /** Foto de fundo da capa. Licença livre para uso comercial. */
  imagem?: string;
  /** Fonte do conceito: cada um tem a sua, como teria um site de verdade. */
  fonte?: string;
  /** Conteúdo da página fictícia, para a capa parecer um site pronto. */
  pagina?: {
    menu: string[];
    kicker: string;
    sub: string;
    botoes: [string, string];
    prova: string;
  };
  paleta?: { fundo: string; campo: string; tinta: string; acento: string };
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
    url: "https://calvice.vercel.app",
  },

  {
    nome: "Sobrecarga",
    prioridade: 1,
    tipo: "Arena Neon · Entretenimento",
    descricao:
      "Arena de jogos com identidade neon, agenda de eventos e reserva de horário.",
    servico: "sites",
    capa: "/capas/sobrecarga.png",
    url: "https://sobrecarga-six.vercel.app",
  },
  {
    nome: "Mais Fruty",
    prioridade: 1,
    tipo: "Açaí e sorvete artesanal",
    descricao:
      "Fábrica de açaí e sorvete, com linha de produtos e contato direto para revenda.",
    servico: "sites",
    capa: "/capas/maisfruty.png",
    url: "https://maisfruty.vercel.app",
  },
  {
    nome: "Barbearia do Gordo",
    prioridade: 1,
    tipo: "Barbearia · Itaim Paulista",
    descricao:
      "Barbearia de bairro com serviços, equipe e agendamento pelo WhatsApp.",
    servico: "sites",
    capa: "/capas/shophaf.png",
    url: "https://shophaf.vercel.app",
  },
  {
    nome: "Viveci Vendas",
    prioridade: 1,
    tipo: "Controle de vendas · Sistema interno",
    descricao:
      "Painel de vendas do estúdio: propostas, fechamentos e acompanhamento.",
    servico: "sistemas",
    capa: "/capas/vvcvendas.png",
    url: "https://vvcvendas.vercel.app",
  },
  {
    nome: "Minuto Alfa",
    prioridade: 1,
    tipo: "Método de leitura",
    descricao:
      "Página do método de leitura em 21 dias, com a promessa, o passo a passo e a oferta.",
    servico: "sites",
    capa: "/capas/minutoalfa.png",
    url: "https://minutoalfa.vercel.app",
  },
  {
    nome: "TARGET Treinamento Funcional",
    prioridade: 1,
    tipo: "Academia · Bom Retiro, SP",
    descricao:
      "Funcional, musculação, pilates e boxe, com horários e planos na página.",
    servico: "sites",
    capa: "/capas/target-treinamento-funcional.png",
    url: "https://target-treinamento-funcional.vercel.app",
  },
  {
    nome: "Maria Flor Moda Festa",
    prioridade: 1,
    tipo: "Vestidos de festa · Bom Retiro, SP",
    descricao:
      "Vitrine de vestidos de festa, com catálogo visual e atendimento no WhatsApp.",
    servico: "sites",
    capa: "/capas/maria-flor-moda-festa-jwbd.png",
    url: "https://maria-flor-moda-festa-jwbd.vercel.app",
  },
  {
    nome: "VW7 Fisioterapia & Recovery",
    prioridade: 1,
    tipo: "Fisioterapia · São Paulo",
    descricao:
      "Fisioterapia ortopédica, esportiva e quiropraxia, com as duas unidades na página.",
    servico: "sites",
    capa: "/capas/vw-7-vdnf.png",
    url: "https://vw-7-vdnf.vercel.app",
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
    nome: "Clube Vértice",
    tipo: "Área de membros · Assinatura",
    descricao:
      "Plataforma de acesso recorrente com aulas, materiais e progresso do assinante.",
    servico: "aplicativos",
    exclusivo: true,
    imagem: "/conceitos/p450.jpg",
    fonte: "'Bebas Neue', sans-serif",
    pagina: {
      menu: ["Aulas", "Trilhas", "Comunidade", "Planos"],
      kicker: "Área de membros",
      sub: "Aulas novas toda semana, no computador ou no celular.",
      botoes: ["Entrar", "Assinar agora"],
      prova: "1.200 assinantes ativos",
    },
    ilustrativo: true,
    chamada: ["Treine no", "seu ritmo."],
    layout: "central",
    paleta: { fundo: "#0a1410", campo: "#162a1f", tinta: "#eef4ee", acento: "#3fbf7f" },
  },
  {
    nome: "Rota Nômade",
    tipo: "Turismo · Roteiros guiados",
    descricao:
      "Aplicativo de roteiros com mapa, reserva e diário de viagem do próprio usuário.",
    servico: "aplicativos",
    exclusivo: true,
    imagem: "/conceitos/p1015.jpg",
    fonte: "'Sora', sans-serif",
    pagina: {
      menu: ["Roteiros", "Destinos", "Diário", "Ajuda"],
      kicker: "Roteiros guiados",
      sub: "Itinerário pronto, mapa que funciona sem sinal e diário no bolso.",
      botoes: ["Ver roteiros", "Baixar o app"],
      prova: "Disponível para Android e iPhone",
    },
    ilustrativo: true,
    chamada: ["O mundo", "em rota."],
    layout: "galeria",
    paleta: { fundo: "#101622", campo: "#1d2b45", tinta: "#f2f4f8", acento: "#ff8a3d" },
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
    dominio: "prospector-theta-dun.vercel.app",
  },
  {
    nome: "Agenda Viveci",
    tipo: "CRM e agenda · Sistema interno",
    descricao:
      "Command Center com CRM, quadro de tarefas e agenda. Uso interno do estúdio.",
    servico: "sistemas",
    capa: "/capas/agenda-viveci.jpg",
    restricao: "Acesso restrito — exige login",
    dominio: "agenda-viveci.vercel.app",
  },
  {
    nome: "Pátio Central",
    tipo: "Gestão de pedidos",
    descricao:
      "Painel de pedidos com status, responsável e histórico, integrado ao que a casa já usa.",
    servico: "sistemas",
    exclusivo: true,
    imagem: "/conceitos/p348.jpg",
    fonte: "'IBM Plex Sans', sans-serif",
    pagina: {
      menu: ["Painel", "Pedidos", "Equipe", "Relatórios"],
      kicker: "Gestão de pedidos",
      sub: "Pedido, status e responsável num quadro que a equipe entende.",
      botoes: ["Entrar no painel", "Como funciona"],
      prova: "Integra com o que a casa já usa",
    },
    ilustrativo: true,
    chamada: ["Tudo no", "mesmo lugar."],
    layout: "editorial",
    paleta: { fundo: "#0d1017", campo: "#1a2030", tinta: "#f4f1e9", acento: "#6f7bff" },
  },
  {
    nome: "Horário Certo",
    tipo: "Agendamento automático",
    descricao:
      "Cliente marca pelo site e recebe confirmação e lembrete no WhatsApp, sem ninguém digitar.",
    servico: "sistemas",
    exclusivo: true,
    imagem: "/conceitos/p431.jpg",
    fonte: "'DM Sans', sans-serif",
    pagina: {
      menu: ["Serviços", "Horários", "Profissionais", "Contato"],
      kicker: "Agendamento online",
      sub: "O cliente escolhe o horário e o WhatsApp confirma sozinho.",
      botoes: ["Agendar agora", "Ver horários"],
      prova: "Confirmação automática no WhatsApp",
    },
    ilustrativo: true,
    chamada: ["Marque", "e esqueça."],
    layout: "central",
    paleta: { fundo: "#0b1118", campo: "#16222e", tinta: "#eef3f7", acento: "#27c2a0" },
  },

  // ---------------- Visibilidade ----------------
  {
    nome: "Casa Terrazza",
    tipo: "Restaurante · Presença no Google",
    descricao:
      "Site, ficha do Google e fotos organizadas para o restaurante aparecer nas buscas do bairro.",
    servico: "visibilidade",
    exclusivo: true,
    imagem: "/conceitos/p292.jpg",
    fonte: "'Playfair Display', serif",
    pagina: {
      menu: ["A casa", "Cardápio", "Reservas", "Contato"],
      kicker: "Pinheiros · São Paulo",
      sub: "Cozinha de bairro com fogo, tempo e ingrediente de feira.",
      botoes: ["Reservar mesa", "Ver o cardápio"],
      prova: "4,8 no Google · 312 avaliações",
    },
    ilustrativo: true,
    chamada: ["Mesa posta", "todo dia."],
    layout: "editorial",
    paleta: { fundo: "#140f0c", campo: "#2a1d15", tinta: "#f6efe4", acento: "#d9a441" },
  },
  {
    nome: "Núcleo Vida",
    tipo: "Clínica · SEO local",
    descricao:
      "Estrutura e conteúdo pensados para as buscas de quem procura atendimento na região.",
    servico: "visibilidade",
    exclusivo: true,
    imagem: "/conceitos/p1027.jpg",
    fonte: "'Outfit', sans-serif",
    pagina: {
      menu: ["A clínica", "Especialidades", "Equipe", "Contato"],
      kicker: "Saúde integrada",
      sub: "Equipe multidisciplinar, agenda aberta e acompanhamento de verdade.",
      botoes: ["Agendar consulta", "Especialidades"],
      prova: "4,9 no Google · 187 avaliações",
    },
    ilustrativo: true,
    chamada: ["Cuidado", "que se acha."],
    layout: "central",
    paleta: { fundo: "#0a1218", campo: "#12242e", tinta: "#eef6f8", acento: "#2fb6d9" },
  },
  {
    nome: "Ateliê Lumen",
    tipo: "Fotografia · Portfólio indexado",
    descricao:
      "Galeria leve e indexável, com cada ensaio virando uma porta de entrada na busca.",
    servico: "visibilidade",
    exclusivo: true,
    imagem: "/conceitos/p823.jpg",
    fonte: "'Cormorant Garamond', serif",
    pagina: {
      menu: ["Ensaios", "Editorial", "Sobre", "Contato"],
      kicker: "Ensaios e editoriais",
      sub: "Retrato, casamento e marca, com direção de arte do começo ao fim.",
      botoes: ["Ver portfólio", "Pedir orçamento"],
      prova: "Mais de 400 ensaios entregues",
    },
    ilustrativo: true,
    chamada: ["Luz em", "cada quadro."],
    layout: "galeria",
    paleta: { fundo: "#12100f", campo: "#241f1c", tinta: "#f5f1ec", acento: "#c98b5e" },
  },

  // ---------------- Suporte ----------------
  {
    nome: "Forja Studio",
    tipo: "Academia · Manutenção mensal",
    descricao:
      "Turmas, horários e planos atualizados todo mês, sem o dono precisar abrir nada.",
    servico: "suporte",
    exclusivo: true,
    imagem: "/conceitos/p1058.jpg",
    fonte: "'Archivo Black', sans-serif",
    pagina: {
      menu: ["Modalidades", "Planos", "Horários", "Contato"],
      kicker: "Treino funcional",
      sub: "Turmas pequenas, professor junto e evolução que dá para medir.",
      botoes: ["Aula experimental", "Ver planos"],
      prova: "4,9 no Google · 240 alunos ativos",
    },
    ilustrativo: true,
    chamada: ["Força que", "se constrói."],
    layout: "editorial",
    paleta: { fundo: "#0e0f12", campo: "#1c1f26", tinta: "#f2f2f4", acento: "#ff5c39" },
  },
  {
    nome: "Vinha & Costa",
    tipo: "Advocacia · Atendimento contínuo",
    descricao:
      "Ajustes de conteúdo e novas áreas de atuação publicadas no mesmo dia do pedido.",
    servico: "suporte",
    exclusivo: true,
    imagem: "/conceitos/p1076.jpg",
    fonte: "'Libre Baskerville', serif",
    pagina: {
      menu: ["Escritório", "Atuação", "Equipe", "Contato"],
      kicker: "Advocacia empresarial",
      sub: "Contratos, trabalhista e societário para empresas que não podem parar.",
      botoes: ["Falar com o time", "Áreas de atuação"],
      prova: "18 anos de atuação · OAB/SP",
    },
    ilustrativo: true,
    chamada: ["Defesa", "com método."],
    layout: "central",
    paleta: { fundo: "#0b0f14", campo: "#16202b", tinta: "#f1f3f6", acento: "#8fa9c9" },
  },
  {
    nome: "Marés Coworking",
    tipo: "Coworking · Site vivo",
    descricao:
      "Disponibilidade de salas e eventos da semana atualizados sem depender de ninguém.",
    servico: "suporte",
    exclusivo: true,
    imagem: "/conceitos/p366.jpg",
    fonte: "'Space Grotesk', sans-serif",
    pagina: {
      menu: ["Espaços", "Planos", "Eventos", "Contato"],
      kicker: "Vila Madalena · São Paulo",
      sub: "Salas privativas, estações flexíveis e café que não acaba.",
      botoes: ["Agendar visita", "Ver planos"],
      prova: "4,7 no Google · 96 avaliações",
    },
    ilustrativo: true,
    chamada: ["Trabalhe", "com vista."],
    layout: "galeria",
    paleta: { fundo: "#081218", campo: "#0f2530", tinta: "#eaf5f8", acento: "#35c4c4" },
  },
];

/** Projetos adicionados mais recentemente primeiro; curadoria desempata. */
export const projetosOrdenados = [...projetos].sort((a, b) =>
  (b.adicionadoEm ?? "").localeCompare(a.adicionadoEm ?? "") ||
  (b.prioridade ?? 0) - (a.prioridade ?? 0) ||
  projetos.indexOf(a) - projetos.indexOf(b)
);
