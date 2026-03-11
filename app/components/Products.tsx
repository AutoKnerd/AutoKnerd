"use client";

import React from "react";
import { siteContent } from "@/app/data/mockData";
import { Check, ArrowRight, Settings, Radio } from "lucide-react";
import { motion } from "framer-motion";

const productIcons: Record<string, any> = {
    autodrivecx: Radio,
    autoforge: Settings,
};

export const Products = () => {
    return (
        <section id="systems" className="py-24 md:py-40 lg:py-64 relative bg-background overflow-hidden border-y border-white/5 bg-fixed">
            {/* Advanced Premium Background Depth */}
            <div className="absolute inset-0 bg-mesh-gradient opacity-40 pointer-events-none" />
            <div className="absolute inset-0 parallax-grid-1 pointer-events-none opacity-60" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent shadow-[0_0_30px_rgba(124,255,27,0.5)] z-10" />
            
            {/* Core Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-primary/10 blur-[250px] pointer-events-none opacity-30 animate-slow-pulse" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center mb-20 md:mb-32 lg:mb-48 max-w-5xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="flex items-center gap-4 md:gap-6 text-primary justify-center mb-8 md:mb-12 group/header cursor-default"
                    >
                        <div className="h-px w-12 md:w-20 bg-primary/40 group-hover:w-32 transition-all duration-1000" />
                        <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.5em] md:tracking-[0.8em] font-mono group-hover:text-white transition-colors whitespace-nowrap shadow-glow-green">Core_Behavioral_Systems</span>
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-glow-green" />
                        <div className="h-px w-12 md:w-20 bg-primary/40 group-hover:w-32 transition-all duration-1000" />
                    </motion.div>
                    <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light mb-8 md:mb-12 font-outfit leading-[1.1] md:leading-[1.05] tracking-tighter text-white">
                        Architectures for <br /><span className="text-primary italic shadow-glow-green">Sustainable Growth.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-stretch max-w-7xl mx-auto">
                    {siteContent.products.map((product, i) => {
                        const Icon = productIcons[product.id];
                        return (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.98, y: 50 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 1.5, delay: i * 0.3, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true }}
                                className={`flex flex-col luxury-card p-10 md:p-16 lg:p-24 rounded-[2.5rem] md:rounded-[4rem] lg:rounded-[5rem] relative group/card border-white/10 overflow-hidden cursor-default shadow-[inset_0_0_50px_rgba(124,255,27,0.02)] hover:shadow-[0_0_120px_rgba(124,255,27,0.15)] animate-float`}
                                style={{ animationDelay: `${i * 0.5}s` }}
                            >
                                <div className="absolute top-10 right-10 md:top-16 md:right-16 text-primary opacity-20 group-hover/card:opacity-100 group-hover/card:scale-110 transition-all duration-1000">
                                    <Icon className="w-10 h-10 md:w-16 md:h-16 shadow-glow-green" />
                                </div>

                                <div className="flex items-center gap-4 mb-8 md:mb-12 relative z-10">
                                    <div className="text-[10px] md:text-[11px] font-extrabold text-primary uppercase tracking-[0.4em] md:tracking-[0.6em] font-mono shadow-glow-green">{product.tagline}</div>
                                </div>

                                <h3 className="text-3xl md:text-5xl font-medium mb-6 md:mb-10 text-white font-outfit tracking-tighter group-hover/card:tracking-tight transition-all duration-1000 group-hover/card:text-primary leading-[1.1] relative z-10">{product.title}</h3>

                                <p className="text-lg md:text-xl text-slate/70 leading-relaxed mb-6 md:mb-8 flex-none font-light group-hover/card:text-white transition-colors duration-1000 tracking-tight relative z-10">
                                    {product.description}
                                </p>

                                <p className="text-xs md:text-sm font-bold text-primary/80 mb-10 md:mb-16 uppercase tracking-[0.2em] md:tracking-[0.3em] font-mono flex-none relative z-10">
                                    {product.outcome}
                                </p>

                                <div className="space-y-8 md:space-y-12 mb-16 md:mb-32 md:pr-12 relative md:border-l border-white/10 md:pl-12 flex-1 z-10">
                                    {product.features.map((item: string, j: number) => (
                                        <div key={item} className="flex flex-col gap-2 group/item">
                                            <div className="flex items-center gap-4 md:gap-6">
                                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary/20 group-hover/item:bg-primary group-hover/item:shadow-glow-green transition-all duration-700" />
                                                <span className="text-white/60 group-hover/item:text-white transition-colors duration-700 tracking-[0.2em] font-medium relative z-10 uppercase text-[10px] md:text-[11px] font-mono group-hover/item:translate-x-3 transition-transform">{item}</span>
                                            </div>
                                            <div className="w-0 h-px bg-gradient-to-r from-primary/30 to-transparent group-hover/item:w-full transition-all duration-1000 mt-1 ml-6 md:ml-8" />
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full py-6 md:py-9 bg-background/50 border border-white/10 rounded-full text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.3em] md:tracking-[0.45em] text-white hover:bg-primary hover:text-black hover:border-primary transition-all duration-700 flex items-center justify-center gap-4 md:gap-8 group/btn shadow-[0_0_20px_rgba(124,255,27,0.05)] hover:shadow-[0_0_40px_rgba(124,255,27,0.3)] relative overflow-hidden z-10 backdrop-blur-md">
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-700 opacity-20" />
                                    <span className="relative z-10">Deploy {product.title.split(" ")[0]}</span>
                                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-3 transition-transform duration-700 relative z-10" />
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
