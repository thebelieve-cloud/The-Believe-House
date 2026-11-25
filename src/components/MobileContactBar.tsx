import Link from "next/link";
import { Phone, MessageCircle, CalendarCheck } from "lucide-react";

// แถบติดต่อลอยด้านล่างจอ แสดงเฉพาะมือถือ (ซ่อนบนจอกว้าง md ขึ้นไป)
// การกดโทร/LINE ถูกนับใน Google Analytics อัตโนมัติผ่าน AnalyticsEvents (click_call / click_line)
export default function MobileContactBar() {
    return (
        <>
            {/* เว้นที่ท้ายหน้าให้แถบไม่บังเนื้อหาส่วนล่างสุด (เช่น footer) */}
            <div aria-hidden="true" className="h-[calc(4rem+env(safe-area-inset-bottom))] md:hidden" />
            <nav
                aria-label="ติดต่อโครงการ"
                className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-[env(safe-area-inset-bottom)]"
            >
                <div className="grid grid-cols-3 h-16">
                    <a
                        href="tel:0909492492"
                        className="flex flex-col items-center justify-center gap-0.5 text-primary active:bg-gray-100"
                    >
                        <Phone className="w-5 h-5" aria-hidden="true" />
                        <span className="text-xs font-medium">โทร</span>
                    </a>
                    <a
                        href="https://lin.ee/RW9gYI5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center gap-0.5 text-[#00B900] active:bg-gray-100 border-x border-gray-100"
                    >
                        <MessageCircle className="w-5 h-5" aria-hidden="true" />
                        <span className="text-xs font-medium">LINE</span>
                    </a>
                    <Link
                        href="/#register"
                        className="flex flex-col items-center justify-center gap-0.5 bg-primary text-white active:bg-primary/90"
                    >
                        <CalendarCheck className="w-5 h-5" aria-hidden="true" />
                        <span className="text-xs font-medium">นัดชมบ้าน</span>
                    </Link>
                </div>
            </nav>
        </>
    );
}
