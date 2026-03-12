"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteContent } from "@/app/data/mockData";
import Link from "next/link";
import { ChevronRight, Layers } from "lucide-react";

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-32 pb-24 md:pt-44 md:pb-[160px] overflow-hidden bg-background">
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-12 xl:col-span-7 relative z-20"
                    >
                        <div className="inline-flex items-center gap-3 md:gap-4 px-5 py-2.5 md:px-6 md:py-3 rounded-full border border-primary/30 bg-primary/10 text-primary text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] mb-8 md:mb-12 shadow-[0_0_30px_rgba(124,255,27,0.2)] backdrop-blur-xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-primary/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            <Layers className="w-3 h-3 md:w-4 md:h-4 shadow-glow-green" />
                            <span className="shadow-glow-green">Dealership Customer Experiance Systems</span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8.5rem] font-light leading-[1.08] md:leading-[1.02] mb-8 md:mb-10 tracking-tighter font-outfit text-white">
                            {siteContent.hero.headline.split("|").map((part, i) => (
                                <span key={i} className={i === 1 ? "text-primary block font-medium shadow-glow-green italic mt-3" : "block opacity-95"}>
                                    {part}
                                </span>
                            ))}
                        </h1>

                        <p className="text-xs md:text-sm text-primary/80 mb-6 md:mb-8 max-w-2xl leading-relaxed font-outfit uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium shadow-glow-green">
                            {siteContent.hero.subheadline}
                        </p>

                        <p className="text-lg md:text-2xl text-slate/70 mb-10 md:mb-16 max-w-3xl leading-relaxed font-light tracking-tight">
                            {siteContent.hero.explanation}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 md:gap-10">
                            <button className="bg-primary hover:bg-white text-black px-10 md:px-16 py-5 md:py-7 rounded-full font-extrabold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-[11px] flex items-center justify-center gap-4 md:gap-5 transition-all duration-700 shadow-2xl active:scale-95 group/main border border-primary">
                                {siteContent.hero.primaryBtn}
                                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover/main:translate-x-3 transition-transform duration-700" />
                            </button>
                            <Link href="/methodology" className="flex items-center justify-center text-white/40 hover:text-white px-10 md:px-16 py-5 md:py-7 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] transition-all border border-white/10 hover:border-primary/40 rounded-full group/sec active:scale-95">
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
                            <div className="relative w-full h-full rounded-[3.5rem] md:rounded-[4.5rem] p-8 md:p-14 overflow-hidden border-t border-l border-white/40 border-b border-r border-white/10 flex flex-col gap-8 md:gap-10 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.2),inset_0_0_20px_rgba(255,255,255,0.1),0_0_40px_rgba(255,255,255,0.05)] group/card animate-float bg-gradient-to-br from-white/20 via-white/5 to-transparent backdrop-blur-[40px] drop-shadow-2xl hover:shadow-[0_30px_70px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.3),inset_0_0_30px_rgba(255,255,255,0.2),0_0_60px_rgba(255,255,255,0.1)] transition-all duration-700">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none opacity-50 transition-opacity duration-700 group-hover/card:opacity-100" />
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
                                
                                <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none mix-blend-overlay" />
                                
                                {/* Header Block */}
                                <div className="p-6 md:p-8 border-b border-white/10 relative z-10">
                                    <div className="text-[10px] md:text-[11px] font-bold text-primary uppercase tracking-[0.5em] shadow-glow-green">
                                        {siteContent.hero.telemetryTitle}
                                    </div>
                                </div>

                                 <div className="flex-1 p-8 space-y-8 md:space-y-10 relative z-10 flex flex-col justify-center">
                                    {/* Stat 1: Behavior Consistency Index */}
                                    <div className="text-center group/stat transition-all duration-500 rounded-[2rem] border border-white/10 bg-white/[0.02] py-6 md:py-8 px-4 md:px-6">
                                        <div className="text-[10px] md:text-[11px] font-mono tracking-[0.32em] text-slate/40 uppercase mb-3">Behavior Consistency Index</div>
                                        <div className="text-6xl md:text-8xl font-medium text-white font-outfit tracking-tighter transition-all duration-700 group-hover/stat:text-primary">98.4<span className="text-xl md:text-2xl ml-2 opacity-40 font-mono">%</span></div>
                                    </div>

                                    {/* Stat 2: Manager Coaching Cadence */}
                                    <div className="text-center group/stat transition-all duration-500 rounded-[2rem] border border-white/10 bg-white/[0.02] py-6 md:py-8 px-4 md:px-6">
                                        <div className="text-[10px] md:text-[11px] font-mono tracking-[0.32em] text-slate/40 uppercase mb-3">Manager Coaching Cadence</div>
                                        <div className="text-5xl md:text-7xl font-medium text-white font-outfit tracking-tighter transition-all duration-700 group-hover/stat:text-primary">95<span className="text-xl md:text-2xl ml-2 opacity-40 font-mono">%</span></div>
                                    </div>

                                    {/* Stat 3: Process Adherence Score */}
                                    <div className="text-center group/stat transition-all duration-500 rounded-[2rem] border border-white/10 bg-white/[0.02] py-6 md:py-8 px-4 md:px-6">
                                        <div className="text-[10px] md:text-[11px] font-mono tracking-[0.32em] text-slate/40 uppercase mb-3">Process Adherence Score</div>
                                        <div className="text-5xl md:text-7xl font-medium text-white font-outfit tracking-tighter transition-all duration-700 group-hover/stat:text-primary">92<span className="text-xl md:text-2xl ml-2 opacity-40 font-mono">%</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
