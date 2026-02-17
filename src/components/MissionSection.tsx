import React from "react";

export default function MissionSection() {
  return (
    <section className="relative pt-16 md:pt-24 z-20">
      <div className="max-w-7xl mx-auto space-y-24">

        {/* MISSÃO + VISÃO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">

          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#fec655] mb-8">
              Missão
            </h3>
            {/* Missão */}
            <div className="flex flex-col items-start md:items-center text-left md:text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-left list-none">
              <div className="space-y-6 max-w-xl text-left">
                <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                  Exercer a advocacia com ética, responsabilidade e sensibilidade humana, oferecendo um atendimento personalizado, acessível e acolhedor, comprometido com a defesa dos direitos, das garantias fundamentais e da dignidade da pessoa humana.
                </p>

                <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                  Atuar com excelência técnica nas diversas áreas do Direito, buscando soluções jurídicas seguras, justas e compatíveis com a realidade de cada cliente, sempre orientadas pela legalidade e pela justiça.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#fec655] mb-8">
              Visão
            </h3>
            {/* Visão */}
            <div className="flex flex-col items-start md:items-center text-left md:text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-left list-none">
              <div className="space-y-6 max-w-xl text-left">
                <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                  Consolidar uma advocacia sólida, responsável e humana, capaz de acompanhar as transformações da sociedade e do Direito, sem perder de vista o valor central de cada pessoa atendida.
                </p>

                <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                  Construir o futuro do escritório por meio de uma atuação personalizada, juridicamente fundamentada e rigorosamente alinhada às normas legais e éticas que regem a advocacia.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* VALORES */}
        <div className="flex flex-col items-start items-center md:text-center">
          <h3 className="text-3xl md:text-4xl font-extrabold text-[#fec655] mb-8">
            Valores
          </h3>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl w-full">
            {[
              {
                title: "Ética e Responsabilidade Profissional",
                desc: "Atuação orientada pelo respeito às normas legais, ao Código de Ética da OAB e aos princípios que fundamentam a advocacia.",
              },
              {
                title: "Atendimento Humanizado",
                desc: "Escuta ativa, empatia e atendimento individualizado, considerando as particularidades de cada cliente e de cada demanda.",
              },
              {
                title: "Rigor Técnico",
                desc: "Compromisso com o estudo contínuo, atualização jurídica e aplicação responsável do Direito.",
              },
              {
                title: "Transparência e Clareza",
                desc: "Comunicação objetiva, honesta e acessível em todas as etapas da atuação profissional.",
              },
              {
                title: "Justiça Sociale Dignidade Humana",
                desc: "Defesa dos direitos fundamentais e da dignidade da pessoa humana como pilares da atuação jurídica.",
              },
              {
                title: "Organização e Método",
                desc: "Planejamento, organização e gestão responsável como base para a eficiência e segurança jurídica.",
              },
              {
                title: "Confiança e Parceria",
                desc: "Construção de relações pautadas no respeito, na cooperação e na lealdade profissional.",
              },
              {
                title: "Evolução Contínua",
                desc: "Aprimoramento técnico, institucional e humano de forma permanente, acompanhando as mudanças do Direito e da sociedade.",
              },
            ].map((item, i) => (
              <li
                key={i}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-left list-none"
              >
                <span className="block text-[#fec655] font-semibold text-base mb-2">
                  {item.title}
                </span>
                <span className="block text-gray-300 text-base leading-relaxed">
                  {item.desc}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
