import ServicesSection from './ServicesSection';

interface BannerItem {
  id: string;
  url: string;
  title?: string;
}

const STATIC_SLIDES: BannerItem[] = [
  {
    id: 'static-areas-1',
    url: '/images/bg-sobre1.jpg',
    title: 'Áreas de Atuação',
  },
];

export default function HeroSliderAreas() {
  const slide = STATIC_SLIDES[0];

  return (
    <section className="relative w-full min-h-screen bg-black" id="inicio">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={slide.url}
          alt={slide.title || 'Banner Áreas de Atuação'}
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay para garantir contraste */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center pt-40 md:pt-48">
        
        {/* Título */}
        {slide.title && (
          <h1 className="text-center font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#fec655] drop-shadow-lg mb-16 leading-tight">
            {slide.title}
          </h1>
        )}

        {/* Seção de Serviços */}
        <ServicesSection />
      </div>
    </section>
  );
}
