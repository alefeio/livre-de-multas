import React from "react";
import { FaHandshake, FaUserTie, FaBalanceScale, FaRegCheckCircle, FaWhatsapp } from "react-icons/fa";

export default function Parcerias() {
    return (
        <section id="parcerias" className="relative z-20 bg-black">
            <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 flex flex-col items-center py-40 md:pt-48">

                <h1 className="text-center font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#fec655] drop-shadow-lg mb-16 leading-tight">
                    Seja um(a) Advogado(a) Parceiro(a)
                </h1>

                <p className="mt-5 text-gray-300 text-base md:text-lg leading-relaxed mb-16">
                    O escritório está aberto à formação de parcerias com advogados e advogadas que atuem em
                    diversas áreas do Direito, com base na ética, transparência e cooperação profissional,
                    visando a prestação de um atendimento completo e de qualidade aos clientes.
                </p>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Requisitos */}
                    <div className="rounded-2xl border border-[#fec655]/20 bg-black/40 p-7 md:p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <FaUserTie className="text-[#fec655] text-xl" />
                            <h3 className="text-xl font-extrabold text-[#fec655]">Requisitos</h3>
                        </div>

                        <ul className="space-y-3 text-gray-300 leading-relaxed">
                            <li className="flex gap-3">
                                <FaRegCheckCircle className="text-[#fec655] mt-1 flex-shrink-0" />
                                <span>Inscrição regular na OAB.</span>
                            </li>
                            <li className="flex gap-3">
                                <FaRegCheckCircle className="text-[#fec655] mt-1 flex-shrink-0" />
                                <span>
                                    Atuação ética e responsável, em conformidade com o Estatuto da Advocacia e o Código
                                    de Ética da OAB.
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <FaRegCheckCircle className="text-[#fec655] mt-1 flex-shrink-0" />
                                <span>Compromisso com qualidade técnica e prazos processuais.</span>
                            </li>
                            <li className="flex gap-3">
                                <FaRegCheckCircle className="text-[#fec655] mt-1 flex-shrink-0" />
                                <span>Comunicação clara e colaborativa.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Modelo de cooperação */}
                    <div className="rounded-2xl border border-[#fec655]/20 bg-black/40 p-7 md:p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <FaBalanceScale className="text-[#fec655] text-xl" />
                            <h3 className="text-xl font-extrabold text-[#fec655]">Como funciona</h3>
                        </div>

                        <p className="text-gray-300 leading-relaxed">
                            As parcerias podem envolver atuação conjunta em processos, encaminhamento de demandas
                            conforme a especialidade e cooperação estratégica, respeitando a autonomia profissional
                            de cada advogado e os princípios que regem a advocacia.
                        </p>
                    </div>

                    {/* Transparência */}
                    <div className="rounded-2xl border border-[#fec655]/20 bg-black/40 p-7 md:p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <FaRegCheckCircle className="text-[#fec655] text-xl" />
                            <h3 className="text-xl font-extrabold text-[#fec655]">Transparência</h3>
                        </div>

                        <p className="text-gray-300 leading-relaxed">
                            O alinhamento quanto à divisão de responsabilidades e honorários será sempre formalizado
                            de forma transparente, garantindo segurança e clareza em todas as etapas da cooperação.
                        </p>

                        {/* CTA */}
                        <div className="mt-6">
                            <a
                                href="https://wa.me/5591986284970?text=Olá!%20Tenho%20interesse%20em%20firmar%20parceria%20com%20o%20escritório."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-[#fec655] text-black font-bold px-5 py-3 hover:opacity-90 transition"
                                aria-label="Falar no WhatsApp sobre parceria"
                            >
                                <FaWhatsapp />
                                Quero firmar parceria
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
