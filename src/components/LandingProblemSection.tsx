import React from "react";

const PROBLEM_CARDS = [
  { icon: "🚫", title: "Multa gravíssima" },
  { icon: "🚫", title: "Recusa do bafômetro" },
  { icon: "🚫", title: "Excesso de velocidade acima de 50%" },
  { icon: "🚫", title: "Avançar sinal vermelho" },
  { icon: "🚫", title: "Direção perigosa" },
];

const WHATSAPP_URL = "https://wa.me/5591981006131?text=" + encodeURIComponent("Olá, recebi uma multa de trânsito e gostaria de analisar meu caso.");

export default function LandingProblemSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#070a0f] py-16 md:py-24" id="multas">
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-extrabold leading-tight text-white md:text-4xl">
            Você recebeu alguma dessas multas?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-300 md:text-lg">
            Essas infrações podem impedir a emissão da CNH definitiva.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {PROBLEM_CARDS.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm text-center transition hover:bg-white/10"
            >
              <span className="text-3xl" aria-hidden>{card.icon}</span>
              <p className="mt-3 text-base font-semibold text-white">{card.title}</p>
            </div>
          ))}
        </div>

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
