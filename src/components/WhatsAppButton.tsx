import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

export default function WhatsAppButton() {
  const whatsappUrl =
    "https://wa.me/5591981006131?text=Ol%C3%A1!%20Estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20site.";

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

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-600 text-textcolor-50 hover:bg-green-700 text-white rounded-full shadow-lg p-3 font-bold text-lg transition"
        aria-label="Falar no WhatsApp"
      >
        <FaWhatsapp className="w-7 h-7 text-primary-default" />
      </a>
    </div>
  );
}
