"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function HouseGallery({ images, name }: { images: string[]; name: string }) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const close = useCallback(() => setLightboxIndex(null), []);
    const next = useCallback(
        () => setLightboxIndex((i) => (i === null ? i : (i + 1) % images.length)),
        [images.length]
    );
    const prev = useCallback(
        () => setLightboxIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
        [images.length]
    );

    // Keyboard navigation + lock body scroll while the lightbox is open
    useEffect(() => {
        if (lightboxIndex === null) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };

        window.addEventListener("keydown", onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [lightboxIndex, close, next, prev]);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {images.map((src, index) => (
                    <motion.button
                        key={src}
                        type="button"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                        onClick={() => setLightboxIndex(index)}
                        className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] group hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] transition-all duration-500 cursor-zoom-in"
                        aria-label={`ดูภาพ ${name} ที่ ${index + 1} แบบเต็มจอ`}
                    >
                        <img
                            src={src}
                            alt={`บ้าน ${name} ภาพที่ ${index + 1}`}
                            loading={index < 6 ? "eager" : "lazy"}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                    </motion.button>
                ))}
            </div>

            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
                        onClick={close}
                        role="dialog"
                        aria-modal="true"
                        aria-label={`ภาพบ้าน ${name}`}
                    >
                        <button
                            onClick={close}
                            className="absolute top-5 right-5 md:top-8 md:right-8 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
                            aria-label="ปิด"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); prev(); }}
                            className="absolute left-3 md:left-8 z-10 bg-white/10 hover:bg-white/20 text-white p-3 md:p-4 rounded-full transition-colors"
                            aria-label="ภาพก่อนหน้า"
                        >
                            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); next(); }}
                            className="absolute right-3 md:right-8 z-10 bg-white/10 hover:bg-white/20 text-white p-3 md:p-4 rounded-full transition-colors"
                            aria-label="ภาพถัดไป"
                        >
                            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                        </button>

                        <motion.img
                            key={images[lightboxIndex]}
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.25 }}
                            src={images[lightboxIndex]}
                            alt={`บ้าน ${name} ภาพที่ ${lightboxIndex + 1}`}
                            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />

                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm font-light tracking-wider">
                            {lightboxIndex + 1} / {images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
