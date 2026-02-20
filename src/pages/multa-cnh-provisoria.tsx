// pages/atuacao/multa-cnh-provisoria.tsx
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

export default function MultaCnhProvisoriaPage({ menu }: PageProps) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const ogImage = `${baseUrl}/images/logo.jpg`;
    const canonicalUrl = "https://www.livredemultasoficial.com.br/atuacao/multa-cnh-provisoria";

    const faqs: FaqItem[] = useMemo(
        () => [
            {
                id: "faq-1",
                pergunta: "Levei multa com CNH provisória. Vou perder a carteira definitiva?",
                resposta:
                    "Depende do tipo de infração e do resultado do processo. Em geral, infrações gravíssimas, ou reincidência em infração grave ou média no período da Permissão para Dirigir (PPD), podem levar à não concessão da CNH definitiva. É importante analisar o enquadramento, o auto de infração e o andamento do procedimento.",
            },
            {
                id: "faq-2",
                pergunta: "Qual multa faz perder a CNH definitiva na provisória?",
                resposta:
                    "Em regra, o risco aumenta quando há infração gravíssima ou quando ocorre reincidência (repetição) em infração grave ou média durante o período da PPD. A avaliação correta exige conferir o enquadramento, a notificação, o prontuário e se houve ou não defesa/recursos dentro do prazo.",
            },
            {
                id: "faq-3",
                pergunta: "Se eu indicar o condutor, resolve?",
                resposta:
                    "A indicação do condutor pode ser cabível quando outra pessoa dirigia no momento. Mas ela tem requisitos e prazo, e nem sempre afasta o problema automaticamente. É preciso verificar se a notificação permite a indicação e se a documentação está correta.",
            },
            {
                id: "faq-4",
                pergunta: "Posso recorrer da multa mesmo com CNH provisória?",
                resposta:
                    "Sim. Normalmente existe a fase de Defesa Prévia e, se necessário, recursos administrativos. O essencial é respeitar os prazos das notificações e montar uma estratégia com base em falhas formais, provas e inconsistências do auto.",
            },
            {
                id: "faq-5",
                pergunta: "Quais documentos eu preciso separar para análise do caso?",
                resposta:
                    "Geralmente: CNH/PPD, CRLV, notificações recebidas (autuação e penalidade), número do auto de infração, comprovantes (se houver), e qualquer prova do dia (local, horário, fotos, recibos, etc.). Quanto mais completo, melhor.",
            },
            {
                id: "faq-6",
                pergunta: "Perdi o prazo de recurso. Ainda dá para fazer algo?",
                resposta:
                    "Depende do estágio do processo e do que aconteceu (por exemplo, problemas de notificação, endereço desatualizado, ausência de entrega, etc.). Mesmo assim, vale revisar o histórico do procedimento para avaliar alternativas.",
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
            "Atuação em defesa administrativa de multas com CNH provisória (PPD), análise de notificações, estratégia de defesa e recursos para proteção do direito à CNH definitiva.",
        serviceType: "Defesa de multa na CNH provisória (PPD)",
    };

    return (
        <>
            <Head>
                <title>Multa na CNH Provisória (PPD) | Defesa e Recurso | Livre de Multas</title>

                <meta
                    name="description"
                    content="Recebeu multa na CNH provisória (PPD) e está com medo de perder a definitiva? Entenda riscos, prazos e como funciona a defesa e o recurso administrativo."
                />
                <meta name="robots" content="index, follow, max-image-preview:large" />
                <link rel="canonical" href={canonicalUrl} />

                <meta
                    name="keywords"
                    content="multa cnh provisória, ppd multa, perder cnh definitiva, recurso multa ppd, defesa multa cnh provisória, direito de trânsito belém"
                />

                <meta property="og:locale" content="pt_BR" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content="Multa na CNH Provisória (PPD): posso perder a definitiva?" />
                <meta
                    property="og:description"
                    content="Saiba quando a multa na PPD pode impactar a CNH definitiva e como agir dentro dos prazos (defesa e recursos)."
                />
                <meta property="og:url" content={canonicalUrl} />

                <meta property="og:image" content={ogImage} />
                <meta property="og:image:secure_url" content={ogImage} />
                <meta property="og:image:alt" content="Livre de Multas" />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Multa na CNH Provisória (PPD) | Livre de Multas" />
                <meta
                    name="twitter:description"
                    content="Orientação prática sobre multa na CNH provisória e caminhos de defesa/recursos."
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
                                            CNH Provisória (PPD)
                                        </span>
                                        <span className="inline-flex items-center rounded-full border border-[#fec655]/25 bg-[#fec655]/10 px-3 py-1 text-xs text-[#fec655]">
                                            Atenção aos prazos
                                        </span>
                                    </div>

                                    <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
                                        Multa na CNH Provisória:{" "}
                                        <span className="text-[#fec655]">o que fazer para proteger a CNH definitiva</span>
                                    </h1>

                                    <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-200 md:text-lg">
                                        Recebeu uma notificação e ficou com medo de perder a CNH definitiva? Veja uma visão prática dos
                                        riscos mais comuns, dos prazos e do caminho de defesa administrativa.
                                    </p>

                                    <div className="mt-6 grid gap-3">
                                        <div className="flex items-start gap-3 text-gray-200">
                                            <IconClock />
                                            <p className="leading-relaxed">
                                                Entenda <strong className="text-white">em que fase</strong> você está (autuação vs. penalidade).
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3 text-gray-200">
                                            <IconDoc />
                                            <p className="leading-relaxed">
                                                Separe <strong className="text-white">documentos e provas</strong> para análise.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3 text-gray-200">
                                            <IconCheck />
                                            <p className="leading-relaxed">
                                                Siga um <strong className="text-white">passo a passo</strong> e evite perder prazos.
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
                                                src="/images/jpg01.jpg"
                                                alt="Motorista analisando notificação de multa na CNH provisória"
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
                                    <h2 className="text-xl font-extrabold text-white md:text-2xl">
                                        Quer analisar seu caso pelo WhatsApp?
                                    </h2>
                                    <p className="mt-1 text-gray-200">
                                        Envie <strong className="text-white">foto da notificação</strong> + <strong className="text-white">seu nome</strong> +{" "}
                                        <strong className="text-white">cidade</strong>. Atendimento direto.
                                    </p>
                                </div>

                                <a
                                    href="https://wa.me/5591981006131?text=Ol%C3%A1%21%20Recebi%20uma%20multa%20na%20CNH%20provis%C3%B3ria%20(PPD)%20e%20gostaria%20de%20analisar%20meu%20caso."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center rounded-full bg-[#fec655] px-7 py-3 font-bold text-[#0c1a26] shadow-lg transition hover:brightness-95"
                                >
                                    Analisar minha multa
                                </a>
                            </div>
                            <p className="mt-3 text-xs text-gray-400">
                                Atendimento sem compromisso. Cada caso depende de documentos e análise técnica.
                            </p>
                        </section>

                        {/* QUANDO VIRA PROBLEMA */}
                        <section id="como-funciona" className="mt-12 mx-auto w-full max-w-6xl px-4 space-y-6">
                            <h2 className="text-2xl font-extrabold text-white md:text-3xl">
                                Quando a multa na PPD vira problema?
                            </h2>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                                    <h3 className="text-lg font-bold text-[#fec655]">O que observar primeiro</h3>
                                    <div className="mt-4 space-y-3 text-gray-200">
                                        <p>
                                            Durante a <strong className="text-white">Permissão para Dirigir (PPD)</strong>, algumas situações podem impedir a emissão da{" "}
                                            <strong className="text-white">CNH definitiva</strong>.
                                        </p>
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-3">
                                                <IconCheck />
                                                <span className="text-white">Confira o <strong>enquadramento</strong> e dados do auto.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <IconCheck />
                                                <span className="text-white">Verifique <strong className="text-white">notificações</strong> e endereço correto.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <IconCheck />
                                                <span className="text-white">Avalie <strong className="text-white">defesa/recursos</strong> e prazos.</span>
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
                                                <strong className="text-white">Perder prazo</strong> por não entender se é autuação ou penalidade.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                                            <IconAlert />
                                            <p className="leading-relaxed">
                                                <strong className="text-white">Dados inconsistentes</strong> no auto (local, horário, identificação, etc.).
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                                            <IconAlert />
                                            <p className="leading-relaxed">
                                                Não separar <strong className="text-white">provas e documentos</strong> para sustentar a tese.
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
                                        title: "1) Identifique o estágio",
                                        desc:
                                            "É notificação de autuação ou notificação de penalidade? Isso muda o tipo de medida (defesa prévia ou recurso).",
                                    },
                                    {
                                        title: "2) Confira prazos e dados",
                                        desc:
                                            "Erros de placa, local, horário, identificação, competência e entrega de notificação podem ser decisivos.",
                                    },
                                    {
                                        title: "3) Separe provas",
                                        desc:
                                            "Fotos, recibos, comprovantes de local, conversa com o real condutor (se for o caso) e documentos do veículo ajudam a sustentar a tese.",
                                    },
                                    {
                                        title: "4) Defina a estratégia",
                                        desc:
                                            "Pode envolver defesa prévia, indicação de condutor (quando cabível) e recursos. Cada caso exige análise do auto e do histórico.",
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
                                        "PPD/CNH e documento com foto",
                                        "CRLV do veículo",
                                        "Notificação(ões) recebidas (autuação e/ou penalidade)",
                                        "Número do auto de infração",
                                        "Comprovantes/provas do dia (se houver)",
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
                                Se você recebeu notificação durante a CNH provisória (PPD), o ideal é agir rápido para não perder prazos.
                                Envie no WhatsApp: <strong className="text-white">foto da notificação</strong> + <strong className="text-white">seu nome</strong> +{" "}
                                <strong className="text-white">cidade</strong>.
                            </p>

                            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href="https://wa.me/5591981006131?text=Ol%C3%A1%21%20Recebi%20uma%20multa%20na%20CNH%20provis%C3%B3ria%20(PPD)%20e%20gostaria%20de%20analisar%20meu%20caso."
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

                            <p className="mt-3 text-xs text-gray-400">
                                Atendimento sem compromisso. Cada caso depende de documentos e análise técnica.
                            </p>
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