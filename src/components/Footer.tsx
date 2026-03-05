"use client";

import { Facebook, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-primary text-white pt-16 pb-8 border-t border-white/10">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand & Concept */}
                    <div className="lg:col-span-2">
                        <a href="/">
                            <h2 className="text-2xl font-bold tracking-tight mb-4 hover:opacity-80 transition-opacity">THE BELIEVE</h2>
                        </a>
                        <p className="text-white/70 max-w-md font-light leading-relaxed mb-6">
                            ความเชื่อที่คุณสัมผัสได้ โครงการบ้านแฝด และทาวน์แฝดคุณภาพ ทำเลสามพราน 13 มุ่งเน้นความมั่นคงแข็งแรงด้วยวัสดุระดับพรีเมียม
                        </p>
                        <div className="flex items-center space-x-4">
                            <a
                                href="https://www.facebook.com/thebelievehouse"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-colors text-white"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">เกี่ยวกับโครงการ</h3>
                        <ul className="space-y-4">
                            {['Concept', 'House Types', 'Facilities', 'Location', 'Register'].map((item) => (
                                <li key={item}>
                                    <a href={`/#${item.toLowerCase().replace(' ', '')}`} className="text-white/70 hover:text-white transition-colors text-sm">
                                        {item}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a href="/blog" className="text-white/70 hover:text-white transition-colors text-sm">
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">ติดต่อสอบถาม</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start text-white/70 text-sm">
                                <MapPin className="w-5 h-5 mr-3 mt-0.5 text-white/50 shrink-0" />
                                <span>ทำเลสามพราน 13<br />ตำบลสามพราน อำเภอสามพราน<br />จังหวัดนครปฐม</span>
                            </li>
                            <li className="flex items-center text-white/70 text-sm group">
                                <Phone className="w-5 h-5 mr-3 text-white/50 group-hover:text-white transition-colors" />
                                <a href="tel:0944462645" className="hover:text-white transition-colors font-medium text-base">
                                    094 446 2645
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/50 font-light">
                    <p>&copy; {new Date().getFullYear()} The Believe House. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</a>
                        <a href="#" className="hover:text-white transition-colors">ข้อกำหนดและเงื่อนไข</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
