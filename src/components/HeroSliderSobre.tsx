import React from "react";

const STEPS = [
  { num: "1", text: "Você envia a notificação" },
  { num: "2", text: "Fazemos análise inicial" },
  { num: "3", text: "Explicamos as possibilidades" },
  { num: "4", text: "Orientamos o próximo passo" },
];

const WHATSAPP_URL = "https://wa.me/5591981006131?text=" + encodeURIComponent("Olá, recebi uma multa de trânsito e gostaria de analisar meu caso.");

export default function HeroSliderSobre() {
  return (
    <section className="relative w-full overflow-hidden bg-[#070a0f] py-16 md:py-24" id="como-funciona">
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-extrabold leading-tight text-white md:text-4xl">
            <span className="text-[#fec655]">Como funciona</span> a análise da sua multa
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm text-center"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-xl font-bold text-white">
                {step.num}
              </span>
              <p className="mt-4 text-base font-semibold text-white">{step.text}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-lg font-semibold text-[#fec655]">
          Tudo pelo WhatsApp.
        </p>

        <div className="mt-8 flex justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-8 py-3 font-bold text-white shadow-lg transition hover:brightness-110"
          >
            Defender minha CNH no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
