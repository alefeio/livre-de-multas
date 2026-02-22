import { useState } from "react"
import { FaPlus, FaMinus } from "react-icons/fa"

const servicesList = [
  {
    title: "Missão",
    description: `Oferecer soluções jurídicas
      seguras e eficientes, protegendo
      os direitos e interesses de nossos
      clientes com ética, responsabilidade
      e excelência técnica.`,
  },
  {
    title: "Visão",
    description: `Ser reconhecido como um
      escritório de advocacia sólido
      e confiável, referência pela
      qualidade do atendimento,
      resultados consistentes e
      atuação ética.`,
  },
  {
    title: "Atendimento Humanizado",
    description:
      "Cada cliente é atendido de forma individualizada, com escuta ativa, clareza na comunicação e total comprometimento com sua realidade jurídica.",
  },
  {
    title: "Transparência e Ética",
    description:
      "Atuamos com absoluta transparência em todas as etapas do processo. Nossos clientes são sempre informados com clareza sobre estratégias, riscos e possibilidades, respeitando rigorosamente os princípios éticos da advocacia.",
  },
  {
    title: "Atuação Técnica e Estratégica",
    description:
      "O escritório de advocacia Livre de Multas Oficial - Especialista em Direito de Trânsito atua com elevado rigor técnico e visão estratégica, aliando conhecimento jurídico atualizado à experiência prática para oferecer soluções eficazes e seguras.",
  },
]

const stats = [
  { value: "Ética", label: "Atuação responsável e transparente" },
  { value: "Compromisso", label: "Defesa firme dos interesses do cliente" },
  { value: "Excelência", label: "Qualidade técnica e atualização constante" },
  { value: "Inovação", label: "Uso estratégico da tecnologia jurídica" },
  { value: "Respeito", label: "Às pessoas, à lei e à sociedade" },
]

export default function Header() {
  const [open, setOpen] = useState<number[]>([0])

  const toggleOpen = (index: number) => {
    setOpen((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    )
  }

  return (
    <>
      <span id="sobre" className="my-16"></span>

      <div className="bg-[#0c1a25]">
        <section className="py-16 md:py-28">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">

              {/* Coluna esquerda */}
              <div className="flex flex-col gap-5">
                <h2 className="w-full text-center md:text-left text-4xl md:text-5xl font-extrabold text-[#fec655] leading-tight max-w-2xl mx-auto md:mx-0">
                  Sobre o escritório de advocacia Livre de Multas Oficial - Especialista em Direito de Trânsito
                  <br />
                  <small className="text-[#fec655] font-medium">
                    – Advocacia
                  </small>
                </h2>

                <p className="text-white text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
                  O escritório de advocacia Livre de Multas Oficial - Especialista em Direito de Trânsito :: Atuamos com foco em orientação clara e estratégia técnica para defesa e recurso de multas de trânsito, com atendimento direto e acompanhamento durante o processo. atua com foco na proteção dos direitos de seus clientes,
                  oferecendo assessoria jurídica segura, ética e alinhada às exigências do ordenamento jurídico.
                </p>

                <p className="text-white text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
                  Nosso trabalho é pautado pela análise criteriosa de cada caso, com atuação estratégica
                  nas áreas do Direito do Consumidor, Bancário, Previdenciário e Direito de Família.
                </p>

                <p className="text-white text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
                  Valorizamos o atendimento próximo e transparente, acreditando que a confiança e a clareza
                  são essenciais para uma relação jurídica sólida e eficaz.
                </p>
              </div>

              {/* Coluna direita – Acordeões */}
              <div className="flex flex-col gap-4 mt-8 md:mt-0 max-w-xl mx-auto md:mx-0">
                {servicesList.map((service, index) => (
                  <div
                    key={index}
                    className="rounded-lg shadow-md overflow-hidden transition-all duration-300 bg-[#1a3045]"
                  >
                    <button
                      className="w-full text-left p-6 bg-[#1a3045] hover:bg-gray-600 transition-colors flex justify-between items-center text-white"
                      onClick={() => toggleOpen(index)}
                    >
                      <span className="text-lg md:text-xl font-semibold">
                        {service.title}
                      </span>
                      <span className="text-2xl font-bold text-[#fec655]">
                        {open.includes(index) ? <FaMinus /> : <FaPlus />}
                      </span>
                    </button>

                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        open.includes(index)
                          ? "max-h-96 opacity-100 p-6 pt-0 bg-[#1a3045]"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-gray-300">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Valores */}
            <div className="mt-16 flex flex-col gap-6 w-full mx-auto md:mx-0">
              <p className="text-[#fec655] text-3xl font-bold leading-relaxed max-w-xl mx-auto md:mx-0">
                Nossos Valores
              </p>

              <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-8 sm:gap-12">
                {stats.map((stat, index) => (
                  <div key={index} className="flex flex-col items-center sm:items-start text-left">
                    <span className="text-2xl font-bold text-gray-500">
                      {stat.value}
                    </span>
                    <span className="text-white text-lg font-medium">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </div>
    </>
  )
}
