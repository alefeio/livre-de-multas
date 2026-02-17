import React from "react";

export default function SobreSection() {
  return (
    <section className="max-w-7xl mx-auto space-y-24 flex flex-col items-start md:items-center text-left md:text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-left list-none">
      <div
        className="
            text-white
            text-base
            md:text-lg
            leading-relaxed
            space-y-6
            text-left
          "
      >
        <p>
          O <strong>Escritório de Advocacia Pereira de Sousa</strong> desenvolve sua atuação com foco na prestação de serviços jurídicos qualificados, fundamentados na ética, na responsabilidade profissional e no constante aprimoramento técnico.
        </p>

        <p>
          A atuação do escritório é estruturada a partir de uma análise criteriosa de cada demanda, buscando respostas jurídicas claras, seguras e adequadas ao contexto específico de cada cliente, sempre em conformidade com as normas legais e com o Código de Ética da Advocacia.
        </p>

        <p>
          O atendimento é personalizado e transparente, com comunicação direta e acompanhamento responsável de cada caso. Valorizamos a construção de relações de confiança, baseadas no respeito, na seriedade e no compromisso com a defesa dos direitos e com os princípios que orientam a advocacia.
        </p>
      </div>
    </section>
  );
}
