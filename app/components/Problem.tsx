"use client";

import React from "react";
import { siteContent } from "@/app/data/mockData";
import { Target, TrendingUp, Activity, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export const Problem = () => {
    return (
        <section id="methodology" className="py-36 md:py-[170px] relative overflow-hidden bg-background">
            {/* Advanced Premium Background Depth */}
            <div className="absolute inset-0 bg-mesh-gradient opacity-40 pointer-events-none" />
            <div className="absolute inset-0 parallax-grid-1 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

            <div className="container mx-auto px-6 md:px-12 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                    <div className="lg:col-span-12 mb-14 md:mb-24">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="flex items-center gap-4 md:gap-6 text-primary/60 mb-8 md:mb-12"
                        >
                            <div className="h-px w-12 md:w-32 bg-primary/30" />
                            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.5em] md:tracking-[0.7em] font-mono whitespace-nowrap shadow-glow-green">
                                {siteContent.dealerPainMirror.title}
                            </span>
                            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-glow-green" />
                            <div className="h-px w-8 md:w-10 bg-primary/30" />
                        </motion.div>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light mb-10 md:mb-14 max-w-6xl leading-[1.08] md:leading-[1.02] font-outfit tracking-tighter text-white">
                            {siteContent.dealerPainMirror.headline}
                        </h2>
                    </div>

                    <div className="lg:col-span-5 relative">
                        <div className="text-xl md:text-2xl lg:text-3xl text-slate/70 leading-relaxed mb-[72px] font-light tracking-tight space-y-9">
                            {siteContent.dealerPainMirror.introParas.map((para, i) => (
                                <p key={i} className={i === 3 ? "text-white font-medium" : ""}>{para}</p>
                            ))}
                        </div>

                        <div className="space-y-[32px] md:pr-12 relative border-l border-white/10 pl-8 md:pl-12">
                            {siteContent.dealerPainMirror.issues.map((issue, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1, delay: i * 0.2 }}
                                    className="flex flex-col gap-4 group cursor-default"
                                >
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full glass border border-white/10 flex items-center justify-center shrink-0 z-10 transition-all duration-700 bg-background group-hover:border-primary group-hover:shadow-[0_0_30px_rgba(124,255,27,0.4)] group-hover:scale-110">
                                            <span className="text-[10px] md:text-[11px] font-bold font-mono text-slate/40 group-hover:text-primary transition-colors">0{i + 1}</span>
                                        </div>
                                        <span className="text-lg md:text-xl font-bold uppercase tracking-[0.2em] font-mono text-slate/40 group-hover:text-primary transition-all shadow-glow-green group-hover:tracking-[0.25em]">{issue.label}</span>
                                    </div>
                                    <div className="flex flex-col gap-2 md:gap-4 pl-10 md:pl-14">
                                        <span className="text-xl md:text-2xl text-white font-medium tracking-tight group-hover:translate-x-4 transition-transform duration-700">
                                            {issue.description}
                                        </span>
                                        <div className="w-0 h-px bg-gradient-to-r from-primary/50 to-transparent transition-all duration-1000 group-hover:w-full mt-2" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        
                        <div className="mt-16 md:mt-24 pt-12 md:pt-16 border-t border-white/10 font-outfit relative z-20">
                            <h3 className="text-2xl md:text-3xl font-light text-slate/50 mb-2">{siteContent.dealerPainMirror.closingHead}</h3>
                            <p className="text-3xl md:text-4xl text-white font-medium shadow-glow-green">{siteContent.dealerPainMirror.closingSub}</p>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="relative luxury-card animate-float group/card"
                        >
                            <div className="absolute top-0 right-0 p-8 md:p-16 text-primary opacity-5 group-hover/card:opacity-20 transition-opacity duration-1000">
                                <Activity className="w-32 h-32 md:w-48 md:h-48" />
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 md:gap-8 mb-12 md:mb-20">
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl glass-green flex items-center justify-center group-hover/card:scale-110 transition-transform duration-1000 shadow-[inset_0_0_30px_rgba(124,255,27,0.2)]">
                                        <Target className="w-6 h-6 md:w-8 md:h-8 text-primary shadow-glow-green" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-3xl font-medium tracking-tight font-outfit uppercase text-white shadow-glow-green">Typical Stabilization Benchmarks Within 90 Days</h3>
                                        <p className="text-[10px] md:text-xs font-mono text-slate/40 uppercase tracking-widest mt-1">System Telemetry Snapshot</p>
                                    </div>
                                </div>

                                <div className="space-y-12 md:space-y-20">
                                    <div className="p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] glass-green relative overflow-hidden group/graph">
                                        <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none" />
                                        
                                        <div className="flex items-center justify-between mb-8 md:mb-12 relative z-10">
                                            <div className="flex items-center gap-4">
                                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-glow-green" />
                                                <div className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.3em] md:tracking-[0.5em] text-primary/80 font-mono">Behavior Consistency Index</div>
                                            </div>
                                            <div className="text-4xl md:text-7xl font-light text-white font-outfit tracking-tighter shadow-glow-green">98.4<span className="text-sm md:text-xl ml-2 md:ml-3 font-mono text-primary">%</span></div>
                                        </div>

                                        <div className="flex items-end gap-1 md:gap-3 h-32 md:h-48 relative z-10">
                                            {[35, 45, 30, 60, 50, 75, 65, 85, 95, 82, 98, 97].map((v, i) => (
                                                <div key={i} className="flex-1 relative h-full flex items-end">
                                                    <motion.div
                                                        initial={{ height: "10%" }}
                                                        whileInView={{ height: `${v}%` }}
                                                        transition={{ duration: 2, delay: i * 0.05, type: "spring", stiffness: 50 }}
                                                        className="w-full bg-gradient-to-t from-primary/10 to-primary/40 hover:to-primary rounded-t-md md:rounded-t-lg transition-all duration-500 shadow-[0_0_15px_rgba(124,255,27,0.1)] group-hover/graph:shadow-[0_0_20px_rgba(124,255,27,0.3)] relative overflow-hidden"
                                                    >
                                                        <div className="absolute inset-x-0 top-0 h-1 bg-primary shadow-glow-green" />
                                                    </motion.div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 pl-4 md:pl-8 border-l border-primary/20">
                                        <div className="space-y-4 md:space-y-6 rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-6 md:p-8">
                                            <div className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.3em] md:tracking-[0.4em] text-slate/50 font-mono flex items-center gap-3">
                                                <Cpu className="w-3 h-3 text-primary" />
                                                Manager Coaching Cadence
                                            </div>
                                            <div className="text-4xl md:text-6xl font-medium text-white font-outfit tracking-tighter">95<span className="text-primary/60 text-sm md:text-lg ml-2 md:ml-3 tracking-widest font-mono uppercase">%</span></div>
                                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                <motion.div initial={{ width: 0 }} whileInView={{ width: "95%" }} transition={{ duration: 2.5 }} className="h-full bg-primary shadow-glow-green" />
                                            </div>
                                        </div>
                                        <div className="space-y-4 md:space-y-6 rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-6 md:p-8">
                                            <div className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.3em] md:tracking-[0.4em] text-slate/50 font-mono flex items-center gap-3">
                                                <TrendingUp className="w-3 h-3 text-primary" />
                                                Process Adherence Score
                                            </div>
                                            <div className="text-4xl md:text-6xl font-medium text-white font-outfit tracking-tighter">92<span className="text-primary/60 text-sm md:text-lg ml-2 md:ml-3 tracking-widest font-mono uppercase">%</span></div>
                                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                <motion.div initial={{ width: 0 }} whileInView={{ width: "92%" }} transition={{ duration: 2.5 }} className="h-full bg-primary shadow-glow-green" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
