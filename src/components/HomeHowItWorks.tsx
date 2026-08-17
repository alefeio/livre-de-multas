import React from "react";
import { HOME_WHATSAPP_HREF, WHATSAPP_GTM_ATTR } from "lib/whatsapp";

const STEPS = [
  { num: "1", title: "Envie a notificação", text: "Encaminhe a notificação ou os documentos pelo WhatsApp." },
  { num: "2", title: "Análise do caso", text: "O caso e os prazos são analisados com base na documentação." },
  { num: "3", title: "Orientação", text: "Você recebe orientação sobre as possibilidades do caso." },
];

export default function HomeHowItWorks() {
  return (
    <section className="relative w-full overflow-hidden bg-[#070a0f] py-12 md:py-20" id="como-funciona">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 md:px-10">
        <div className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
          <h2 className="text-2xl font-extrabold leading-tight text-white md:text-4xl">
            <span className="text-[#fec655]">Como funciona</span>
          </h2>
          <p className="mt-4 text-base text-gray-300 md:text-lg">
            Processo simples, sem promessa de resultado. Cada situação depende dos documentos e
            das circunstâncias específicas.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-xl font-bold text-white">
                {step.num}
              </span>
              <p className="mt-4 text-base font-semibold text-white">{step.title}</p>
              <p className="mt-2 text-sm text-gray-400">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center md:mt-10">
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
