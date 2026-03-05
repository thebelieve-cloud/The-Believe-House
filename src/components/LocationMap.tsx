"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

export default function LocationMap() {
    return (
        <section id="location" className="py-24 md:py-32 bg-white">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col"
                    >
                        <div className="inline-flex items-center text-primary font-semibold tracking-wider text-sm md:text-base uppercase mb-4">
                            <MapPin className="w-5 h-5 mr-2" />
                            ทำเลแห่งศักยภาพ
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            ใจกลางสามพราน 13<br />
                            <span className="text-primary/80">เชื่อมต่อทุกการเดินทาง</span>
                        </h2>
                        <div className="w-20 h-1 bg-primary mb-8 rounded-full"></div>

                        <p className="text-gray-600 text-lg leading-relaxed font-light mb-8">
                            The Believe ตั้งอยู่บนทำเลศักยภาพสามพราน 13 เดินทางสะดวกสบาย เชื่อมต่อถนนเส้นหลัก
                            แวดล้อมด้วยสิ่งอำนวยความสะดวกครบครัน ทั้งโรงพยาบาล โรงเรียน และศูนย์การค้า ตอบโจทย์ชีวิตคนเมืองที่ต้องการความสงบ
                        </p>

                        <div className="mt-4">
                            <a
                                href="https://maps.app.goo.gl/Po88Su7zmDBR1eJV7"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-full font-semibold transition-all hover:bg-primary/90 hover:shadow-lg shadow-md group"
                            >
                                <Navigation className="w-5 h-5 mr-3 group-hover:animate-bounce" />
                                นำทางด้วย Google Maps
                            </a>
                        </div>
                    </motion.div>

                    {/* Map display */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[500px] lg:h-[600px] w-full bg-gray-100 flex items-center justify-center relative border border-gray-100"
                    >
                        {/* Simple embed or visual representation of the map */}
                        <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=13.7314,100.2245&zoom=14&size=800x600&maptype=roadmap&markers=color:red%7C13.7314,100.2245&key=')] bg-cover bg-center opacity-40 mix-blend-multiply" />
                        <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center text-center p-8">
                            <MapPin className="w-16 h-16 text-primary mb-4 animate-bounce" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">The Believe</h3>
                            <p className="text-gray-500 mb-6">ซอยสามพราน 13</p>
                            <a
                                href="https://maps.app.goo.gl/Po88Su7zmDBR1eJV7"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-white transition-colors"
                            >
                                คลิกเพื่อดูแผนที่ใหญ่
                            </a>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
