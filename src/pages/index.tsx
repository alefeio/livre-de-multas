// pages/index.tsx
import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import Head from "next/head";
import WhatsAppButton from "../components/WhatsAppButton";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import { Menu as MenuComponent } from "components/Menu";
import Hero from "components/Hero";
import { Analytics } from "@vercel/analytics/next";
import {
  HomePageProps,
  ColecaoProps,
  MenuData,
  LinkItem,
} from "../types/index";
import HeroSliderSobre from "components/HeroSliderSobre";
import LandingProblemSection from "components/LandingProblemSection";
import LandingConsequenceSection from "components/LandingConsequenceSection";
import LandingCtaFinal from "components/LandingCtaFinal";
import Blog from "components/Blog";
import Contato from "components/Contato";
import Footer from "components/Footer";
import PageContato from "./contato";

// FUNÇÃO SLUGIFY
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  try {
    const [banners, menus, testimonials, faqs, colecoes] = await Promise.all([
      prisma.banner.findMany(),
      prisma.menu.findMany(),
      prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.fAQ.findMany({ orderBy: { pergunta: "asc" } }),
      prisma.colecao.findMany({
        orderBy: { order: "asc" },
        include: {
          items: {
            orderBy: [{ view: "desc" }, { like: "desc" }],
          },
        },
      }),
    ]);

    const mappedTestimonials = testimonials.map((t: any) => ({
      ...t,
      avatarUrl: t.avatarUrl ?? undefined,
    }));

    const colecoesComSlugs: ColecaoProps[] = colecoes.map((colecao: any) => ({
      ...colecao,
      slug: slugify(colecao.title),
      items: colecao.items.map((item: any) => ({
        ...item,
        slug: slugify(`${item.productMark}-${item.productModel}-${item.cor}`),
      })),
    }));

    const rawMenu: any | null = menus.length > 0 ? menus[0] : null;

    let formattedMenu: MenuData | null = null;
    if (rawMenu && rawMenu.links && Array.isArray(rawMenu.links)) {
      const links: LinkItem[] = rawMenu.links.map((link: any) => ({
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
        banners: JSON.parse(JSON.stringify(banners)),
        menu: JSON.parse(JSON.stringify(formattedMenu)),
        testimonials: JSON.parse(JSON.stringify(mappedTestimonials)),
        faqs: JSON.parse(JSON.stringify(faqs)),
        colecoes: JSON.parse(JSON.stringify(colecoesComSlugs)),
      },
    };
  } catch (error) {
    console.error("Erro ao buscar dados do banco de dados:", error);
    return {
      props: {
        banners: [],
        menu: null,
        testimonials: [],
        faqs: [],
        colecoes: [],
      },
    };
  } finally {
    await prisma.$disconnect();
  }
};

export default function Home({ banners, menu, testimonials, faqs }: HomePageProps) {
  const canonicalUrl = "https://www.livredemultasoficial.com.br/";
  const shareImage = "https://www.livredemultasoficial.com.br/images/banner03.png";

  const title = "Multa na CNH Provisória? Defesa e Recurso de Multas | Livre de Multas Belém";
  const description = "Advogados Especialistas em Direito de Trânsito em Belém-PA. Análise da notificação, defesa e recurso de multas, CNH provisória, bafômetro e suspensão. Atendimento pelo WhatsApp.";
  const keywords = "multa cnh provisória, defesa de multa belém, recurso de multa trânsito, suspensão da cnh, bafômetro recusa, direito de trânsito belém pa, livre de multas, advogado multa trânsito, analisar notificação multa";

  const jsonLdLegal = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Livre de Multas Oficial",
    image: shareImage,
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
    description,
    serviceType: "Direito de Trânsito",
  };

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Livre de Multas Oficial",
    url: canonicalUrl,
    description,
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${canonicalUrl}blog?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Livre de Multas Oficial" />
        <meta name="geo.region" content="BR-PA" />
        <meta name="geo.placename" content="Belém" />

        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Livre de Multas Oficial" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={shareImage} />
        <meta property="og:image:secure_url" content={shareImage} />
        <meta property="og:image:alt" content="Livre de Multas Oficial - Direito de Trânsito Belém" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={shareImage} />
        <meta name="twitter:image:alt" content="Livre de Multas Oficial" />

        <meta name="theme-color" content="#0f172a" />

        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLegal) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }} />
      </Head>

      <div className="min-h-screen">
        <Analytics />
        <MenuComponent menuData={menu} />

        <main className="max-w-full mx-auto">
          {/* 1. Headline de impacto + prova de autoridade */}
          <Hero />

          {/* 2. Identificação do problema */}
          <LandingProblemSection />

          {/* 3. Consequência (gatilho emocional) */}
          <LandingConsequenceSection />

          {/* 4. Como funciona (simples) */}
          <HeroSliderSobre />

          {/* 5. Prova social */}
          <span id="depoimentos"></span>
          <Testimonials testimonials={testimonials} />

          {/* 6. FAQ (SEO forte) */}
          <span id="faq"></span>
          <FAQ faqs={faqs} />

          {/* 7. CTA final */}
          <LandingCtaFinal />

          {/* 8. Blog — alcance orgânico */}
          <span id="blog"></span>
          <section className="relative w-full bg-blue-950 overflow-hidden" aria-label="Artigos do blog">
            <div className="container mx-auto max-w-7xl relative z-10 flex flex-col items-center px-6 py-16 md:px-10 md:py-24">
              <h2 className="mb-12 text-3xl font-extrabold leading-tight text-white md:text-5xl">
                <span className="text-[#fec655]">Artigos</span> e orientações
              </h2>
              <Blog />
            </div>
          </section>

          {/* 9. Formulário Analisar meu caso */}
          <span id="contato"></span>
          <Contato />

          <span id="localizacao"></span>
          <PageContato />

          <Footer menuData={menu} />
        </main>

        <WhatsAppButton />
      </div>
    </>
  );
}