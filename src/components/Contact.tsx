"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, Facebook } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-16"
                >
                    <span className="text-primary font-semibold tracking-wider text-sm md:text-base uppercase mb-2 block">
                        Contact Us
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">ติดต่อเรา</h2>
                    <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
                    <p className="text-gray-600 text-lg leading-relaxed font-light">
                        สอบถามข้อมูลเพิ่มเติม หรือนัดหมายเยี่ยมชมโครงการ
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {/* LINE */}
                    <motion.a
                        href="https://lin.ee/RW9gYI5"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                    >
                        <div className="w-16 h-16 rounded-full bg-[#00B900]/10 flex items-center justify-center mb-6 group-hover:bg-[#00B900] transition-colors duration-300">
                            <MessageCircle className="w-8 h-8 text-[#00B900] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">LINE Official</h3>
                        <p className="text-gray-500 mb-4">@thebelieve</p>
                        <span className="text-sm font-medium text-[#00B900]">แอดไลน์เลย</span>
                    </motion.a>

                    {/* Phone */}
                    <motion.a
                        href="tel:0944462645"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                    >
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                            <Phone className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">โทรศัพท์</h3>
                        <p className="text-gray-500 mb-4">094 446 2645</p>
                        <span className="text-sm font-medium text-primary">โทรออก</span>
                    </motion.a>

                    {/* Facebook */}
                    <motion.a
                        href="https://www.facebook.com/thebelievehouse"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                    >
                        <div className="w-16 h-16 rounded-full bg-[#1877F2]/10 flex items-center justify-center mb-6 group-hover:bg-[#1877F2] transition-colors duration-300">
                            <Facebook className="w-8 h-8 text-[#1877F2] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Facebook Page</h3>
                        <p className="text-gray-500 mb-4">The Believe House</p>
                        <span className="text-sm font-medium text-[#1877F2]">ไปที่เพจ</span>
                    </motion.a>
                </div>
            </div>
        </section>
    );
}
