// pages/blog/[slug].tsx
import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/next";
import { FaCalendarAlt } from "react-icons/fa";

import { Menu as MenuComponent } from "components/Menu";
import Footer from "components/Footer";
import WhatsAppButton from "components/WhatsAppButton";
import { MenuData, LinkItem } from "../../types/index";
import Blog from "components/Blog";

const prisma = new PrismaClient();

/* =========================
   INTERFACES
========================= */

interface BlogFoto {
  id: string;
  detalhes: string | null;
  img: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogPostProps {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  slug: string;
  items: BlogFoto[];
  publico: boolean;
  subtitle: string | null;
  description: string | null;
  updatedAt: string;
}

interface BlogPageProps {
  post: BlogPostProps | null;
  menu: MenuData | null;
}

/* =========================
   HELPERS
========================= */

const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "Data desconhecida";
  }
};

/* =========================
   GET SERVER SIDE PROPS
========================= */

export const getServerSideProps: GetServerSideProps<BlogPageProps> = async (
  context
) => {
  const { slug } = context.query;
  const postSlug = Array.isArray(slug) ? slug[0] : slug;

  if (!postSlug || typeof postSlug !== "string") {
    return { notFound: true };
  }

  try {
    const post = await prisma.blog.findUnique({
      where: { slug: postSlug },
      include: { items: true },
    });

    if (!post || !post.publico) {
      return { notFound: true };
    }

    const menus = await prisma.menu.findMany();
    const rawMenu = menus[0] ?? null;

    let formattedMenu: MenuData | null = null;

    if (rawMenu && Array.isArray(rawMenu.links)) {
      const links: LinkItem[] = rawMenu.links.map((link: any) => ({
        id: link.id,
        text: link.text,
        url: link.url,
        target: link.target ?? undefined,
      }));

      formattedMenu = {
        logoUrl: rawMenu.logoUrl || "/images/logo.png",
        links,
      };
    }

    const formattedPost: BlogPostProps = {
      id: post.id,
      title: post.title,
      // ⚠️ mantendo sua lógica (content vem do description)
      content: post.description || "",
      author: (post as any).author || "Livre de Multas",
      slug: post.slug ?? post.id,
      publico: post.publico,
      subtitle: post.subtitle,
      description: post.description,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      items: post.items.map((item) => ({
        id: item.id,
        detalhes: item.detalhes,
        img: item.img,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
      })),
    };

    return {
      props: {
        post: formattedPost,
        menu: formattedMenu,
      },
    };
  } catch (error) {
    console.error("[BLOG SLUG ERROR]", error);
    return { notFound: true };
  } finally {
    await prisma.$disconnect();
  }
};

/* =========================
   PAGE
========================= */

