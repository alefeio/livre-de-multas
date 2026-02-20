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
import PageContato from './contato';

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

export default function Home({ banners, menu, testimonials, faqs }: HomePageProps) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const ogImage = `${baseUrl}/images/logo.jpg`;

    const address = "Tv. Timbó, 1563 - Marco, Belém - PA, 66087-531";

    const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d63817.13870801698!2d-48.470215!3d-1.432623!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92a48c0641733ad7%3A0xfb2374c1877bb046!2sTv.%20Timb%C3%B3%2C%201563%20-%20Marco%2C%20Bel%C3%A9m%20-%20PA%2C%2066087-531%2C%20Brasil!5e0!3m2!1spt-BR!2sus!4v1771608665183!5m2!1spt-BR!2sus";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LegalService",
        "name": "Pereira de Sousa Advocacia",
        "image": `${baseUrl}/images/logo.jpg`,
        "url": "https://www.livredemultasoficial.com.br/",
        "telephone": "+5591981006131",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Tv. Timbó, 1563 - Marco",
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
            "https://www.instagram.com/livredemultasoficial/"
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
                <link rel="canonical" href="https://www.livredemultasoficial.com.br/" />

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
                <meta property="og:url" content="https://www.livredemultasoficial.com.br/" />

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
                    <span id="como-funciona"></span>
                    <HeroSliderSobre />
                    <span id="atuacao"></span>
                    <HeroSliderAreas />
                    <span id="contato"></span>
                    <Contato />
                    <span id="faq"></span>
                    <FAQ faqs={faqs} />
                    <span id="depoimentos"></span>
                    <Testimonials testimonials={testimonials} />
                    <span id="blog"></span>
                    <Blog />
                    <span id="localizacao"></span>
                    <PageContato />

                    <Footer menuData={menu} />
                </main>
                <WhatsAppButton />
            </div>
        </>
    );
}