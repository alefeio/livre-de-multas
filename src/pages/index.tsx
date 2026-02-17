// pages/index.tsx
import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import HeroSlider from '../components/HeroSlider';
import WhatsAppButton from '../components/WhatsAppButton';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Header from 'components/Header';
import { Menu as MenuComponent } from 'components/Menu';
import Hero from 'components/Hero';
import { Analytics } from "@vercel/analytics/next";
import {
    HomePageProps,
    ColecaoProps,
    MenuData,
    // Importa apenas LinkItem, não o tipo MenuProps da página
    LinkItem
} from '../types/index';
import { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import ParallaxBanner from 'components/ParallaxBanner';
import ServicesSection from 'components/ServicesSection';
import Footer from 'components/Footer';
import Projetos from 'components/Projetos';
import Equipe from 'components/Equipe';
import Structure from 'components/Structure';
import StructureSection from 'components/StructureSection';
import Cases from 'components/Cases';
import HeroSliderAreas from 'components/HeroSliderAreas';
import HeroSliderSobre from 'components/HeroSliderSobre';
import Blog from 'components/Blog';
import Contato from 'components/Contato';
import { MdEmail } from 'react-icons/md';
import { FaInstagram, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import Parcerias from 'components/Parcerias';

// FUNÇÃO SLUGIFY
function slugify(text: string): string {
    return text.toString().toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
    try {
        const [banners, menus, testimonials, faqs, colecoes] = await Promise.all([
            prisma.banner.findMany(),
            prisma.menu.findMany(),
            prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } }),
            prisma.fAQ.findMany({ orderBy: { pergunta: 'asc' } }),
            prisma.colecao.findMany({
                orderBy: {
                    order: 'asc',
                },
                include: {
                    items: {
                        orderBy: [
                            { view: 'desc' },
                            { like: 'desc' },
                        ],
                    },
                },
            }),
        ]);

        // 1. Mapeamento para remover 'null' e usar 'undefined'
        const mappedTestimonials = testimonials.map((t: any) => ({
            ...t,
            // Se t.avatarUrl for null, usamos undefined. Se for string, usamos a string.
            avatarUrl: t.avatarUrl ?? undefined,
        }));

        const colecoesComSlugs: ColecaoProps[] = colecoes.map((colecao: any) => ({
            ...colecao,
            slug: slugify(colecao.title),
            items: colecao.items.map((item: any) => ({
                ...item,
                slug: slugify(`${item.productMark}-${item.productModel}-${item.cor}`),
            }))
        }));

        const rawMenu: any | null = menus.length > 0 ? menus[0] : null;

        // O tipo do formattedMenu agora corresponde à estrutura esperada
        let formattedMenu: MenuData | null = null;
        if (rawMenu && rawMenu.links && Array.isArray(rawMenu.links)) {
            const links: LinkItem[] = rawMenu.links.map((link: any) => ({
                id: link.id,
                text: link.text,
                url: link.url,
            }));

            formattedMenu = {
                logoUrl: rawMenu.logoUrl || '/images/logo.png',
                links: links,
            };
        }

        return {
            props: {
                banners: JSON.parse(JSON.stringify(banners)),
                // Passa o objeto formatado diretamente para a prop 'menu'
                menu: JSON.parse(JSON.stringify(formattedMenu)),
                // 2. Passa os testimonials mapeados e serializados
                testimonials: JSON.parse(JSON.stringify(mappedTestimonials)),
                faqs: JSON.parse(JSON.stringify(faqs)),
                colecoes: JSON.parse(JSON.stringify(colecoesComSlugs)),
            },
        };
    } catch (error) {
        console.error("Erro ao buscar dados do banco de dados:", error);
        return {
            props: {
                banners: [],
                menu: null,
                testimonials: [],
                faqs: [],
                colecoes: [],
            },
        };
    } finally {
        await prisma.$disconnect();
    }
};

