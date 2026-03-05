"use client";

import { motion } from "framer-motion";
import { Bed, Bath, Car, Maximize } from "lucide-react";

export default function HouseTypes() {
    const houses = [
        {
            name: "Venita",
            type: "บ้านแฝด",
            area: "140 ตร.ม.",
            beds: 3,
            baths: 3,
            cars: 2,
            description: "บ้านแฝดดีไซน์โปร่งสไตล์โมเดิร์น พร้อมพื้นที่ใช้สอยกว้างขวาง ตอบโจทย์ครอบครัวขยาย",
            img: "/asset/venita.jpg"
        },
        {
            name: "Vera",
            type: "บ้านทาวน์แฝด",
            area: "100 ตร.ม.",
            beds: 3,
            baths: 2,
            cars: 2,
            description: "ทาวน์แฝดฟังก์ชันครบครัน รูปแบบใหม่ที่ให้ความรู้สึกว่าความคุ้มค่านั้นมีอยู่จริง",
            img: "/asset/vera.jpg"
        }
    ];

    return (
        <section id="houses" className="py-24 md:py-32 bg-gray-50 relative">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-16 md:mb-24"
                >
                    <span className="text-primary font-semibold tracking-wider text-sm md:text-base uppercase mb-2 block">
                        House Types
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">แบบบ้านที่ตอบโจทย์คุณ</h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
                    {houses.map((house, index) => (
                        <motion.div
                            key={house.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] group hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500"
                        >
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                                <img
                                    src={house.img}
                                    alt={`แบบบ้าน ${house.name} - ${house.type}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    onError={(e) => {
                                        e.currentTarget.src = "/api/placeholder/800/600";
                                    }}
                                />
                                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold text-primary shadow-sm">
                                    {house.type}
                                </div>
                            </div>

                            <div className="p-8 md:p-10 text-center">
                                <h3 className="text-3xl font-bold text-gray-900 mb-3">{house.name}</h3>
                                <p className="text-gray-500 mb-8 font-light line-clamp-2">{house.description}</p>

                                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 pt-6 border-t border-gray-100">
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center mb-2">
                                            <Maximize className="w-5 h-5 text-primary" strokeWidth={1.5} />
                                        </div>
                                        <span className="text-sm text-gray-500">พื้นที่ใช้สอย</span>
                                        <span className="font-semibold text-gray-900">{house.area}</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center mb-2">
                                            <Bed className="w-5 h-5 text-primary" strokeWidth={1.5} />
                                        </div>
                                        <span className="text-sm text-gray-500">ห้องนอน</span>
                                        <span className="font-semibold text-gray-900">{house.beds} ห้อง</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center mb-2">
                                            <Bath className="w-5 h-5 text-primary" strokeWidth={1.5} />
                                        </div>
                                        <span className="text-sm text-gray-500">ห้องน้ำ</span>
                                        <span className="font-semibold text-gray-900">{house.baths} ห้อง</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center mb-2">
                                            <Car className="w-5 h-5 text-primary" strokeWidth={1.5} />
                                        </div>
                                        <span className="text-sm text-gray-500">ที่จอดรถ</span>
                                        <span className="font-semibold text-gray-900">{house.cars} คัน</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
