"use client";

import React from "react";
import { siteContent } from "@/app/data/mockData";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw, Settings } from "lucide-react";

export const TrainingFails = () => {
    const systemBlocks = [
        {
            title: "Problem",
            icon: AlertTriangle,
            body: siteContent.whyTrainingFails.problem,
        },
        {
            title: "Why Training Fails",
            icon: RefreshCcw,
            body: siteContent.whyTrainingFails.whyFails,
        },
        {
            title: "What AutoKnerd Installs Instead",
            icon: Settings,
            body: siteContent.whyTrainingFails.installInstead,
        },
    ];

    return (
        <section className="py-36 md:py-[160px] relative overflow-hidden bg-background border-y border-white/5">
            {/* Advanced Premium Background Depth */}
            <div className="absolute inset-0 bg-mesh-gradient opacity-30 pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent shadow-[0_0_30px_rgba(124,255,27,0.5)]" />
            <div className="bg-scanlines absolute inset-0 opacity-20 pointer-events-none" />
            <div className="absolute inset-0 parallax-grid-2 pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="lg:col-span-12 mb-8 md:mb-12 text-center"
                    >
                        <div className="flex items-center gap-4 md:gap-6 text-primary justify-center mb-8 md:mb-12">
                            <div className="h-px w-12 md:w-20 bg-primary/40" />
                            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.5em] md:tracking-[0.8em] font-mono shadow-glow-green">{siteContent.whyTrainingFails.title}</span>
                            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-glow-green" />
                            <div className="h-px w-12 md:w-20 bg-primary/40" />
                        </div>

                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light mb-6 md:mb-8 tracking-tighter font-outfit leading-tight max-w-7xl mx-auto text-white">
                            Training creates <span className="text-primary italic">awareness.</span>
                            <br className="hidden md:block" />
                            Systems create <span className="text-white font-medium">consistency.</span>
                        </h2>
                        <p className="text-base md:text-xl text-slate/60 max-w-4xl mx-auto tracking-tight">
                            AutoKnerd installs the systems that make great behavior repeatable.
                        </p>
                    </motion.div>

                    <div className="lg:col-span-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {systemBlocks.map((block, i) => (
                                <motion.div
                                    key={block.title}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.9, delay: i * 0.12 }}
                                    viewport={{ once: true }}
                                    className="luxury-card p-8 md:p-10 rounded-[2.5rem] border-white/10 relative group"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg md:text-xl text-primary uppercase tracking-[0.25em] font-bold font-mono">
                                            {block.title}
                                        </h3>
                                        <block.icon className="w-6 h-6 text-primary/60 group-hover:text-primary transition-colors" />
                                    </div>
                                    <p className="text-lg md:text-xl text-slate/70 leading-relaxed tracking-tight">
                                        {block.body}
                                    </p>
                                    <div className="absolute bottom-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-700 shadow-glow-green" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
