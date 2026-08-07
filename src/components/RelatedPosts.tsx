import Link from "next/link";
import { FaFileAlt } from "react-icons/fa";

export interface RelatedPostItem {
  title: string;
  slug: string;
  subtitle?: string | null;
}

interface RelatedPostsProps {
  posts: RelatedPostItem[];
}

/**
 * Bloco "Leia também" — links internos para SEO e navegação.
 */
export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts?.length) return null;

  return (
    <nav
      aria-label="Leia também"
      className="mt-10 mx-auto w-full max-w-7xl px-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm md:p-8"
    >
      <h2 className="text-xl font-extrabold text-white md:text-2xl">Leia também</h2>
      <p className="mt-1 text-sm text-gray-300">
        Continue aprendendo com conteúdos relacionados sobre recursos de multa.
      </p>

      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-[#fec655]/40 hover:bg-white/10"
            >
              <FaFileAlt
                className="mt-0.5 shrink-0 text-[#fec655] opacity-80 group-hover:opacity-100"
                aria-hidden
              />
              <span className="min-w-0">
                <span className="block font-semibold text-white group-hover:text-[#fec655]">
                  {post.title}
                </span>
                {post.subtitle ? (
                  <span className="mt-0.5 block text-xs text-gray-400 line-clamp-2">
                    {post.subtitle}
                  </span>
                ) : null}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
