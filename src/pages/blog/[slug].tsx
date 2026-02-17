// pages/blog/[slug].tsx

import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Menu as MenuComponent } from 'components/Menu';
import Footer from 'components/Footer';
import WhatsAppButton from 'components/WhatsAppButton';
import { MenuData, LinkItem } from '../../types/index';
import { FaCalendarAlt } from 'react-icons/fa';
import { Analytics } from '@vercel/analytics/next';

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
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return 'Data desconhecida';
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

  if (!postSlug || typeof postSlug !== 'string') {
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
      }));

      formattedMenu = {
        logoUrl: rawMenu.logoUrl || '/images/logo.png',
        links,
      };
    }

    const formattedPost: BlogPostProps = {
      id: post.id,
      title: post.title,
      content: post.description || '',
      author: (post as any).author || 'Pereira de Sousa Advogados',
      slug: post.slug ?? post.id, // ✅ CORREÇÃO DEFINITIVA
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
    console.error('[BLOG SLUG ERROR]', error);
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
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h1 className="text-2xl font-bold">404 – Artigo não encontrado</h1>
      </div>
    );
  }

  const canonicalUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  }/blog/${post.slug}`;

  const coverImage =
    post.items[0]?.img || '/images/blog-default-cover.jpg';

  return (
    <>
      <Head>
        <title>{post.title} | Pereira de Sousa</title>
        <meta name="description" content={post.title} />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Analytics />
        <MenuComponent menuData={menu} />

        {/* HERO */}
        <section className="relative w-full h-[320px] md:h-[420px] overflow-hidden">
          <Image
            src={coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />

          <div className="relative z-10 h-full flex items-end">
            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-10 w-full text-left">
              <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight mb-4">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-gray-200">
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="text-[#fec655]" />
                  {formatDate(post.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CONTEÚDO */}
        <main className="relative z-10">
          <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-12">
              <article
                className="
                  prose
                  prose-base
                  md:prose-lg
                  max-w-none
                  text-gray-700
                  leading-relaxed
                  text-left
                "
              >
                <div
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </article>
            </div>
          </section>
        </main>

        <Footer menuData={menu} />
        <WhatsAppButton />
      </div>
    </>
  );
}
