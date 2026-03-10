import React from "react";

const CONSEQUENCES = [
  "perder a habilitação",
  "ter que refazer autoescola",
  "pagar novamente taxas",
  "ficar mais tempo sem dirigir",
];

const WHATSAPP_URL = "https://wa.me/5591981006131?text=" + encodeURIComponent("Olá, recebi uma multa de trânsito e gostaria de analisar meu caso.");

export default function LandingConsequenceSection() {
  return (
    <section className="relative w-full overflow-hidden bg-blue-950 py-16 md:py-24" id="consequencias">
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold leading-tight text-white md:text-4xl">
            O que pode acontecer com sua CNH provisória
          </h2>
          <p className="mt-6 text-lg text-gray-200">
            Se o processo avançar você pode:
          </p>
        </div>

        <ul className="mx-auto mt-8 max-w-xl space-y-4">
          {CONSEQUENCES.map((item) => (
            <li key={item} className="flex items-center gap-3 text-gray-200">
              <span className="text-red-400 text-xl" aria-hidden>❌</span>
              <span className="text-lg font-medium">{item}</span>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-2xl text-center text-gray-300">
          Por isso é importante analisar a notificação antes do prazo vencer.
        </p>

        <div className="mt-10 text-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#fec655] px-8 py-3 font-bold text-[#0c1a26] shadow-lg transition hover:brightness-95"
          >
            ANALISAR MINHA MULTA NO WHATSAPP
          </a>
        </div>
      </div>
    </section>
  );
}
