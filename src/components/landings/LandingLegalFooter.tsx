import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_GTM_ATTR } from "lib/whatsapp";

type LandingLegalFooterProps = {
  whatsappHref: string;
  address: string;
};

export default function LandingLegalFooter({ whatsappHref, address }: LandingLegalFooterProps) {
  return (
    <footer className="bg-blue-950 text-gray-300">
      <div className="mx-auto max-w-4xl px-5 py-10 text-center sm:px-6">
        <p className="text-white font-extrabold">Livre de Multas</p>
        <address className="mt-3 not-italic text-sm leading-relaxed text-gray-400">
          {address}
          <br />
          Belém – PA
        </address>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          data-gtm={WHATSAPP_GTM_ATTR}
          className="mt-5 inline-flex min-h-[48px] items-center justify-center gap-2 text-sm font-semibold text-white hover:text-[#fec655]"
        >
          <FaWhatsapp className="text-[#25D366]" />
          +55 91 98100-6131
        </a>
        <p className="mt-6 text-xs text-gray-500">
          Conteúdo informativo. Cada caso deve ser analisado individualmente. O contato não gera obrigação e não
          garante resultado específico.
        </p>
        <p className="mt-3 text-xs text-gray-500" suppressHydrationWarning>
          © {new Date().getFullYear()} Livre de Multas. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
