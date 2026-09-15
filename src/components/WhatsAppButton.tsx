import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { WHATSAPP_GTM_ATTR } from "lib/whatsapp";

const DEFAULT_WHATSAPP_HREF =
  "https://wa.me/5591981006131?text=Ol%C3%A1!%20Estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20site.";

type WhatsAppButtonProps = {
  href?: string;
  showSocial?: boolean;
};

export default function WhatsAppButton({ href, showSocial = true }: WhatsAppButtonProps) {
  const whatsappUrl = href || DEFAULT_WHATSAPP_HREF;

  return (
    <div
      className="fixed right-4 z-30 flex justify-between gap-2"
      style={{ bottom: "calc(1rem + var(--ldm-cookie-offset, 0px))" }}
    >
      {showSocial && (
        <>
          <a
            href="https://www.facebook.com/profile.php?id=61552915675746"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex z-10 bg-blue-600 text-textcolor-50 hover:bg-blue-700 text-white rounded-full shadow-lg p-3 font-bold text-lg transition"
          >
            <FaFacebook className="w-7 h-7 text-primary-default" />
          </a>

          <a
            href="https://www.instagram.com/livredemultasoficial"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex z-10 bg-pink-600 text-textcolor-50 hover:bg-pink-700 text-white rounded-full shadow-lg p-3 font-bold text-lg transition"
          >
            <FaInstagram className="w-7 h-7 text-primary-default" />
          </a>
        </>
      )}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-gtm={WHATSAPP_GTM_ATTR}
        className="bg-green-600 text-textcolor-50 hover:bg-green-700 text-white rounded-full shadow-lg p-3 font-bold text-lg transition"
        aria-label="Falar no WhatsApp"
      >
        <FaWhatsapp className="w-7 h-7 text-primary-default" />
      </a>
    </div>
  );
}
