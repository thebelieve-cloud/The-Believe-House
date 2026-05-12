"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";

export default function CustomerTrust() {
    const customers = [
        { id: 1, src: "/asset/the believe customer1.jpg", alt: "ลูกค้า The Believe House 1" },
        { id: 2, src: "/asset/the believe customer2.jpg", alt: "ลูกค้า The Believe House 2" },
        { id: 3, src: "/asset/the believe customer3.jpg", alt: "ลูกค้า The Believe House 3" },
    ];

    return (
        <section id="customer-trust" className="py-24 md:py-32 bg-gray-50">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center text-primary font-semibold tracking-wider text-sm md:text-base uppercase mb-4">
                        <Heart className="w-5 h-5 mr-2 text-primary" />
                        ความไว้วางใจ
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        ขอขอบคุณลูกค้าที่เชื่อมั่นใน <br className="md:hidden" />
                        <span className="text-primary/80">The Believe House</span>
                    </h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {customers.map((customer, index) => (
                        <motion.div
                            key={customer.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="relative group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
                        >
                            <div className="relative aspect-[4/5] w-full overflow-hidden">
                                <Image
                                    src={customer.src}
                                    alt={customer.alt}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
