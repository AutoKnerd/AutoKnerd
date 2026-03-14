"use client";

import React from "react";
import { siteContent } from "@/app/data/mockData";
import { STRATEGY_CALL_URL } from "@/app/lib/booking";
import { Globe, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export const Team = () => {
    return (
        <section id="architect" className="py-32 md:py-[140px] bg-background relative overflow-hidden border-t border-white/5">
            {/* Structural Geometry */}
            <div className="bg-blueprint absolute inset-0 opacity-[0.03] pointer-events-none" />
            <div className="bg-dot-grid absolute inset-0 opacity-[0.05] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vw] h-[110vw] bg-primary/10 blur-[300px] pointer-events-none opacity-20 -z-10 animate-slow-pulse" />

            <div className="container mx-auto px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
                    <div className="lg:col-span-12 mb-32">
                        <div className="flex items-center gap-6 text-primary mb-12 group/header cursor-default">
                            <div className="h-px w-48 bg-primary/20 group-hover:w-64 transition-all duration-1000" />
                            <span className="text-[11px] font-extrabold uppercase tracking-[0.8em] font-mono group-hover:text-white transition-colors">Strategic Leadership Architecture</span>
                            <div className="h-px w-20 bg-primary/20" />
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: -60, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="lg:col-span-6"
                    >
                        <h2 className="text-6xl lg:text-9xl font-light mb-20 leading-[1.05] tracking-tighter font-outfit">
                            Meet the <span className="text-white font-medium italic">Architect.</span>
                        </h2>
                        <div className="p-14 glass-green rounded-[5rem] border-white/10 bg-primary/5 group transition-all duration-1000 hover:shadow-[0_0_120px_rgba(124,255,27,0.1)] active:scale-[0.98] cursor-default mb-24 relative overflow-hidden">
                            <div className="absolute inset-0 bg-blueprint opacity-[0.05] pointer-events-none" />
                            <div className="flex items-center gap-14 relative z-10">
                                <div className="w-32 h-32 rounded-full bg-grid overflow-hidden border border-white/20 flex items-center justify-center shrink-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-1000 relative">
                                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                    <span className="text-6xl font-light text-primary group-hover:text-white transition-colors duration-1000 tracking-tighter relative z-10 opacity-100 drop-shadow-[0_0_15px_rgba(124,255,27,0.5)]">AS</span>
                                </div>
                                <div className="flex-1 relative z-10">
                                    <h4 className="text-4xl font-medium font-outfit tracking-tighter text-white mb-4 leading-tight">{siteContent.team.founder.name}</h4>
                                    <p className="text-[11px] text-primary font-bold uppercase tracking-[0.5em] font-mono opacity-60 group-hover:opacity-100 transition-all duration-1000">{siteContent.team.founder.title}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 60, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="lg:col-span-6"
                    >
                        <div className="space-y-12">
                            <div className="relative group/text">
                                <div className="absolute -left-12 top-0 h-full w-px bg-gradient-to-b from-primary/40 to-transparent group-hover/text:from-primary transition-all duration-700" />
                                <p className="text-3xl text-slate/80 leading-relaxed font-light font-outfit tracking-tight opacity-80 pl-4 group-hover/text:opacity-100 transition-opacity duration-700 whitespace-pre-wrap">
                                    {siteContent.team.founder.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-12 mt-20 pl-8">
                                <div className="flex items-center gap-6 group/item cursor-default">
                                    <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center group-hover/item:border-primary transition-all duration-700 bg-white/[0.02]">
                                        <Trophy className="w-4 h-4 text-primary opacity-40 group-hover:opacity-100 shadow-glow-green transition-all" />
                                    </div>
                                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] font-mono text-slate/40 group-hover/item:text-white transition-colors">Dealership CX SME</span>
                                </div>
                                <div className="flex items-center gap-6 group/item cursor-default">
                                    <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center group-hover/item:border-primary transition-all duration-700 bg-white/[0.02]">
                                        <Globe className="w-4 h-4 text-primary opacity-40 group-hover:opacity-100 shadow-glow-green transition-all" />
                                    </div>
                                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] font-mono text-slate/40 group-hover/item:text-white transition-colors">Podcast Host</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-12 pl-8 mt-12 pb-12">
                                <a href={STRATEGY_CALL_URL} target="_blank" rel="noreferrer" className="bg-primary hover:bg-white text-black px-16 py-7 rounded-full font-extrabold uppercase tracking-[0.4em] text-[11px] flex items-center justify-center gap-5 transition-all duration-700 hover:shadow-[0_45px_120px_-20px_rgba(124,255,27,0.7)] shadow-2xl active:scale-95 group/btn overflow-hidden relative">
                                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-700 opacity-20" />
                                    <span className="relative z-10">Book Strategy Call</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
