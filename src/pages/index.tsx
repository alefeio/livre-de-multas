import { GetServerSideProps } from "next";
import Head from "next/head";
import WhatsAppButton from "../components/WhatsAppButton";
import FAQ from "../components/FAQ";
import { Menu as MenuComponent } from "components/Menu";
import Hero from "components/Hero";
import { Analytics } from "@vercel/analytics/next";
import { MenuData, LinkItem } from "../types/index";
import HomeHowItWorks from "components/HomeHowItWorks";
import LandingProblemSection from "components/LandingProblemSection";
import LandingConsequenceSection from "components/LandingConsequenceSection";
import LandingCtaFinal from "components/LandingCtaFinal";
import Blog from "components/Blog";
import Contato from "components/Contato";
import Footer from "components/Footer";
import prisma from "../../lib/prisma";

interface HomeProps {
  menu: MenuData | null;
}

const HOME_FAQS = [
  {
    id: "home-faq-1",
    pergunta: "Vocês analisam multas do DETRAN-PA?",
    resposta:
      "Sim. Atendemos análise de notificações e recursos administrativos relacionados a autuações do DETRAN-PA. O encaminhamento depende dos documentos e da fase do processo.",
  },
  {
    id: "home-faq-2",
    pergunta: "Atendem multas da SEMOB/SEGBEL?",
    resposta:
      "Sim. Também analisamos notificações e recursos de multas municipais em Belém, inclusive SEMOB/SEGBEL, a partir da documentação enviada.",
  },
  {
    id: "home-faq-3",
    pergunta: "Preciso ir presencialmente?",
    resposta:
      "Não necessariamente. O primeiro contato e o envio da notificação podem ser feitos pelo WhatsApp. Atendimento em Belém – PA, com possibilidade de orientação remota conforme o caso.",
  },
  {
    id: "home-faq-4",
    pergunta: "Quais documentos posso enviar?",
    resposta:
      "Em geral: foto ou PDF da notificação de autuação ou de penalidade, documentos do condutor e do veículo, e demais peças que você já tenha. Quanto mais completo o conjunto, mais precisa fica a análise.",
  },
  {
    id: "home-faq-5",
    pergunta: "Existe prazo para apresentar defesa ou recurso?",
    resposta:
      "Sim. Os prazos costumam constar na própria notificação e variam conforme a fase do processo. Por isso é importante enviar a documentação para conferência das datas.",
  },
  {
    id: "home-faq-6",
    pergunta: "O envio da documentação garante cancelamento?",
    resposta:
      "Não. O envio da notificação não garante cancelamento, deferimento ou qualquer resultado específico. Cada caso depende da análise dos documentos e das circunstâncias específicas.",
  },
];

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const menus = await prisma.menu.findMany();
    const rawMenu = menus.length > 0 ? menus[0] : null;

    let formattedMenu: MenuData | null = null;
    if (rawMenu && rawMenu.links && Array.isArray(rawMenu.links)) {
      const links: LinkItem[] = (rawMenu.links as unknown as LinkItem[]).map((link) => ({
        id: link.id,
        text: link.text,
        url: link.url,
      }));

      formattedMenu = {
        logoUrl: rawMenu.logoUrl || "https://livredemultasoficial.com.br/images/logo.png",
        links,
      };
    }

    return {
      props: {
        menu: JSON.parse(JSON.stringify(formattedMenu)),
      },
    };
  } catch (error) {
    console.error("Erro ao buscar menu da homepage:", error);
    return {
      props: {
        menu: null,
      },
    };
  }
};

export default function Home({ menu }: HomeProps) {
  const canonicalUrl = "https://www.livredemultasoficial.com.br/";
  const shareImage = "https://www.livredemultasoficial.com.br/images/banner03.png";

  const title = "Recurso de Multa em Belém | Direito de Trânsito | Livre de Multas";
  const description =
    "Atuação jurídica em Direito de Trânsito em Belém. Análise de notificações e recursos de multa do DETRAN-PA e da SEMOB/SEGBEL. Envie sua notificação pelo WhatsApp.";

  const jsonLdLegal = {
    "@context": "https://schema.org",
    "@type": ["LegalService", "LocalBusiness"],
    name: "Livre de Multas",
    image: shareImage,
    url: canonicalUrl,
    telephone: "+5591981006131",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Gov. José Malcher, 153, sala 12",
      addressLocality: "Belém",
      addressRegion: "PA",
      postalCode: "66035-065",
      addressCountry: "BR",
    },
    areaServed: [
      { "@type": "City", name: "Belém" },
      { "@type": "State", name: "Pará" },
    ],
    sameAs: ["https://www.instagram.com/livredemultasoficial/"],
    description,
    serviceType: "Direito de Trânsito",
  };

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Livre de Multas",
    url: canonicalUrl,
    description,
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="author" content="Livre de Multas" />
        <meta name="geo.region" content="BR-PA" />
        <meta name="geo.placename" content="Belém" />

        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Livre de Multas" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={shareImage} />
        <meta property="og:image:secure_url" content={shareImage} />
        <meta property="og:image:alt" content="Livre de Multas - Direito de Trânsito em Belém" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={shareImage} />
        <meta name="twitter:image:alt" content="Livre de Multas" />

        <meta name="theme-color" content="#0f172a" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLegal) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }} />
      </Head>

      <div className="min-h-screen">
        <Analytics />
        <MenuComponent menuData={menu} />

        <main className="max-w-full mx-auto">
          <Hero />
          <LandingProblemSection />
          <HomeHowItWorks />
          <LandingConsequenceSection />

          <span id="depoimentos" />

          <span id="faq" />
          <FAQ faqs={HOME_FAQS} />

          <LandingCtaFinal />

          <span id="blog" className="block scroll-mt-36" aria-hidden="true" />
          <section className="relative w-full overflow-hidden bg-blue-950 pt-12 md:pt-20" aria-label="Artigos do blog">
            <div className="container relative z-10 mx-auto flex max-w-7xl flex-col items-center px-5 py-12 sm:px-6 md:px-10 md:py-16">
              <h2 className="mb-8 text-2xl font-extrabold leading-tight text-white md:mb-10 md:text-4xl">
                <span className="text-[#fec655]">Artigos</span> e orientações
              </h2>
              <Blog limit={6} showVerTodos />
            </div>
          </section>

          <span id="contato" />
          <Contato />

          <span id="localizacao" />
          <section className="bg-white" aria-labelledby="localizacao-titulo">
            <div className="relative z-10 flex flex-col items-center px-5 py-12 sm:px-6 md:px-10 md:py-16">
              <h2 id="localizacao-titulo" className="text-2xl font-extrabold leading-tight text-blue-950 md:text-4xl">
                Onde estamos
              </h2>
              <address className="mt-4 mb-8 not-italic text-center text-base text-gray-600 md:text-lg">
                Livre de Multas
                <br />
                Av. Gov. José Malcher, 153, sala 12
                <br />
                Nazaré, Belém – PA, 66035-065
                <br />
                WhatsApp: +55 91 98100-6131
              </address>
              <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">
                <div className="w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    title="Localização do escritório Livre de Multas em Belém"
                    src="https://www.google.com/maps?output=embed&q=Av.+Gov.+Jos%C3%A9+Malcher,+153+-+Nazar%C3%A9,+Bel%C3%A9m+-+PA,+66035-065"
                    width="100%"
                    height="100%"
                    style={{ border: 0, position: "absolute", top: 0, left: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </section>

          <Footer menuData={menu} />
        </main>

        <WhatsAppButton />
      </div>
    </>
  );
}