export default function Home({ banners, menu, testimonials, faqs, colecoes }: HomePageProps) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const ogImage = `${baseUrl}/images/logo.jpg`;

    const address = "Avenida Roberto Camelier, 1642, Condor - Belém - PA";

    const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5013049950685!2d-48.485495425034!3d-1.4722054985139539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92a48e74638471c9%3A0xd430aea868c5d121!2sAv.%20Roberto%20Camelier%2C%201642%20-%20Jurunas%2C%20Bel%C3%A9m%20-%20PA%2C%2066033-683!5e0!3m2!1spt-BR!2sbr!4v1770955846387!5m2!1spt-BR!2sbr";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LegalService",
        "name": "Pereira de Sousa Advocacia",
        "image": `${baseUrl}/images/logo.jpg`,
        "url": "https://www.pereiradesousa.adv.br/",
        "telephone": "+5591986284970",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Avenida Roberto Camelier, 1642, Condor",
            "addressLocality": "Belém",
            "addressRegion": "PA",
            "postalCode": "66030-465",
            "addressCountry": "BR"
        },
        "areaServed": [
            { "@type": "City", "name": "Belém" },
            { "@type": "State", "name": "Pará" }
        ],
        "sameAs": [
            "https://www.instagram.com/pereiradesousaescritorio/"
        ],
        "description": "O escritório de advocacia Pereira de Sousa Advocacia é um escritório de advocacia em Belém-PA com atuação estratégica em Direito Empresarial, Civil, Família e Sucessões, Previdenciário, Trabalhista, Penal, Bancário, Digital, Agrário, Saúde e defesa das pessoas com TEA."
    };

    const [showExitModal, setShowExitModal] = useState(false);

    return (
        <>
            <Head>
                {/* Title */}
                <title>Pereira de Sousa Advocacia | Escritório de Advocacia em Belém-PA</title>

                {/* Description */}
                <meta
                    name="description"
                    content="Pereira de Sousa Advocacia é um escritório de advocacia em Belém-PA, com atuação estratégica e humanizada em Direito Empresarial, Civil, Família e Sucessões, Previdenciário, Trabalhista, Penal, Bancário, Digital, Agrário, Saúde e Direito das Pessoas com TEA."
                />

                {/* Robots */}
                <meta name="robots" content="index, follow, max-image-preview:large" />

                {/* Canonical */}
                <link rel="canonical" href="https://www.pereiradesousa.adv.br/" />

                {/* Keywords */}
                <meta
                    name="keywords"
                    content="
            Pereira de Sousa Advocacia,
            escritório de advocacia em Belém,
            advogado Belém PA,
            direito empresarial,
            direito civil,
            direito de família e sucessões,
            direito previdenciário,
            direito trabalhista,
            direito penal,
            direito bancário,
            direito digital,
            direito agrário,
            direito da saúde,
            direito TEA
          "
                />

                {/* Open Graph */}
                <meta property="og:locale" content="pt_BR" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Pereira de Sousa Advocacia | Soluções Jurídicas Estratégicas" />
                <meta
                    property="og:description"
                    content="Escritório de advocacia em Belém-PA com atuação estratégica, ética e humanizada. Soluções jurídicas completas para pessoas e empresas."
                />
                <meta property="og:url" content="https://www.pereiradesousa.adv.br/" />

                {/* ✅ AQUI: LOGO CERTA */}
                <meta property="og:image" content={ogImage} />
                <meta property="og:image:secure_url" content={ogImage} />
                <meta property="og:image:alt" content="Pereira de Sousa Advocacia" />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Pereira de Sousa Advocacia" />
                <meta
                    name="twitter:description"
                    content="Escritório de advocacia em Belém-PA com atuação estratégica em Direito Empresarial, Civil, Família, Previdenciário, Trabalhista e mais."
                />
                {/* ✅ AQUI: LOGO CERTA */}
                <meta name="twitter:image" content={ogImage} />

                {/* Theme */}
                <meta name="theme-color" content="#0f172a" />

                {/* Fonts */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&display=swap"
                    rel="stylesheet"
                />

                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </Head>

            <div className="min-h-screen">
                <Analytics />
                {/* O componente espera menuData={...}, e a prop 'menu' já tem essa estrutura */}
                <MenuComponent menuData={menu} />
                <HeroSlider banners={banners} />
                <main className="max-w-full mx-auto">
                    <Hero />
                    <span id="sobre"></span>
                    <HeroSliderSobre />
                    <Parcerias />
                    <span id="atuacao"></span>
                    <HeroSliderAreas />
                    <span id="blog"></span>
                    <Blog />
                    {/* <Cases /> */}
                    <Testimonials testimonials={testimonials} />
                    <span id="fale"></span>
                    <Contato />
                    <span id="faq"></span>
                    <FAQ faqs={faqs} />
                    <div
                        className="bg-black py-20 md:py-28 relative overflow-hidden text-white"
                        style={{
                            backgroundImage: 'url(/images/bg-redes.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <div className="max-w-7xl mx-auto px-4 md:px-8">
                            {/* GRID PARA ALINHAR Contato e Redes Sociais */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 text-center md:text-left">

                                {/* CONTATO */}
                                <div className="flex flex-col items-center md:items-end md:border-r md:border-gray-500/40 md:pr-16">
                                    <h3 className="text-[#fec655] text-xl md:text-2xl font-semibold tracking-wide mb-8">
                                        Contato
                                    </h3>

                                    <div className="space-y-5">
                                        <a
                                            href="mailto:escritório@pereiradesousa.adv.br"
                                            className="flex items-center justify-center md:justify-end gap-3 text-base md:text-lg hover:text-[#fec655] transition-colors"
                                            aria-label="Enviar email para escritório@pereiradesousa.adv.br"
                                        >
                                            <MdEmail size={22} className="text-[#fec655] flex-shrink-0" />
                                            escritório@pereiradesousa.adv.br
                                        </a>

                                        <a
                                            href="https://wa.me/5591986284970"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center md:justify-end gap-3 text-base md:text-lg hover:text-[#fec655] transition-colors"
                                            aria-label="Enviar mensagem WhatsApp para +55 91 98628-4970"
                                        >
                                            <FaWhatsapp size={22} className="text-[#fec655] flex-shrink-0" />
                                            +55 91 98628-4970
                                        </a>
                                    </div>
                                </div>

                                {/* REDES SOCIAIS */}
                                <div className="flex flex-col items-center md:items-start md:pl-6">
                                    <h3 className="text-[#fec655] text-xl md:text-2xl font-semibold tracking-wide mb-8">
                                        Redes Sociais
                                    </h3>

                                    <div className="space-y-5">
                                        <a
                                            href="https://www.instagram.com/pereiradesousaescritorio"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center md:justify-start gap-3 text-base md:text-lg hover:text-[#fec655] transition-colors"
                                            aria-label="Acessar Instagram @pereiradesousaescritorio"
                                        >
                                            <FaInstagram size={22} className="text-[#fec655] flex-shrink-0" />
                                            @pereiradesousaescritorio
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <span id="localizacao"></span>

                    {/* LOCALIZAÇÃO */}
                    <section className="bg-white">
                        <div className="relative z-10 flex flex-col items-center py-40 md:pt-48">

                            {/* TÍTULO */}
                            <h1 className="text-center font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold text-black drop-shadow-lg mb-16 leading-tight">
                                Nossa Localização
                            </h1>

                            {/* Endereço */}
                            <p className="text-gray-600 text-lg mb-10">
                                {address}
                            </p>

                            {/* MAPA */}
                            <div className="relative w-full max-w-4xl mx-auto shadow-2xl rounded-3xl overflow-hidden border border-gray-200 bg-white">
                                <div className="w-full" style={{ paddingBottom: '56.25%' }}>
                                    <iframe
                                        title="Localização do Escritório Livre de Multas"
                                        src={mapEmbedUrl}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            </div>

                        </div>
                    </section>

                    <Footer menuData={menu} />
                </main>
                <WhatsAppButton />
            </div>

            {/* Modal de Saída */}
            {showExitModal && (
                <div
                    className="fixed inset-0 z-[110] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setShowExitModal(false);
                        }
                    }}
                >
                    <div
                        className="bg-primary-dark relative rounded-lg shadow-xl p-6 m-4 max-w-lg w-full transform transition-all duration-300 scale-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Botão de fechar */}
                        <button
                            onClick={() => setShowExitModal(false)}
                            className="absolute top-2 right-2 text-white hover:text-gray-600 transition-colors"
                            aria-label="Fechar"
                        >
                            <AiOutlineClose size={24} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}