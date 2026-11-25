"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink, Car } from "lucide-react";

// พิกัดโครงการจาก Google Maps (หมุด "The Believe House")
const LAT = 13.7410185;
const LNG = 100.2077777;
const PLACE_URL = "https://maps.app.goo.gl/Po88Su7zmDBR1eJV7";
// เปิดแอป/เว็บ Google Maps ให้นำทางจากตำแหน่งปัจจุบันของผู้ใช้มาที่โครงการ
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}&travelmode=driving`;
// แผนที่แบบฝังที่ซูม/ลากดูได้ (ไม่ต้องใช้ API key)
// ใช้ cid ของหมุด "The Believe House" ใน Google Maps เพื่อให้ขึ้นการ์ดชื่อโครงการ ที่อยู่ รีวิว และปุ่มเปิดใน Maps
// (cid มาจาก 0x1a156361f7ef3039 ในลิงก์ maps.app.goo.gl/Po88Su7zmDBR1eJV7)
const PLACE_CID = "1879517691919675449";
const EMBED_URL = `https://maps.google.com/maps?cid=${PLACE_CID}&z=15&hl=th&output=embed`;

// ระยะทาง/เวลาเดินทางโดยรถยนต์ ตามข้อมูลโครงการ (เวลาจริงขึ้นกับการจราจร)
const NEARBY = [
    { place: "ถนนเพชรเกษม", detail: "ประมาณ 500 เมตร" },
    { place: "ตลาดสดเทศบาลเมืองสามพราน", detail: "2.1 กม. ราว 5 นาที" },
    { place: "ถนนบรมราชชนนี", detail: "ราว 6 นาที" },
    { place: "เซ็นทรัล ศาลายา", detail: "ราว 15 นาที" },
];

export default function LocationMap() {
    return (
        <section id="location" className="py-24 md:py-32 bg-white">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 md:mb-12"
                >
                    <div className="inline-flex items-center text-primary font-semibold tracking-wider text-sm md:text-base uppercase mb-3">
                        <MapPin className="w-5 h-5 mr-2" />
                        ทำเลแห่งศักยภาพ
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                        ใจกลางสามพราน 13 <span className="text-primary/80">เชื่อมต่อทุกการเดินทาง</span>
                    </h2>
                    <div className="w-20 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
                    <p className="text-gray-600 text-lg leading-relaxed font-light max-w-3xl mx-auto">
                        The Believe House ซอยสามพราน 13 ตำบลสามพราน อำเภอสามพราน จังหวัดนครปฐม
                        เดินทางสะดวก เชื่อมต่อถนนเพชรเกษมและถนนบรมราชชนนี
                    </p>
                </motion.div>

                {/* แผนที่ Google แบบฝัง ซูม/ลากดูได้ในหน้าเว็บ */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-100 h-[420px] md:h-[520px] lg:h-[600px]">
                    <iframe
                        title="แผนที่โครงการ The Believe House สามพราน"
                        src={EMBED_URL}
                        className="absolute inset-0 w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                    />
                    <a
                        href={DIRECTIONS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-4 right-4 hidden md:inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-white font-semibold shadow-lg hover:bg-primary/90 transition-colors"
                    >
                        <Navigation className="w-5 h-5" aria-hidden="true" />
                        เส้นทางไปโครงการ
                    </a>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                    <a
                        href={PLACE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 px-6 py-3 font-medium text-gray-800 hover:border-primary hover:text-primary transition-colors"
                    >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        เปิดใน Google Maps
                    </a>
                    <a
                        href={DIRECTIONS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90 transition-colors"
                    >
                        <Navigation className="w-4 h-4" aria-hidden="true" />
                        ขอเส้นทางจากตำแหน่งของฉัน
                    </a>
                </div>

                {/* จุดสำคัญใกล้โครงการ */}
                <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {NEARBY.map((n) => (
                        <li key={n.place} className="flex items-start gap-3 rounded-2xl bg-gray-50 p-5">
                            <span className="w-10 h-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                                <Car className="w-5 h-5 text-primary" aria-hidden="true" />
                            </span>
                            <span>
                                <span className="block font-semibold text-gray-900">{n.place}</span>
                                <span className="block text-sm text-gray-500">{n.detail}</span>
                            </span>
                        </li>
                    ))}
                </ul>
                <p className="mt-3 text-center text-xs text-gray-400">*เวลาเดินทางโดยรถยนต์โดยประมาณ อาจเปลี่ยนตามสภาพการจราจร</p>
            </div>
        </section>
    );
}