export default function BlogPage({ post, menu }: BlogPageProps) {
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-950 text-white">
        <h1 className="text-2xl font-bold">404 – Artigo não encontrado</h1>
      </div>
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const canonicalUrl = `${baseUrl}/blog/${post.slug}`;
  const ogImage = `${baseUrl}/images/logo.jpg`;

  const coverImage = post.items[0]?.img || "/images/blog-default-cover.jpg";

  return (
    <>
      <Head>
        <title>{post.title} | Livre de Multas</title>
        <meta name="description" content={post.subtitle || post.title} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.subtitle || post.title} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:image:alt" content="Livre de Multas" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.subtitle || post.title} />
        <meta name="twitter:image" content={ogImage} />

        <meta name="theme-color" content="#070a0f" />
      </Head>

      <div className="min-h-screen bg-blue-950 text-white overflow-x-hidden">
        <Analytics />
        <MenuComponent menuData={menu} />

        {/* ✅ Resolve a sobreposição do título pelo header fixo */}
        <div className="relative pt-56 sm:pt-64 2xl:pt-80">
          {/* Fundo premium (igual páginas internas) */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#fec655]/10 blur-3xl" />
            <div className="absolute bottom-[-240px] right-[-160px] h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
          </div>

          <main className="relative py-8 md:py-12">
            {/* HERO (card premium com imagem) */}
            <header className="relative overflow-hidden border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#fec655]/10 blur-3xl" />
                <div className="absolute -right-24 bottom-[-40px] h-64 w-64 rounded-full bg-white/5 blur-3xl" />
              </div>

              <div className="relative mx-auto w-full max-w-7xl px-4 grid grid-cols-1 gap-8 p-6 md:grid-cols-2 md:items-center md:p-10">
                {/* Texto */}
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-200">
                      Blog
                    </span>
                    <span className="inline-flex items-center rounded-full border border-[#fec655]/25 bg-[#fec655]/10 px-3 py-1 text-xs text-[#fec655]">
                      Atualizado em {formatDate(post.updatedAt)}
                    </span>
                  </div>

                  <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
                    {post.title}
                  </h1>

                  {post.subtitle ? (
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-200 md:text-lg">
                      {post.subtitle}
                    </p>
                  ) : (
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-200 md:text-lg">
                      Conteúdo informativo para orientar sua tomada de decisão e evitar perda de prazos.
                    </p>
                  )}

                  <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-200">
                    <span className="flex items-center gap-2">
                      <FaCalendarAlt className="text-[#fec655]" />
                      Publicado em {formatDate(post.createdAt)}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/30" />
                    <span className="text-gray-300">
                      Por <strong className="text-white">{post.author}</strong>
                    </span>
                  </div>

                  <p className="mt-4 text-xs text-gray-400">
                    Conteúdo informativo. Cada caso deve ser analisado individualmente.
                  </p>
                </div>

                {/* Imagem */}
                <div className="relative">
                  <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-b from-[#fec655]/20 to-transparent blur-2xl" />
                  <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
                    <div className="relative w-full max-h-[420px] overflow-hidden">
                      <Image
                        src={coverImage}
                        alt={post.title}
                        width={1200}
                        height={900}
                        className="h-full w-full object-cover object-top"
                        priority
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
                  </div>
                </div>
              </div>
            </header>

            {/* CONTEÚDO (card premium) */}
            <section className="mt-10 mx-auto w-full max-w-7xl px-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm md:p-10">
              <article
                className="
                  prose
                  prose-invert
                  prose-base
                  md:prose-lg
                  max-w-none
                  prose-headings:text-white
                  prose-p:text-gray-200
                  prose-li:text-gray-200
                  prose-strong:text-white
                  prose-a:text-[#fec655]
                  prose-a:no-underline
                  hover:prose-a:opacity-90
                  prose-blockquote:border-l-[#fec655]
                  prose-blockquote:text-gray-200
                "
              >
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </article>
            </section>

            {/* CTA final discreto (combina com internas) */}
            <section className="mt-10 mx-auto w-full max-w-7xl px-4 rounded-3xl border border-white/10 bg-gradient-to-b from-[#fec655]/10 to-white/5 p-6 shadow-2xl backdrop-blur-sm md:p-8">
              <h2 className="text-xl font-extrabold text-white md:text-2xl">
                Precisa de orientação no seu caso?
              </h2>
              <p className="mt-2 text-gray-200">
                Se você tem notificações ou prazos correndo, envie no WhatsApp:
                <strong className="text-white"> foto da notificação</strong> +{" "}
                <strong className="text-white">seu nome</strong> +{" "}
                <strong className="text-white">cidade</strong>.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://wa.me/5591981006131?text=Ol%C3%A1%21%20Li%20um%20artigo%20no%20blog%20e%20gostaria%20de%20orienta%C3%A7%C3%A3o%20sobre%20meu%20caso."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#fec655] px-7 py-3 font-bold text-[#0c1a26] shadow-lg transition hover:brightness-95"
                >
                  Falar no WhatsApp
                </a>
                <a
                  href="/#atuacao"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Ver atuações
                </a>
              </div>

              <p className="mt-3 text-xs text-gray-400">
                Atendimento sem compromisso. Cada caso depende de documentos e análise técnica.
              </p>
            </section>

            <div className="my-10">
              <Blog />
            </div>
          </main>
        </div>

        <Footer menuData={menu} />
        <WhatsAppButton />
      </div>
    </>
  );
}