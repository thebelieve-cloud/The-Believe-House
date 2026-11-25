import { Car, ShoppingBag, Hospital, GraduationCap } from "lucide-react";
import { nearby, formatDistance, NEARBY_CHECKED_AT } from "@/lib/nearby";

const ICONS = { transport: Car, lifestyle: ShoppingBag, hospital: Hospital, education: GraduationCap };

// การ์ดสถานที่ใกล้โครงการ 4 หมวด: หัวการ์ด = สถานที่ใกล้ที่สุด, ด้านล่าง = รายการทั้งหมดพร้อมระยะทาง
export default function NearbyPlaces() {
    return (
        <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">สถานที่สำคัญใกล้โครงการ</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                {nearby.map((cat, i) => {
                    const Icon = ICONS[cat.key];
                    const [first] = cat.places;
                    const dark = i % 2 === 1;
                    return (
                        <section
                            key={cat.key}
                            aria-label={cat.title}
                            className={`relative rounded-[2rem] px-5 pb-7 pt-10 text-white shadow-[0_20px_40px_rgba(0,30,57,0.18)] ${
                                dark ? "bg-primary" : "bg-[#1d4466]"
                            }`}
                        >
                            {/* ไอคอนลอยเหนือการ์ด */}
                            <span className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white ring-4 ring-white shadow-md flex items-center justify-center">
                                <Icon className="w-7 h-7 text-primary" strokeWidth={1.6} aria-hidden="true" />
                            </span>

                            {/* สถานที่ใกล้ที่สุดของหมวด */}
                            <div className="rounded-2xl bg-white/10 px-4 py-5 text-center">
                                <p className="text-2xl font-bold text-amber-300">{formatDistance(first.km)}</p>
                                <p className="text-sm text-white/85 mt-1">{first.name}</p>
                            </div>

                            <h4 className="font-semibold text-lg mt-6 mb-3">{cat.title}</h4>
                            <ul className="space-y-2.5">
                                {cat.places.map((p) => (
                                    <li key={p.name} className="flex items-start justify-between gap-3 text-sm">
                                        <span className="text-white/85">{p.name}</span>
                                        <span className="shrink-0 whitespace-nowrap font-semibold">{formatDistance(p.km)}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    );
                })}
            </div>
            <p className="mt-6 text-center text-xs text-gray-400">
                *ระยะทางขับรถโดยประมาณจาก Google Maps วัดจากโครงการ (ตรวจสอบเมื่อ {NEARBY_CHECKED_AT}) ระยะทางและเวลาจริงอาจต่างตามเส้นทางและการจราจร
            </p>
        </div>
    );
}
