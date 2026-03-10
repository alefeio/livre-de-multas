import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

interface FAQItem {
  id: string;
  pergunta: string;
  resposta: string;
}

interface FAQProps {
  faqs: FAQItem[];
}

/** FAQs padrão para SEO (perguntas que as pessoas pesquisam no Google) */
const DEFAULT_FAQS: FAQItem[] = [
  { id: "faq-1", pergunta: "CNH provisória perde com multa?", resposta: "Depende do tipo de infração. Multas gravíssimas e algumas específicas (como excesso de velocidade acima de 50%, recusa ao bafômetro, direção perigosa) podem impedir a emissão da CNH definitiva ou gerar processo de suspensão. Por isso é importante analisar a notificação antes do prazo." },
  { id: "faq-2", pergunta: "Multa gravíssima perde CNH provisória?", resposta: "Sim. Multas gravíssimas na CNH provisória (PPD) podem impedir a obtenção da CNH definitiva, dependendo do enquadramento e do histórico. A análise da notificação e dos prazos é fundamental para definir os próximos passos." },
  { id: "faq-3", pergunta: "Posso recorrer multa na PPD?", resposta: "Sim. Você tem direito a apresentar defesa e recurso administrativo. O prazo costuma vir na notificação. Antes de pagar ou deixar o prazo vencer, vale analisar a notificação com um especialista para orientação sobre a melhor estratégia." },
  { id: "faq-4", pergunta: "Quanto tempo dura a CNH provisória?", resposta: "A CNH provisória (PPD) tem validade de 12 meses. Nesse período, infrações gravíssimas ou que gerem processo de suspensão podem impedir a troca pela CNH definitiva. Por isso, ao receber uma multa, é importante analisar o caso dentro do prazo." },
];

export default function FAQ({ faqs }: FAQProps) {
  const list = faqs?.length > 0 ? faqs : DEFAULT_FAQS;
  const [open, setOpen] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpen(open === index ? null : index);
  };

  return (
    <section className="relative w-full bg-blue-950">
      <div className="container mx-auto max-w-7xl relative z-10 flex flex-col items-center px-6 py-16 md:px-10 md:py-24">
        <h1 className="mb-12 text-3xl font-extrabold leading-tight text-white md:text-5xl">
          <span className="text-[#fec655]">Perguntas Frequentes</span>
        </h1>

        {/* GRID */}
        <div className="grid grid-cols-1 px-2 md:px-6 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((faq, idx) => (
            <div
              key={faq.id}
              className={`
                                rounded-2xl
                                border
                                transition-all
                                duration-300
                                bg-white
                                ${open === idx
                  ? "border-[#fec655]"
                  : "border-[#fec655]/30"}
                            `}
            >
              {/* PERGUNTA */}
              <button
                onClick={() => toggleOpen(idx)}
                className="
                                    w-full
                                    flex
                                    items-center
                                    justify-between
                                    text-left
                                    p-6
                                    focus:outline-none
                                "
              >
                <span className="text-sm md:text-base font-semibold text-gray-900">
                  {faq.pergunta}
                </span>

                <span className="text-[#fec655] text-lg ml-4">
                  {open === idx ? <FaMinus /> : <FaPlus />}
                </span>
              </button>

              {/* RESPOSTA */}
              <div
                className={`
                                    overflow-hidden
                                    transition-all
                                    duration-300
                                    ease-in-out
                                    ${open === idx
                    ? "max-h-96 opacity-100 px-6 pb-6"
                    : "max-h-0 opacity-0 px-6"}
                                `}
              >
                <p className="text-gray-700 text-sm leading-relaxed">
                  {faq.resposta}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
