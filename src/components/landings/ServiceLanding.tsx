import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { Menu as MenuComponent } from "components/Menu";
import Footer from "components/Footer";
import WhatsAppButton from "components/WhatsAppButton";
import FAQ from "components/FAQ";
import Contato from "components/Contato";
import { MenuData } from "types/index";
import { WHATSAPP_GTM_ATTR, whatsappLink } from "lib/whatsapp";
import { ServiceLandingContent } from "lib/landingPages";

const BASE_URL = "https://www.livredemultasoficial.com.br";
const SHARE_IMAGE = `${BASE_URL}/images/banner03.png`;
const ADDRESS = "Av. Gov. José Malcher, 153, sala 12, Nazaré, Belém – PA, 66035-065";

const STEPS = [
  { num: "1", title: "Envie os documentos", text: "Encaminhe a notificação e os documentos disponíveis pelo WhatsApp." },
  { num: "2", title: "Análise do caso", text: "O caso, os prazos e a fase administrativa são analisados." },
  { num: "3", title: "Orientação", text: "Você recebe orientação sobre as possibilidades do caso." },
];

const CTA_CLASS =
  "inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#25D366] px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:brightness-110 sm:w-auto";

interface ServiceLandingProps {
  menu: MenuData | null;
  content: ServiceLandingContent;
}

