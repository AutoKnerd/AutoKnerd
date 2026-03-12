"use client";

import React from "react";
import { siteContent } from "@/app/data/mockData";
import { CheckCircle2, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export const Impact = () => {
    return (
        <section id="impact" className="py-32 md:py-[140px] bg-background relative overflow-hidden border-t border-white/5">
            <div className="bg-dot-grid absolute inset-0 opacity-5 pointer-events-none" />

            <div className="container mx-auto px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2 }}
                        viewport={{ once: true }}
                        className="lg:col-span-6"
                    >
                        <div className="flex items-center gap-6 text-primary mb-12">
                            <div className="h-px w-20 bg-primary/40" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.8em] font-mono">{siteContent.impact.title}</span>
                        </div>
                        <h2 className="text-5xl lg:text-9xl font-light mb-[48px] tracking-tighter font-outfit leading-tight">
                            Behavioral <span className="text-white font-medium italic">Stabilization.</span>
                        </h2>
                        <p className="text-3xl text-slate/80 leading-relaxed font-light mb-[60px] tracking-tight">
                            {siteContent.impact.description}
                        </p>

                        <div className="space-y-[32px] mb-16">
                            {siteContent.impact.indicators.map((indicator, i) => (
                                <div key={i} className="flex items-center gap-6 group">
                                    <div className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center shrink-0 group-hover:border-primary transition-all duration-700">
                                        <CheckCircle2 className="w-5 h-5 text-primary opacity-40 group-hover:opacity-100 transition-opacity shadow-glow-green" />
                                    </div>
                                    <span className="text-2xl text-white font-medium tracking-tight opacity-60 group-hover:opacity-100 group-hover:translate-x-3 transition-all duration-700">{indicator}</span>
                                </div>
                            ))}
                        </div>

                        <p className="text-xl text-slate/40 italic font-light border-l border-primary/20 pl-8">
                            {siteContent.impact.footerLine}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="lg:col-span-6 relative"
                    >
                        <div className="relative glass p-16 rounded-[4.5rem] border-white/10 shadow-2xl overflow-hidden bg-white/[0.01] group/stat">
                            <div className="bg-blueprint absolute inset-0 opacity-10" />
                            <div className="flex flex-col gap-12 relative z-10 text-center items-center">
                                <div className="w-24 h-24 rounded-[2rem] bg-primary/5 border border-primary/20 flex items-center justify-center shadow-2xl group-hover/stat:bg-primary transition-all duration-1000">
                                    <TrendingUp className="w-10 h-10 text-primary group-hover:text-black transition-colors duration-1000" />
                                </div>
                                <div className="space-y-4">
                                    <div className="text-[11px] uppercase font-bold tracking-[0.6em] text-slate/40 font-mono">Performance Stability</div>
                                    <div className="text-8xl font-light text-white font-outfit tracking-tighter group-hover/stat:text-primary transition-colors duration-1000">98.4<span className="text-2xl ml-3 opacity-40">%</span></div>
                                </div>
                                <div className="text-lg text-slate/40 font-light tracking-wide max-w-sm">
                                    Measured consistency across five core behavioral pillars within 90 days of deployment.
                                </div>
                            </div>
                        </div>

                        {/* Decorative Orbs */}
                        <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 blur-[100px] rounded-full animate-slow-pulse opacity-40" />
                        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary/5 blur-[80px] rounded-full animate-slow-pulse delay-700 opacity-20" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
