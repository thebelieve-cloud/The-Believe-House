"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "หน้าแรก", href: "/" },
        { name: "แบบบ้าน", href: "/#houses" },
        { name: "แนวคิดโครงการ", href: "/#concept" },
        { name: "ทำเลที่ตั้ง", href: "/#location" },
        { name: "ติดต่อเรา", href: "/#contact" },
        { name: "บทความ", href: "/blog" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                {/* Logo */}
                <a href="/" className="flex-shrink-0 z-50 group">
                    <h2 className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${scrolled ? 'text-primary' : 'text-white group-hover:text-white/80'}`}>
                        THE BELIEVE
                    </h2>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:opacity-70 ${scrolled ? "text-gray-800" : "text-white"
                                }`}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="#register"
                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${scrolled
                            ? "bg-primary text-white hover:bg-primary/90 shadow-md"
                            : "bg-white text-primary hover:bg-white/90"
                            }`}
                    >
                        ลงทะเบียนรับสิทธิพิเศษ
                    </a>
                </nav>

                {/* Mobile menu button */}
                <button
                    className="md:hidden z-50 p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <div className={`w-6 flex flex-col items-end justify-center gap-1.5 transition-all ${scrolled ? 'text-primary' : 'text-white'}`}>
                        <span className={`block h-0.5 w-full bg-current transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block h-0.5 w-4 bg-current transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block h-0.5 w-full bg-current transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </div>
                </button>

                {/* Mobile Nav Overlay */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-0 left-0 w-full h-screen bg-white shadow-xl flex flex-col pt-24 pb-8 px-6 md:hidden items-center text-center max-h-screen overflow-y-auto"
                        >
                            <div className="flex flex-col space-y-8 w-full">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="text-lg font-medium text-gray-800 py-2 border-b border-gray-100"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </a>
                                ))}
                                <a
                                    href="#register"
                                    className="mt-6 px-8 py-4 bg-primary text-white rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    ลงทะเบียนรับสิทธิพิเศษ
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
