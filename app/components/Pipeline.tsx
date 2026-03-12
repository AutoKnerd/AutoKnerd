"use client";

import React from "react";
import { siteContent } from "@/app/data/mockData";
import { motion } from "framer-motion";
import { Search, Rocket, Calendar, TrendingUp } from "lucide-react";

const stepIcons = [Search, Rocket, Calendar, TrendingUp];

export const Pipeline = () => {
    return (
        <section id="process" className="py-[140px] bg-background relative border-y border-white/5 overflow-hidden">
            {/* Advanced Premium Background Depth */}
            <div className="absolute inset-0 bg-mesh-gradient opacity-30 pointer-events-none" />
            <div className="absolute inset-0 parallax-grid-2 pointer-events-none opacity-50" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent shadow-[0_0_30px_rgba(124,255,27,0.5)] z-10" />
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vw] h-[110vw] bg-primary/10 blur-[250px] pointer-events-none opacity-40 animate-slow-pulse -z-10" />

            <div className="container mx-auto px-6 md:px-12 relative z-20">
                <div className="text-left mb-20 md:mb-32 lg:mb-48 max-w-6xl">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="flex items-center gap-4 md:gap-8 text-primary mb-12 md:mb-16 group/header cursor-default"
                    >
                        <div className="h-px w-12 md:w-20 bg-primary/30 group-hover:w-48 transition-all duration-1000 shadow-glow-green" />
                        <span className="text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.5em] md:tracking-[1em] font-mono shadow-glow-green whitespace-nowrap">{siteContent.process.title}</span>
                    </motion.div>
                    <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light mb-[60px] font-outfit tracking-tighter leading-[1.1] md:leading-[1.05] text-white">
                        From Diagnostic to <br /><span className="text-primary italic">Stabilization.</span>
                    </h2>
                </div>

                <div className="relative">
                    {/* Architectural Connector Line */}
                    <div className="absolute top-12 md:top-16 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent hidden lg:block opacity-60 shrink-0 shadow-[0_0_15px_rgba(124,255,27,0.5)]" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 lg:gap-24 relative z-10">
                        {siteContent.process.steps.map((step, i) => {
                            const Icon = stepIcons[i];
                            return (
                                <motion.div
                                    key={step.number}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.5, delay: i * 0.2, type: "spring", stiffness: 40 }}
                                    viewport={{ once: true }}
                                    className="flex flex-col items-start group relative h-full animate-float"
                                    style={{ animationDelay: `${i * 0.3}s` }}
                                >
                                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-[1.5rem] md:rounded-[3rem] glass-green border border-white/10 flex items-center justify-center mb-8 md:mb-16 relative transition-all duration-700 group-hover:bg-primary/10 group-hover:border-primary group-hover:shadow-[0_0_40px_rgba(124,255,27,0.4)] shadow-[inset_0_0_20px_rgba(124,255,27,0.05)] shrink-0 group-hover:scale-110">
                                        <Icon className="w-6 h-6 md:w-10 md:h-10 text-primary/60 group-hover:text-primary shadow-glow-green transition-colors duration-700" />
                                        <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full animate-pulse shadow-[0_0_20px_rgba(124,255,27,0.8)] border border-background" />
                                        <div className="absolute inset-0 bg-scanlines rounded-[1.5rem] md:rounded-[3rem] opacity-20 pointer-events-none" />
                                    </div>

                                    <div className="flex items-center gap-3 w-full">
                                        <span className="text-[10px] md:text-[11px] font-extrabold font-mono text-primary/60 mb-2 md:mb-4 group-hover:text-primary transition-colors tracking-widest uppercase shadow-glow-green">Phase 0{step.number}</span>
                                        <div className="h-px bg-primary/20 flex-1 mb-2 md:mb-4 group-hover:bg-primary/60 transition-colors duration-700" />
                                    </div>

                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4 md:mb-8 font-outfit tracking-tighter group-hover:translate-x-3 transition-transform duration-700 leading-snug text-white shadow-glow-green">{step.title}</h3>
                                    
                                    <p className="text-lg text-slate/60 leading-relaxed font-light group-hover:text-slate/90 transition-colors duration-700 flex-1 tracking-tight">
                                        {step.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-32 md:mt-48 lg:mt-64 luxury-card border-primary/20 bg-background/40 relative overflow-hidden group/matrix shadow-[0_0_100px_rgba(124,255,27,0.05)] text-center animate-float">
                    <div className="bg-blueprint absolute inset-0 opacity-[0.05] pointer-events-none" />
                    <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/20 blur-[100px] rounded-full group-hover/matrix:bg-primary/30 transition-colors duration-1000" />
                    <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
                    <div className="flex flex-col items-center justify-center gap-8 md:gap-12 relative z-10 p-12 md:p-24 lg:p-32">
                        <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.5em] md:tracking-[1em] text-primary/60 group-hover/matrix:text-primary transition-colors duration-700 font-mono shadow-glow-green">Infrastructure Impact</span>
                        <h4 className="text-3xl md:text-5xl lg:text-7xl font-light text-white font-outfit tracking-tighter leading-tight max-w-5xl">
                            Engineered to Replace Inconsistent Training with <span className="text-primary italic shadow-glow-green font-medium">Permanent Systems.</span>
                        </h4>
                        <button className="mt-8 bg-primary hover:bg-white text-black px-12 md:px-16 py-6 md:py-8 rounded-full font-extrabold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-[12px] flex items-center justify-center gap-4 md:gap-5 transition-all duration-700 hover:shadow-[0_0_50px_rgba(124,255,27,0.7)] shadow-[0_0_30px_rgba(124,255,27,0.4)] active:scale-95 group/main border border-primary hover:border-white">
                            Initialize Deployment
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
