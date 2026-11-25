import Link from "next/link";
import { Phone, MessageCircle, CalendarCheck } from "lucide-react";

// กล่องชวนนัดชมโครงการ วางท้ายบทความ (หลังเนื้อหา ก่อน "บทความที่เกี่ยวข้อง")
export default function VisitCTA() {
    return (
        <aside
            aria-label="นัดชมโครงการ The Believe House"
            className="mt-16 rounded-3xl bg-primary text-white p-8 md:p-12 shadow-[0_20px_50px_rgba(0,30,57,0.2)]"
        >
            <p className="text-2xl md:text-3xl font-bold mb-3">อยากเห็นบ้านจริงก่อนตัดสินใจ?</p>
            <p className="text-white/80 font-light text-base md:text-lg mb-8 leading-relaxed">
                นัดชมบ้านตัวอย่าง VERA ทาวน์แฝด และ VENITA บ้านแฝด ที่ The Believe House ซอยสามพราน 13
                ถามรายละเอียดแปลง ค่าส่วนกลาง และการยื่นกู้กับเจ้าหน้าที่ได้โดยตรง
            </p>
            <div className="flex flex-col lg:flex-row lg:flex-wrap gap-3">
                <Link
                    href="/#register"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap px-6 py-4 lg:flex-1 rounded-xl bg-white text-primary font-semibold hover:bg-gray-100 transition-colors"
                >
                    <CalendarCheck className="w-5 h-5" aria-hidden="true" />
                    ลงทะเบียนนัดชมโครงการ
                </Link>
                <a
                    href="tel:0909492492"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap px-6 py-4 lg:flex-1 rounded-xl border border-white/40 text-white font-medium hover:bg-white/10 transition-colors"
                >
                    <Phone className="w-5 h-5" aria-hidden="true" />
                    โทร 090-949-2492
                </a>
                <a
                    href="https://lin.ee/RW9gYI5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap px-6 py-4 lg:flex-1 rounded-xl bg-[#00B900] text-white font-medium hover:bg-[#00a000] transition-colors"
                >
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                    แอดไลน์ @thebelieve
                </a>
            </div>
        </aside>
    );
}
