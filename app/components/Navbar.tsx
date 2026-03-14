"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteContent } from "@/app/data/mockData";
import { STRATEGY_CALL_URL } from "@/app/lib/booking";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] md:w-[calc(100%-48px)] max-w-7xl z-50 glass px-6 md:px-10 py-4 flex items-center justify-between rounded-full border border-white/5 shadow-2xl backdrop-blur-3xl">
                <div className="flex items-center gap-4">
                    <Link href="/" className="relative h-10 w-28 md:h-12 md:w-40">
                        <Image
                            src="/logo.png"
                            alt="AutoKnerd Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </Link>
                </div>

                <div className="hidden lg:flex items-center gap-12">
                    {siteContent.navigation.links.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-[10px] font-bold text-slate/40 hover:text-primary transition-all uppercase tracking-[0.4em] font-mono group relative"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <a href={STRATEGY_CALL_URL} target="_blank" rel="noreferrer" className="hidden sm:block bg-white/5 border border-white/10 text-white px-6 md:px-8 py-3 text-[9px] font-bold uppercase tracking-[0.4em] rounded-full hover:bg-primary hover:text-black transition-all hover:shadow-[0_0_30px_rgba(124,255,27,0.3)]">
                        {siteContent.navigation.cta}
                    </a>
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:text-primary transition-colors"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-x-4 top-24 z-[60] glass rounded-[2.5rem] p-10 flex flex-col gap-8 border border-white/10 lg:hidden shadow-3xl backdrop-blur-4xl"
                    >
                        {siteContent.navigation.links.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-sm font-bold text-white uppercase tracking-[0.5em] font-mono hover:text-primary transition-colors py-2 border-b border-white/5"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <a href={STRATEGY_CALL_URL} target="_blank" rel="noreferrer" className="bg-primary text-black px-8 py-5 text-[10px] font-bold uppercase tracking-[0.5em] rounded-full mt-4 text-center">
                            {siteContent.navigation.cta}
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
