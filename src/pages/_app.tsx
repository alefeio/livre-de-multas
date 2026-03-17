// pages/_app.tsx
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Script from "next/script";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import "../styles/globals.css";
import CookieBanner from "components/CookieBanner";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Registra page view para contador de acessos no dashboard (apenas páginas públicas)
  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;
    const path = router.asPath?.split("?")[0] || "/";
    if (path.startsWith("/admin")) return;
    fetch("/api/pageview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
    }).catch(() => {});
  }, [mounted, router.asPath]);

  return (
    <SessionProvider session={session}>
      {/* ✅ Meta Pixel (global) */}
      <Script id="meta-pixel-base" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '379684748131521');
          fbq('track', 'PageView');
        `}
      </Script>

      {/* ✅ Google tag (gtag.js) - GA4 + Google Ads (global) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-4GN2YJ045K"
        strategy="afterInteractive"
      />
      <Script id="google-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // GA4
          gtag('config', 'G-4GN2YJ045K');

          // Google Ads (para conversões AW-...)
          gtag('config', 'AW-11359793189');
        `}
      </Script>

      <Component {...pageProps} />
      {mounted && <CookieBanner />}

      {/* ✅ Pixel noscript (global) */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=379684748131521&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
    </SessionProvider>
  );
}

export default MyApp;