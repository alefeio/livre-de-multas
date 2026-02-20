// pages/atuacao/suspensao-cnh.tsx
import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/next";
import { useMemo } from "react";

import { MenuServicos as MenuComponent } from "components/MenuServicos";
import Footer from "components/Footer";
import WhatsAppButton from "components/WhatsAppButton";
import FAQ from "components/FAQ";

import { MenuData, LinkItem } from "../types/index";
import Contato from "components/Contato";
import PageContato from "./contato";

const prisma = new PrismaClient();

type FaqItem = {
    id: string;
    pergunta: string;
    resposta: string;
};

interface PageProps {
    menu: MenuData | null;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
    try {
        const menus = await prisma.menu.findMany();
        const rawMenu: any | null = menus.length > 0 ? menus[0] : null;

        let formattedMenu: MenuData | null = null;
        if (rawMenu && rawMenu.links && Array.isArray(rawMenu.links)) {
            const links: LinkItem[] = rawMenu.links.map((link: any) => ({
                id: link.id,
                text: link.text,
                url: link.url,
                target: link.target ?? undefined,
            }));

            formattedMenu = {
                logoUrl: rawMenu.logoUrl || "/images/logo.png",
                links,
            };
        }

        return {
            props: {
                menu: JSON.parse(JSON.stringify(formattedMenu)),
            },
        };
    } catch (error) {
        console.error("Erro ao buscar menu:", error);
        return {
            props: { menu: null },
        };
    } finally {
        await prisma.$disconnect();
    }
};

function IconCheck() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" className="text-[#fec655]">
            <path
                fill="currentColor"
                d="M9.55 17.3L4.8 12.55l1.4-1.4l3.35 3.35l8.5-8.5l1.4 1.4z"
            />
        </svg>
    );
}

function IconClock() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" className="text-[#fec655]">
            <path
                fill="currentColor"
                d="M12 20a8 8 0 1 1 0-16a8 8 0 0 1 0 16m0-18a10 10 0 1 0 0 20a10 10 0 0 0 0-20m.5 5h-2v6l5 3l1-1.73l-4-2.27z"
            />
        </svg>
    );
}

function IconDoc() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" className="text-[#fec655]">
            <path
                fill="currentColor"
                d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m8 1.5V8h4.5zM7 12h10v2H7zm0 4h10v2H7zm0-8h6v2H7z"
            />
        </svg>
    );
}

function IconAlert() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" className="text-amber-600">
            <path
                fill="currentColor"
                d="M12 2L1 21h22zm0 4l7.53 13H4.47zM11 10h2v5h-2zm0 7h2v2h-2z"
            />
        </svg>
    );
}

