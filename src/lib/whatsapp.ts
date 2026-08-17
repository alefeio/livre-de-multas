/** Número e padrão de URL usados pelo GTM (não alterar o domínio nem o formato wa.me). */
export const WHATSAPP_PHONE = "5591981006131";

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export const HOME_WHATSAPP_MESSAGE =
  "Olá! Recebi uma notificação ou multa de trânsito e gostaria de solicitar uma análise do meu caso.";

export const HOME_WHATSAPP_HREF = whatsappLink(HOME_WHATSAPP_MESSAGE);

/** Atributo complementar — não substitui href, classes nem texto do clique. */
export const WHATSAPP_GTM_ATTR = "whatsapp-cta" as const;
