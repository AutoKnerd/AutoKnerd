"use client";

import React from "react";
import { siteContent } from "@/app/data/mockData";
import { motion } from "framer-motion";
import { TrendingUp, CheckCircle } from "lucide-react";

export const CSIRepair = () => {
    return (
        <section className="py-32 md:py-[140px] relative bg-background border-y border-white/5 overflow-hidden">
            <div className="absolute inset-0 bg-mesh-gradient opacity-30 pointer-events-none" />
            
            <div className="container mx-auto px-6 md:px-12 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div>
                        <div className="flex items-center gap-4 md:gap-6 text-primary mb-8 md:mb-12">
                            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.5em] md:tracking-[0.8em] font-mono shadow-glow-green">Performance</span>
                            <div className="h-px w-12 md:w-32 bg-primary/40" />
                        </div>
                        
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-[48px] font-outfit text-white leading-tight">
                            {siteContent.csiRepair.title}
                        </h2>
                        
                        <div className="text-xl md:text-2xl text-slate/70 font-light tracking-tight space-y-8 mb-[60px]">
                            {siteContent.csiRepair.introParas.map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>
                        
                        <div className="space-y-[32px] pl-4 border-l border-primary/30">
                            {siteContent.csiRepair.benefits.map((benefit, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-4"
                                >
                                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                                    <span className="text-lg text-white/80">{benefit}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="relative">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2 }}
                            viewport={{ once: true }}
                            className="luxury-card p-10 md:p-16 border-white/10"
                        >
                            <h3 className="text-2xl md:text-3xl text-white font-outfit font-medium mb-10">{siteContent.csiRepair.outcomesTitle}</h3>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {siteContent.csiRepair.outcomes.map((outcome, i) => (
                                    <div key={i} className="flex flex-col gap-3">
                                        <TrendingUp className="w-6 h-6 text-primary shadow-glow-green" />
                                        <span className="text-xl text-white tracking-tight">{outcome}</span>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-16 pt-8 border-t border-white/10 text-center font-outfit">
                                <p className="text-xl text-slate/50 mb-2">{siteContent.csiRepair.closingHead}</p>
                                <p className="text-2xl text-primary font-medium shadow-glow-green">{siteContent.csiRepair.closingSub}</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
