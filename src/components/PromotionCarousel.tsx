"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Promotion } from "@/lib/promotions";

// สไลด์โปรโมชัน: เลื่อนด้วยนิ้ว/ลูกศร/จุด, สไลด์กลางเด่นกว่า, เลื่อนเองทุก 5 วินาที (หยุดเมื่อชี้เมาส์หรือแตะ)
export default function PromotionCarousel({ items }: { items: Promotion[] }) {
    const track = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);
    const [overflow, setOverflow] = useState(false);
    const [paused, setPaused] = useState(false);

    const slides = () => Array.from(track.current?.children ?? []) as HTMLElement[];

    const goTo = useCallback((i: number) => {
        const el = track.current;
        const s = slides()[i];
        if (!el || !s) return;
        el.scrollTo({ left: s.offsetLeft - (el.clientWidth - s.clientWidth) / 2, behavior: "smooth" });
    }, []);

    // หาสไลด์ที่อยู่ตรงกลางจอ
    const onScroll = () => {
        const el = track.current;
        if (!el) return;
        const center = el.scrollLeft + el.clientWidth / 2;
        let best = 0, dist = Infinity;
        slides().forEach((s, i) => {
            const d = Math.abs(s.offsetLeft + s.clientWidth / 2 - center);
            if (d < dist) { dist = d; best = i; }
        });
        setActive(best);
    };

    useEffect(() => {
        const check = () => {
            const el = track.current;
            if (el) setOverflow(el.scrollWidth > el.clientWidth + 4);
        };
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, [items.length]);

    useEffect(() => {
        if (!overflow || paused || items.length < 2) return;
        const t = setInterval(() => goTo((active + 1) % items.length), 5000);
        return () => clearInterval(t);
    }, [overflow, paused, active, items.length, goTo]);

    return (
        <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
        >
            <div
                ref={track}
                onScroll={onScroll}
                className={`flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth py-6 px-[14vw] md:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${overflow ? "" : "md:justify-center"}`}
                aria-roledescription="carousel"
                aria-label="โปรโมชัน"
            >
                {items.map((p, i) => (
                    <Link
                        key={p.slug}
                        href={`/promotion#${p.slug}`}
                        aria-label={p.title}
                        className={`group snap-center shrink-0 w-[72vw] sm:w-[360px] md:w-[400px] transition-all duration-500 ${
                            overflow && i !== active ? "scale-[0.92] opacity-70" : "scale-100 opacity-100"
                        }`}
                    >
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-gray-100 shadow-[0_20px_50px_rgba(0,30,57,0.15)]">
                            <Image
                                src={p.image}
                                alt={p.imageAlt}
                                fill
                                sizes="(max-width: 640px) 72vw, 400px"
                                className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                                priority={i === 0}
                            />
                        </div>
                        <p className="mt-4 text-center font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                            {p.title}
                        </p>
                    </Link>
                ))}
            </div>

            {overflow && items.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={() => goTo((active - 1 + items.length) % items.length)}
                        aria-label="โปรโมชันก่อนหน้า"
                        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-white shadow-lg text-primary hover:scale-110 transition-transform"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        type="button"
                        onClick={() => goTo((active + 1) % items.length)}
                        aria-label="โปรโมชันถัดไป"
                        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-white shadow-lg text-primary hover:scale-110 transition-transform"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="flex justify-center gap-2 mt-2">
                        {items.map((p, i) => (
                            <button
                                key={p.slug}
                                type="button"
                                onClick={() => goTo(i)}
                                aria-label={`ไปที่โปรโมชัน ${i + 1}`}
                                aria-current={i === active}
                                className={`h-2 rounded-full transition-all ${i === active ? "w-8 bg-primary" : "w-2 bg-gray-300"}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
