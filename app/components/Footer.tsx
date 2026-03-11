"use client";

import React from "react";
import Image from "next/image";
import { siteContent } from "@/app/data/mockData";
import Link from "next/link";
import { ArrowRight, Youtube, Twitter, Linkedin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {
    return (
        <footer className="bg-background pt-20 md:pt-32 pb-8 md:pb-12 relative overflow-hidden border-t border-white/5">
            {/* Background Motifs */}
            <div className="absolute inset-0 bg-dot-grid opacity-[0.03] pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
            <div className="animate-scan" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-16 md:mb-32">
                    <div className="lg:col-span-6">
                        <div className="relative mb-12 md:mb-20 inline-block group">
                            <div className="absolute -inset-4 bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="relative w-40 h-10 md:w-48 md:h-12 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 flex items-center gap-4 md:gap-6">
                                <Image
                                    src="/logo.png"
                                    alt="AutoKnerd"
                                    fill
                                    className="object-contain"
                                    onError={(e: any) => e.target.style.display = 'none'}
                                />
                                <span className="text-2xl md:text-3xl font-black tracking-tighter text-white uppercase italic group-hover:text-primary transition-colors">AutoKnerd</span>
                            </div>
                        </div>

                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 md:mb-8 font-outfit leading-tight tracking-tighter shadow-glow-green">
                            {siteContent.footer.ctaHeadline}
                        </h2>

                        <p className="text-xl md:text-2xl text-slate/60 mb-10 md:mb-16 max-w-2xl leading-relaxed font-light font-outfit tracking-tight border-l border-primary/20 pl-6 md:pl-8">
                            {siteContent.footer.supportText}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 md:gap-10 group/btns">
                            <button className="bg-primary hover:bg-white text-black px-10 md:px-16 py-5 md:py-7 rounded-full font-extrabold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-[11px] flex items-center justify-center gap-4 md:gap-5 transition-all duration-700 shadow-2xl active:scale-95 group/main">
                                {siteContent.footer.primaryBtn}
                                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover/main:translate-x-3 transition-transform" />
                            </button>
                            <Link href="/methodology" className="flex items-center justify-center text-white/40 hover:text-white px-8 md:px-10 py-5 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] transition-all border border-white/5 hover:border-primary/40 rounded-full group/sec active:scale-95">
                                {siteContent.footer.secondaryBtn}
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-1" />

                    <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-16">
                        <div className="space-y-8 md:space-y-12">
                            <h4 className="text-[10px] md:text-[11px] font-bold text-primary uppercase tracking-[0.5em] md:tracking-[0.8em] font-mono opacity-60">Ecosystem</h4>
                            <ul className="space-y-6 md:space-y-8">
                                {["Methodology", "Systems", "Process", "Impact", "Insights"].map((item) => (
                                    <li key={item}>
                                        <Link href={item === "Methodology" ? "/methodology" : `/#${item.toLowerCase()}`} className="text-sm text-slate/40 hover:text-white transition-colors duration-500 flex items-center gap-3 md:gap-4 group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary group-hover:shadow-[0_0_10px_rgba(124,255,27,1)] transition-all" />
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-8 md:space-y-12">
                            <h4 className="text-[10px] md:text-[11px] font-bold text-primary uppercase tracking-[0.5em] md:tracking-[0.8em] font-mono opacity-60">Company</h4>
                            <ul className="space-y-6 md:space-y-8">
                                {["Meet the Architect", "Case Studies", "Contact", "Terms", "Privacy"].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-sm text-slate/40 hover:text-white transition-colors duration-500 flex items-center gap-3 md:gap-4 group uppercase tracking-widest text-[9px] md:text-[10px] font-bold">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-8 md:space-y-12 col-span-2 sm:col-span-1">
                            <h4 className="text-[10px] md:text-[11px] font-bold text-primary uppercase tracking-[0.5em] md:tracking-[0.8em] font-mono opacity-60">Connect</h4>
                            <div className="flex flex-row sm:flex-col gap-8">
                                {[
                                    { icon: Youtube, label: "YouTube" },
                                    { icon: Twitter, label: "Twitter" },
                                    { icon: Linkedin, label: "LinkedIn" }
                                ].map((social) => (
                                    <a key={social.label} href="#" className="text-sm text-slate/40 hover:text-white transition-colors duration-500 flex items-center gap-4 md:gap-6 group">
                                        <social.icon className="w-5 h-5 text-primary opacity-20 group-hover:opacity-100 transition-opacity" />
                                        <span className="uppercase tracking-widest text-[9px] md:text-[10px] font-bold hidden sm:inline">{social.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-12 md:pt-16 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10 text-center md:text-left">
                    <div className="flex flex-col gap-4 items-center md:items-start">
                        <div className="flex items-center gap-6 md:gap-8 text-[9px] md:text-[10px] text-slate/30 font-mono tracking-widest uppercase">
                            <span>SYS_STATUS: 200_OK</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-glow-green" />
                            <span>LOC_NODE: STABILIZED</span>
                        </div>
                        <p className="text-[9px] md:text-[10px] text-slate/20 uppercase tracking-[0.3em] md:tracking-[0.5em] font-bold">
                            © {new Date().getFullYear()} AutoKnerd Collective. All Systems Operational.
                        </p>
                    </div>

                    <div className="flex items-center gap-8 md:gap-12 group/architect text-[10px] md:text-[11px] font-mono tracking-[0.2em] text-slate/30 cursor-default uppercase">
                        <span className="group-hover/architect:text-primary transition-colors duration-700">Architected by Andrew Sardone</span>
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-[1.5rem] md:rounded-[2rem] glass-green flex items-center justify-center opacity-40 group-hover:opacity-100 transition-all duration-1000 shadow-[inset_0_0_20px_rgba(124,255,27,0.2)]">
                            <span className="text-primary font-bold text-[9px] md:text-[10px]">AS_NODE</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    );
};
