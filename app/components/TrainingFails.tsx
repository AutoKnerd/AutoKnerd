"use client";

import React from "react";
import { siteContent } from "@/app/data/mockData";
import { motion } from "framer-motion";
import { AlertTriangle, Settings, RefreshCcw } from "lucide-react";

export const TrainingFails = () => {
    return (
        <section className="py-24 md:py-40 lg:py-64 relative overflow-hidden bg-background border-y border-white/5">
            {/* Advanced Premium Background Depth */}
            <div className="absolute inset-0 bg-mesh-gradient opacity-30 pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent shadow-[0_0_30px_rgba(124,255,27,0.5)]" />
            <div className="bg-scanlines absolute inset-0 opacity-20 pointer-events-none" />
            <div className="absolute inset-0 parallax-grid-2 pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="lg:col-span-12 mb-12 md:mb-20 text-center"
                    >
                        <div className="flex items-center gap-4 md:gap-6 text-primary justify-center mb-8 md:mb-12">
                            <div className="h-px w-12 md:w-20 bg-primary/40" />
                            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.5em] md:tracking-[0.8em] font-mono shadow-glow-green">{siteContent.whyTrainingFails.title}</span>
                            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-glow-green" />
                            <div className="h-px w-12 md:w-20 bg-primary/40" />
                        </div>

                        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light mb-12 md:mb-16 tracking-tighter font-outfit leading-tight max-w-7xl mx-auto text-white">
                            &quot;Training is a <span className="text-primary italic shadow-glow-green">temporary patch.</span> <br className="hidden md:block" />Systems are the <span className="text-white font-medium">foundation.&quot;</span>
                        </h2>
                    </motion.div>

                    <div className="lg:col-span-6 flex flex-col gap-8 md:gap-12">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2 }}
                            className="luxury-card relative group animate-float border-white/10"
                        >
                            <div className="absolute top-6 right-6 md:top-10 md:right-10 text-primary/10 group-hover:text-primary transition-colors duration-1000">
                                <AlertTriangle className="w-10 h-10 md:w-16 md:h-16 shadow-glow-green opacity-50 group-hover:opacity-100" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-medium text-white mb-4 md:mb-6 font-outfit uppercase tracking-tighter">The Failure of Frequency</h3>
                            <p className="text-xl md:text-2xl text-slate/70 leading-relaxed font-light font-outfit tracking-tight">
                                {siteContent.whyTrainingFails.content}
                            </p>
                            <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-1000 shadow-glow-green" />
                        </motion.div>
                    </div>

                    <div className="lg:col-span-6">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5 }}
                            className="relative aspect-square md:aspect-video glass-green rounded-[2.5rem] md:rounded-[4rem] border-white/10 overflow-hidden flex items-center justify-center p-8 md:p-16 shadow-[inset_0_0_50px_rgba(124,255,27,0.05)]"
                        >
                            <div className="bg-blueprint absolute inset-0 opacity-10" />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-16 w-full relative z-10">
                                <div className="flex flex-col items-center justify-center gap-4 md:gap-8 group">
                                    <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border border-primary/20 flex items-center justify-center bg-background relative overflow-hidden shadow-[0_0_30px_rgba(124,255,27,0.1)] group-hover:shadow-[0_0_50px_rgba(124,255,27,0.3)] transition-shadow duration-700">
                                        <div className="absolute inset-0 bg-primary/10 opacity-20 group-hover:opacity-40 transition-opacity" />
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        >
                                            <div className="w-10 h-10 md:w-16 md:h-16 text-primary/40 group-hover:text-primary transition-colors flex items-center justify-center">
                                                <Settings className="w-8 h-8 md:w-10 md:h-10 shadow-glow-green" />
                                            </div>
                                        </motion.div>
                                    </div>
                                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] text-white/50 font-mono text-center group-hover:text-primary transition-colors px-4 md:px-0">Behavioral Infrastructure</span>
                                </div>

                                <div className="flex flex-col items-center justify-center gap-4 md:gap-8 group">
                                    <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border border-primary/20 flex items-center justify-center bg-background relative overflow-hidden shadow-[0_0_30px_rgba(124,255,27,0.1)] group-hover:shadow-[0_0_50px_rgba(124,255,27,0.3)] transition-shadow duration-700">
                                        <div className="absolute inset-0 bg-primary/10 opacity-20 group-hover:opacity-40 transition-opacity" />
                                        <motion.div
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <div className="w-10 h-10 md:w-16 md:h-16 text-primary/40 group-hover:text-primary transition-colors flex items-center justify-center">
                                                <RefreshCcw className="w-8 h-8 md:w-10 md:h-10 shadow-glow-green" />
                                            </div>
                                        </motion.div>
                                    </div>
                                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] text-white/50 font-mono text-center group-hover:text-primary transition-colors px-4 md:px-0">Permanent Stability</span>
                                </div>
                            </div>

                            {/* Pulse Effect */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-80 md:h-80 bg-primary/20 blur-[60px] md:blur-[120px] rounded-full animate-slow-pulse" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
