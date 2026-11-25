"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, MessageCircle, CalendarCheck } from "lucide-react";

// แถบติดต่อลอยกลางล่างจอ สำหรับจอกว้าง (md ขึ้นไป) โผล่หลังเลื่อนลงมาเล็กน้อย
// มือถือใช้ MobileContactBar แทน  /  การกดทุกปุ่มถูกนับใน GA ผ่าน AnalyticsEvents
function MessengerIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
            <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.14.26.35.27.57l.05 1.78a.8.8 0 0 0 1.12.71l1.98-.87a.8.8 0 0 1 .53-.04c.91.25 1.88.38 2.91.38 5.64 0 10-4.13 10-9.7S17.64 2 12 2Zm6 7.46-2.94 4.66a1.5 1.5 0 0 1-2.17.4l-2.34-1.75a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.18-.69-.63l2.94-4.66a1.5 1.5 0 0 1 2.17-.4l2.34 1.75a.6.6 0 0 0 .72 0l3.16-2.4c.42-.32.97.18.69.63Z" />
        </svg>
    );
}

export default function DesktopContactDock() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const onScroll = () => setShow(window.scrollY > 300);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const circle =
        "w-11 h-11 rounded-full flex items-center justify-center text-white shadow-sm transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

    return (
        <>
            {/* เว้นที่ท้ายหน้าให้แถบไม่บัง footer ตอนเลื่อนลงสุด */}
            <div aria-hidden="true" className="hidden md:block h-24" />
            <nav
                aria-label="ติดต่อสอบถามโครงการ"
                className={`hidden md:flex fixed bottom-6 left-1/2 z-40 -translate-x-1/2 items-center gap-2 rounded-full bg-white/95 backdrop-blur-md p-2 pl-3 shadow-[0_12px_40px_rgba(0,30,57,0.18)] ring-1 ring-black/5 transition-all duration-300 ${
                    show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
                }`}
            >
                <a
                    href="https://m.me/thebelievehouse"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="แชทผ่าน Messenger"
                    title="Messenger"
                    className={`${circle} bg-gradient-to-br from-[#00B2FF] to-[#006AFF]`}
                >
                    <MessengerIcon className="w-6 h-6" />
                </a>
                <a
                    href="https://lin.ee/RW9gYI5"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="แอดไลน์ @thebelieve"
                    title="LINE @thebelieve"
                    className={`${circle} bg-[#06C755]`}
                >
                    <MessageCircle className="w-6 h-6" />
                </a>
                <a
                    href="tel:0909492492"
                    aria-label="โทร 090-949-2492"
                    title="โทร 090-949-2492"
                    className={`${circle} bg-primary`}
                >
                    <Phone className="w-5 h-5" />
                </a>
                <span className="hidden lg:block px-3 text-sm text-gray-700 font-medium whitespace-nowrap">
                    สอบถามโครงการ 090-949-2492
                </span>
                <Link
                    href="/#register"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 h-11 text-white font-semibold whitespace-nowrap hover:bg-primary/90 transition-colors"
                >
                    <CalendarCheck className="w-5 h-5" aria-hidden="true" />
                    นัดชมบ้านตัวอย่าง
                </Link>
            </nav>
        </>
    );
}
