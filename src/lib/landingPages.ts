export type LandingFaq = {
  id: string;
  pergunta: string;
  resposta: string;
};

export type LandingLink = {
  href: string;
  label: string;
};

export type ServiceLandingContent = {
  slug: string;
  breadcrumbLabel: string;
  title: string;
  description: string;
  h1: string;
  subtitle: string;
  badge: string;
  ctaLabel: string;
  ctaFinalHeading: string;
  whatsappMessage: string;
  identificationHeading: string;
  identificationText: string;
  situations: { title: string; detail: string }[];
  analyzed: string[];
  faqs: LandingFaq[];
  relatedLinks: LandingLink[];
  blogLinks: LandingLink[];
  serviceType: string;
};

export const LANDING_DETRAN: ServiceLandingContent = {
  slug: "recurso-multa-detran-pa",
  breadcrumbLabel: "Recurso DETRAN-PA",
  title: "Recurso de Multa no DETRAN-PA | Defesa Administrativa | Livre de Multas",
  description:
    "Atendimento jurídico em Belém para análise de notificações, defesa e recurso de multa do DETRAN-PA. Envie sua notificação pelo WhatsApp.",
  h1: "Recurso de Multa no DETRAN-PA",
  subtitle:
    "Atendimento jurídico para análise de notificações, defesa de autuação e recurso administrativo relacionados ao DETRAN-PA.",
  badge: "DETRAN-PA",
  ctaLabel: "Enviar notificação para análise",
  ctaFinalHeading: "Envie a notificação do DETRAN-PA",
  whatsappMessage:
    "Olá! Recebi uma notificação ou multa do DETRAN-PA e gostaria de solicitar uma análise do meu caso.",
  identificationHeading: "Recebeu uma notificação do DETRAN-PA?",
  identificationText:
    "Esta página é para quem recebeu autuação, notificação de penalidade ou precisa avaliar um recurso administrativo no DETRAN-PA. O atendimento em Belém começa pela análise da documentação e dos prazos informados no seu caso.",
  situations: [
    { title: "Notificação de autuação", detail: "Auto de infração ou notificação emitida pelo DETRAN-PA" },
    { title: "Defesa de autuação", detail: "Análise da fase inicial do processo administrativo" },
    { title: "Recurso administrativo", detail: "Quando já há penalidade ou o processo avançou de fase" },
    { title: "Prazos e documentação", detail: "Conferência das datas e das peças disponíveis" },
  ],
  analyzed: [
    "Órgão autuador (DETRAN-PA)",
    "Enquadramento da infração",
    "Datas e prazos da notificação",
    "Identificação do veículo e dados da autuação",
    "Fase do processo administrativo",
    "Documentação disponível",
  ],
  faqs: [
    {
      id: "detran-faq-1",
      pergunta: "Vocês analisam multas e notificações do DETRAN-PA?",
      resposta:
        "Sim. O atendimento contempla análise de notificações e orientação sobre defesa ou recurso administrativo relacionados ao DETRAN-PA, a partir dos documentos enviados.",
    },
    {
      id: "detran-faq-2",
      pergunta: "Preciso comparecer pessoalmente?",
      resposta:
        "Não necessariamente. O envio da notificação pode ser feito pelo WhatsApp. O escritório atende em Belém – PA, e a necessidade de atendimento presencial depende do caso.",
    },
    {
      id: "detran-faq-3",
      pergunta: "O que devo enviar para a análise?",
      resposta:
        "Em geral, foto ou PDF da notificação, documentos do condutor e do veículo, e outras peças que você já tenha. Os prazos costumam constar na própria notificação.",
    },
    {
      id: "detran-faq-4",
      pergunta: "O envio da notificação garante o cancelamento da multa?",
      resposta:
        "Não. O envio não garante cancelamento, deferimento ou qualquer resultado específico. Cada caso depende da análise dos documentos e das circunstâncias específicas.",
    },
  ],
  relatedLinks: [
    { href: "/recurso-multa-semob-belem", label: "Recurso de multa da SEMOB em Belém" },
    { href: "/advogado-transito-belem", label: "Advogado de trânsito em Belém" },
    { href: "/multa-cnh-provisoria", label: "Multa na CNH provisória" },
  ],
  blogLinks: [
    {
      href: "/blog/defesa-de-autuao-no-detran-pa-o-que-revisar-na-notificao-antes-de-recorrer",
      label: "O que revisar na notificação do DETRAN-PA",
    },
  ],
  serviceType: "Recurso e defesa de multa no DETRAN-PA",
};

