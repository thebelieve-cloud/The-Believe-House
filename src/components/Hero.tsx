"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 400]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);

    return (
        <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-white">
            {/* Background Image with Parallax & Fading to White */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0 bg-primary"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat mix-blend-screen opacity-50"
                    style={{
                        backgroundImage: "url('/asset/Head the believe.png')"
                    }}
                />
                {/* Fading from Primary (top) to White (bottom) */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/60 to-white" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto flex flex-col items-center mt-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="mb-8"
                >
                    <img
                        src="/asset/the believe logo.jpg"
                        alt="The Believe Logo"
                        className="h-24 md:h-32 object-contain shadow-2xl rounded-sm"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="inline-block mb-4 px-4 py-1.5 border border-white/30 rounded-full backdrop-blur-sm"
                >
                    <span className="text-white/90 text-sm tracking-widest uppercase font-medium">สัมผัสประสบการณ์การอยู่อาศัยระดับพรีเมียม</span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="mb-8 relative group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-600 opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500 rounded-full"></div>
                    <div className="relative bg-gradient-to-r from-amber-700/20 via-yellow-500/20 to-amber-700/20 border border-amber-300/40 backdrop-blur-md px-6 py-2.5 rounded-full inline-flex items-center shadow-[0_0_20px_rgba(251,191,36,0.15)]">
                        <span className="relative flex h-3 w-3 mr-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                        </span>
                        <span className="text-yellow-100 font-semibold tracking-wider text-sm md:text-base">
                            GRAND OPENING <span className="text-yellow-400 font-bold ml-1">1 พฤษภาคม 2569</span>
                        </span>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-md"
                >
                    The Believe House
                    <br />
                    <span className="font-light">ความเชื่อที่คุณสัมผัสได้</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                    className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light drop-shadow-sm"
                >
                    โครงการหมู่บ้านสามพรานที่รังสรรค์ด้วยความใส่ใจทุกรายละเอียด พิถีพิถันด้วยวัสดุอิฐแดงคุณภาพ เพื่อความสุขที่ยั่งยืนของครอบครัว
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <a
                        href="#register"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-full font-semibold transition-all hover:bg-gray-100 hover:scale-105 shadow-lg group"
                    >
                        ลงทะเบียนรับสิทธิพิเศษ
                    </a>
                </motion.div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
            >
                <span className="text-gray-500 text-xs tracking-widest mb-2 uppercase font-medium">เลื่อนลง</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                    <ChevronDown className="text-primary w-6 h-6" />
                </motion.div>
            </motion.div>
        </section>
    );
}
