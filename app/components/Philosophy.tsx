"use client";

import React from "react";
import { siteContent } from "@/app/data/mockData";
import { Shield, Eye, RefreshCcw, LucideIcon, Globe, Target, Box } from "lucide-react";
import { motion } from "framer-motion";

const iconsMap: Record<string, LucideIcon> = {
    shield: Shield,
    eye: Eye,
    refresh: RefreshCcw,
};

export const Philosophy = () => {
    return (
        <section id="solutions" className="py-20 md:py-32 lg:py-64 bg-background relative border-t border-white/5 bg-dot-grid bg-fixed">
            {/* Structural Geometry */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary/20 via-primary/5 to-transparent pointer-events-none opacity-40 shrink-0 hidden md:block" />
            <div className="absolute top-1/4 -right-1/4 w-[60vw] h-[60vw] bg-primary/5 blur-[200px] pointer-events-none opacity-10 animate-slow-pulse" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="text-left mb-20 md:mb-32 lg:mb-48 max-w-5xl">
                    <div className="flex items-center gap-4 md:gap-6 text-primary mb-8 md:mb-12 group/header cursor-default">
                        <div className="h-px w-12 md:w-20 bg-primary/40 group-hover:w-32 transition-all duration-1000" />
                        <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.5em] md:tracking-[0.8em] font-mono group-hover:text-white transition-colors">Foundational Systems</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light mb-8 md:mb-12 font-outfit leading-[1.1] md:leading-[1.05] tracking-tighter">
                        Engineering for <br /><span className="text-white font-medium">Strategic Stability.</span>
                    </h2>
                    <p className="text-xl md:text-2xl lg:text-3xl text-slate leading-relaxed max-w-3xl font-light opacity-80 group/text cursor-default">
                        We treat dealership trust as a stable, engineered outcome of precise <span className="text-primary/60 group-hover/text:text-primary transition-colors">behavioral systems</span>, not abstract cultural concepts.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-20">
                    {siteContent.philosophy.pillars.map((pillar, i) => {
                        const Icon = iconsMap[pillar.icon];
                        return (
                            <motion.div
                                key={pillar.title}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.5, delay: i * 0.3, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true }}
                                className="group relative h-full"
                            >
                                <div className="relative glass-green p-10 md:p-14 lg:p-20 rounded-[2.5rem] md:rounded-[4rem] lg:rounded-[5rem] border-white/5 hover:bg-white/[0.03] transition-all duration-1000 h-full flex flex-col items-start overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] active:scale-[0.98]">
                                    {/* Internal Grid Motif */}
                                    <div className="absolute inset-0 bg-blueprint opacity-[0.03] pointer-events-none" />
                                    <div className="absolute top-0 right-0 p-8 md:p-12 opacity-5 pointer-events-none group-hover:opacity-20 transition-opacity duration-1000">
                                        <Icon className="w-48 h-48 md:w-64 md:h-64 text-primary" />
                                    </div>

                                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-[1.5rem] md:rounded-[2.5rem] bg-black/40 border border-primary/20 flex items-center justify-center mb-10 md:mb-16 shadow-2xl group-hover:bg-primary group-hover:border-white transition-all duration-700 relative overflow-hidden group/icon-container">
                                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                                        <Icon className="w-8 h-8 md:w-11 md:h-11 text-primary group-hover:text-black transition-colors duration-700 relative z-10 drop-shadow-[0_0_10px_rgba(124,255,27,0.5)]" />
                                    </div>

                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-6 md:mb-10 font-outfit tracking-tight group-hover:translate-x-3 transition-transform duration-1000 group-hover:text-primary leading-tight">{pillar.title}</h3>
                                    <p className="text-lg md:text-[1.35rem] lg:text-2xl text-slate/50 leading-relaxed font-light group-hover:text-slate/90 transition-all duration-1000 flex-1">
                                        {pillar.description}
                                    </p>

                                    <div className="mt-auto pt-12 md:pt-24 flex items-center justify-between w-full opacity-0 group-hover:opacity-100 transition-all duration-1000 translate-y-4 group-hover:translate-y-0">
                                        <div className="flex items-center gap-4 md:gap-6 text-primary">
                                            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] font-mono">System Status: Active</span>
                                            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary animate-pulse" />
                                        </div>
                                        <div className="text-[9px] md:text-[10px] font-mono text-slate/30 uppercase tracking-widest hidden sm:block">Indicator: S-{i + 1}00</div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>

    );
};
