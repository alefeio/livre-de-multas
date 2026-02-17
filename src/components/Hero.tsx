import { useRouter } from "next/router";
import React from "react";

export default function Hero() {
  const router = useRouter();

  const handleClick = (pg: string) => {
    router.push(pg);
  };

  return (
    <section className="relative bg-black py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">

          {/* Imagem */}
          <div className="relative flex-1 w-full md:max-w-xl overflow-hidden rounded-3xl order-first md:order-none">
            <div className="absolute inset-0 bg-black/10 z-10" />
            <img
              src="/images/daniel2.jpg"
              alt="Ambiente jurídico profissional do escritório de advocacia Pereira de Sousa"
              className="relative z-0 w-full h-auto object-cover max-h-[420px] md:max-h-full transition-transform duration-500 ease-in-out hover:scale-105"
            />
          </div>

          {/* Texto institucional */}
          <div className="flex-1 flex flex-col items-start text-left gap-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#fec655] leading-tight max-w-4xl">
              Advocacia ética, técnica e comprometida com pessoas
            </h2>

            <p className="text-gray-200 text-base md:text-lg max-w-xl md:max-w-none leading-relaxed">
              Atuamos na defesa dos direitos com seriedade, clareza e responsabilidade, oferecendo soluções jurídicas seguras e alinhadas à realidade de cada cliente.
            </p>

            <p className="text-gray-200 text-base md:text-lg max-w-xl md:max-w-none leading-relaxed">
              Nosso trabalho é pautado na ética profissional, na organização e no rigor técnico, sem abrir mão de uma atuação humana, acessível e respeitosa.
            </p>

            <p className="text-gray-200 text-base md:text-lg max-w-xl md:max-w-none leading-relaxed">
              Acreditamos que a advocacia vai além do processo: envolve escuta, orientação adequada e compromisso real com a justiça e com a dignidade da pessoa humana.
            </p>

            {/* Botão opcional */}
            {/*
            <div className="mt-8">
              <button
                onClick={() => handleClick("/sobre")}
                className="inline-flex items-center justify-center bg-[#fec655] text-[#0c1a26] font-bold py-3 px-10 rounded-full shadow-lg hover:bg-[#b28d52] transition-all duration-300 transform hover:-translate-y-1"
              >
                Conheça o escritório
              </button>
            </div>
            */}
          </div>

        </div>
      </div>
    </section>
  );
}
