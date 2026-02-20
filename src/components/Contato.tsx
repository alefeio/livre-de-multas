import ContactForm from "./ContactForm";

interface BannerItem {
    id: string;
    url: string;
    title?: string;
}

const STATIC_SLIDES: BannerItem[] = [
    {
        id: "static-contato",
        url: "/images/bg-contato1.jpg",
        title: "Fale Conosco",
    },
];

export default function Contato() {
    const slide = STATIC_SLIDES[0];

    return (
        <div className="relative w-full bg-blue-950" id="inicio">

            {/* Background */}
            <div className="absolute inset-0 z-10">
                <img
                    src={slide.url}
                    alt={slide.title || "Banner Contato"}
                    className="w-full h-full object-cover object-center"
                />
                {/* Overlay para contraste */}
                <div className="absolute inset-0 bg-blue-950/60" />
            </div>

            {/* Título */}
            <div className="relative z-10 flex flex-col items-center px-6 py-16 md:px-10 md:py-24">
                {/* Formulário */}
                <div className="w-full px-6">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
