import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface LinkItem {
  id: string;
  text: string;
  url: string;
  target?: string;
}

interface MenuProps {
  menuData: {
    logoUrl: string;
    links: LinkItem[];
  } | null;
}

interface BlogFoto {
  id: string;
  detalhes?: string;
  img: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  order: number;
  publico: boolean;
  createdAt: string;
  items: BlogFoto[];
}

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "Data indisponível";
  }
};

// ✅ Helper: normaliza URL de link do menu para uso no Next <Link/>
// - mantém anchors (#...)
// - garante que caminhos internos tenham /
// - mantém URLs externas como estão
const normalizeHref = (url: string) => {
  const u = (url || "").trim();
  if (!u) return "/";
  if (u.startsWith("#")) return `/${u}`; // ajuda em casos de navegação na home
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  if (u.startsWith("/")) return u;
  return `/${u}`;
};

export default function Footer({ menuData }: MenuProps) {
  const logoUrl = menuData?.logoUrl;
  const menuLinks = menuData?.links || [];

  // ✅ Ajuste aqui para os dados reais do Livre de Multas (se necessário)
  const CONTACT = {
    instagramUrl: "https://www.instagram.com/livredemultasoficial",
    instagramHandle: "@livredemultasoficial",
    whatsappNumber: "5591981006131",
    whatsappNumber2: "5591991198584",
    whatsappLabel: "+55 91 98100-6131",
    whatsappLabel2: "+55 91 99119-8584",
    email: "livresdemultasoficial@gmail.com",
    address: "Belém/PA",
    mapUrl:
      "https://www.google.com/maps?ll=-1.432623,-48.470215&z=11&t=m&hl=pt-BR&gl=US&mapclient=embed&q=Tv.+Timb%C3%B3,+1563+-+Marco+Bel%C3%A9m+-+PA+66087-531+Brasil",
  };

  const openWhatsAppUrl = useMemo(() => {
    const message = encodeURIComponent("Olá! Gostaria de saber mais informações sobre os serviços da Livre de Multas.");
    return `https://wa.me/${CONTACT.whatsappNumber}?text=${message}`;
  }, [CONTACT.whatsappNumber]);

  const openWhatsAppUrl2 = useMemo(() => {
    const message = encodeURIComponent("Olá! Gostaria de saber mais informações sobre os serviços da Livre de Multas.");
    return `https://wa.me/${CONTACT.whatsappNumber}?text=${message}`;
  }, [CONTACT.whatsappNumber2]);

  // Posts dinâmicos (mantido como no seu projeto)
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/crud/blog", { method: "GET" });
        const data = await res.json();

        if (res.ok && data.success && Array.isArray(data.posts)) {
          const publicPosts = data.posts.filter((p: BlogPost) => p.publico);
          const sortedPosts = publicPosts
            .sort((a: BlogPost, b: BlogPost) => a.order - b.order)
            .slice(0, 3);

          setPosts(sortedPosts);
        } else {
          setPosts([]);
        }
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <footer className="bg-blue-950 text-gray-300">
      {/* Faixa CTA */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-white text-xl md:text-2xl font-extrabold leading-tight">
                Não encontrou o que procura?
              </p>
              <p className="text-gray-300 mt-1">
                Fale com a nossa equipe e esclareça suas dúvidas.
              </p>
            </div>

            <a
              href={openWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fec655] px-7 py-3 font-bold text-[#0c1a26] shadow-lg transition hover:brightness-95"
            >
              <FaWhatsapp />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Coluna 1: Logo + descrição */}
          <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <div className="relative h-40 w-44">
                  <Image src={logoUrl} alt="Livre de Multas" fill className="object-contain" />
                </div>
              ) : (
                <p className="text-white text-lg font-extrabold">LIVRE DE MULTAS</p>
              )}
            </div>

            <p className="text-sm text-gray-300 max-w-xs leading-relaxed">
              Defesa e recurso de multas de trânsito com orientação clara, estratégia técnica e
              atendimento direto. Cada caso deve ser analisado individualmente.
            </p>
          </div>

          {/* Coluna 2: Menu dinâmico (do banco via menuData) */}
          <div className="flex flex-col items-start">
            <h4 className="text-[#fec655] text-lg font-bold mb-4">Menu</h4>

            {menuLinks.length === 0 ? (
              <p className="text-sm text-gray-400">Menu indisponível no momento.</p>
            ) : (
              <nav className="flex flex-col gap-3 text-sm">
                {menuLinks.map((item) => {
                  const href = normalizeHref(item.url);
                  const isExternal = href.startsWith("http://") || href.startsWith("https://");

                  if (isExternal) {
                    return (
                      <a
                        key={item.id}
                        href={href}
                        target={item.target || "_blank"}
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#fec655] transition"
                      >
                        {item.text}
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={item.id}
                      href={href}
                      className="text-white hover:text-[#fec655] transition"
                      target={item.target}
                    >
                      {item.text}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>

          {/* Coluna 3: Últimos posts (dinâmico) */}
          <div className="flex flex-col items-start">
            <h4 className="text-[#fec655] text-lg font-bold mb-4">Últimos posts</h4>

            {loading ? (
              <p className="text-sm text-gray-400">Carregando posts...</p>
            ) : posts.length === 0 ? (
              <p className="text-sm text-gray-400">Nenhum post encontrado.</p>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug || post.id}`} className="flex items-start gap-3 group">
                    <div className="relative h-[52px] w-[52px] flex-shrink-0 overflow-hidden rounded-xl border border-white/10">
                      <Image
                        src={post.items?.[0]?.img || "/images/blog-default-thumb.jpg"}
                        alt={`Miniatura: ${post.title}`}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-white text-sm leading-tight group-hover:text-[#fec655] transition line-clamp-2">
                        {post.title}
                      </span>
                      <span className="text-gray-400 text-xs mt-1 flex items-center">
                        <FaCalendarAlt size={10} className="mr-1 opacity-70" />
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Coluna 4: Contato */}
          <div className="flex flex-col items-start">
            <h4 className="text-[#fec655] text-lg font-bold mb-4">Contato</h4>

            <div className="space-y-3 text-sm">
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white hover:text-[#fec655] transition"
              >
                <FaInstagram size={16} className="text-[#fec655] mr-3 flex-shrink-0" />
                {CONTACT.instagramHandle}
              </a>

              <a
                href={openWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white hover:text-[#fec655] transition"
              >
                <FaWhatsapp size={16} className="text-[#fec655] mr-3 flex-shrink-0" />
                {CONTACT.whatsappLabel}
              </a>

              <a
                href={openWhatsAppUrl2}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white hover:text-[#fec655] transition"
              >
                <FaWhatsapp size={16} className="text-[#fec655] mr-3 flex-shrink-0" />
                {CONTACT.whatsappLabel2}
              </a>

              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center text-white hover:text-[#fec655] transition"
              >
                <MdEmail size={16} className="text-[#fec655] mr-3 flex-shrink-0" />
                {CONTACT.email}
              </a>

              <a
                href={CONTACT.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start text-white hover:text-[#fec655] transition"
              >
                <FaMapMarkerAlt size={18} className="text-[#fec655] mr-3 mt-0.5 flex-shrink-0" />
                <span className="block text-white">{CONTACT.address}</span>
              </a>

              <div className="w-20 border-t border-[#fec655] mt-3" />
            </div>
          </div>
        </div>

        {/* Rodapé final */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Livre de Multas. Todos os direitos reservados.
          </p>
          <p className="text-xs text-gray-500">
            Conteúdo informativo. Cada caso deve ser analisado individualmente.
          </p>
        </div>
      </div>
    </footer>
  );
}