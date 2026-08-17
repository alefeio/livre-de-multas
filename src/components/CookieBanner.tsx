import React, { useState, useEffect } from 'react';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem('cookiesAccepted');
    if (!hasAcceptedCookies) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  const handleDeclineCookies = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-3 right-3 z-40 max-w-screen-xl rounded-xl bg-gray-900/95 text-white shadow-lg md:left-4 md:right-4 md:mx-auto">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <p className="text-xs leading-relaxed sm:text-sm">
          Nós utilizamos cookies para melhorar sua experiência em nosso site. Ao continuar, você concorda com a nossa <a href="/politica-de-cookies" className="text-[#fec655] hover:underline">Política de Cookies</a>.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={handleDeclineCookies}
            className="min-h-[40px] flex-1 rounded-md border border-white bg-transparent px-4 py-2 text-sm text-white hover:border-white hover:text-white focus:outline-none sm:flex-none"
          >
            Recusar
          </button>
          <button
            onClick={handleAcceptCookies}
            className="min-h-[40px] flex-1 rounded-md bg-blue-950 px-4 py-2 text-sm text-white hover:bg-gray-900 focus:outline-none sm:flex-none"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