export const LANDING_SEMOB: ServiceLandingContent = {
  slug: "recurso-multa-semob-belem",
  breadcrumbLabel: "Recurso SEMOB Belém",
  title: "Recurso de Multa da SEMOB em Belém | Livre de Multas",
  description:
    "Análise de notificações e recurso de multa da SEMOB/SEGBEL em Belém. Atendimento jurídico em Direito de Trânsito. Envie a notificação pelo WhatsApp.",
  h1: "Recurso de Multa da SEMOB em Belém",
  subtitle:
    "Atendimento jurídico para defesa e recurso administrativo de multas municipais em Belém, inclusive notificações da SEMOB e da SEGBEL.",
  badge: "SEMOB / SEGBEL",
  ctaLabel: "Enviar notificação para análise",
  ctaFinalHeading: "Envie a notificação da SEMOB",
  whatsappMessage:
    "Olá! Recebi uma notificação ou multa da SEMOB/SEGBEL em Belém e gostaria de solicitar uma análise do meu caso.",
  identificationHeading: "Recebeu uma multa municipal em Belém?",
  identificationText:
    "Esta página é para quem recebeu notificação da SEMOB ou da SEGBEL e precisa de análise para defesa ou recurso administrativo. O órgão municipal e a fase do processo constam na documentação — por isso o envio da notificação é o primeiro passo.",
  situations: [
    { title: "Multa SEMOB", detail: "Autuações e notificações da Secretaria municipal de trânsito" },
    { title: "Multa SEGBEL", detail: "Situações em que a notificação utiliza essa nomenclatura" },
    { title: "Defesa administrativa", detail: "Análise da notificação e dos prazos do processo municipal" },
    { title: "Recurso de multa em Belém", detail: "Quando o processo já avançou de fase" },
  ],
  analyzed: [
    "Órgão autuador (SEMOB/SEGBEL)",
    "Enquadramento da infração",
    "Datas e prazos informados",
    "Local e dados da autuação",
    "Identificação do veículo",
    "Fase administrativa e documentos",
  ],
  faqs: [
    {
      id: "semob-faq-1",
      pergunta: "Vocês atendem multa da SEMOB em Belém?",
      resposta:
        "Sim. Analisamos notificações e recursos de multas municipais em Belém, inclusive da SEMOB, a partir da documentação enviada.",
    },
    {
      id: "semob-faq-2",
      pergunta: "A página também vale para SEGBEL?",
      resposta:
        "Sim. Algumas notificações municipais em Belém utilizam a nomenclatura SEGBEL. Se o documento for municipal, envie a notificação para conferência do órgão e da fase do processo.",
    },
    {
      id: "semob-faq-3",
      pergunta: "Como envio o caso?",
      resposta:
        "Pelo WhatsApp, com foto ou PDF da notificação e, se possível, documentos do condutor e do veículo. O atendimento é em Belém – PA.",
    },
    {
      id: "semob-faq-4",
      pergunta: "A análise garante o cancelamento?",
      resposta:
        "Não. Não há garantia de cancelamento ou de resultado específico. A orientação depende dos documentos e das circunstâncias de cada caso.",
    },
  ],
  relatedLinks: [
    { href: "/recurso-multa-detran-pa", label: "Recurso de multa no DETRAN-PA" },
    { href: "/advogado-transito-belem", label: "Advogado de trânsito em Belém" },
    { href: "/", label: "Página inicial" },
  ],
  blogLinks: [
    {
      href: "/blog/como-recorrer-de-multa-da-semob-em-belm-documentos-prazos-e-etapas",
      label: "Documentos e etapas do recurso SEMOB em Belém",
    },
  ],
  serviceType: "Recurso e defesa de multa da SEMOB/SEGBEL em Belém",
};

