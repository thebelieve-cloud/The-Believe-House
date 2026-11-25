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
                <div className="grid grid-cols-4 h-16">
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
                    <a
                        href="https://m.me/thebelievehouse"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center gap-0.5 text-[#0084FF] active:bg-gray-100 border-r border-gray-100"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
                            <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.14.26.35.27.57l.05 1.78a.8.8 0 0 0 1.12.71l1.98-.87a.8.8 0 0 1 .53-.04c.91.25 1.88.38 2.91.38 5.64 0 10-4.13 10-9.7S17.64 2 12 2Zm6 7.46-2.94 4.66a1.5 1.5 0 0 1-2.17.4l-2.34-1.75a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.18-.69-.63l2.94-4.66a1.5 1.5 0 0 1 2.17-.4l2.34 1.75a.6.6 0 0 0 .72 0l3.16-2.4c.42-.32.97.18.69.63Z" />
                        </svg>
                        <span className="text-xs font-medium">Messenger</span>
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
