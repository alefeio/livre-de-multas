import React from "react";
import { HOME_WHATSAPP_HREF, WHATSAPP_GTM_ATTR } from "lib/whatsapp";

const SITUATIONS = [
  { title: "Notificação de autuação", detail: "Multa ou auto de infração recebido" },
  { title: "DETRAN-PA", detail: "Recurso e defesa administrativa estadual" },
  { title: "SEMOB / SEGBEL", detail: "Multas municipais em Belém" },
  { title: "Suspensão da CNH", detail: "Processo administrativo de habilitação" },
  { title: "CNH provisória", detail: "Infrações no período da PPD" },
  { title: "Lei Seca / bafômetro", detail: "Autuações relacionadas à alcoolemia" },
  { title: "Multas gravíssimas", detail: "Infrações de maior gravidade" },
  { title: "Excesso de velocidade", detail: "Autuações por radar ou fiscalização" },
];

export default function LandingProblemSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#070a0f] py-12 md:py-20" id="multas">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        <div className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
          <h2 className="text-2xl font-extrabold leading-tight text-white md:text-4xl">
            Recebeu uma notificação ou precisa recorrer de uma multa?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-300 md:text-lg">
            Atendimento jurídico em Direito de Trânsito para análise de notificações e recursos
            administrativos, inclusive junto ao DETRAN-PA e à SEMOB/SEGBEL em Belém.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SITUATIONS.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
            >
              <p className="text-base font-semibold text-white">{item.title}</p>
              <p className="mt-1 text-sm text-gray-400">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:mt-10">
          <a
            href={HOME_WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            data-gtm={WHATSAPP_GTM_ATTR}
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#25D366] px-8 py-3 font-bold text-white shadow-lg transition hover:brightness-110 sm:w-auto"
          >
            Enviar notificação pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
