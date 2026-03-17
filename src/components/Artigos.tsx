// components/Artigos.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// Tipagens
interface BlogFoto {
  id: string;
  detalhes: string;
  img: string;
}

interface BlogItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  order: number;
  publico: boolean;
  items: BlogFoto[];
  slug: string;
}

interface ArtigosProps {
  /** Na home: exibir só os primeiros N posts */
  limit?: number;
  /** Na home: exibir botão "Ver todos" linkando para /blog */
  showVerTodos?: boolean;
  /** Na página /blog: quantidade de posts por página (ativa paginação) */
  perPage?: number;
}

const Artigos: React.FC<ArtigosProps> = ({ limit, showVerTodos, perPage = 0 }) => {
  const [posts, setPosts] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/crud/blog");
      const data = await res.json();

      if (res.ok && data.success) {
        const publicPosts = data.posts
          .filter((p: BlogItem) => p.publico)
          .sort((a: BlogItem, b: BlogItem) => a.order - b.order);

        setPosts(publicPosts);
      }
    } catch (error) {
      console.error("Erro ao carregar posts do blog", error);
    } finally {
      setLoading(false);
    }
  };

  const navigateToPost = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  const usePagination = perPage > 0;
  const totalPages = usePagination ? Math.ceil(posts.length / perPage) : 1;
  const displayPosts = usePagination
    ? posts.slice((currentPage - 1) * perPage, currentPage * perPage)
    : limit
      ? posts.slice(0, limit)
      : posts;

  return (
    <section className="w-full bg-blue-950">
      <div className="max-w-7xl mx-auto">

        {/* Estados */}
        {loading && (
          <p className="text-center text-white text-lg py-20">
            Carregando artigos…
          </p>
        )}

        {!loading && posts.length === 0 && (
          <p className="text-center text-white text-lg py-20">
            Nenhum artigo publicado no momento.
          </p>
        )}

        {!loading && displayPosts.length > 0 && (
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => navigateToPost(post.slug)}
                className="group bg-blue-950 border border-[#fec655]/20 rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* Imagem */}
                <div className="relative w-full h-60 overflow-hidden">
                  {post.items.length > 0 ? (
                    <Image
                      src={post.items[0].img}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#111] flex items-center justify-center text-gray-500 text-sm">
                      Sem imagem
                    </div>
                  )}
                </div>

                {/* Conteúdo */}
                <div className="p-6 flex flex-col gap-4">
                  <h3 className="text-xl md:text-2xl font-extrabold text-[#fec655] leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                    {post.subtitle}
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToPost(post.slug);
                      }}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#fec655] hover:text-[#e0b66a] transition-colors"
                    >
                      Ler artigo
                      <span className="text-lg leading-none">→</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {showVerTodos && posts.length > 0 && (
            <div className="mt-12 flex justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-8 py-3 font-bold text-white shadow-lg transition hover:brightness-110"
              >
                Ver todos os artigos
              </Link>
            </div>
          )}

          {usePagination && totalPages > 1 && (
            <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Paginação do blog">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-white transition hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Página anterior"
              >
                Anterior
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`min-w-[2.5rem] rounded-full px-4 py-2 font-semibold transition ${
                    currentPage === page
                      ? "bg-[#25D366] text-white"
                      : "border border-white/20 bg-white/5 text-white hover:bg-white/10"
                  }`}
                  aria-label={`Página ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-white transition hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Próxima página"
              >
                Próxima
              </button>
            </nav>
          )}
          </>
        )}
      </div>
    </section>
  );
};

export default Artigos;
