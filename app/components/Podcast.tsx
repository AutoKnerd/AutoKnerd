"use client";

import React from "react";
import { siteContent } from "@/app/data/mockData";
import { Youtube, ExternalLink, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

export const Podcast = () => {
    return (
        <section id="insights" className="py-32 md:py-[140px] bg-background relative border-t border-white/5 bg-dot-grid bg-fixed">
            {/* Structural Geometry */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary/20 via-primary/5 to-transparent pointer-events-none opacity-40 shrink-0" />
            <div className="absolute top-1/4 -right-1/4 w-[60vw] h-[60vw] bg-primary/5 blur-[200px] pointer-events-none opacity-10 animate-slow-pulse" />

            <div className="container mx-auto px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
                    <div className="lg:col-span-12 mb-24 text-center">
                        <div className="flex items-center gap-6 text-primary justify-center mb-12 group/header cursor-default">
                            <div className="h-px w-20 bg-primary/40 group-hover:w-32 transition-all duration-1000" />
                            <span className="text-[11px] font-extrabold uppercase tracking-[0.8em] font-mono group-hover:text-white transition-colors">AutoKnerd Podcast</span>
                            <div className="h-px w-20 bg-primary/40 group-hover:w-32 transition-all duration-1000" />
                        </div>
                        <h2 className="text-6xl lg:text-9xl font-light mb-[48px] font-outfit leading-[1.05] tracking-tighter">
                            The <span className="text-white font-medium">AutoKnerd</span> Podcast.
                        </h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="lg:col-span-6"
                    >
                        <div className="relative aspect-square glass rounded-[5rem] border-white/10 overflow-hidden group/art active:scale-[0.98] transition-all duration-700">
                            <div className="absolute inset-0 bg-blueprint opacity-10" />
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent z-10" />

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-12 z-20">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                    className="w-72 h-72 rounded-full border border-primary/10 flex items-center justify-center bg-black/40 relative shadow-2xl group-hover/art:border-primary/40 group-hover/art:shadow-[0_0_80px_rgba(124,255,27,0.2)] transition-all duration-1000"
                                >
                                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-glow-green">
                                        <PlayCircle className="w-10 h-10 text-black fill-current" />
                                    </div>
                                    <div className="absolute inset-0 rounded-full border-t border-primary/20" />
                                </motion.div>
                            </div>

                            {/* Decorative Details */}
                            <div className="absolute bottom-16 left-16 z-20">
                                <div className="text-[11px] font-extrabold text-primary uppercase tracking-[0.6em] font-mono opacity-50 mb-4 animate-pulse">Insights</div>
                                <h4 className="text-5xl font-light text-white font-outfit tracking-tighter leading-snug drop-shadow-2xl">
                                    Trusted by <br /><span className="text-primary italic">Dealership Pros.</span>
                                </h4>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="lg:col-span-6"
                    >
                        <div className="space-y-16">
                            <p className="text-3xl text-slate/80 leading-relaxed font-light font-outfit tracking-tight opacity-70 border-l border-primary/20 pl-8 group hover:opacity-100 transition-opacity duration-700">
                                {siteContent.podcast.description}
                            </p>

                            <div className="grid grid-cols-1 gap-12">
                                <div className="flex flex-col gap-8">
                                    <span className="text-[11px] font-extrabold uppercase tracking-[0.6em] text-primary/40 font-mono">Available Platforms</span>
                                    <div className="flex flex-wrap gap-6">
                                        {siteContent.podcast.platforms.map((platform) => (
                                            <a key={platform} href="#" className="flex items-center gap-6 px-10 py-5 glass border border-white/5 rounded-full text-[11px] font-bold uppercase tracking-[0.4em] text-white/40 hover:text-white hover:border-primary/40 transition-all duration-700 hover:shadow-2xl active:scale-95 group/platform">
                                                <ExternalLink className="w-4 h-4 text-primary/40 group-hover/platform:text-primary transition-colors" />
                                                {platform}
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-16 border-t border-white/5">
                                    <button className="bg-primary hover:bg-white text-black px-16 py-7 rounded-full font-extrabold uppercase tracking-[0.4em] text-[11px] flex items-center justify-center gap-5 transition-all duration-700 hover:shadow-[0_45px_120px_-20px_rgba(124,255,27,0.7)] shadow-2xl active:scale-95 group/main overflow-hidden relative">
                                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700 opacity-20" />
                                        <span className="relative z-10">{siteContent.podcast.cta}</span>
                                        <Youtube className="w-5 h-5 group-hover/main:translate-x-3 transition-transform duration-700 relative z-10" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
