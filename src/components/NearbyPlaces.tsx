"use client";

import { useState } from "react";
import { Car, ShoppingBag, Hospital, GraduationCap, Clock } from "lucide-react";
import { nearby, formatDistance, MAX_KM, NEARBY_CHECKED_AT } from "@/lib/nearby";

const ICONS = { transport: Car, lifestyle: ShoppingBag, hospital: Hospital, education: GraduationCap };

// สถานที่ใกล้โครงการ: แท็บ 4 หมวด (แต่ละแท็บโชว์ที่ใกล้สุด) + รายการพร้อมแถบระยะทาง 0–20 กม.
// ทุกหมวดอยู่ใน HTML เสมอ (ซ่อนด้วย hidden) ให้ Google อ่านได้ครบ
export default function NearbyPlaces() {
    const [active, setActive] = useState(nearby[0].key);

    return (
        <div className="mt-16 rounded-[2rem] bg-[#f7f3ee] p-5 md:p-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-8">
                <div>
                    <p className="text-amber-700 font-semibold text-sm tracking-wider uppercase">Nearby</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">ใช้ชีวิตสะดวก ในระยะไม่เกิน {MAX_KM} กม.</h3>
                </div>
                <p className="text-gray-500 text-sm">เลือกหมวดเพื่อดูสถานที่ทั้งหมด</p>
            </div>

            {/* แท็บหมวด: แสดงสถานที่ที่ใกล้ที่สุดของแต่ละหมวด */}
            <div role="tablist" aria-label="หมวดสถานที่ใกล้โครงการ" className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {nearby.map((cat) => {
                    const Icon = ICONS[cat.key];
                    const first = cat.places[0];
                    const on = cat.key === active;
                    return (
                        <button
                            key={cat.key}
                            id={`tab-${cat.key}`}
                            type="button"
                            role="tab"
                            aria-selected={on}
                            aria-controls={`panel-${cat.key}`}
                            onClick={() => setActive(cat.key)}
                            className={`text-left rounded-2xl p-4 md:p-5 border transition-all ${
                                on
                                    ? "bg-primary border-primary text-white shadow-lg"
                                    : "bg-white border-gray-200 text-gray-900 hover:border-primary/40 hover:shadow-md"
                            }`}
                        >
                            <span className="flex flex-col items-start gap-2 md:flex-row md:items-center">
                                <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${on ? "bg-white/15" : "bg-primary/5"}`}>
                                    <Icon className={`w-5 h-5 ${on ? "text-amber-300" : "text-primary"}`} aria-hidden="true" />
                                </span>
                                <span className="font-semibold text-sm md:text-base whitespace-nowrap">{cat.title}</span>
                            </span>
                            <span className={`block mt-4 text-xs ${on ? "text-white/70" : "text-gray-500"}`}>ใกล้สุด</span>
                            <span className={`block text-2xl md:text-3xl font-bold ${on ? "text-amber-300" : "text-primary"}`}>
                                {formatDistance(first.km)}
                            </span>
                            <span className={`block text-xs md:text-sm mt-1 line-clamp-1 ${on ? "text-white/85" : "text-gray-600"}`}>
                                {first.name}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* รายการของแต่ละหมวด */}
            {nearby.map((cat) => (
                <div
                    key={cat.key}
                    id={`panel-${cat.key}`}
                    role="tabpanel"
                    aria-labelledby={`tab-${cat.key}`}
                    hidden={cat.key !== active}
                    className="mt-6 rounded-2xl bg-white p-4 md:p-6 shadow-sm"
                >
                    <h4 className="sr-only">{cat.title}</h4>
                    <ul className="divide-y divide-gray-100">
                        {cat.places.map((p) => (
                            <li key={p.name} className="py-3.5 grid grid-cols-[1fr_auto] md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2">
                                <span className="font-medium text-gray-900 text-sm md:text-base min-w-0">{p.name}</span>
                                {/* แถบระยะทาง เทียบสเกล 0–20 กม. */}
                                <span className="col-span-2 md:col-span-1 order-last md:order-none h-2 rounded-full bg-gray-100 overflow-hidden" aria-hidden="true">
                                    <span
                                        className="block h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600"
                                        style={{ width: `${Math.max(4, Math.min(100, (p.km / MAX_KM) * 100))}%` }}
                                    />
                                </span>
                                <span className="text-right whitespace-nowrap">
                                    <span className="font-bold text-primary">{formatDistance(p.km)}</span>
                                    {p.min !== undefined && (
                                        <span className="ml-2 inline-flex items-center gap-1 text-xs text-gray-500">
                                            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                                            ~{p.min} นาที
                                        </span>
                                    )}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            <p className="mt-4 text-xs text-gray-400">
                *ระยะทางและเวลาขับรถโดยประมาณจาก Google Maps วัดจากโครงการ (ตรวจสอบเมื่อ {NEARBY_CHECKED_AT}) เวลาจริงขึ้นกับเส้นทางและการจราจร
            </p>
        </div>
    );
}
