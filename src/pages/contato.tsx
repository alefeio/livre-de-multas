// pages/index.tsx
import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import {
    HomePageProps,
    ColecaoProps,
    MenuData,
    // Importa apenas LinkItem, não o tipo MenuProps da página
    LinkItem
} from '../types/index';
import { useState } from 'react';

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

export default function PageContato() {
    // Endereço exato fornecido na imagem
    const address = "Tv. Timbó, 1563 - Marco, Belém - PA, 66087-531";

    // O link abaixo é um exemplo de embed HTML que você pode obter do Google Maps
    // A latitude/longitude está aproximada para o centro de Belém, PA
    const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.59968470487!2d-48.48705352528751!3d-1.4552427985449557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92a488e36783856d%3A0x8e8e7b7f193c727d!2sTravessa%20S%C3%A3o%20Pedro%2C%20842%20-%20Batista%20Campos%2C%20Bel%C3%A9m%20-%20PA!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LegalService", // Alterado de LocalBusiness para LegalService (ou Lawyer)
        "name": "Livre de Multas",
        "image": "https://res.cloudinary.com/dpnexaukz/image/upload/v1761676888/dresses/zkpnvv4q8mmmoknbvhhc.png", // Manter ou alterar a URL da imagem se precisar
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Tv. Timbó, 1563 - Marco", // Endereço atualizado
            "addressLocality": "Belém",
            "addressRegion": "PA",
            "postalCode": "66030-465", // CEP de referência. Confirme o CEP correto para 2564.
            "addressCountry": "BR"
        },
        "url": "https://pereiradesousa.vercel.app/",
        "telephone": "+5591981006131", // Telefone atualizado
        "areaServed": [
            { "@type": "City", "name": "Belém" },
            { "@type": "State", "name": "Pará" }
        ],
        "priceRange": "$$", // Exemplo: indicando uma faixa de preço
        "sameAs": [
            "https://www.instagram.com/livredemultasoficial/", // Sugestão baseada em busca, verificar a URL exata
            // "https://www.linkedin.com/company/machadoadvogadosassociados"
        ],
        "description": "Escritório de advocacia em Belém, PA. Especializado em Direito do Consumidor, Direito Trabalhista e Assessoria Jurídica Empresarial."
    };

    const [showExitModal, setShowExitModal] = useState(false);

    return (
        <>
            <Head>
                {/* Título Otimizado para SEO de Advocacia */}
                <title>Pereira de Sousa | Direito do Consumidor, Trabalhista e Empresarial em Belém-PA</title>

                {/* Descrição Otimizada para SEO de Advocacia */}
                <meta name="description" content="Livre de Multas: Soluções jurídicas completas e personalizadas para proteger seus direitos. Especialistas em Direito do Consumidor, Trabalhista e Assessoria Empresarial. Atendimento em Belém/PA e online." />

                {/* Keywords Otimizadas para Advocacia */}
                <meta name="keywords" content="Pereira de Sousa, escritório de advocacia Belém, advogado em Belém PA, direito do consumidor, advogado trabalhista, assessoria jurídica empresarial, cobranças indevidas, rescisão de contrato, proteção de direitos" />

                {/* Metas para Redes Sociais (Open Graph) */}
                <meta property="og:title" content="Livre de Multas | Compromisso com Seus Direitos" />
                <meta property="og:description" content="Da escuta ao resultado, oferecemos soluções jurídicas completas e personalizadas. Transparência, experiência e relacionamento próximo para sua segurança jurídica." />
                <meta property="og:image" content="https://res.cloudinary.com/dpnexaukz/image/upload/v1761676888/dresses/zkpnvv4q8mmmoknbvhhc.png" /> {/* Use o logo ou uma imagem institucional relevante */}
                <meta property="og:url" content="https://pereiradesousa.vercel.app/" />
                <meta property="og:type" content="website" />

                {/* Metas para Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Livre de Multas" />
                <meta name="twitter:description" content="Especialistas em Direito do Consumidor, Trabalhista e Empresarial. Atendimento humanizado e focado em resultados." />
                <meta name="twitter:image" content="https://res.cloudinary.com/dpnexaukz/image/upload/v1761676888/dresses/zkpnvv4q8mmmoknbvhhc.png" /> {/* Use o logo ou uma imagem institucional relevante */}

                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet" />
            </Head>

            <section className="bg-white">
                <div className="relative z-10 flex flex-col items-center px-6 py-16 md:px-10 md:py-24">
                    <h1 className="text-3xl font-extrabold leading-tight text-blue-950 md:text-5xl">
                        Onde Estamos
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
        </>
    );
}