import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarClock, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VisitCTA from "@/components/VisitCTA";
import { activePromotions, thaiDate } from "@/lib/promotions";
import { breadcrumbLd, ldJson } from "@/lib/jsonld";

// สร้างหน้าใหม่ทุกชั่วโมง เพื่อซ่อนโปรที่หมดเขตเอง
export const revalidate = 3600;

export function generateMetadata(): Metadata {
    const hasPromo = activePromotions().length > 0;
    return {
        title: "โปรโมชันบ้านสามพราน",
        description:
            "รวมโปรโมชันล่าสุดของ The Believe House สามพราน บ้านแฝด VENITA และทาวน์แฝด VERA ซอยสามพราน 13 พร้อมรายละเอียดและเงื่อนไข",
        alternates: { canonical: "/promotion" },
        openGraph: { title: "โปรโมชันบ้านสามพราน | The Believe House", url: "/promotion" },
        // ช่วงที่ไม่มีโปร หน้านี้แทบไม่มีเนื้อหา จึงบอก Google ไม่ต้องเก็บเข้าผลค้นหา
        ...(hasPromo ? {} : { robots: { index: false, follow: true } }),
    };
}

export default function PromotionPage() {
    const items = activePromotions();

    return (
        <main className="min-h-screen bg-white flex flex-col pt-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={ldJson(breadcrumbLd([
                    { name: "หน้าแรก", path: "/" },
                    { name: "โปรโมชัน", path: "/promotion" },
                ]))}
            />
            <Navbar />

            <section className="flex-grow py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-12 max-w-5xl">
                    <div className="text-center mb-14 mt-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">โปรโมชันบ้านสามพราน</h1>
                        <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
                            ดีลพิเศษสำหรับผู้ที่จองบ้าน The Believe House ซอยสามพราน 13
                            ทั้งบ้านแฝด VENITA และทาวน์แฝด VERA
                        </p>
                    </div>

                    {items.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-3xl">
                            <p className="text-xl text-gray-700 mb-2">ขณะนี้ยังไม่มีโปรโมชันใหม่</p>
                            <p className="text-gray-500">สอบถามข้อเสนอล่าสุดได้ที่ฝ่ายขาย หรือติดตามได้ทาง LINE @thebelieve</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-16">
                            {items.map((p) => (
                                <article
                                    key={p.slug}
                                    id={p.slug}
                                    className="scroll-mt-28 grid md:grid-cols-2 gap-8 md:gap-12 items-start"
                                >
                                    <div className="relative w-full overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,30,57,0.12)] bg-gray-100">
                                        <Image
                                            src={p.image}
                                            alt={p.imageAlt}
                                            width={p.imageWidth}
                                            height={p.imageHeight}
                                            sizes="(max-width: 768px) 100vw, 480px"
                                            className="w-full h-auto"
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-snug">{p.title}</h2>
                                        <p className="text-gray-600 text-lg font-light mb-6">{p.summary}</p>
                                        <ul className="space-y-3 mb-6">
                                            {p.highlights.map((h) => (
                                                <li key={h} className="flex items-start gap-3 text-gray-800">
                                                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 shrink-0" aria-hidden="true" />
                                                    <span>{h}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-700 font-medium mb-6">
                                            <CalendarClock className="w-5 h-5" aria-hidden="true" />
                                            หมดเขต {thaiDate(p.endsAt)}
                                        </p>
                                        {p.houseType && (
                                            <p className="mb-6">
                                                <Link href={`/houses/${p.houseType}`} className="text-primary font-medium underline underline-offset-4 hover:text-amber-700">
                                                    ดูแบบบ้าน {p.houseType === "vera" ? "VERA ทาวน์แฝด" : "VENITA บ้านแฝด"}
                                                </Link>
                                            </p>
                                        )}
                                        <div className="text-sm text-gray-500 border-t border-gray-100 pt-4">
                                            <p className="font-medium text-gray-600 mb-1">เงื่อนไข</p>
                                            <ul className="list-disc pl-5 space-y-1">
                                                {p.conditions.map((c) => <li key={c}>{c}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    <VisitCTA />
                </div>
            </section>

            <Footer />
        </main>
    );
}
