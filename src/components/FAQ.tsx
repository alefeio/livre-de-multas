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

export default function FAQ({ faqs }: FAQProps) {
  const [open, setOpen] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpen(open === index ? null : index);
  };

  return (
    <section className="relative w-full bg-black">
      <div className="container mx-auto max-w-7xl relative z-10 flex flex-col items-center py-40 md:pt-48">
        <h1 className="text-center font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#fec655] drop-shadow-lg mb-16 leading-tight">
          Perguntas Frequentes
        </h1>

        {/* GRID */}
        <div className="grid grid-cols-1 px-2 md:px-6 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqs.map((faq, idx) => (
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
