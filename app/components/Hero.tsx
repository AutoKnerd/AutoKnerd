"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteContent } from "@/app/data/mockData";
import Link from "next/link";
import { ChevronRight, Cpu, Layers, Radio, Shield, Zap } from "lucide-react";

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden bg-background">
            {/* Advanced Premium Background Depth */}
            <div className="absolute inset-0 bg-mesh-gradient opacity-50 pointer-events-none" />
            <div className="absolute inset-0 parallax-grid-1 pointer-events-none opacity-80" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent shadow-[0_0_30px_rgba(124,255,27,0.5)] z-10" />

            <div className="absolute inset-x-0 top-0 h-[30vh] md:h-[40vh] bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-[30vh] md:h-[40vh] bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] bg-primary/10 blur-[250px] pointer-events-none -z-10 opacity-30 md:opacity-30" />
            <div className="animate-scan opacity-50" />
            <div className="bg-scanlines absolute inset-0 opacity-20 pointer-events-none z-10" />

            <div className="container mx-auto px-6 md:px-12 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-12 xl:col-span-7 relative z-20"
                    >
                        <div className="inline-flex items-center gap-3 md:gap-4 px-5 py-2.5 md:px-6 md:py-3 rounded-full border border-primary/30 bg-primary/10 text-primary text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] mb-8 md:mb-12 shadow-[0_0_30px_rgba(124,255,27,0.2)] backdrop-blur-xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-primary/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            <Layers className="w-3 h-3 md:w-4 md:h-4 shadow-glow-green" />
                            <span className="shadow-glow-green">Behavioral Experience Systems</span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light leading-[1.1] md:leading-[1.05] mb-8 md:mb-10 tracking-tighter font-outfit text-white">
                            {siteContent.hero.headline.split(",").map((part, i) => (
                                <span key={i} className={part.trim().toLowerCase().includes("inevitable") ? "text-primary block font-medium shadow-glow-green italic" : "block opacity-90"}>
                                    {part}{i === 0 ? "," : ""}
                                </span>
                            ))}
                        </h1>

                        <p className="text-xs md:text-sm text-primary/80 mb-6 md:mb-8 max-w-2xl leading-relaxed font-outfit uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium shadow-glow-green">
                            {siteContent.hero.subheadline}
                        </p>

                        <p className="text-lg md:text-2xl text-slate/70 mb-10 md:mb-16 max-w-2xl leading-relaxed font-light tracking-tight">
                            {siteContent.hero.explanation}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 md:gap-10">
                            <button className="bg-primary text-black px-10 md:px-16 py-5 md:py-7 rounded-full font-extrabold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-[11px] flex items-center justify-center gap-4 md:gap-5 transition-all duration-700 hover:shadow-[0_0_80px_rgba(124,255,27,0.6)] shadow-[0_0_40px_rgba(124,255,27,0.3)] active:scale-95 group/main border border-primary hover:bg-white hover:border-white">
                                {siteContent.hero.primaryBtn}
                                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover/main:translate-x-3 transition-transform duration-700" />
                            </button>
                            <Link href="/methodology" className="text-white/60 hover:text-white px-10 py-5 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] transition-all border-b border-white/10 hover:border-primary hover:shadow-glow-green relative overflow-hidden group/sec flex items-center justify-center">
                                {siteContent.hero.secondaryBtn}
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, rotateY: -10, scale: 0.9 }}
                        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                        transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-12 xl:col-span-5 relative hidden xl:block perspective-1000 z-20"
                    >
                        <div className="relative w-full aspect-[4/5] max-w-[550px] mx-auto xl:ml-auto">
                            <div className="relative luxury-card w-full h-full rounded-[3.5rem] md:rounded-[4.5rem] p-8 md:p-14 overflow-hidden border border-primary/20 flex flex-col gap-8 md:gap-10 shadow-[0_0_100px_rgba(124,255,27,0.05)] group/card animate-float bg-background/40 backdrop-blur-2xl">
                                <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none" />
                                
                                <div className="flex items-center justify-between border-b border-primary/20 pb-8 relative z-10">
                                    <div className="text-[10px] font-bold text-primary uppercase tracking-[0.6em] shadow-glow-green flex items-center gap-3">
                                        <Radio className="w-4 h-4 text-primary" />
                                        {siteContent.hero.telemetryTitle}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[8px] font-mono text-primary/60 uppercase tracking-widest">Live</span>
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-glow-green" />
                                    </div>
                                </div>

                                <div className="flex-1 space-y-12 relative z-10">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-slate/50">
                                            <span className="uppercase text-primary/60 shadow-glow-green">Trust Framework Execution</span>
                                            <span className="text-primary font-bold shadow-glow-green">98.4%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "98.4%" }}
                                                transition={{ duration: 3, delay: 1, type: "spring", stiffness: 40 }}
                                                className="h-full bg-primary shadow-glow-green relative overflow-hidden"
                                            >
                                                <div className="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 animate-[scan_2s_ease-in-out_infinite]" />
                                            </motion.div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-slate/50">
                                            <span className="uppercase text-primary/60 shadow-glow-green">Performance Stability_Node_V4</span>
                                        </div>
                                        <div className="h-12 flex gap-1.5 items-end">
                                            {[...Array(16)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ height: "10%", opacity: 0.3 }}
                                                    animate={{
                                                        height: `${Math.random() * 90 + 10}%`,
                                                        opacity: Math.random() * 0.7 + 0.3
                                                    }}
                                                    transition={{
                                                        repeat: Infinity,
                                                        duration: Math.random() * 1.5 + 0.5,
                                                        repeatType: "reverse",
                                                        ease: "easeInOut"
                                                    }}
                                                    className="flex-1 bg-gradient-to-t from-primary/20 to-primary rounded-t-sm shadow-[0_0_10px_rgba(124,255,27,0.2)] group-hover/card:shadow-[0_0_15px_rgba(124,255,27,0.4)]"
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="relative h-40 bg-black/60 rounded-[2.5rem] border border-primary/20 overflow-hidden flex items-center justify-center shadow-[inset_0_0_30px_rgba(124,255,27,0.05)]">
                                        <div className="absolute inset-0 bg-blueprint opacity-10" />
                                        <div className="absolute inset-0 bg-scanlines opacity-20" />
                                        <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] text-primary opacity-60 filter drop-shadow-[0_0_8px_rgba(124,255,27,0.8)]" preserveAspectRatio="none">
                                            <path d="M0,80 L20,70 L40,85 L60,40 L80,50 L100,20" fill="none" stroke="currentColor" strokeWidth="0.8" className="animate-slow-pulse" />
                                            <circle cx="20" cy="70" r="1.5" fill="currentColor" className="animate-pulse" />
                                            <circle cx="60" cy="40" r="1.5" fill="currentColor" className="animate-pulse" />
                                        </svg>
                                    </div>
                                    <p className="text-[9px] text-slate/40 font-mono tracking-[0.2em] text-center px-4 uppercase">
                                        {siteContent.hero.telemetryDescription}
                                    </p>
                                </div>

                                <div className="text-[9px] font-bold text-slate/40 uppercase mt-auto flex justify-between items-center tracking-[0.4em] border-t border-primary/20 pt-8 relative z-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-5 h-5 rounded-full border border-primary/40 flex items-center justify-center shadow-glow-green">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                                        </div>
                                        <span className="text-white/60">System Integrity_Lock</span>
                                    </div>
                                    <span className="text-primary font-bold tracking-widest shadow-glow-green">Logic_Active</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
