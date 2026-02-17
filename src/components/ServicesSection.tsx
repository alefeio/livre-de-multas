import React from "react";
import Link from "next/link";
import {
  HiOutlineScale,
  HiOutlineDocumentText,
  HiOutlineOfficeBuilding,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import {
  BsPeople,
  BsBank,
  BsBriefcase,
  BsLaptop,
  BsHeartPulse,
  BsPersonCheck,
  BsTree,
} from "react-icons/bs";

const services = [
  {
    title: "Direito Empresarial",
    description:
      "Assessoria jurídica completa a empresários e sociedades empresárias, com atuação estratégica em contratos, reorganizações societárias, cobranças e orientação preventiva.",
    icon: BsBriefcase,
    href: "/areas/direito-empresarial",
    target: ''
  },
  {
    title: "Direito do Trabalho",
    description:
      "Atuação na defesa de trabalhadores e empregadores, com foco em prevenção de conflitos, segurança jurídica, reclamatórias trabalhistas e assessoria empresarial contínua.",
    icon: BsPeople,
    href: "/areas/direito-do-trabalho",
    target: ''
  },
  {
    title: "Direito Civil",
    description:
      "Atuação em demandas cíveis em geral, incluindo contratos, cobranças, execuções, responsabilidade civil e resolução de conflitos patrimoniais.",
    icon: HiOutlineDocumentText,
    href: "/areas/direito-civil",
    target: ''
  },
  {
    title: "Direito de Família e Sucessões",
    description:
      "Atendimento humanizado e técnico em divórcios, pensão alimentícia, guarda, inventários, partilhas e planejamento sucessório.",
    icon: BsPersonCheck,
    href: "/areas/direito-de-familia-e-sucessoes",
    target: ''
  },
  {
    title: "Direito Penal",
    description:
      "Defesa técnica e estratégica desde a fase policial até o processo judicial, com atuação ética, sigilosa e comprometida com a ampla defesa.",
    icon: HiOutlineShieldCheck,
    href: "/areas/direito-penal",
    target: ''
  },
  {
    title: "Direito Agrário",
    description:
      "Assessoria jurídica ao produtor rural, com atuação em regularização fundiária, contratos agrários e conflitos possessórios.",
    icon: BsTree,
    href: "/areas/direito-agrario",
    target: ''
  },
  {
    title: "Direito Previdenciário",
    description:
      "Atuação administrativa e judicial em benefícios previdenciários, aposentadorias, pensões, auxílios, revisões e planejamento previdenciário.",
    icon: BsBank,
    href: "/areas/direito-previdenciario", // ✅ página já criada
    target: '_blank'
  },
  {
    title: "Direito Tributário",
    description:
      "Atuação estratégica na defesa do contribuinte, com foco em planejamento tributário, revisão de tributos, recuperação de créditos fiscais e defesa em autos de infração.",
    icon: BsBank,
    href: "/areas/direito-tributario",
    target: ''
  },
  {
    title: "Direito do Consumidor",
    description:
      "Defesa dos direitos do consumidor em cobranças indevidas, contratos abusivos, negativação irregular e conflitos com instituições financeiras e prestadores de serviços.",
    icon: HiOutlineScale,
    href: "/areas/direito-do-consumidor",
    target: ''
  },
  {
    title: "Direito Digital",
    description:
      "Atuação jurídica no ambiente digital, com foco em LGPD, remoção de conteúdos, vazamento de dados, fraudes digitais e proteção da reputação online.",
    icon: BsLaptop,
    href: "/areas/direito-digital",
    target: ''
  },
  {
    title: "Direito Bancário",
    description:
      "Atuação na revisão de contratos bancários, financiamentos, juros abusivos, renegociação de dívidas e defesa em execuções.",
    icon: HiOutlineOfficeBuilding,
    href: "/areas/direito-bancario",
    target: ''
  },
  {
    title: "Direito da Saúde",
    description:
      "Atuação na defesa do direito à saúde, com demandas envolvendo planos de saúde, fornecimento de medicamentos e tratamentos médicos.",
    icon: BsHeartPulse,
    href: "/areas/direito-da-saude",
    target: ''
  },
  {
    title: "Direito das Pessoas com TEA",
    description:
      "Atuação comprometida com a proteção dos direitos das pessoas com Transtorno do Espectro Autista, assegurando acesso à saúde, educação e benefícios assistenciais.",
    icon: BsPersonCheck,
    href: "/areas/direito-das-pessoas-com-tea",
    target: ''
  },
];

export default function ServicesSection() {
  return (
    <section className="space-y-24 pb-36 flex flex-col items-start md:items-center text-left md:text-center text-left list-none">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.href}
                target={service.target}
                href={service.href}
                className="
                  group
                  flex flex-col md:flex-row
                  items-center md:items-start
                  gap-6
                  text-center md:text-left
                  rounded-3xl
                  p-3 md:p-4
                  transition
                  hover:bg-white/5
                  focus:outline-none focus:ring-2 focus:ring-[#fec655]/60
                  bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-left list-none
                "
                aria-label={`Ver detalhes de ${service.title}`}
              >
                {/* Ícone */}
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full border border-[#fec655]/40 text-[#fec655] text-3xl transition group-hover:border-[#fec655]/70">
                  <Icon />
                </div>

                {/* Texto */}
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-extrabold text-[#fec655] leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    {service.description}
                  </p>

                  {/* micro-cta */}
                  <span className="inline-block text-sm text-[#fec655]/80 group-hover:text-[#fec655] transition">
                    Ver detalhes →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
