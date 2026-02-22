import React from "react";
import Link from "next/link";
import {
  HiOutlineIdentification,
  HiOutlineDocumentText,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import { BsSpeedometer2, BsConeStriped, BsShield } from "react-icons/bs";

type ServiceItem = {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  highlight?: boolean;
  group?: "main" | "sub";
};

const services: ServiceItem[] = [
  {
    title: "Multa na CNH Provisória",
    description:
      "Entenda o risco para sua habilitação e saiba como agir dentro do prazo com orientação clara e estratégia de recurso.",
    icon: HiOutlineIdentification,
    href: "/multa-cnh-provisoria",
    highlight: true,
    group: "main",
  },
  {
    title: "Multa / Recusa do Bafômetro",
    description:
      "Orientação e atuação em autuações envolvendo bafômetro ou recusa, com análise da notificação e dos procedimentos.",
    icon: HiOutlineShieldCheck,
    href: "/recusa-bafometro",
    highlight: true,
    group: "main",
  },
  {
    title: "Suspensão do Direito de Dirigir",
    description:
      "Defesa e acompanhamento em processos de suspensão, com organização da documentação e recursos conforme o caso.",
    icon: HiOutlineDocumentText,
    href: "/suspensao-cnh",
    highlight: true,
    group: "main",
  },

  // Subitens (causas mais comuns)
  {
    title: "Excesso de velocidade acima de 50%",
    description:
      "Casos de autuação por alta velocidade que podem gerar suspensão. Veja o que analisar e quais documentos separar.",
    icon: BsSpeedometer2,
    href: "/suspensao-cnh#excesso-velocidade-50",
    group: "sub",
  },
  {
    title: "Manobras perigosas / racha",
    description:
      "Situações enquadradas como direção perigosa e disputas. Entenda o procedimento e os próximos passos de defesa.",
    icon: BsConeStriped,
    href: "/suspensao-cnh#manobras-perigosas-racha",
    group: "sub",
  },
  {
    title: "Multa sem capacete",
    description:
      "Autuação por condução sem capacete que pode gerar processo. Veja como funciona a análise e o caminho de recurso.",
    icon: BsShield,
    href: "/suspensao-cnh#moto-sem-capacete",
    group: "sub",
  },
];

function Card({
  item,
  compact = false,
}: {
  item: ServiceItem;
  compact?: boolean;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={[
        "group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm",
        "transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#fec655]/60",
        compact ? "p-5" : "",
        item.highlight ? "ring-1 ring-[#fec655]/20" : "",
      ].join(" ")}
      aria-label={`Ver detalhes sobre ${item.title}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[#fec655]/40 text-[#fec655] text-2xl transition group-hover:border-[#fec655]/70">
          <Icon />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg md:text-xl font-extrabold text-white leading-snug">
            {item.title}
          </h3>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed">
            {item.description}
          </p>

          <span className="inline-block text-sm text-[#fec655]/80 group-hover:text-[#fec655] transition">
            Ver detalhes →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ServicesSection() {
  const main = services.filter((s) => s.group === "main");
  const sub = services.filter((s) => s.group === "sub");

  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl">
        {/* Principais */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {main.map((item) => (
            <Card key={item.href} item={item} />
          ))}
        </div>

        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h4 className="text-base md:text-lg font-semibold text-white">
              Principais causas de suspensão
            </h4>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {sub.map((item) => (
              <Card key={item.href} item={item} compact />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
