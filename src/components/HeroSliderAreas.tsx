import React from "react";
import ServicesSection from "./ServicesSection";
import { useRouter } from "next/router";

type ServicesHeroProps = {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export default function ServicesHero({
  title = "Atuação",
  subtitle = "Escolha o seu caso para ver orientações e entender o próximo passo.",
}: ServicesHeroProps) {
  const router = useRouter();

  return (
    <section className="relative w-full overflow-hidden bg-blue-950" id="servicos">

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        {/* Cabeçalho curto */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
            <span className="text-[#fec655]">{title}</span>
          </h1>

          <p className="mt-4 text-base leading-relaxed text-gray-200 md:text-lg">
            {subtitle}
          </p>

          {/* Atalhos úteis (opcional) */}
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => router.push("/#contato")}
              className="inline-flex items-center justify-center rounded-full bg-[#fec655] px-7 py-3 font-bold text-[#0c1a26] shadow-lg transition-all duration-300 hover:brightness-95"
            >
              Analisar meu caso
            </button>
          </div>
        </div>

        {/* Serviços (cards/links para cada dor) */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm md:p-6">
          <ServicesSection />
        </div>
      </div>
    </section>
  );
}
