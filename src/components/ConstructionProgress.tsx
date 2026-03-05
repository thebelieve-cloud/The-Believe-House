"use client";

import { useState, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ConstructionProgress() {
    const images = [
        "/process/528032049_122141138036721148_4119201378528280415_n.jpg",
        "/process/532913179_122142493250721148_3623480982944915123_n.jpg",
        "/process/533411196_122142784406721148_5473174832448602354_n.jpg",
        "/process/557627554_122148584894721148_7245833304356872045_n.jpg",
        "/process/557749309_122149060934721148_4935346295902412515_n.jpg",
        "/process/560373444_122149484282721148_6573677123843256869_n.jpg",
        "/process/588737061_122156499812721148_1051851871213330782_n.jpg",
        "/process/591136727_122156499776721148_9019841750424328209_n.jpg",
        "/process/597965774_122158792238721148_9171176951859597353_n.jpg"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-play effect
    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(timer);
    }, [isPaused, images.length]);

    const getPosition = (index: number) => {
        const len = images.length;
        let distance = (index - currentIndex) % len;

        // Wrap distance for nearest neighbor mapping
        if (distance > len / 2) distance -= len;
        if (distance < -len / 2) distance += len;

        return distance;
    };

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 50;
        if (info.offset.x > threshold) {
            prevSlide(); // Swiped Right
        } else if (info.offset.x < -threshold) {
            nextSlide(); // Swiped Left
        }
    };

    return (
        <section id="progress" className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-12 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-16 md:mb-20"
                >
                    <span className="text-primary font-semibold tracking-wider text-sm md:text-base uppercase mb-2 block">
                        Construction Progress
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">ภาพโครงการระหว่างก่อสร้าง</h2>
                    <div className="w-24 h-1 bg-primary mx-auto mb-10 rounded-full"></div>
                </motion.div>

                {/* 3D Carousel Container */}
                <div
                    className="relative w-full max-w-6xl mx-auto h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center perspective-[1000px]"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                >
                    {images.map((img, index) => {
                        const distance = getPosition(index);
                        const isVisible = Math.abs(distance) <= 3;

                        if (!isVisible) return null;

                        let xPos = "0%";
                        let scale = 1;
                        let zIndex = 10;
                        let opacity = 1;

                        if (distance === 1) {
                            xPos = "55%";
                            scale = 0.85;
                            zIndex = 8;
                            opacity = 0.9;
                        } else if (distance === 2) {
                            xPos = "95%";
                            scale = 0.7;
                            zIndex = 6;
                            opacity = 0.6;
                        } else if (distance === 3) {
                            xPos = "130%";
                            scale = 0.5;
                            zIndex = 4;
                            opacity = 0;
                        } else if (distance === -1) {
                            xPos = "-55%";
                            scale = 0.85;
                            zIndex = 8;
                            opacity = 0.9;
                        } else if (distance === -2) {
                            xPos = "-95%";
                            scale = 0.7;
                            zIndex = 6;
                            opacity = 0.6;
                        } else if (distance === -3) {
                            xPos = "-130%";
                            scale = 0.5;
                            zIndex = 4;
                            opacity = 0;
                        }

                        return (
                            <motion.div
                                key={index}
                                initial={false}
                                animate={{
                                    x: xPos,
                                    scale: scale,
                                    zIndex: zIndex,
                                    opacity: opacity,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 25,
                                    mass: 1
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={handleDragEnd}
                                onClick={() => {
                                    if (distance !== 0) setCurrentIndex(index);
                                }}
                                className={`absolute w-[220px] md:w-[320px] lg:w-[400px] aspect-[4/5] md:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-white border-[6px] md:border-8 border-white cursor-pointer ${distance === 0 ? "pointer-events-auto" : "pointer-events-auto"}`}
                            >
                                <img
                                    src={img}
                                    alt={`Progress ${index + 1}`}
                                    className="w-full h-full object-cover pointer-events-none rounded-2xl"
                                />
                                {/* Dark overlay for background cards */}
                                {distance !== 0 && (
                                    <div className="absolute inset-0 bg-black/30 pointer-events-none transition-opacity duration-300 rounded-2xl" />
                                )}
                            </motion.div>
                        );
                    })}

                    {/* Navigation Buttons for Desktop */}
                    <button
                        className="hidden md:flex absolute left-4 lg:left-12 z-50 bg-white hover:bg-gray-100 text-primary p-4 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.15)] transition-transform transform hover:scale-110"
                        onClick={prevSlide}
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>
                    <button
                        className="hidden md:flex absolute right-4 lg:right-12 z-50 bg-white hover:bg-gray-100 text-primary p-4 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.15)] transition-transform transform hover:scale-110"
                        onClick={nextSlide}
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>
                </div>

                {/* Progress Indicators */}
                <div className="flex justify-center gap-2 mt-8 md:mt-12 relative z-20">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`transition-all duration-300 rounded-full ${idx === currentIndex
                                ? "w-8 h-2 bg-primary"
                                : "w-2 h-2 bg-gray-300 hover:bg-primary/50"
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
