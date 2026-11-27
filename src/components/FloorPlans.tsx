"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Maximize, Ruler, Map as MapIcon, Bed, Bath, Car, Sparkles, X, Expand, Calculator } from "lucide-react";
import { housePlans, PLAN_NOTE } from "@/lib/plans";
import { houses } from "@/lib/houses";

// ส่วน "แบบแปลนบ้าน" บนหน้าแรก: เลือกแบบบ้าน → ดูภาพบ้าน/แปลนชั้น 1/ชั้น 2 + สเปก, กดขยายดูเต็มจอได้
export default function FloorPlans() {
    const [houseIdx, setHouseIdx] = useState(0);
    const [viewIdx, setViewIdx] = useState(0);
    const [zoom, setZoom] = useState(false);
    const plan = housePlans[houseIdx];
    const view = plan.views[viewIdx];
    const price = houses.find((h) => h.slug === plan.slug)?.startingPrice;

    useEffect(() => {
        if (!zoom) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoom(false);
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [zoom]);

    const specs = [
        { icon: Ruler, label: "พื้นที่ใช้สอย", value: plan.area },
        { icon: MapIcon, label: "ขนาดที่ดิน", value: plan.land },
        { icon: Bed, label: "ห้องนอน", value: `${plan.beds} ห้อง` },
        { icon: Bath, label: "ห้องน้ำ", value: `${plan.baths} ห้อง` },
        { icon: Car, label: "ที่จอดรถ", value: `${plan.cars} คัน` },
        { icon: Sparkles, label: "จุดเด่น", value: plan.extra },
    ];

    return (
        <section id="plans" aria-labelledby="plans-heading" className="py-24 md:py-32 bg-[#f7f3ee]">
            <div className="container mx-auto px-4 md:px-12 max-w-7xl">
                <div className="text-center mb-10 md:mb-14">
                    <span className="text-primary font-semibold tracking-wider text-sm md:text-base uppercase mb-2 block">Floor Plans</span>
                    <h2 id="plans-heading" className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">แบบแปลนบ้าน</h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                </div>

                {/* เลือกแบบบ้าน */}
                <div role="tablist" aria-label="เลือกแบบบ้าน" className="mx-auto mb-8 grid max-w-xl grid-cols-2 gap-3">
                    {housePlans.map((p, i) => {
                        const on = i === houseIdx;
                        return (
                            <button
                                key={p.slug}
                                type="button"
                                role="tab"
                                aria-selected={on}
                                onClick={() => { setHouseIdx(i); setViewIdx(0); }}
                                className={`rounded-2xl border px-4 py-3 md:py-4 text-center transition-all ${
                                    on ? "bg-primary border-primary text-white shadow-lg" : "bg-white border-gray-200 text-gray-900 hover:border-primary/40"
                                }`}
                            >
                                <span className="block text-xl md:text-2xl font-bold tracking-wide">{p.name}</span>
                                <span className={`block text-xs md:text-sm ${on ? "text-white/75" : "text-gray-500"}`}>{p.type}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-6 items-start">
                    {/* ภาพ/แปลน */}
                    <div className="rounded-3xl bg-white p-3 md:p-4 shadow-[0_20px_50px_rgba(0,30,57,0.08)]">
                        <button
                            type="button"
                            onClick={() => setZoom(true)}
                            aria-label={`ขยายดู ${view.label} ${plan.name}`}
                            className="group relative block w-full aspect-[16/10] overflow-hidden rounded-2xl bg-[#f3f1ec]"
                        >
                            <Image
                                key={view.src}
                                src={view.src}
                                alt={view.alt}
                                fill
                                sizes="(max-width: 1024px) 100vw, 800px"
                                className={view.key === "facade" ? "object-contain" : "object-contain p-2 md:p-4"}
                            />
                            <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-800 shadow-sm group-hover:bg-white">
                                <Expand className="w-3.5 h-3.5" aria-hidden="true" /> ขยายดู
                            </span>
                        </button>

                        {/* เลือกมุมมอง */}
                        <div className="mt-3 grid grid-cols-3 gap-2 md:gap-3">
                            {plan.views.map((v, i) => {
                                const on = i === viewIdx;
                                return (
                                    <button
                                        key={v.key}
                                        type="button"
                                        onClick={() => setViewIdx(i)}
                                        aria-pressed={on}
                                        className={`overflow-hidden rounded-xl border-2 text-left transition-all ${on ? "border-primary" : "border-transparent hover:border-gray-200"}`}
                                    >
                                        <span className="relative block aspect-[16/10] bg-[#f3f1ec]">
                                            <Image src={v.src} alt="" fill sizes="200px" className={v.key === "facade" ? "object-cover" : "object-contain p-1"} />
                                        </span>
                                        <span className={`block px-2 py-1.5 text-center text-xs md:text-sm font-semibold ${on ? "bg-primary text-white" : "bg-gray-50 text-gray-700"}`}>
                                            {v.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* สเปก */}
                    <div className="rounded-3xl bg-primary text-white p-6 md:p-8 shadow-[0_20px_50px_rgba(0,30,57,0.18)]">
                        <p className="text-amber-300 text-sm font-semibold tracking-wider">{plan.nameTh}</p>
                        <h3 className="text-3xl font-bold">{plan.name}</h3>
                        <p className="text-white/70 text-sm mt-1">{plan.type}</p>
                        <p className="text-white/85 text-sm italic mt-4">&ldquo;{plan.tagline}&rdquo;</p>
                        <ul className="mt-6 space-y-3.5">
                            {specs.map(({ icon: Icon, label, value }) => (
                                <li key={label} className="flex items-center gap-3">
                                    <span className="w-10 h-10 shrink-0 rounded-xl bg-white/10 flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-amber-300" aria-hidden="true" />
                                    </span>
                                    <span>
                                        <span className="block text-xs text-white/60">{label}</span>
                                        <span className="block font-semibold">{value}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                        {price && (
                            <p className="mt-6 text-sm text-white/70">
                                ราคาเริ่มต้น <span className="text-2xl font-bold text-white">{(price / 1e6).toFixed(2)} ล้านบาท</span>
                            </p>
                        )}
                        <div className="mt-5 grid gap-2.5">
                            <Link
                                href={`/houses/${plan.slug}`}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-primary hover:bg-gray-100 transition-colors"
                            >
                                <Maximize className="w-4 h-4" aria-hidden="true" /> ดูรายละเอียดและภาพบ้าน {plan.name}
                            </Link>
                            {price && (
                                <Link
                                    href={`/loan-calculator?price=${price}`}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-4 py-3 font-medium text-white hover:bg-white/10 transition-colors"
                                >
                                    <Calculator className="w-4 h-4" aria-hidden="true" /> คำนวณค่าผ่อน {plan.name}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                <p className="mt-5 text-center text-xs text-gray-500">*{PLAN_NOTE}</p>
            </div>

            {/* ดูเต็มจอ */}
            {zoom && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${view.label} ${plan.name}`}
                    className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-3 md:p-10"
                    onClick={() => setZoom(false)}
                >
                    <button
                        type="button"
                        onClick={() => setZoom(false)}
                        aria-label="ปิด"
                        className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/15 text-white flex items-center justify-center hover:bg-white/25"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={view.src}
                        alt={view.alt}
                        className="max-h-full max-w-full object-contain rounded-lg bg-white"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <p className="absolute bottom-4 left-0 right-0 text-center text-white/80 text-sm">
                        {plan.name} · {view.label}
                    </p>
                </div>
            )}
        </section>
    );
}
