"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function RegistrationForm() {
    return (
        <section id="register" className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
            {/* Abstract Background pattern */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform origin-top-right"></div>

            <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,30,57,0.08)] p-8 md:p-14 border border-gray-100/50"
                >
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">รับข้อเสนอสุดพิเศษสำหรับคุณ</h2>
                        <p className="text-gray-500 text-lg font-light">
                            ลงทะเบียนเพื่อรับสิทธิพิเศษก่อนใคร และนัดหมายเข้าชมโครงการ
                        </p>
                    </div>

                    <form action="https://docs.google.com/forms/d/e/1FAIpQLSeaNg249zRku_nGar0va7pkXK3JKHV6lY2O9dy23lhVawH9-Q/viewform?usp=dialog" method="get" target="_blank" className="flex flex-col gap-6 max-w-2xl mx-auto">

                        <div className="relative">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 ml-1">ชื่อ-นามสกุล / Name</label>
                            <input
                                type="text"
                                id="name"
                                name="entry.2005620554" // This is a placeholder for Google Form input name, actually it will just redirect to the form based on user requirements for "ส่งมาที่ฟอร์มนี้ https..."
                                placeholder="กรุณากรอกชื่อ-นามสกุล"
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all text-gray-900"
                                required
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 ml-1">เบอร์โทรศัพท์ / Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="entry.1045781291" // Placeholder
                                placeholder="กรุณากรอกเบอร์โทรศัพท์"
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all text-gray-900"
                                required
                            />
                        </div>

                        <p className="text-xs text-center text-gray-400 font-light mt-2 mb-4">
                            *ข้อมูลของท่านจะถูกเก็บเป็นความลับและใช้เพื่อการติดต่อโครงการ The Believe เท่านั้น
                        </p>

                        {/* Note: In a real app we might intercept the submit, but the user requested: "และให้ส่งมาที่ฟอร์มนี้ 'https://..." So the button can just submit standard to a new tab or act as a link */}
                        <button
                            type="submit"
                            className="w-full group inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-xl text-lg font-semibold transition-all hover:bg-primary/90 hover:shadow-xl hover:-translate-y-1"
                        >
                            ลงทะเบียนเลย
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
