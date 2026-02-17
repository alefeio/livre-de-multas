import ServicesSection from './ServicesSection';
import SobreSection from './SobreSection';
import MissionSection from './MissionSection';

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

const STATIC_SLIDES: BannerItem[] = [
    {
        id: 'static-sobre-1',
        url: '/images/bg-areas1.jpg',
        title: 'Sobre Nós',
    },
];

export default function HeroSliderSobre() {
    const slide = STATIC_SLIDES[0];

    return (
        <section className="relative w-full min-h-[70vh]" id="inicio">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src={slide.url}
                    alt={slide.title || 'Banner Sobre'}
                    className="w-full h-full object-cover object-center"
                />
                {/* Overlay escuro para leitura */}
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Conteúdo do Banner */}
            <div className="relative z-10 flex flex-col items-center py-40 md:pt-48">
                <h1 className="text-center font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#fec655] drop-shadow-lg mb-16 leading-tight">
                    Sobre Nós
                </h1>
                {/* Seções abaixo do banner */}
                <div className="relative z-20 px-6 md:px-8">
                    <SobreSection />
                    <MissionSection />
                </div>
            </div>
        </section>
    );
}