export default function SuspensaoCnhPage({ menu }: PageProps) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const ogImage = `${baseUrl}/images/logo.jpg`;
    const canonicalUrl = "https://www.livredemultasoficial.com.br/atuacao/suspensao-cnh";

    const faqs: FaqItem[] = useMemo(
        () => [
            {
                id: "faq-1",
                pergunta: "Recebi notificação de processo de suspensão. Já perdi minha CNH?",
                resposta:
                    "Não necessariamente. Em muitos casos, a notificação indica a abertura do procedimento administrativo. Ainda pode haver etapas de defesa e recursos, conforme o estágio do processo e os prazos informados nas notificações.",
            },
            {
                id: "faq-2",
                pergunta: "Quais situações costumam gerar suspensão do direito de dirigir?",
                resposta:
                    "Há casos por soma de pontos e casos por infração específica (suspensiva). Exemplos comuns incluem excesso de velocidade acima de 50%, manobras perigosas/racha e outras condutas previstas como suspensivas. A análise correta depende do enquadramento e do histórico no prontuário.",
            },
            {
                id: "faq-3",
                pergunta: "Excesso de velocidade acima de 50% sempre suspende a CNH?",
                resposta:
                    "É uma infração que costuma ser tratada como suspensiva. Porém, cada caso precisa ser analisado pelo enquadramento, prova, regularidade do auto e andamento do processo. Prazos e notificações também influenciam a estratégia.",
            },
            {
                id: "faq-4",
                pergunta: "Posso recorrer do processo de suspensão?",
                resposta:
                    "Sim. Normalmente existem etapas de defesa e recursos administrativos. O mais importante é entender o estágio do procedimento, respeitar prazos e montar a defesa com base em inconsistências, requisitos formais e provas do caso.",
            },
            {
                id: "faq-5",
                pergunta: "Se eu pagar a multa, isso encerra o processo de suspensão?",
                resposta:
                    "Pagamento e processo administrativo são coisas diferentes. O pagamento pode ocorrer, mas o procedimento de suspensão pode seguir conforme regras do órgão de trânsito. É essencial analisar o caso e as notificações para definir a estratégia.",
            },
            {
                id: "faq-6",
                pergunta: "Quais documentos devo separar para análise?",
                resposta:
                    "CNH, CRLV, notificações do processo (instauração/penalidade), número do auto de infração (ou autos), comprovantes e provas do dia (se houver). Também ajuda ter o histórico do prontuário/pontos, quando disponível.",
            },
            {
                id: "faq-7",
                pergunta: "Perdi o prazo. Ainda existe alguma alternativa?",
                resposta:
                    "Depende do estágio do processo e do que ocorreu com as notificações (entrega, endereço, ciência, etc.). Mesmo assim, vale revisar o histórico e a regularidade do procedimento para avaliar caminhos possíveis.",
            },
        ],
        []
    );

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LegalService",
        name: "Livre de Multas",
        image: ogImage,
        url: canonicalUrl,
        telephone: "+5591981006131",
        priceRange: "$$",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Tv. Timbó, 1563 - Marco",
            addressLocality: "Belém",
            addressRegion: "PA",
            postalCode: "66087-531",
            addressCountry: "BR",
        },
        areaServed: [
            { "@type": "City", name: "Belém" },
            { "@type": "State", name: "Pará" },
        ],
        sameAs: ["https://www.instagram.com/livredemultasoficial/"],
        description:
            "Atuação em defesa administrativa em processos de suspensão da CNH, análise de notificações, auto de infração e estratégia de defesa e recursos para proteger o direito de dirigir.",
        serviceType: "Defesa em processo de suspensão da CNH",
    };

    return (
        <>
            <Head>
                <title>Suspensão da CNH | Defesa e Recurso | Livre de Multas</title>

                <meta
                    name="description"
                    content="Recebeu notificação de processo de suspensão da CNH? Entenda riscos, prazos e como funciona a defesa e o recurso administrativo para proteger seu direito de dirigir."
                />
                <meta name="robots" content="index, follow, max-image-preview:large" />
                <link rel="canonical" href={canonicalUrl} />

                <meta
                    name="keywords"
                    content="suspensão cnh, processo de suspensão, recurso suspensão cnh, defesa suspensão cnh, excesso de velocidade acima de 50, racha manobra perigosa, direito de trânsito belém"
                />

                <meta property="og:locale" content="pt_BR" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content="Processo de Suspensão da CNH: o que fazer para não perder o prazo" />
                <meta
                    property="og:description"
                    content="Entenda como funciona o processo de suspensão e o que analisar nas notificações para agir dentro do prazo."
                />
                <meta property="og:url" content={canonicalUrl} />

                <meta property="og:image" content={ogImage} />
                <meta property="og:image:secure_url" content={ogImage} />
                <meta property="og:image:alt" content="Livre de Multas" />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Suspensão da CNH | Livre de Multas" />
                <meta
                    name="twitter:description"
                    content="Orientação prática sobre processo de suspensão e caminhos de defesa/recursos."
                />
                <meta name="twitter:image" content={ogImage} />

                <meta name="theme-color" content="#070a0f" />

                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&display=swap"
                    rel="stylesheet"
                />

                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            </Head>

            <div className="min-h-screen bg-blue-950 text-white overflow-x-hidden">
                <Analytics />
                <MenuComponent menuData={menu} />

                {/* Fundo premium */}
                <div className="relative pt-24">
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#fec655]/10 blur-3xl" />
                        <div className="absolute bottom-[-240px] right-[-160px] h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
                    </div>

                    <main className="relative py-6">
                        {/* HERO PREMIUM */}
                        <header className="relative overflow-hidden border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm md:p-10">
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#fec655]/10 blur-3xl" />
                                <div className="absolute -right-24 bottom-[-40px] h-64 w-64 rounded-full bg-white/5 blur-3xl" />
                            </div>

                            <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
                                {/* Texto */}
                                <div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-200">
                                            Direito de Trânsito
                                        </span>
                                        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-200">
                                            Suspensão da CNH
                                        </span>
                                        <span className="inline-flex items-center rounded-full border border-[#fec655]/25 bg-[#fec655]/10 px-3 py-1 text-xs text-[#fec655]">
                                            Atenção aos prazos
                                        </span>
                                    </div>

                                    <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
                                        Processo de Suspensão da CNH:{" "}
                                        <span className="text-[#fec655]">o que fazer para não perder o prazo</span>
                                    </h1>

                                    <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-200 md:text-lg">
                                        Recebeu notificação e ficou com medo de ficar sem dirigir? Veja uma visão prática do que analisar no
                                        procedimento, nos prazos e nas notificações para montar sua defesa administrativa.
                                    </p>

                                    <div className="mt-6 grid gap-3">
                                        <div className="flex items-start gap-3 text-gray-200">
                                            <IconClock />
                                            <p className="leading-relaxed">
                                                Descubra <strong className="text-white">em que fase</strong> está o processo (instauração vs. penalidade).
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3 text-gray-200">
                                            <IconDoc />
                                            <p className="leading-relaxed">
                                                Organize <strong className="text-white">notificações e autos</strong> para análise.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3 text-gray-200">
                                            <IconCheck />
                                            <p className="leading-relaxed">
                                                Siga um <strong className="text-white">passo a passo</strong> para defesa e recursos.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                                        <a
                                            href="#passos"
                                            className="inline-flex items-center justify-center rounded-full bg-[#fec655] px-6 py-3 text-sm font-bold text-[#0c1a26] shadow-lg transition hover:brightness-95"
                                        >
                                            Ver passo a passo
                                        </a>
                                        <a
                                            href="#documentos"
                                            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                                        >
                                            Ver documentos e prazos
                                        </a>
                                    </div>

                                    <p className="mt-4 text-xs text-gray-400">
                                        Conteúdo informativo. Cada caso deve ser analisado individualmente.
                                    </p>
                                </div>

                                {/* Imagem */}
                                <div className="relative">
                                    <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-b from-[#fec655]/20 to-transparent blur-2xl" />
                                    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
                                        <div className="w-full max-h-[420px] overflow-hidden">
                                            <img
                                                src="/images/jpg03.jpg"
                                                alt="Fiscalização e risco de suspensão da CNH por infrações suspensivas"
                                                className="h-full w-full object-cover object-top transition-transform duration-500 ease-in-out hover:scale-[1.03]"
                                            />
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* CTA FIXO (MEIO) */}
                        <section className="mt-10 mx-auto w-full max-w-6xl px-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h2 className="text-xl font-extrabold text-white md:text-2xl">Quer analisar seu caso pelo WhatsApp?</h2>
                                    <p className="mt-1 text-gray-200">
                                        Envie <strong className="text-white">foto da notificação</strong> + <strong className="text-white">seu nome</strong> +{" "}
                                        <strong className="text-white">cidade</strong>. Atendimento direto.
                                    </p>
                                </div>

                                <a
                                    href="https://wa.me/5591981006131?text=Ol%C3%A1%21%20Recebi%20notifica%C3%A7%C3%A3o%20de%20processo%20de%20suspens%C3%A3o%20da%20CNH%20e%20gostaria%20de%20analisar%20meu%20caso."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center rounded-full bg-[#fec655] px-7 py-3 font-bold text-[#0c1a26] shadow-lg transition hover:brightness-95"
                                >
                                    Analisar minha suspensão
                                </a>
                            </div>

                            <p className="mt-3 text-xs text-gray-400">Atendimento sem compromisso. Cada caso depende de documentos e análise técnica.</p>
                        </section>

                        {/* QUANDO VIRA PROBLEMA */}
                        <section id="como-funciona" className="mt-12 mx-auto w-full max-w-6xl px-4 space-y-6">
                            <h2 className="text-2xl font-extrabold text-white md:text-3xl">Quando a suspensão vira risco real?</h2>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                                    <h3 className="text-lg font-bold text-[#fec655]">Cenários comuns</h3>
                                    <div className="mt-4 space-y-3 text-gray-200">
                                        <p>
                                            A suspensão pode surgir por <strong className="text-white">pontos</strong> ou por{" "}
                                            <strong className="text-white">infração suspensiva</strong>. Em muitos casos, o que muda o jogo é{" "}
                                            <strong className="text-white">a fase do processo</strong> e a regularidade das notificações.
                                        </p>
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-3">
                                                <IconCheck />
                                                <span className="text-white">
                                                    Leia com atenção se a notificação é de <strong>instauração</strong> ou <strong>penalidade</strong>.
                                                </span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <IconCheck />
                                                <span className="text-white">
                                                    Confira <strong>enquadramento</strong> e dados do(s) auto(s) vinculados.
                                                </span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <IconCheck />
                                                <span className="text-white">
                                                    Verifique se existe <strong>prazo aberto</strong> para defesa/recursos.
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                                    <h3 className="text-lg font-bold text-[#fec655]">O que mais causa dor</h3>
                                    <div className="mt-4 space-y-3 text-gray-200">
                                        <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                                            <IconAlert />
                                            <p className="leading-relaxed">
                                                <strong className="text-white">Perder prazo</strong> por não acompanhar as notificações.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                                            <IconAlert />
                                            <p className="leading-relaxed">
                                                Não separar <strong className="text-white">autos e provas</strong> para análise da estratégia.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                                            <IconAlert />
                                            <p className="leading-relaxed">
                                                Confundir <strong className="text-white">multa</strong> com <strong className="text-white">processo de suspensão</strong>.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* PASSO A PASSO */}
                        <section id="passos" className="mt-12 mx-auto w-full max-w-6xl px-4">
                            <h2 className="text-2xl font-extrabold text-white md:text-3xl">Passo a passo prático</h2>

                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                {[
                                    {
                                        title: "1) Identifique a fase do processo",
                                        desc: "Instauração, apresentação de defesa, penalidade ou recurso? Isso define prazos e próximos passos.",
                                    },
                                    {
                                        title: "2) Confirme o motivo da suspensão",
                                        desc: "É por pontos ou por infração específica? Entender o motivo é essencial para a estratégia.",
                                    },
                                    {
                                        title: "3) Reúna documentos e histórico",
                                        desc: "Notificações, autos, CNH/CRLV e, se possível, informações do prontuário/pontos ajudam a mapear o cenário.",
                                    },
                                    {
                                        title: "4) Monte a estratégia de defesa",
                                        desc: "A defesa pode envolver análise de requisitos formais, inconsistências e provas do caso, dentro do prazo aplicável.",
                                    },
                                ].map((card) => (
                                    <div
                                        key={card.title}
                                        className="group rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm transition hover:bg-white/10"
                                    >
                                        <h3 className="text-lg font-bold text-white">{card.title}</h3>
                                        <p className="mt-2 text-gray-200 leading-relaxed">{card.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* DOCUMENTOS */}
                        <section id="documentos" className="my-12 mx-auto w-full max-w-6xl px-4">
                            <h2 className="text-2xl font-extrabold text-white md:text-3xl">Documentos que ajudam na análise</h2>

                            <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm">
                                <ul className="grid gap-3 md:grid-cols-2">
                                    {[
                                        "CNH e documento com foto",
                                        "CRLV do veículo",
                                        "Notificação(ões) do processo de suspensão (instauração/penalidade)",
                                        "Número do(s) auto(s) de infração relacionado(s)",
                                        "Comprovantes/provas do dia (se houver)",
                                        "Histórico/prontuário (se disponível)",
                                    ].map((item) => (
                                        <li key={item} className="flex items-start gap-3 text-gray-200">
                                            <IconCheck />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <p className="mt-4 text-sm text-gray-400">
                                    Quanto mais completo o conjunto de documentos, mais precisa fica a análise.
                                </p>
                            </div>
                        </section>

                        <span id="contato"></span>
                        <Contato />
                        <FAQ faqs={faqs as any} />

                        {/* CTA FINAL */}
                        <section className="my-14 mx-auto w-full max-w-6xl px-4 rounded-3xl border border-white/10 bg-gradient-to-b from-[#fec655]/10 to-white/5 p-8 shadow-2xl backdrop-blur-sm">
                            <h2 className="text-2xl font-extrabold text-white">Pronto para analisar seu caso?</h2>
                            <p className="mt-2 text-gray-200">
                                Se você recebeu notificação de processo de suspensão, o ideal é agir rápido para não perder prazos.
                                Envie no WhatsApp: <strong className="text-white">foto da notificação</strong> +{" "}
                                <strong className="text-white">seu nome</strong> + <strong className="text-white">cidade</strong>.
                            </p>

                            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href="https://wa.me/5591981006131?text=Ol%C3%A1%21%20Recebi%20notifica%C3%A7%C3%A3o%20de%20processo%20de%20suspens%C3%A3o%20da%20CNH%20e%20gostaria%20de%20analisar%20meu%20caso."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center rounded-full bg-[#fec655] px-7 py-3 font-bold text-[#0c1a26] shadow-lg transition hover:brightness-95"
                                >
                                    Falar no WhatsApp
                                </a>
                                <a
                                    href="/#atuacao"
                                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
                                >
                                    Ver outras atuações
                                </a>
                            </div>

                            <p className="mt-3 text-xs text-gray-400">Atendimento sem compromisso. Cada caso depende de documentos e análise técnica.</p>
                        </section>
                        <span id="localizacao"></span>
                        <PageContato />
                    </main>
                </div>

                <Footer menuData={menu} />
                <WhatsAppButton />
            </div>
        </>
    );
}