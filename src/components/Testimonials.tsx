import React, { useState, useRef, useCallback, useEffect } from "react";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

interface Testimonial {
  id: string;
  name: string;
  content: string;
  type: string;
  avatarUrl?: string;
}

interface TestimonialsPageProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);

  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const carouselViewportRef = useRef<HTMLDivElement>(null);

  const getItemsToShow = useCallback(() => {
    if (typeof window === "undefined") return 1;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    return isDesktop ? 3 : 1;
  }, []);

  const getPageCount = useCallback(
    (itemsToShow: number) => {
      if (itemsToShow === 1) return testimonials.length;
      return Math.ceil(testimonials.length / itemsToShow);
    },
    [testimonials.length]
  );

  const updateCarouselPosition = useCallback(() => {
    if (carouselTrackRef.current && itemRef.current && carouselViewportRef.current) {
      const itemsToShow = getItemsToShow();
      const gapX = 8; // gap-x-2 => 8px

      const singleItemRenderedWidth = itemRef.current.offsetWidth;
      const viewportWidth = carouselViewportRef.current.offsetWidth;

      let newTranslateX = 0;

      if (itemsToShow === 1) {
        const trackPaddingLeft = 4; // px-2 => 4px left
        const itemWithGap = singleItemRenderedWidth + gapX;

        const targetStartOffset = currentIndex * itemWithGap + trackPaddingLeft;
        const centerOffset = viewportWidth / 2 - singleItemRenderedWidth / 2;

        newTranslateX = centerOffset - targetStartOffset;

        const lastItemIndex = testimonials.length - 1;
        const lastItemStartOffset = lastItemIndex * itemWithGap + trackPaddingLeft;
        const maxTranslateX = centerOffset - lastItemStartOffset;

        const minTranslateX = centerOffset - trackPaddingLeft;

        if (newTranslateX > minTranslateX) newTranslateX = minTranslateX;
        if (newTranslateX < maxTranslateX) newTranslateX = maxTranslateX;
      } else {
        const desktopGapX = 24; // gap-x-6 => 24px
        const itemWithGap = singleItemRenderedWidth + desktopGapX;

        const maxStartIndex = Math.max(0, testimonials.length - itemsToShow);
        const clampedIndex = Math.min(currentIndex, maxStartIndex);

        newTranslateX = -clampedIndex * itemWithGap;
      }

      carouselTrackRef.current.style.transform = `translateX(${newTranslateX}px)`;
      carouselTrackRef.current.style.transition = "transform 0.5s ease-in-out";
      setPrevTranslate(newTranslateX);
    }
  }, [currentIndex, getItemsToShow, testimonials.length]);

  useEffect(() => {
    updateCarouselPosition();
    window.addEventListener("resize", updateCarouselPosition);
    return () => window.removeEventListener("resize", updateCarouselPosition);
  }, [updateCarouselPosition]);

  // Navegação
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const itemsToShow = getItemsToShow();

      if (itemsToShow === 1) {
        const nextIndex = prevIndex + 1;
        return nextIndex >= testimonials.length ? 0 : nextIndex;
      }

      const maxStart = Math.max(0, testimonials.length - itemsToShow);
      const next = prevIndex + 1;
      return next > maxStart ? 0 : next;
    });
  }, [testimonials.length, getItemsToShow]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const itemsToShow = getItemsToShow();

      if (itemsToShow === 1) {
        const nextIndex = prevIndex - 1;
        return nextIndex < 0 ? testimonials.length - 1 : nextIndex;
      }

      const maxStart = Math.max(0, testimonials.length - itemsToShow);
      const next = prevIndex - 1;
      return next < 0 ? maxStart : next;
    });
  }, [testimonials.length, getItemsToShow]);

  // Drag/Swipe
  const startDrag = useCallback((clientX: number) => {
    setStartX(clientX);
    setIsDragging(true);

    if (carouselTrackRef.current) {
      carouselTrackRef.current.style.transition = "none";
      const transformValue = carouselTrackRef.current.style.transform;
      const currentTranslateX = transformValue
        ? parseFloat(transformValue.replace("translateX(", "").replace("px)", ""))
        : 0;
      setPrevTranslate(currentTranslateX);
    }
  }, []);

  const moveDrag = useCallback(
    (clientX: number) => {
      if (!isDragging) return;
      const dragAmount = clientX - startX;
      setCurrentTranslate(dragAmount);

      if (carouselTrackRef.current) {
        carouselTrackRef.current.style.transform = `translateX(${prevTranslate + dragAmount}px)`;
      }
    },
    [isDragging, startX, prevTranslate]
  );

  const endDrag = useCallback(() => {
    setIsDragging(false);

    const movedBy = currentTranslate;
    const threshold = 70;

    if (movedBy < -threshold) {
      handleNext();
    } else if (movedBy > threshold) {
      handlePrev();
    } else {
      updateCarouselPosition();
    }

    setCurrentTranslate(0);

    if (carouselTrackRef.current) {
      carouselTrackRef.current.style.transition = "transform 0.5s ease-in-out";
    }
  }, [currentTranslate, handleNext, handlePrev, updateCarouselPosition]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => startDrag(e.touches[0].clientX),
    [startDrag]
  );
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => moveDrag(e.touches[0].clientX),
    [moveDrag]
  );
  const handleTouchEnd = useCallback(endDrag, [endDrag]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => startDrag(e.clientX),
    [startDrag]
  );
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => moveDrag(e.clientX),
    [moveDrag]
  );
  const handleMouseUp = useCallback(endDrag, [endDrag]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) endDrag();
  }, [isDragging, endDrag]);

  if (!testimonials || testimonials.length === 0) return null;

  const itemsToShow = getItemsToShow();
  const pageCount = getPageCount(itemsToShow);

  const visibleStartIndex = (() => {
    if (itemsToShow === 1) return currentIndex;
    const maxStart = Math.max(0, testimonials.length - itemsToShow);
    return Math.min(currentIndex, maxStart);
  })();

  const centerIndex = visibleStartIndex + Math.floor(itemsToShow / 2);

  let currentGroupIndex = itemsToShow === 1 ? currentIndex : Math.floor(visibleStartIndex / itemsToShow);
  if (currentGroupIndex >= pageCount) currentGroupIndex = 0;

  const leftButtonStyle: React.CSSProperties = {
    top: "50%",
    transform: "translateY(-50%)",
    left: itemsToShow === 1 ? "0.5rem" : "-3rem",
  };
  const rightButtonStyle: React.CSSProperties = {
    top: "50%",
    transform: "translateY(-50%)",
    right: itemsToShow === 1 ? "0.5rem" : "-3rem",
  };

  return (
    <>
      <span id="depoimentos" className="my-16"></span>

      <section className="relative overflow-hidden px-6 py-16 md:px-10 md:py-24">
        {/* IMAGEM DE FUNDO */}
        <div className="absolute inset-0">
          <img
            src="/images/depoimentos.jpg"
            alt="Fundo seção de depoimentos"
            className="h-full w-full object-cover object-center"
          />
          {/* Overlay escuro + gradiente (mais premium) */}
          <div className="absolute inset-0 bg-[#070a0f]/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/75 to-[#070a0f]/50" />
        </div>

        {/* CONTEÚDO */}
        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
              <span className="text-[#fec655]">Depoimentos</span>
            </h2>

            <div className="flex items-center justify-center mt-6">
              <span className="h-0.5 w-10 md:w-12 bg-[#fec655] mr-4"></span>
              <p className="text-white font-medium text-lg md:text-2xl tracking-wide">
                O que nossos clientes dizem
              </p>
              <span className="h-0.5 w-10 md:w-12 bg-[#fec655] ml-4"></span>
            </div>
          </div>

          {/* Viewport */}
          <div ref={carouselViewportRef} className="relative overflow-hidden">
            <div className="relative flex items-center">
              {/* Botão Prev (dourado) */}
              <button
                onClick={handlePrev}
                disabled={itemsToShow === 1 && currentIndex === 0}
                className="
                  absolute z-10 p-2 rounded-full
                  border border-white/10 bg-white/10 backdrop-blur
                  text-white shadow-lg
                  transition-all duration-200
                  hover:bg-white/15 hover:scale-105
                  disabled:opacity-40 disabled:cursor-not-allowed
                "
                aria-label="Depoimento anterior"
                style={leftButtonStyle}
              >
                <MdOutlineArrowBackIos size={24} />
              </button>

              <div
                ref={carouselTrackRef}
                className="flex gap-x-2 md:gap-x-6 w-full px-2 md:px-0 transition-transform duration-500 ease-in-out items-stretch"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `translateX(${prevTranslate + currentTranslate}px)`,
                  cursor: isDragging ? "grabbing" : "grab",
                }}
              >
                {testimonials.map((t: Testimonial, index: number) => {
                  const isCenter = index === centerIndex;

                  return (
                    <article
                      key={t.id}
                      ref={index === 0 ? itemRef : null}
                      aria-label={`Depoimento de ${t.name}`}
                      className={`
                        flex-shrink-0 rounded-3xl relative flex flex-col items-center
                        transition-all duration-500 ease-in-out
                        ${itemsToShow === 1 ? "w-full p-6" : "md:w-[calc((100%-2*1.5rem)/3)] p-8"}
                        ${isCenter ? "md:scale-100 md:z-10" : "md:scale-95 md:opacity-90"}
                        border border-white/10 bg-white/90 shadow-2xl
                      `}
                    >
                      {/* AVATAR */}
                      {t.avatarUrl && (
                        <div
                          className={`w-20 h-20 rounded-full overflow-hidden ring-2 ring-[#fec655]/40 mb-4 ${
                            isCenter ? "md:w-24 md:h-24" : ""
                          }`}
                        >
                          <img
                            src={t.avatarUrl}
                            alt={`Foto de ${t.name}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="text-gray-800 text-5xl leading-none font-serif">“</div>

                      <p className="text-gray-700 text-base italic leading-relaxed text-center mb-6 whitespace-pre-wrap">
                        {t.content}
                      </p>

                      <div className="text-gray-800 text-5xl leading-none font-serif rotate-180">“</div>

                      <div className="mt-2 text-center">
                        <span className="block text-gray-900 text-lg font-bold">{t.name}</span>
                        {t.type && <span className="block text-gray-500 text-sm">{t.type}</span>}
                      </div>

                      {/* glow suave no card central */}
                      <div
                        className={`pointer-events-none absolute inset-0 rounded-3xl ${
                          isCenter ? "ring-1 ring-[#fec655]/25" : ""
                        }`}
                      />
                    </article>
                  );
                })}
              </div>

              {/* Botão Next (dourado) */}
              <button
                onClick={handleNext}
                disabled={itemsToShow === 1 && currentIndex === testimonials.length - 1}
                className="
                  absolute z-10 p-2 rounded-full
                  border border-white/10 bg-white/10 backdrop-blur
                  text-white shadow-lg
                  transition-all duration-200
                  hover:bg-white/15 hover:scale-105
                  disabled:opacity-40 disabled:cursor-not-allowed
                "
                aria-label="Próximo depoimento"
                style={rightButtonStyle}
              >
                <MdOutlineArrowForwardIos size={24} />
              </button>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.length > itemsToShow &&
              Array.from({ length: pageCount }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(itemsToShow === 1 ? index : index * itemsToShow)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors duration-300
                    ${index === currentGroupIndex ? "bg-[#fec655]" : "bg-white/30 hover:bg-white/50"}
                  `}
                  aria-label={`Ir para a página de depoimentos ${index + 1}`}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}