"use client";

import { motion } from "framer-motion";
import { Trees, ShieldCheck, Cctv, Dumbbell } from "lucide-react";

export default function Facilities() {
    const facilities = [
        {
            icon: <ShieldCheck className="w-8 h-8" strokeWidth={1.5} />,
            title: "ระบบรักษาความปลอดภัย",
            desc: "อุ่นใจด้วยเจ้าหน้าที่รักษาความปลอดภัยดูแลตลอด 24 ชั่วโมง"
        },
        {
            icon: <Cctv className="w-8 h-8" strokeWidth={1.5} />,
            title: "CCTV รอบโครงการ",
            desc: "กล้องวงจรปิดครอบคลุมทุกจุดสำคัญภายในโครงการ"
        }
    ];

    return (
        <section id="facilities" className="py-24 md:py-32 bg-primary relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-16 md:mb-20"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Facilities</h2>
                    <div className="w-24 h-1 bg-white/40 mx-auto rounded-full mb-8"></div>
                    <p className="text-white/80 max-w-2xl mx-auto text-lg font-light">
                        สิ่งอำนวยความสะดวกครบครัน เพื่อยกระดับคุณภาพชีวิตของคุณในทุกๆ วัน
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {facilities.map((fac, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-white/10 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 group"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                                {fac.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{fac.title}</h3>
                            <p className="text-white/70 font-light text-sm leading-relaxed">{fac.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