export const LANDING_ADVOGADO: ServiceLandingContent = {
  slug: "advogado-transito-belem",
  breadcrumbLabel: "Advogado de Trânsito",
  title: "Advogado de Trânsito em Belém | Direito de Trânsito | Livre de Multas",
  description:
    "Advogado de trânsito em Belém para análise de multas, defesa administrativa e recursos. DETRAN-PA, SEMOB/SEGBEL e processos de CNH. Envie seu caso pelo WhatsApp.",
  h1: "Advogado de Trânsito em Belém",
  subtitle:
    "Atendimento jurídico em Direito de Trânsito para análise de multas, notificações e processos administrativos em Belém.",
  badge: "Direito de Trânsito",
  ctaLabel: "Enviar meu caso para análise",
  ctaFinalHeading: "Envie seu caso para análise",
  whatsappMessage:
    "Olá! Estou procurando atendimento jurídico em Direito de Trânsito e gostaria de enviar meu caso para análise.",
  identificationHeading: "Procura atendimento jurídico para multa de trânsito?",
  identificationText:
    "Atendimento jurídico em Belém – PA (Av. Gov. José Malcher, 153, sala 12). Analisamos notificações e processos administrativos para orientar sobre as possibilidades do caso, sem promessa de resultado.",
  situations: [
    { title: "Recurso de multa", detail: "Análise de notificações e recursos administrativos" },
    { title: "Defesa administrativa", detail: "Orientação conforme a fase do processo" },
    { title: "DETRAN-PA", detail: "Autuações e processos estaduais" },
    { title: "SEMOB/SEGBEL", detail: "Multas municipais em Belém" },
    { title: "Suspensão da CNH", detail: "Processos que envolvem a habilitação" },
    { title: "CNH provisória", detail: "Infrações no período da PPD" },
    { title: "Lei Seca / bafômetro", detail: "Autuações relacionadas à alcoolemia" },
    { title: "Multas gravíssimas", detail: "Infrações de maior gravidade" },
  ],
  analyzed: [
    "Órgão autuador",
    "Enquadramento e gravidade",
    "Datas, prazos e notificações",
    "Documentos do condutor e do veículo",
    "Fase do processo administrativo",
    "Informações já disponíveis no caso",
  ],
  faqs: [
    {
      id: "adv-faq-1",
      pergunta: "Vocês atendem como advogado de trânsito em Belém?",
      resposta:
        "Sim. O atendimento é jurídico em Direito de Trânsito, em Belém – PA, com análise de multas, notificações e processos administrativos.",
    },
    {
      id: "adv-faq-2",
      pergunta: "Quais órgãos vocês analisam?",
      resposta:
        "Situações frequentes incluem DETRAN-PA, SEMOB/SEGBEL e outros processos administrativos de trânsito, sempre a partir da documentação do caso.",
    },
    {
      id: "adv-faq-3",
      pergunta: "Como funciona o primeiro contato?",
      resposta:
        "Você envia a notificação ou os documentos pelo WhatsApp. O caso e os prazos são analisados, e você recebe orientação sobre as possibilidades — sem garantia de resultado.",
    },
    {
      id: "adv-faq-4",
      pergunta: "O contato gera obrigação de contratação?",
      resposta:
        "Não. O envio da documentação é para análise. Cada caso depende das circunstâncias específicas, e o contato não gera obrigação.",
    },
  ],
  relatedLinks: [
    { href: "/recurso-multa-detran-pa", label: "Recurso de multa no DETRAN-PA" },
    { href: "/recurso-multa-semob-belem", label: "Recurso de multa da SEMOB em Belém" },
    { href: "/suspensao-cnh", label: "Suspensão da CNH" },
    { href: "/recusa-bafometro", label: "Recusa ao bafômetro" },
  ],
  blogLinks: [
    {
      href: "/blog/advogado-de-trnsito-em-belm-quando-procurar-ajuda-para-recorrer-uma-multa",
      label: "Quando procurar ajuda para recorrer uma multa",
    },
  ],
  serviceType: "Advocacia em Direito de Trânsito em Belém",
};
