// pages/atuacao/multa-cnh-provisoria.tsx
import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/next";
import { useMemo } from "react";

import { Menu as MenuComponent } from "components/Menu";
import Footer from "components/Footer";
import WhatsAppButton from "components/WhatsAppButton";
import FAQ from "components/FAQ";

import { MenuData, LinkItem } from "../../types/index";

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
    name: "Pereira de Sousa Advocacia",
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
        <meta property="og:image:alt" content="Pereira de Sousa Advocacia" />
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

        <meta name="theme-color" content="#0f172a" />

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

      <div className="min-h-screen">
        <Analytics />
        <MenuComponent menuData={menu} />

        <main className="mx-auto w-full max-w-6xl px-4 py-10">
          {/* HERO */}
          <header className="rounded-2xl bg-slate-900 px-6 py-10 text-white shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Direito de Trânsito • CNH Provisória (PPD)
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
              Multa na CNH Provisória: o que fazer para proteger a CNH definitiva
            </h1>
            <p className="mt-4 max-w-3xl text-base text-slate-200 md:text-lg">
              Recebeu uma notificação e ficou com medo de perder a CNH definitiva? Aqui você encontra uma visão prática
              dos riscos mais comuns, dos prazos e do caminho de defesa administrativa.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:opacity-90"
              >
                Entender como funciona
              </a>
              <a
                href="#documentos"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Ver documentos e prazos
              </a>
            </div>
          </header>

          {/* CONTEÚDO */}
          <section id="como-funciona" className="mt-10 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Quando a multa na PPD vira problema?</h2>
            <div className="space-y-4 text-slate-700">
              <p>
                Durante a <strong>Permissão para Dirigir (PPD)</strong>, algumas situações podem impedir a emissão da{" "}
                <strong>CNH definitiva</strong>. O ponto principal é entender <strong>qual infração</strong> foi aplicada,
                <strong> se houve reincidência</strong> e se o procedimento foi conduzido corretamente.
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Confira o <strong>enquadramento</strong> (tipo de infração) e o que consta no auto.
                </li>
                <li>
                  Verifique se você recebeu <strong>notificações</strong> dentro do prazo e no endereço correto.
                </li>
                <li>
                  Avalie se existe <strong>defesa/recursos</strong> cabíveis e se os prazos ainda estão abertos.
                </li>
              </ul>
            </div>
          </section>

          <section id="passos" className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">Passo a passo prático</h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">1) Identifique o estágio</h3>
                <p className="mt-2 text-slate-700">
                  É <strong>notificação de autuação</strong> ou <strong>notificação de penalidade</strong>? Isso muda o
                  tipo de medida (defesa prévia ou recurso).
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">2) Confira prazos e dados</h3>
                <p className="mt-2 text-slate-700">
                  Erros de placa, local, horário, identificação, competência e entrega de notificação podem ser decisivos.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">3) Separe provas</h3>
                <p className="mt-2 text-slate-700">
                  Fotos, recibos, comprovantes de local, conversa com o real condutor (se for o caso) e documentos do
                  veículo ajudam a sustentar a tese.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">4) Defina a estratégia</h3>
                <p className="mt-2 text-slate-700">
                  Pode envolver defesa prévia, indicação de condutor (quando cabível) e recursos. Cada caso exige análise
                  do auto e do histórico.
                </p>
              </div>
            </div>
          </section>

          <section id="documentos" className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900">Documentos que ajudam na análise</h2>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <ul className="list-disc space-y-2 pl-6 text-slate-700">
                <li>PPD/CNH e documento com foto</li>
                <li>CRLV do veículo</li>
                <li>Notificação(ões) recebidas (autuação e/ou penalidade)</li>
                <li>Número do auto de infração</li>
                <li>Comprovantes/provas do dia (se houver)</li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Quanto mais completo o conjunto de documentos, mais precisa fica a análise.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mt-12">
            <FAQ faqs={faqs as any} />
          </section>

          {/* CTA */}
          <section className="mt-12 rounded-2xl bg-slate-50 p-6">
            <h2 className="text-xl font-bold text-slate-900">Quer uma análise do seu caso?</h2>
            <p className="mt-2 text-slate-700">
              Se você recebeu notificação durante a CNH provisória (PPD), o ideal é agir rápido para não perder prazos.
              Clique no WhatsApp e envie: <strong>foto da notificação</strong> + <strong>seu nome</strong> +{" "}
              <strong>cidade</strong>.
            </p>
          </section>
        </main>

        <Footer menuData={menu} />
        <WhatsAppButton />
      </div>
    </>
  );
}