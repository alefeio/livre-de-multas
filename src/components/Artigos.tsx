// components/Artigos.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
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

const Artigos: React.FC = () => {
  const [posts, setPosts] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <section className="w-full bg-black">
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

        {!loading && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <article
                key={post.id}
                onClick={() => navigateToPost(post.slug)}
                className="group bg-black border border-[#fec655]/20 rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
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
        )}
      </div>
    </section>
  );
};

export default Artigos;
