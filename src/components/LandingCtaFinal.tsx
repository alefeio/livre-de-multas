import React from "react";

const WHATSAPP_URL = "https://wa.me/5591981006131?text=" + encodeURIComponent("Olá, recebi uma multa de trânsito e gostaria de analisar meu caso.");

export default function LandingCtaFinal() {
  return (
    <section className="relative w-full overflow-hidden bg-[#fec655] py-16 md:py-20" id="cta-final">
      <div className="relative mx-auto max-w-4xl px-6 md:px-10 text-center">
        <h2 className="text-2xl font-extrabold leading-tight text-[#0c1a26] md:text-4xl">
          Recebeu multa na CNH provisória?
        </h2>
        <p className="mt-3 text-lg font-semibold text-[#0c1a26]/90 md:text-xl">
          Não espere o prazo vencer.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[#25D366] px-10 py-4 text-lg font-bold text-white shadow-lg transition hover:brightness-110"
        >
          ANALISAR MINHA MULTA NO WHATSAPP
        </a>
      </div>
    </section>
  );
}
