"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

export default function RegistrationForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.currentTarget;
        const formData = new FormData(form);

        // เปลี่ยนจาก /viewform เป็น /formResponse สำหรับการส่งข้อมูล
        const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeaNg249zRku_nGar0va7pkXK3JKHV6lY2O9dy23lhVawH9-Q/formResponse";

        try {
            await fetch(GOOGLE_FORM_ACTION_URL, {
                method: "POST",
                mode: "no-cors", // จำเป็นสำหรับ Google Forms
                body: formData,
            });

            // ข้อมูลส่งสำเร็จ
            setIsSuccess(true);
            form.reset();
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง");
        } finally {
            setIsSubmitting(false);
        }
    };

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

                    {isSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-green-50 border border-green-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center max-w-2xl mx-auto"
                        >
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle2 className="w-10 h-10 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">ลงทะเบียนสำเร็จ!</h3>
                            <p className="text-gray-600 text-lg font-light mb-8">
                                ขอบคุณที่ให้ความสนใจโครงการ The Believe House เจ้าหน้าที่จะติดต่อกลับไปหาคุณโดยเร็วที่สุด
                            </p>
                            <button
                                onClick={() => setIsSuccess(false)}
                                className="px-8 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                            >
                                ลงทะเบียนอีกครั้ง
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl mx-auto">
                            <div className="relative">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 ml-1">ชื่อ-นามสกุล / Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="entry.2005620554"
                                    placeholder="กรุณากรอกชื่อ-นามสกุล"
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all text-gray-900 outline-none"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="relative">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 ml-1">เบอร์โทรศัพท์ / Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="entry.1045781291"
                                    placeholder="กรุณากรอกเบอร์โทรศัพท์"
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all text-gray-900 outline-none"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <p className="text-xs text-center text-gray-400 font-light mt-2 mb-4">
                                *ข้อมูลของท่านจะถูกเก็บเป็นความลับและใช้เพื่อการติดต่อโครงการ The Believe เท่านั้น
                            </p>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full group inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-xl text-lg font-semibold transition-all ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-primary/90 hover:shadow-xl hover:-translate-y-1"
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                                        กำลังส่งข้อมูล...
                                    </>
                                ) : (
                                    <>
                                        ลงทะเบียนเลย
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
