import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MdMenu, MdClose, MdAccountCircle, MdArrowBack } from "react-icons/md";
import type { LinkItem } from "../types";

interface MenuProps {
  menuData: {
    logoUrl: string;
    links: LinkItem[];
  } | null;

  /**
   * Para páginas internas de serviço:
   * - título do serviço (opcional, aparece no desktop)
   * - mensagem personalizada pro WhatsApp
   */
  serviceTitle?: string;
  whatsappMessage?: string;

  /**
   * Se quiser forçar uma URL específica de volta (opcional).
   * Padrão: "/#atuacao"
   */
  backHref?: string;
}

export function MenuInterno({ menuData, serviceTitle, whatsappMessage, backHref = "/#atuacao" }: MenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const whatsappLink = useMemo(() => {
    const phone = "5591981006131";
    const defaultMsg = "Olá! Vim do site Livre de Multas e gostaria de analisar meu caso.";
    const msg = whatsappMessage?.trim() ? whatsappMessage.trim() : defaultMsg;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  }, [whatsappMessage]);

  if (!menuData) return null;
  const { logoUrl, links } = menuData;

  const authButton =
    status === "loading" ? (
      <span className="text-white/70 text-sm">Carregando...</span>
    ) : (
      session && (
        <Link
          href="/admin"
          onClick={() => setMenuOpen(false)}
          className="relative flex items-center gap-1 text-white hover:text-[#fec655] transition-colors duration-300 group"
        >
          <MdAccountCircle className="w-5 h-5 text-white" />
          Minha Conta
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#fec655] transition-all duration-300 group-hover:w-full" />
        </Link>
      )
    );

  const handleBack = () => {
    // Se veio de uma página do site, tenta voltar.
    // Se não houver histórico (ou é navegação direta), vai pro backHref.
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push(backHref);
  };

  return (
    <header
      className={[
        "fixed top-0 left-0 w-full z-50",
        "bg-blue-950/90 backdrop-blur-md",
        "border-b border-white/10",
        "transition-all duration-300",
        isScrolled ? "py-3 shadow-lg" : "py-5",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Esquerda: Voltar + Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white hover:bg-white/10 transition"
              aria-label="Voltar"
            >
              <MdArrowBack className="h-5 w-5" />
            </button>

            <Link href="/" aria-label="Página inicial" onClick={() => setMenuOpen(false)}>
              <img
                src={logoUrl || "/images/logo.png"}
                alt="Livre de Multas"
                className={[
                  "transition-all duration-300 object-contain",
                  isScrolled ? "h-9 md:h-10" : "h-10 md:h-12",
                ].join(" ")}
              />
            </Link>
          </div>

          {/* Centro (desktop): título do serviço */}
          <div className="hidden md:block">
            {serviceTitle ? (
              <p className="text-white font-semibold">
                <span className="text-[#fec655]">Atuação:</span> {serviceTitle}
              </p>
            ) : (
              <p className="text-white/80 text-sm">Defesa e recurso de multas de trânsito</p>
            )}
          </div>

          {/* Direita (desktop): navegação + CTA */}
          <nav className="hidden md:flex items-center gap-6">
            {/* Links do menu do banco (se quiser mostrar em páginas internas) */}
            {links?.slice(0, 4).map((l) => (
              <Link
                key={l.id}
                href={l.url}
                target={l.target}
                className="relative text-white/90 hover:text-[#fec655] transition-colors duration-300 group text-sm font-semibold"
              >
                {l.text}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#fec655] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#fec655] px-5 py-2.5 text-sm font-bold text-[#0c1a26] shadow-lg hover:brightness-95 transition"
            >
              Falar no WhatsApp
            </a>

            {authButton}
          </nav>

          {/* Botão Mobile */}
          <button
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md bg-white/5 border border-white/10 hover:border-[#fec655]/50 transition-colors"
          >
            {menuOpen ? <MdClose className="w-6 h-6 text-white" /> : <MdMenu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <nav
        className={[
          "fixed inset-0 z-[60] md:hidden",
          "bg-blue-950/95 backdrop-blur-md",
          "transform transition-transform duration-300 ease-in-out",
          menuOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Topo do mobile */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src={logoUrl || "/images/logo.png"}
              alt="Livre de Multas"
              className="h-10 w-auto object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-white font-bold">Livre de Multas</span>
              {serviceTitle ? <span className="text-xs text-gray-300">{serviceTitle}</span> : null}
            </div>
          </div>

          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
            className="p-2 rounded-md border border-white/10 hover:border-[#fec655]/50 transition-colors"
          >
            <MdClose className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-6">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center rounded-full bg-[#fec655] px-6 py-3 text-sm font-bold text-[#0c1a26] shadow-lg hover:brightness-95 transition"
          >
            Falar no WhatsApp
          </a>

          <ul className="mt-6 list-none flex flex-col gap-2 text-white">
            {links?.map((l) => (
              <li key={l.id}>
                <Link
                  href={l.url}
                  target={l.target}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-base font-semibold hover:bg-white/10 transition"
                >
                  {l.text}
                </Link>
              </li>
            ))}

            {session && (
              <li className="mt-2">
                <Link
                  href="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 hover:bg-white/10 transition"
                >
                  <MdAccountCircle className="w-6 h-6 text-white" />
                  <span className="font-semibold">Minha Conta</span>
                </Link>
              </li>
            )}

            <li className="mt-2">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  handleBack();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 hover:bg-white/10 transition"
              >
                <MdArrowBack className="h-5 w-5" />
                Voltar
              </button>
            </li>
          </ul>

          <p className="mt-6 text-xs text-gray-400">
            Atendimento sem compromisso. Cada caso depende de documentos e análise técnica.
          </p>
        </div>
      </nav>
    </header>
  );
}