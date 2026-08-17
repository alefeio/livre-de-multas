import React from "react";
import Image from "next/image";
import { HOME_WHATSAPP_HREF, WHATSAPP_GTM_ATTR } from "lib/whatsapp";

const PROFISSIONAL = {
  nome: "Pablo Roberto",
  foto: "/images/profissional.jpg",
  alt: "Pablo Roberto, advogado com atuação em Direito de Trânsito em Belém",
};

const CTA_CLASS =
  "inline-flex items-center justify-center rounded-full bg-[#25D366] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:brightness-110";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-blue-950 pt-24 pb-10 sm:pt-28 sm:pb-14 md:pt-36 md:pb-20"
      id="inicio"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#fec655]/10 blur-3xl" />
        <div className="absolute bottom-[-240px] right-[-160px] h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-14">
          <div className="flex flex-col gap-4 md:gap-6">
            <p className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-gray-200">
              Belém – PA
            </p>

            <h1 className="!text-[1.75rem] !leading-snug font-extrabold text-white sm:!text-3xl md:!text-5xl">
              Recebeu uma multa de trânsito?
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-gray-200 md:text-lg">
              Atuação jurídica em Direito de Trânsito para análise de multas, notificações e
              processos administrativos em Belém — incluindo DETRAN-PA e SEMOB/SEGBEL.
            </p>

            <a
              href={HOME_WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              data-gtm={WHATSAPP_GTM_ATTR}
              className={`${CTA_CLASS} min-h-[48px] w-full sm:w-auto`}
            >
              Enviar notificação pelo WhatsApp
            </a>

            <p className="text-sm text-gray-400">
              Cada caso deve ser analisado individualmente. O contato não gera obrigação.
            </p>

            <ul className="hidden grid-cols-1 gap-2.5 text-sm text-gray-200 sm:grid sm:text-base">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#fec655]/15 text-[#fec655]">
                  ✓
                </span>
                <span>Análise de notificações e recursos administrativos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#fec655]/15 text-[#fec655]">
                  ✓
                </span>
                <span>DETRAN-PA, SEMOB/SEGBEL, suspensão da CNH e CNH provisória</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#fec655]/15 text-[#fec655]">
                  ✓
                </span>
                <span>Atendimento em Belém pelo WhatsApp</span>
              </li>
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-b from-[#fec655]/20 to-transparent blur-2xl" />

            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
              <div className="relative h-[200px] w-full overflow-hidden bg-blue-950/50 sm:h-[280px] md:h-[400px]">
                <Image
                  src={PROFISSIONAL.foto}
                  alt={PROFISSIONAL.alt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
              </div>
            </div>

            <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm md:mt-6 md:p-6">
              <p className="text-lg font-extrabold text-white">{PROFISSIONAL.nome}</p>
              <p className="text-sm font-semibold text-[#fec655]">
                Advogado com atuação em Direito de Trânsito
              </p>
              <a
                href={HOME_WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                data-gtm={WHATSAPP_GTM_ATTR}
                className="mt-4 flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#25D366] px-6 py-3 font-bold text-white shadow-lg transition-all duration-200 hover:brightness-110"
              >
                Enviar notificação para análise
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
