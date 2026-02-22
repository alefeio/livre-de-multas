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
        <Artigos />
    );
}
