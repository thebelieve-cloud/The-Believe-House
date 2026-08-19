import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Bed, Bath, Car, Maximize } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HouseGallery from "@/components/HouseGallery";
import { houses, getHouse } from "@/lib/houses";

export function generateStaticParams() {
    return houses.map((house) => ({ slug: house.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const house = getHouse(slug);

    if (!house) return {};

    return {
        title: `บ้าน ${house.name} (${house.nameTh}) | The Believe House`,
        description: `${house.description} ${house.type} พื้นที่ใช้สอย ${house.area} ${house.beds} ห้องนอน ${house.baths} ห้องน้ำ ที่จอดรถ ${house.cars} คัน`,
        openGraph: {
            title: `บ้าน ${house.name} | The Believe House`,
            description: house.description,
            images: [house.gallery[0]],
        },
    };
}

export default async function HousePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const house = getHouse(slug);

    if (!house) notFound();

    const specs = [
        { icon: Maximize, label: "พื้นที่ใช้สอย", value: house.area },
        { icon: Bed, label: "ห้องนอน", value: `${house.beds} ห้อง` },
        { icon: Bath, label: "ห้องน้ำ", value: `${house.baths} ห้อง` },
        { icon: Car, label: "ที่จอดรถ", value: `${house.cars} คัน` },
    ];

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col pt-20">
            <Navbar />

            <section className="flex-grow py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-12 max-w-7xl">
                    <Link
                        href="/#houses"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-10 mt-6 font-light"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        กลับไปหน้าแบบบ้าน
                    </Link>

                    <div className="text-center mb-14 md:mb-20">
                        <span className="text-primary font-semibold tracking-wider text-sm md:text-base uppercase mb-2 block">
                            {house.type}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                            {house.name} <span className="text-gray-400 font-light">{house.nameTh}</span>
                        </h1>
                        <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">{house.description}</p>

                        <div className="flex flex-wrap justify-center gap-x-6 sm:gap-x-10 md:gap-x-16 gap-y-6 mt-12 pt-10 border-t border-gray-200 max-w-3xl mx-auto">
                            {specs.map(({ icon: Icon, label, value }) => (
                                <div key={label} className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center mb-3">
                                        <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                                    </div>
                                    <span className="text-sm text-gray-500">{label}</span>
                                    <span className="font-semibold text-gray-900 text-lg">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <HouseGallery images={house.gallery} name={house.name} />

                    <div className="text-center mt-16 md:mt-24 pt-12 border-t border-gray-200">
                        <p className="text-gray-600 text-lg font-light mb-8">
                            สนใจบ้าน {house.name} หรือต้องการเข้าชมโครงการ
                        </p>
                        <Link
                            href="/#contact"
                            className="inline-block bg-primary text-white px-10 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
                        >
                            ติดต่อเรา
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