export default function ServiceLanding({ menu, content }: ServiceLandingProps) {
  const canonicalUrl = `${BASE_URL}/${content.slug}`;
  const whatsappHref = whatsappLink(content.whatsappMessage);

  const jsonLdLegal = {
    "@context": "https://schema.org",
    "@type": ["LegalService", "LocalBusiness"],
    name: "Livre de Multas",
    image: SHARE_IMAGE,
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
    description: content.description,
    serviceType: content.serviceType,
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: content.breadcrumbLabel, item: canonicalUrl },
    ],
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.pergunta,
      acceptedAnswer: { "@type": "Answer", text: faq.resposta },
    })),
  };

  return (
    <>
      <Head>
        <title>{content.title}</title>
        <meta name="description" content={content.description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="author" content="Livre de Multas" />
        <meta name="geo.region" content="BR-PA" />
        <meta name="geo.placename" content="Belém" />

        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Livre de Multas" />
        <meta property="og:title" content={content.title} />
        <meta property="og:description" content={content.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={SHARE_IMAGE} />
        <meta property="og:image:alt" content={content.h1} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={content.title} />
        <meta name="twitter:description" content={content.description} />
        <meta name="twitter:image" content={SHARE_IMAGE} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLegal) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      </Head>

      <div className="min-h-screen bg-blue-950 text-white">
        <Analytics />
        <MenuComponent menuData={menu} />

        <main>
          <section className="relative overflow-hidden pt-24 pb-10 sm:pt-28 md:pt-32 md:pb-16" id="inicio">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#fec655]/10 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
              <nav aria-label="Breadcrumb" className="mb-5 text-xs text-gray-400 sm:text-sm">
                <ol className="flex flex-wrap items-center gap-1">
                  <li>
                    <Link href="/" className="text-gray-400 hover:text-[#fec655]">
                      Início
                    </Link>
                  </li>
                  <li aria-hidden className="px-1">
                    /
                  </li>
                  <li className="text-gray-200">{content.breadcrumbLabel}</li>
                </ol>
              </nav>

              <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-gray-200">
                      Belém – PA
                    </span>
                    <span className="inline-flex w-fit items-center rounded-full border border-[#fec655]/25 bg-[#fec655]/10 px-3 py-1 text-xs font-medium text-[#fec655]">
                      {content.badge}
                    </span>
                  </div>

                  <h1 className="!text-[1.75rem] !leading-snug font-extrabold text-white sm:!text-3xl md:!text-5xl">
                    {content.h1}
                  </h1>

                  <p className="max-w-xl text-base leading-relaxed text-gray-200 md:text-lg">{content.subtitle}</p>

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-gtm={WHATSAPP_GTM_ATTR}
                    className={CTA_CLASS}
                  >
                    {content.ctaLabel}
                  </a>
                  <p className="text-sm text-gray-400">
                    Cada caso deve ser analisado individualmente. O contato não gera obrigação.
                  </p>
                </div>

                <div className="relative">
                  <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
                    <div className="relative h-[200px] w-full sm:h-[280px] md:h-[360px]">
                      <Image
                        src="/images/profissional.jpg"
                        alt="Pablo Roberto, advogado com atuação em Direito de Trânsito em Belém"
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                  <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-lg font-extrabold text-white">Pablo Roberto</p>
                    <p className="text-sm font-semibold text-[#fec655]">Advogado com atuação em Direito de Trânsito</p>
                    <p className="mt-2 text-sm text-gray-400">{ADDRESS}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#070a0f] py-12 md:py-16" id="identificacao">
            <div className="mx-auto max-w-3xl px-5 text-center sm:px-6 md:px-10">
              <h2 className="text-2xl font-extrabold text-white md:text-3xl">{content.identificationHeading}</h2>
              <p className="mt-4 text-base leading-relaxed text-gray-300 md:text-lg">{content.identificationText}</p>
            </div>
          </section>

          <section className="bg-blue-950 py-12 md:py-16" id="como-funciona">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
              <h2 className="mb-8 text-center text-2xl font-extrabold text-white md:text-3xl">
                <span className="text-[#fec655]">Como funciona</span>
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {STEPS.map((step) => (
                  <div key={step.num} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-xl font-bold text-white">
                      {step.num}
                    </span>
                    <p className="mt-4 font-semibold text-white">{step.title}</p>
                    <p className="mt-2 text-sm text-gray-400">{step.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-gtm={WHATSAPP_GTM_ATTR}
                  className={CTA_CLASS}
                >
                  {content.ctaLabel}
                </a>
              </div>
            </div>
          </section>

          <section className="bg-[#070a0f] py-12 md:py-16" id="analise">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
              <h2 className="mb-8 text-center text-2xl font-extrabold text-white md:text-3xl">O que é analisado</h2>
              <ul className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
                {content.analyzed.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-200"
                  >
                    <span className="text-[#fec655]" aria-hidden>
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="bg-blue-950 py-12 md:py-16" id="situacoes">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
              <h2 className="mb-8 text-center text-2xl font-extrabold text-white md:text-3xl">Situações relacionadas</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {content.situations.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-gray-400">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <span id="faq" />
          <FAQ faqs={content.faqs} />

          {(content.relatedLinks.length > 0 || content.blogLinks.length > 0) && (
            <nav aria-label="Links relacionados" className="bg-[#070a0f] py-10">
              <div className="mx-auto max-w-3xl px-5 sm:px-6">
                <h2 className="text-lg font-extrabold text-white">Outros conteúdos</h2>
                <ul className="mt-4 space-y-2 text-sm">
                  {content.relatedLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-[#fec655] hover:opacity-90">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  {content.blogLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-gray-300 hover:text-[#fec655]">
                        Artigo: {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          )}

          <section className="bg-[#fec655] py-12 md:py-16" id="cta-final">
            <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
              <h2 className="text-2xl font-extrabold !text-[#0c1a26] md:text-4xl">{content.ctaFinalHeading}</h2>
              <p className="mt-3 text-base font-medium text-[#0c1a26]/90">
                Atendimento em Belém – PA. Cada caso é analisado individualmente.
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-gtm={WHATSAPP_GTM_ATTR}
                className={`${CTA_CLASS} mt-8`}
              >
                {content.ctaLabel}
              </a>
            </div>
          </section>

          <span id="contato" />
          <Contato />

          <section className="bg-white py-12 md:py-16" aria-labelledby="local-titulo">
            <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
              <h2 id="local-titulo" className="!text-blue-950 text-2xl font-extrabold md:text-3xl">
                Onde estamos
              </h2>
              <address className="mt-4 not-italic text-gray-600">
                Livre de Multas
                <br />
                {ADDRESS}
                <br />
                WhatsApp: +55 91 98100-6131
              </address>
              <div className="relative mx-auto mt-8 w-full overflow-hidden rounded-3xl border border-gray-200">
                <div className="w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    title="Localização do escritório Livre de Multas em Belém"
                    src="https://www.google.com/maps?output=embed&q=Av.+Gov.+Jos%C3%A9+Malcher,+153+-+Nazar%C3%A9,+Bel%C3%A9m+-+PA,+66035-065"
                    width="100%"
                    height="100%"
                    style={{ border: 0, position: "absolute", top: 0, left: 0 }}
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
