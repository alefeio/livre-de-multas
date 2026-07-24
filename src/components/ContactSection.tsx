import React from "react";
import { FaWhatsapp, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdPhone, MdEmail, MdLocationOn } from 'react-icons/md'; // Novos ícones de Material Design

const ContactSection: React.FC = () => {
    return (
        <div className="max-w-full mx-auto"> {/* Removido o grid aqui para aplicar no container externo da página */}
            {/* Título da seção de contato */}
            <div className="text-center md:text-left mb-8 md:mb-10">
                <h2 className="text-gray-800 text-3xl md:text-4xl font-extrabold leading-tight mb-4">
                    Nossos Contatos Diretos
                </h2>
            </div>

            {/* Grid para os cards de contato e mapa */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Ajustado para 2 colunas em md, e o mapa ocupará 2 */}
                {/* Informações de Contato */}
                <div className="flex flex-1 flex-col items-center p-8 bg-[#0c1a25] rounded-xl shadow-xl text-white">
                    <h4 className="font-bold text-white text-2xl mb-6">Fale Conosco</h4>
                    <div className="space-y-5 text-gray-200">
                        <p className="flex flex-col items-center justify-center space-x-3 text-xl">
                            <MdPhone className="text-[#fec655] text-3xl" />
                            <a href="tel:+5591981006131" className="font-semibold hover:text-[#fec655] transition-colors">
                                +55 (91) 98100-6131
                            </a>
                        </p>
                        <p className="flex flex-col items-center justify-center space-x-3 text-xl overflow-hidden">
                            <MdEmail className="text-[#fec655] text-3xl" />
                            <small className="md:text-sm">
                                <a href="mailto:livresdemultasoficial@gmail.com" className="font-semibold hover:text-[#fec655] transition-colors">
                                    livresdemultasoficial@gmail.com
                                </a>
                            </small>
                        </p>
                    </div>
                </div>

                {/* Mídias Sociais */}
                <div className="flex flex-col items-center p-8 bg-[#0c1a25] rounded-xl shadow-xl text-white">
                    <h4 className="font-bold text-white text-2xl mb-6">Siga-nos</h4>
                    <div className="flex space-x-8 text-gray-200">
                        <a href="https://wa.me//5591981006131?text=Olá! Estou entrando em contato através do site." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-4xl hover:text-green-500 transition-colors">
                            <FaWhatsapp />
                        </a>
                        <a href="https://www.instagram.com/curvaengenhariaearquitetura" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-4xl hover:text-pink-500 transition-colors">
                            <FaInstagram />
                        </a>
                        {/* <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-4xl hover:text-blue-500 transition-colors">
                            <FaLinkedin />
                        </a> */}
                    </div>
                </div>

                {/* Endereço e Mapa */}
                <div className="flex flex-col items-center p-8 bg-[#0c1a25] rounded-xl shadow-xl md:col-span-2"> {/* Ocupa 2 colunas em telas médias */}
                    <h4 className="font-bold text-white text-2xl mb-6">Nossa Localização</h4>
                    <address className="text-[#fec655] font-semibold not-italic text-center text-xl mb-6">
                        <MdLocationOn className="inline text-3xl mr-2 align-middle" />
                        Av. Gov. José Malcher, 153 - Nazaré, Belém - PA, 66035-065, sala 12
                    </address>
                    <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg border-2 border-gray-700">
                        <iframe
                            title="Livre de Multas"
                            src="https://www.google.com/maps?output=embed&q=Av.+Gov.+Jos%C3%A9+Malcher,+153+-+Nazar%C3%A9,+Bel%C3%A9m+-+PA,+66035-065"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
