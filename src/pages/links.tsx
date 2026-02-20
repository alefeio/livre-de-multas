// pages/links.tsx
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import {
  FiInstagram,
  FiMapPin,
  FiGlobe,
  FiMessageCircle,
  FiStar,
  FiPhone,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const BRAND = {
  name: "Pereira de Sousa Advogados",
  legalName: "Pereira de Sousa Advogados",
  domain: "https://livredemultasoficial.com.br",
  pageUrl: "https://livredemultasoficial.com.br",
  phoneDisplay: "(91) 98395-7965",
  phoneE164: "+5591981006131",
  whatsappNumber: "5591981006131", // sem +, sem espaços
  address: {
    street: "Belém/PA",
    city: "Belém",
    region: "PA",
    postal: "",
    country: "BR",
  },
  instagram: "https://www.instagram.com/livredemultasoficial", // ✅ troque pelo @ oficial (se já tiver)
  googleMaps:
    "https://www.google.com/maps/search/?api=1&query=Bel%C3%A9m%2C%20PA",
  logo: "https://res.cloudinary.com/dfh7fwtec/image/upload/v1768800952/dresses/yaiptstgtqs7a0brs9mh.jpg",
  ogImage: "https://res.cloudinary.com/dfh7fwtec/image/upload/v1768800952/dresses/yaiptstgtqs7a0brs9mh.jpg", // ✅ opcional (crie depois). Se não existir, troque por uma imagem que exista.
};

function buildWhatsAppLink(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${BRAND.whatsappNumber}?text=${text}`;
}

export default function LinksPage() {
  const title = "Pereira de Sousa Advogados | Links oficiais";
  const description =
    "Fale com o escritório Pereira de Sousa Advogados. Atendimento via WhatsApp, acesso ao site e redes sociais. Atuação em diversas áreas do Direito, com orientação técnica e humanizada.";
  const keywords =
    "Pereira de Sousa Advogados, advogado em Belém, escritório de advocacia Belém, direito previdenciário Belém, direito civil Belém, direito do trabalho Belém, direito empresarial Belém, direito de família Belém, direito do consumidor Belém, direito bancário Belém, direito tributário Belém, direito digital Belém, direito da saúde Belém, advogado TEA Belém";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: BRAND.legalName,
    url: BRAND.domain,
    image: `${BRAND.domain}${BRAND.ogImage.startsWith("/") ? BRAND.ogImage : `/${BRAND.ogImage}`}`,
    telephone: BRAND.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: BRAND.address.street,
      addressLocality: BRAND.address.city,
      addressRegion: BRAND.address.region,
      postalCode: BRAND.address.postal || undefined,
      addressCountry: BRAND.address.country,
    },
    sameAs: BRAND.instagram && BRAND.instagram !== "https://www.instagram.com/" ? [BRAND.instagram] : [],
  };

  const primaryCta = buildWhatsAppLink(
    "Olá! Gostaria de falar com um advogado do escritório Pereira de Sousa. Pode me orientar, por favor?"
  );

  const areasCta = buildWhatsAppLink(
    "Olá! Quero saber qual área de atuação é a ideal para o meu caso e quais documentos preciso separar."
  );

  const atendimentoCta = buildWhatsAppLink(
    "Olá! Quero agendar um atendimento (presencial/online). Quais horários disponíveis?"
  );

  const links = [
    {
      label: "Falar no WhatsApp (atendimento)",
      href: primaryCta,
      icon: <FaWhatsapp size={18} />,
      highlight: true,
      note: "Resposta o quanto antes",
    },
    {
      label: "Agendar atendimento",
      href: atendimentoCta,
      icon: <FiMessageCircle size={18} />,
      highlight: false,
      note: "Presencial ou online",
    },
    {
      label: "Entender qual área atende meu caso",
      href: areasCta,
      icon: <FiMessageCircle size={18} />,
      highlight: false,
      note: "Orientação inicial",
    },
    {
      label: "Acessar o site",
      href: BRAND.domain,
      icon: <FiGlobe size={18} />,
      highlight: false,
      note: "Serviços e informações",
    },
    {
      label: "Instagram (Pereira de Sousa)",
      href: BRAND.instagram,
      icon: <FiInstagram size={18} />,
      highlight: false,
      note: "Conteúdos e novidades",
    },
    {
      label: "Como chegar (Google Maps)",
      href: BRAND.googleMaps,
      icon: <FiMapPin size={18} />,
      highlight: false,
      note: "Belém/PA",
    },
    {
      label: "Avaliações (Google)",
      href: `https://www.google.com/search?q=${encodeURIComponent(
        "Pereira de Sousa Advogados Belém avaliações"
      )}`,
      icon: <FiStar size={18} />,
      highlight: false,
      note: "Confira experiências reais",
    },
  ];

  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={BRAND.pageUrl} />

        {/* Open Graph */}
        <meta property="og:title" content="Pereira de Sousa Advogados | Links oficiais" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={BRAND.pageUrl} />
        <meta
          property="og:image"
          content={`${BRAND.domain}${BRAND.ogImage.startsWith("/") ? BRAND.ogImage : `/${BRAND.ogImage}`}`}
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pereira de Sousa Advogados | Links oficiais" />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={`${BRAND.domain}${BRAND.ogImage.startsWith("/") ? BRAND.ogImage : `/${BRAND.ogImage}`}`}
        />

        {/* Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* JSON-LD */}
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="afterInteractive"
      />

      <div className="min-h-screen bg-gradient-to-b from-[#fbf7f2] via-white to-[#fbf7f2] text-[#1f1f1f]">
        <Analytics />

        <main className="mx-auto w-full max-w-[520px] px-5 py-10">
          {/* Card topo */}
          <section className="rounded-3xl bg-blue-950 backdrop-blur border border-black/5 shadow-sm p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative h-20 w-44 bg-blue-950 shadow-sm border border-black/5">
                <Image
                  src={BRAND.logo}
                  alt="Logo Pereira de Sousa Advogados"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>

              <h1 className="mt-4 font-[Playfair_Display] text-2xl font-semibold">
                {BRAND.name}
              </h1>

              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Atendimento jurídico com orientação técnica e humanizada <br />
                <span className="font-medium">Fale conosco pelo WhatsApp</span>
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <a
                  href={primaryCta}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-950 px-4 py-2 text-white text-sm font-semibold shadow-sm hover:opacity-90 transition"
                >
                  <FaWhatsapp size={16} /> Falar agora
                </a>

                <a
                  href={`tel:${BRAND.phoneE164}`}
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold hover:bg-blue-950/5 transition"
                >
                  <FiPhone size={16} /> {BRAND.phoneDisplay}
                </a>
              </div>

              <p className="mt-4 text-xs text-white/60">
                📍 {BRAND.address.city}/{BRAND.address.region}
                {BRAND.address.street ? ` • ${BRAND.address.street}` : ""}
              </p>
            </div>
          </section>

          {/* Lista de links */}
          <section className="mt-5 space-y-3">
            {links.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={[
                  "group block rounded-2xl border border-black/5 bg-white shadow-sm hover:shadow-md transition overflow-hidden",
                  item.highlight ? "ring-1 ring-black/10" : "",
                ].join(" ")}
              >
                <div className="flex items-center gap-3 p-4">
                  <div
                    className={[
                      "flex h-10 w-10 items-center justify-center rounded-xl",
                      item.highlight ? "bg-blue-950 text-white" : "bg-blue-950/5 text-black",
                    ].join(" ")}
                  >
                    {item.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold leading-tight">{item.label}</p>
                      <span className="text-xs text-black/40 group-hover:text-black/60 transition">
                        →
                      </span>
                    </div>
                    {item.note ? (
                      <p className="mt-0.5 text-xs text-black/60">{item.note}</p>
                    ) : null}
                  </div>
                </div>

                {item.highlight ? (
                  <div className="h-[3px] w-full bg-gradient-to-r from-black via-black/70 to-black/40" />
                ) : (
                  <div className="h-[1px] w-full bg-blue-950/5" />
                )}
              </a>
            ))}
          </section>

          {/* Mini bloco “como funciona” */}
          <section className="mt-6 rounded-3xl bg-white/80 backdrop-blur border border-black/5 shadow-sm p-6">
            <h2 className="font-[Playfair_Display] text-lg font-semibold">
              Como funciona o atendimento
            </h2>

            <ol className="mt-3 space-y-2 text-sm text-black/75">
              <li>
                <span className="font-semibold text-black">1)</span> Clique em{" "}
                <span className="font-semibold">“Falar no WhatsApp”</span> e descreva sua necessidade.
              </li>
              <li>
                <span className="font-semibold text-black">2)</span> Envie os documentos básicos (quando houver) para análise inicial.
              </li>
              <li>
                <span className="font-semibold text-black">3)</span> Definimos a melhor estratégia e, se necessário, agendamos o atendimento.
              </li>
            </ol>

            <a
              href={primaryCta}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-950 px-4 py-3 text-white text-sm font-semibold shadow-sm hover:opacity-90 transition"
            >
              <FaWhatsapp size={18} /> Falar com o escritório
            </a>

            <p className="mt-3 text-xs text-black/55">
              <strong>Atenção:</strong> esta página é informativa e não substitui uma consulta individualizada.
            </p>
          </section>

          <footer className="mt-8 text-center text-xs text-black/55">
            © {new Date().getFullYear()} {BRAND.legalName}. Todos os direitos reservados.
          </footer>
        </main>
      </div>
    </>
  );
}
