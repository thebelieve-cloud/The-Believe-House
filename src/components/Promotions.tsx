import Link from "next/link";
import { activePromotions } from "@/lib/promotions";
import PromotionCarousel from "@/components/PromotionCarousel";

// ส่วนโปรโมชันบนหน้าแรก (ซ่อนทั้งส่วนเมื่อไม่มีโปรที่ยังไม่หมดเขต)
export default function Promotions() {
    const items = activePromotions();
    if (items.length === 0) return null;

    return (
        <section id="promotion" aria-labelledby="promotion-heading" className="py-20 md:py-28 bg-[#f7f3ee] overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl text-center mb-6">
                <h2 id="promotion-heading" className="text-3xl md:text-4xl font-bold text-primary">
                    <span className="text-amber-600">#</span> โปรโมชันพิเศษ
                </h2>
                <p className="text-gray-500 text-lg font-light mt-3">ดีลพิเศษสำหรับผู้ที่จองบ้าน The Believe House สามพราน</p>
            </div>

            <PromotionCarousel items={items} />

            <div className="text-center mt-8">
                <Link
                    href="/promotion"
                    className="inline-flex items-center px-8 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                >
                    ดูรายละเอียดและเงื่อนไขโปรโมชัน
                </Link>
            </div>
        </section>
    );
}
