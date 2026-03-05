"use client";

import { motion } from "framer-motion";

export default function Concept() {
    return (
        <section id="concept" className="py-24 md:py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-20"
                >
                    <span className="text-primary font-semibold tracking-wider text-sm md:text-base uppercase mb-2 block">
                        Our Concept
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">คุณภาพที่เหนือกว่า ในทุกรายละเอียด</h2>
                    <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed font-light">
                        เราเชื่อว่า "บ้าน" คือจุดเริ่มต้นของความสุขที่ยั่งยืน โครงการ The Believe จึงคัดสรรวัสดุระดับพรีเมียม
                        และพิถีพิถันในการก่อสร้างทุกขั้นตอน เพื่อส่งมอบชีวิตที่สมบูรณ์แบบให้กับคุณและครอบครัว
                    </p>
                </motion.div>

                {/* Alternating Grid - Block 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="order-2 md:order-1"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">มั่นคงทนทานด้วย "อิฐแดง"</h3>
                        <p className="text-gray-600 text-lg leading-relaxed font-light mb-6">
                            ความลับของความแข็งแรงที่แท้จริง คือการเลือกใช้อิฐแดงในการก่อสร้างทั้งหลัง ไม่เพียงแต่ให้โครงสร้างที่แข็งแรงทนทานต่อกาลเวลา
                            แต่ยังช่วยระบายความร้อนได้ดีเยี่ยม ทำให้บ้านเย็นสบายในทุกฤดูกาล
                        </p>
                        <ul className="space-y-4">
                            {['โครงสร้างแข็งแรง อายุการใช้งานยาวนาน', 'ทนไฟ และทนต่อสภาพอากาศได้ดี', 'ลดเสียงรบกวนจากภายนอก', 'ง่ายต่อการต่อเติมในอนาคต'].map((item, idx) => (
                                <li key={idx} className="flex items-center text-gray-700">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="order-1 md:order-2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-gray-200" />
                        <img
                            src="/asset/S__71909384.jpg"
                            alt="Quality Red Brick Construction"
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = "/api/placeholder/800/600";
                            }}
                        />
                    </motion.div>
                </div>

                {/* Alternating Grid - Block 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-gray-200" />
                        <img
                            src="/asset/S__71909386.jpg"
                            alt="Premium Living Space"
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = "/api/placeholder/800/600";
                            }}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">ดีไซน์เพื่อการใช้ชีวิต (Design for Living)</h3>
                        <p className="text-gray-600 text-lg leading-relaxed font-light">
                            การออกแบบที่เน้นฟังก์ชันการใช้งานจริง ผสมผสานความสวยงามแบบ Modern Luxury
                            ให้ความรู้สึกโปร่ง โล่ง สบายตา พร้อมเปิดรับแสงธรรมชาติ เพื่อให้ทุกวันของคุณคือการพักผ่อนอย่างแท้จริง
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
