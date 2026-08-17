import React from "react";
import { HOME_WHATSAPP_HREF, WHATSAPP_GTM_ATTR } from "lib/whatsapp";

export default function LandingCtaFinal() {
  return (
    <section className="relative w-full overflow-hidden bg-[#fec655] py-12 md:py-16" id="cta-final">
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-6 md:px-10">
        <h2 className="text-2xl font-extrabold leading-tight text-[#0c1a26] md:text-4xl">
          Envie sua notificação para análise
        </h2>
        <p className="mt-3 text-base font-medium text-[#0c1a26]/90 md:text-lg">
          Atendimento jurídico em Direito de Trânsito em Belém. Cada caso é analisado
          individualmente.
        </p>
        <a
          href={HOME_WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          data-gtm={WHATSAPP_GTM_ATTR}
          className="mt-8 inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#25D366] px-10 py-4 text-lg font-bold text-white shadow-lg transition hover:brightness-110 sm:w-auto"
        >
          Enviar notificação pelo WhatsApp
        </a>
      </div>
    </section>
  );
}
