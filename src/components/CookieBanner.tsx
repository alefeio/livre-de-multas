import React, { useEffect, useRef, useState } from "react";

const COOKIE_OFFSET_VAR = "--ldm-cookie-offset";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem("cookiesAccepted");
    if (!hasAcceptedCookies) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (!isVisible) {
      root.style.setProperty(COOKIE_OFFSET_VAR, "0px");
      return;
    }

    const applyOffset = () => {
      const height = bannerRef.current?.offsetHeight ?? 0;
      root.style.setProperty(COOKIE_OFFSET_VAR, `${height}px`);
    };

    applyOffset();

    const observer = new ResizeObserver(applyOffset);
    if (bannerRef.current) observer.observe(bannerRef.current);
    window.addEventListener("resize", applyOffset);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", applyOffset);
      root.style.setProperty(COOKIE_OFFSET_VAR, "0px");
    };
  }, [isVisible]);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  const handleDeclineCookies = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={bannerRef}
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/15 bg-gray-900 text-white shadow-[0_-4px_16px_rgba(0,0,0,0.25)]"
      role="dialog"
      aria-label="Aviso de cookies"
    >
      <div className="mx-auto flex max-w-screen-xl items-center gap-2 px-3 py-2 sm:gap-3 sm:px-4">
        <p className="min-w-0 flex-1 text-[11px] leading-snug text-white/90 sm:text-xs">
          Usamos cookies para melhorar sua experiência.{" "}
          <a href="/politica-de-cookies" className="text-[#fec655] underline-offset-2 hover:underline">
            Política de Cookies
          </a>
        </p>
        <div className="flex shrink-0 gap-1.5">
          <button
            type="button"
            onClick={handleDeclineCookies}
            className="min-h-[40px] rounded-md border border-white/80 px-3 text-xs text-white hover:bg-white/10 focus:outline-none sm:px-4 sm:text-sm"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={handleAcceptCookies}
            className="min-h-[40px] rounded-md bg-blue-950 px-3 text-xs text-white hover:bg-blue-900 focus:outline-none sm:px-4 sm:text-sm"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
