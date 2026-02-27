import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function WhatsAppButton() {
  const whatsappUrl =
    "https://wa.me/5591981006131?text=Ol%C3%A1!%20Estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20site.";

  // ✅ Event snippet (adaptado para Next/React)
  function gtag_report_conversion(url?: string) {
    const callback = function () {
      if (typeof url !== "undefined") {
        // ✅ abre em nova aba, mantendo o comportamento do target="_blank"
        window.open(url, "_blank", "noopener,noreferrer");
      }
    };

    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: "AW-11359793189/VEw0CLKXzf8bEKXg4qgq",
        event_callback: callback,
      });

      // ✅ fallback: se o callback não rodar por algum motivo, abre em 800ms
      setTimeout(callback, 800);
    } else {
      // ✅ se gtag ainda não carregou, não perde o clique
      callback();
    }

    return false;
  }

  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    gtag_report_conversion(whatsappUrl);
  };

  return (
    <div className="fixed flex justify-between gap-2 bottom-4 right-4 z-30">
      <a
        href="https://www.facebook.com/profile.php?id=61552915675746"
        target="_blank"
        rel="noopener noreferrer"
        className="z-10 bg-blue-600 text-textcolor-50 hover:bg-blue-700 text-white rounded-full shadow-lg p-3 font-bold text-lg transition"
      >
        <FaFacebook className="w-7 h-7 text-primary-default" />
      </a>

      <a
        href="https://www.instagram.com/livredemultasoficial"
        target="_blank"
        rel="noopener noreferrer"
        className="z-10 bg-pink-600 text-textcolor-50 hover:bg-pink-700 text-white rounded-full shadow-lg p-3 font-bold text-lg transition"
      >
        <FaInstagram className="w-7 h-7 text-primary-default" />
      </a>

      {/* ✅ WHATSAPP com conversão */}
      <a
        href={whatsappUrl}
        onClick={handleWhatsAppClick}
        className="bg-green-600 text-textcolor-50 hover:bg-green-700 text-white rounded-full shadow-lg p-3 font-bold text-lg transition"
        aria-label="Falar no WhatsApp"
      >
        <FaWhatsapp className="w-7 h-7 text-primary-default" />
      </a>
    </div>
  );
}