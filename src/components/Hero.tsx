import React from "react";
import { useRouter } from "next/router";

type HeroProps = {
  imageSrc?: string;
  imageAlt?: string;
};

export default function Hero({
  imageSrc = "/images/profissional.jpg",
  imageAlt = "Especialista em defesa e recurso de multas de trânsito",
}: HeroProps) {
  const router = useRouter();

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Olá, recebi uma multa de trânsito e gostaria de analisar meu caso."
    );

    window.open(
      `https://wa.me/5591981006131?text=${message}`,
      "_blank"
    );
    // 🔁 Substituir pelo número oficial
  };

  const goToServices = () => {
    router.push("/#servicos");
  };

  return (
    <section className="relative overflow-hidden bg-blue-950 pt-8 md:pt-36 pb-16 md:pb-24">
      {/* Fundo decorativo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#fec655]/10 blur-3xl" />
        <div className="absolute bottom-[-240px] right-[-160px] h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">

          {/* TEXTO */}
          <div className="flex flex-col gap-6">

            <h1 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
              <span className="text-[#fec655]">Recebeu uma multa de trânsito?</span>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-gray-200 md:text-lg">
              CNH provisória, bafômetro, suspensão ou multa gravíssima?
              Entenda seus direitos e os próximos passos antes que o prazo termine.
            </p>

            <ul className="grid gap-3">
              <li className="flex items-start gap-3 text-gray-200">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#fec655]/15 text-[#fec655]">
                  ✓
                </span>
                <span>Análise técnica da notificação</span>
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#fec655]/15 text-[#fec655]">
                  ✓
                </span>
                <span>Orientação clara sobre prazos e procedimento</span>
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#fec655]/15 text-[#fec655]">
                  ✓
                </span>
                <span>Atendimento direto com especialista</span>
              </li>
            </ul>

            {/* BOTÕES */}
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={openWhatsApp}
                className="inline-flex items-center justify-center rounded-full bg-[#fec655] px-7 py-3 font-bold text-[#0c1a26] shadow-lg transition-all duration-300 hover:brightness-95"
              >
                Analisar minha multa agora
              </button>

              <button
                onClick={goToServices}
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3 font-semibold text-white transition-all duration-300 hover:bg-white/10"
              >
                Ver tipos de multa
              </button>
            </div>

            <p className="text-sm text-gray-400">
              Cada caso deve ser analisado individualmente. O contato não gera obrigação.
            </p>

            <p className="text-xs text-gray-400 leading-relaxed">
              Seus dados estão seguros. Atendimento direto pelo WhatsApp, sem compromisso.
            </p>
          </div>

          {/* IMAGEM + AUTORIDADE */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-b from-[#fec655]/20 to-transparent blur-2xl" />

            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
              <div className="w-full max-h-[400px] overflow-hidden">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="h-full w-full object-cover object-top transition-transform duration-500 ease-in-out hover:scale-[1.03]"
                />
              </div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
            </div>

            {/* BLOCO AUTORIDADE */}
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-lg font-extrabold text-white">
                Pablo Roberto
              </p>
              <p className="text-sm text-[#fec655] font-semibold">
                Especialista em Direito de Trânsito
              </p>

              <button
                onClick={openWhatsApp}
                className="mt-4 w-full flex items-center justify-center px-6 py-3 bg-[#fec655] text-[#0c1a26] font-bold rounded-full shadow-lg transition-all duration-200 hover:brightness-95"
              >
                Falar com especialista no WhatsApp
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
