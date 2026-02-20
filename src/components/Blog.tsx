import Artigos from "./Artigos";

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
        id: "static-blog",
        url: "/images/bg-blog.jpg",
        title: "Blog",
    },
];

export default function Blog() {
    const slide = STATIC_SLIDES[0];

    return (
        <section
            id="inicio"
            className="relative w-full bg-blue-950 overflow-hidden"
        >
            {/* Background opcional (se quiser manter imagem futuramente) */}
            {/* 
      <div className="absolute inset-0 z-0">
        <img
          src={slide.url}
          alt={slide.title}
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      */}

            {/* Conteúdo */}
            <div className="relative z-10 flex flex-col items-center px-6 py-16 md:px-10 md:py-24">
                <div className="max-w-7xl mx-auto px-6 md:px-8 w-full text-center">
                    <h1 className="mb-12 text-3xl font-extrabold leading-tight text-white md:text-5xl">
                        <span className="text-[#fec655]">Blog</span>
                    </h1>

                    {/* Conteúdo do Blog */}
                    <Artigos />
                </div>
            </div>
        </section>
    );
}
