import React from "react";
import { HOME_WHATSAPP_HREF, WHATSAPP_GTM_ATTR } from "lib/whatsapp";

const ANALYZED = [
  "Órgão autuador (DETRAN-PA, SEMOB/SEGBEL e demais)",
  "Enquadramento da infração",
  "Datas e prazos informados na notificação",
  "Identificação do veículo e dados da autuação",
  "Fase do processo administrativo",
  "Documentação disponível para análise",
];

export default function LandingConsequenceSection() {
  return (
    <section className="relative w-full overflow-hidden bg-blue-950 py-12 md:py-20" id="analise">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-extrabold leading-tight text-white md:text-4xl">
            O que é analisado
          </h2>
          <p className="mt-4 text-base text-gray-200 md:text-lg">
            A orientação depende dos documentos e das circunstâncias de cada caso. Em geral,
            a análise observa:
          </p>
        </div>

        <ul className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
          {ANALYZED.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-gray-200"
            >
              <span className="mt-0.5 text-[#fec655]" aria-hidden>
                ✓
              </span>
              <span className="text-sm font-medium md:text-base">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 text-center md:mt-10">
          <a
            href={HOME_WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            data-gtm={WHATSAPP_GTM_ATTR}
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#25D366] px-8 py-3 font-bold text-white shadow-lg transition hover:brightness-110 sm:w-auto"
          >
            Enviar notificação para análise
          </a>
        </div>
      </div>
    </section>
  );
}
