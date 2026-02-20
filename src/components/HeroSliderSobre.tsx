import React from "react";
import { useRouter } from "next/router";

/**
 * Esse componente (HeroSliderSobre) NÃO precisa mais ser um "slider".
 * Para o Livre de Multas, faz mais sentido ter um Hero simples + seção "Quem somos"
 * objetiva (E-E-A-T / confiança), já que o Hero principal do site (que criamos)
 * já cumpre o papel de impacto.
 *
 * Use este componente apenas na página /sobre.
 */

type AboutHeroProps = {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  highlights?: Array<{ title: string; desc: string }>;
};

export default function AboutHero({
  title = "Como funciona",
  subtitle = "Atuamos com foco em orientação clara e estratégia técnica para defesa e recurso de multas de trânsito, com atendimento direto e acompanhamento durante o processo.",
  imageSrc = "/images/banner03.png",
  imageAlt = "Equipe e atendimento especializado em defesa e recurso de multas",
  primaryCtaLabel = "Falar no WhatsApp",
  primaryCtaHref = "/contato",
  highlights = [
    { title: "Atendimento objetivo", desc: "Você entende os próximos passos sem enrolação." },
    { title: "Prazos e organização", desc: "Orientação para agir no tempo certo e com documentação correta." },
    { title: "Acompanhamento", desc: "Suporte durante o processo, com comunicação clara." },
  ],
}: AboutHeroProps) {
  const router = useRouter();

  const goTo = (href: string) => {
    if (!href) return;
    router.push(href);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#070a0f]" id="inicio">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-blue-950/65" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-[#070a0f]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
          {/* Texto */}
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
              <span className="text-[#fec655]">{title}</span>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-gray-200 md:text-lg">
              {subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => goTo(primaryCtaHref)}
                className="inline-flex items-center justify-center rounded-full bg-[#fec655] px-7 py-3 font-bold text-[#0c1a26] shadow-lg transition-all duration-300 hover:brightness-95"
              >
                {primaryCtaLabel}
              </button>
            </div>
          </div>

          {/* Cards de confiança */}
          <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <p className="text-base font-semibold text-white">{h.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-300">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Seção curta de texto (substitui o “textão” antigo) */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-[#fec655]">Como trabalhamos</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-200">
                Analisamos o seu caso, organizamos a documentação e definimos a melhor estratégia
                para defesa e recursos conforme o cenário e os prazos.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#fec655]">Transparência</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-200">
                Explicamos o caminho e o que é possível fazer em linguagem simples,
                sem promessas e com comunicação direta.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#fec655]">Foco no resultado correto</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-200">
                O objetivo é orientar e atuar com técnica e responsabilidade, buscando o melhor
                encaminhamento possível para o seu caso.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
