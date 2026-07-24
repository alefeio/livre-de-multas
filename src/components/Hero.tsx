import React from "react";

const WHATSAPP_MSG = encodeURIComponent("Olá, recebi uma multa de trânsito e gostaria de analisar meu caso.");
const WHATSAPP_URL = `https://wa.me/5591981006131?text=${WHATSAPP_MSG}`;

const ESPECIALISTA = {
  nome: "Pablo Roberto",
  foto: "/images/profissional.jpg",
  alt: "Pablo Roberto - Especialista em Direito de Trânsito",
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-blue-950 pt-28 sm:pt-32 md:pt-40 lg:pt-44 pb-16 md:pb-24" id="inicio">
      {/* Fundo decorativo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#fec655]/10 blur-3xl" />
        <div className="absolute bottom-[-240px] right-[-160px] h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">

          {/* TEXTO — Headline de impacto */}
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
              Multa na CNH Provisória?<br />
              <span className="text-[#fec655]">Veja se você pode perder sua habilitação</span>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-gray-200 md:text-lg">
              Recebeu uma multa e está com CNH provisória (PPD)? Dependendo da infração você pode perder o direito de tirar a CNH definitiva. Antes de pagar ou perder o prazo, faça uma análise da notificação.
            </p>

            <ul className="grid gap-3">
              <li className="flex items-start gap-3 text-gray-200">
                <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#fec655]/15 text-[#fec655]">✓</span>
                <span>Atendimento especializado em direito de trânsito</span>
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#fec655]/15 text-[#fec655]">✓</span>
                <span>Análise técnica da notificação</span>
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#fec655]/15 text-[#fec655]">✓</span>
                <span>Orientação clara sobre prazos e defesa</span>
              </li>
            </ul>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:brightness-110"
            >
              Quero recorrer minha multa
            </a>

            <p className="text-sm text-gray-400">
              Cada caso deve ser analisado individualmente. O contato não gera obrigação.
            </p>
          </div>

          {/* Foto do especialista */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-b from-[#fec655]/20 to-transparent blur-2xl" />

            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
              <div className="relative w-full h-[320px] sm:h-[360px] md:h-[400px] overflow-hidden bg-blue-950/50">
                <img
                  src={ESPECIALISTA.foto}
                  alt={ESPECIALISTA.alt}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-lg font-extrabold text-white">
                {ESPECIALISTA.nome}
              </p>
              <p className="text-sm font-semibold text-[#fec655]">Especialista em Direito de Trânsito</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center rounded-full bg-[#25D366] px-6 py-3 font-bold text-white shadow-lg transition-all duration-200 hover:brightness-110"
              >
                Falar com um especialista no WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
