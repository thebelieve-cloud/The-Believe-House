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
                        className="h-32 md:h-48 lg:h-56 object-contain shadow-2xl rounded-md"
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
                        href="#contact"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-full font-semibold transition-all hover:bg-gray-100 hover:scale-105 shadow-lg group"
                    >
                        ติดต่อเรา
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
