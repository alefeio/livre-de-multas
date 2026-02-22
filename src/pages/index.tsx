// pages/index.tsx
import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Script from "next/script";
import HeroSlider from "../components/HeroSlider";
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
import { useState } from "react";
import HeroSliderAreas from "components/HeroSliderAreas";
import HeroSliderSobre from "components/HeroSliderSobre";
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
        logoUrl: rawMenu.logoUrl || "/images/logo.png",
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

  // ✅ Imagem única e fixa para previews (WhatsApp/Meta/Twitter)
  const shareImage = "https://livredemultasoficial.com.br/images/banner03.png";

  const jsonLd = {
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
    description:
      "Atuação em Direito de Trânsito com orientação clara e estratégia técnica para defesa e recurso de multas, processos de suspensão e demais procedimentos administrativos.",
    serviceType: "Direito de Trânsito",
  };

  const [showExitModal, setShowExitModal] = useState(false);

  return (
    <>
      {/* ✅ Meta Pixel (Next.js do jeito certo) */}
      <Script id="meta-pixel-base" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '379684748131521');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=379684748131521&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      {/* ✅ Google tag (gtag.js) - inserido sem alterar mais nada */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-4GN2YJ045K"
        strategy="afterInteractive"
      />
      <Script id="google-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-4GN2YJ045K');
        `}
      </Script>

      <Head>
        {/* Title */}
        <title>
          Livre de Multas Oficial | Especialista em Direito de Trânsito em Belém-PA
        </title>

        {/* Description */}
        <meta
          name="description"
          content="Livre de Multas Oficial: atuação em Direito de Trânsito com orientação clara e estratégia técnica para defesa e recurso de multas, processos de suspensão e outros procedimentos administrativos."
        />

        {/* Robots */}
        <meta name="robots" content="index, follow, max-image-preview:large" />

        {/* Canonical */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Keywords */}
        <meta
          name="keywords"
          content="direito de trânsito belém, defesa de multa, recurso de multa, suspensão da cnh, livre de multas oficial, advogado trânsito belém pa"
        />

        {/* Open Graph */}
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Livre de Multas Oficial | Direito de Trânsito" />
        <meta
          property="og:description"
          content="Defesa e recurso de multas, processos de suspensão e orientação estratégica em Direito de Trânsito."
        />
        <meta property="og:url" content={canonicalUrl} />

        {/* ✅ PREVIEW FIXO (WhatsApp/Meta) */}
        <meta property="og:image" content={shareImage} />
        <meta property="og:image:secure_url" content={shareImage} />
        <meta property="og:image:alt" content="Livre de Multas Oficial" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Livre de Multas Oficial | Direito de Trânsito" />
        <meta
          name="twitter:description"
          content="Defesa e recurso de multas, processos de suspensão e orientação estratégica em Direito de Trânsito."
        />
        {/* ✅ PREVIEW FIXO (Twitter) */}
        <meta name="twitter:image" content={shareImage} />

        {/* Theme */}
        <meta name="theme-color" content="#0f172a" />

        {/* Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="min-h-screen">
        <Analytics />
        <MenuComponent menuData={menu} />
        <HeroSlider banners={banners} />

        <main className="max-w-full mx-auto">
          <Hero />

          <span id="como-funciona"></span>
          <HeroSliderSobre />

          <span id="atuacao"></span>
          <HeroSliderAreas />

          <span id="contato"></span>
          <Contato />

          <span id="faq"></span>
          <FAQ faqs={faqs} />

          <span id="depoimentos"></span>
          <Testimonials testimonials={testimonials} />

          <span id="blog"></span>
          <Blog />

          <span id="localizacao"></span>
          <PageContato />

          <Footer menuData={menu} />
        </main>

        <WhatsAppButton />
      </div>
    </>
  );
}