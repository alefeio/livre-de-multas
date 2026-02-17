import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdPlayArrow, MdPause } from "react-icons/md";

interface BannerItem {
  id: string;
  url: string;
  title?: string;
  subtitle?: string;
  link?: string;
  target?: string;
  buttonText?: string;
  buttonColor?: string;
}

interface HeroSliderProps {
  banners: {
    banners: BannerItem[];
  }[];
}

const FIXED_SLOGAN =
  "Na Machado - Advogados Associados, transformamos desafios em conquistas jurídicas com seriedade, dedicação e inovação.";

export default function HeroSlider({ banners }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [startX, setStartX] = useState<number | null>(null);

  const slides = banners[0]?.banners || [];
  const router = useRouter();

  const hasMultipleSlides = slides.length > 1;

  useEffect(() => {
    if (!playing || !hasMultipleSlides) return;

    const timer = setTimeout(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 8000);

    return () => clearTimeout(timer);
  }, [current, playing, slides.length, hasMultipleSlides]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasMultipleSlides) return;
    setPlaying(false);
    setStartX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (startX === null || !hasMultipleSlides) return;

    const deltaX = e.clientX - startX;

    if (Math.abs(deltaX) > 50) {
      setCurrent((prev) =>
        deltaX > 0
          ? (prev - 1 + slides.length) % slides.length
          : (prev + 1) % slides.length
      );
    }

    setStartX(null);
    setPlaying(true);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!hasMultipleSlides) return;
    setPlaying(false);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startX === null || !hasMultipleSlides) return;

    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;

    if (Math.abs(deltaX) > 50) {
      setCurrent((prev) =>
        deltaX > 0
          ? (prev - 1 + slides.length) % slides.length
          : (prev + 1) % slides.length
      );
    }

    setStartX(null);
    setPlaying(true);
  };

  if (slides.length === 0) return null;

  return (
    <div
      id="inicio"
      className="relative w-full h-[70vh] overflow-hidden shadow-2xl mt-[88px] md:mt-[150px]"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={hasMultipleSlides ? () => setPlaying(false) : undefined}
      onMouseLeave={hasMultipleSlides ? () => setPlaying(true) : undefined}
    >
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.url}
            alt={slide.title || `Banner ${idx + 1}`}
            className="w-full h-full object-cover object-[center_top]"
          />
        </div>
      ))}

      {/* Overlay e Conteúdo */}
      {slides[current] && (
        <div className="absolute inset-0 z-20 flex items-center bg-gradient-to-r from-black/80 via-black/50 to-transparent">
          <div className="container mx-auto px-8 max-w-5xl">
            {slides[current].title && (
              <h2 className="text-4xl md:text-6xl font-extrabold text-[#fec655] drop-shadow-lg mb-6 leading-tight">
                {slides[current].title}
              </h2>
            )}

            {slides[current].subtitle && (
              <p className="text-xl md:text-2xl text-white leading-relaxed drop-shadow-md max-w-2xl">
                {slides[current].subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      {/* CONTROLES — SOMENTE SE HOUVER +1 SLIDE */}
      {hasMultipleSlides && (
        <>
          {/* Bullets */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`w-4 h-4 rounded-full transition-all ${
                  idx === current
                    ? "bg-[#fec655]"
                    : "bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>

          {/* Play / Pause — BRANCO PURO */}
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pausar" : "Reproduzir"}
            className="absolute bottom-6 right-6 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-black/70 hover:bg-black transition-colors"
          >
            {playing ? (
              <MdPause className="w-6 h-6 text-white" />
            ) : (
              <MdPlayArrow className="w-6 h-6 text-white" />
            )}
          </button>
        </>
      )}
    </div>
  );
}
