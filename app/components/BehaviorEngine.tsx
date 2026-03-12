"use client";

import React from "react";
import { siteContent } from "@/app/data/mockData";
import { motion } from "framer-motion";
import { ArrowRight, Settings, RefreshCcw, Shield, Users, Target, BarChart3, Activity } from "lucide-react";

const nodeIcons = [Shield, Users, Target, BarChart3];

export const BehaviorEngine = () => {
    return (
        <section className="py-32 md:py-[140px] relative bg-background border-y border-white/5 overflow-hidden">
            <div className="absolute inset-0 bg-mesh-gradient opacity-20 pointer-events-none" />
            <div className="bg-scanlines absolute inset-0 opacity-10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-white/[0.02] blur-[250px] pointer-events-none -z-10" />

            <div className="container mx-auto px-6 md:px-12 relative z-20">
                <div className="mb-20 md:mb-32">
                    <div className="flex items-center gap-4 md:gap-6 text-primary mb-8 md:mb-12">
                        <div className="h-px w-12 md:w-20 bg-primary/40" />
                        <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.5em] md:tracking-[0.8em] font-mono shadow-glow-green">System Architecture</span>
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-glow-green" />
                        <div className="h-px w-12 md:w-20 bg-primary/40" />
                    </div>
                    
                    <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-[60px] font-outfit text-white tracking-tighter leading-tight">
                        The AutoKnerd <br /><span className="text-primary italic">Behavior Engine.</span>
                    </h2>
                    
                    <div className="text-xl md:text-2xl text-slate/70 font-light tracking-tight max-w-3xl space-y-4">
                        {siteContent.behaviorEngine.introParas.map((para, i) => (
                            <p key={i}>{para}</p>
                        ))}
                    </div>
                </div>

                {/* Horizontal Architecture Diagram */}
                <div className="relative mb-[120px]">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 relative z-10">
                        {siteContent.behaviorEngine.diagramNodes.map((node, i) => {
                            const Icon = nodeIcons[i];
                            return (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex flex-col relative"
                                >
                                    <div className="p-8 h-full border border-white/10 bg-white/[0.02] rounded-3xl relative overflow-hidden flex flex-col transition-all duration-500 hover:bg-white/[0.04] hover:border-white/20">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center mb-8">
                                            <Icon className="w-5 h-5 text-primary/70" />
                                        </div>

                                        <h3 className="text-lg font-medium text-white mb-6 font-outfit tracking-tight leading-tight">
                                            {node.title}
                                        </h3>

                                        <ul className="space-y-4 mb-8">
                                            {node.items.map((item, j) => (
                                                <li key={j} className="text-sm text-slate/40 font-light flex items-center gap-3">
                                                    <div className="w-1 h-1 rounded-full bg-primary/20" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-auto pt-8 border-t border-white/5">
                                            <p className="text-[10px] leading-relaxed text-slate/50 font-medium uppercase tracking-[0.1em]">
                                                {node.caption}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Connector Arrow (Desktop) */}
                                    {i < 3 && (
                                        <div className="hidden lg:flex absolute top-1/2 -right-2 -translate-y-1/2 z-20 items-center justify-center transition-opacity duration-500 opacity-20">
                                            <ArrowRight className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <div className="text-center max-w-5xl mx-auto font-outfit relative z-20 py-[120px] border-y border-white/5 my-[120px]">
                    <p className="text-3xl md:text-5xl font-light text-slate/60 mb-6 tracking-tight leading-relaxed">{siteContent.behaviorEngine.captionHead}</p>
                    <p className="text-3xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight leading-tight">{siteContent.behaviorEngine.captionSub}</p>
                </div>

                {/* System Diagnostics Section */}
                <div className="max-w-5xl mx-auto border-t border-white/5 pt-16">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center bg-primary/5">
                                <Activity className="w-5 h-5 text-primary animate-pulse shadow-glow-green" />
                            </div>
                            <div>
                                <h4 className="text-white font-medium text-lg tracking-tight font-outfit">System Diagnostics</h4>
                                <p className="text-[10px] uppercase font-mono tracking-widest text-slate/40">Real-time status monitoring</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                            {[
                                { icon: Settings, label: "System Status", value: "Active", animation: "spin_8s" },
                                { icon: RefreshCcw, label: "Execution Monitoring", value: "Live", animation: "spin_4s" },
                                { icon: Activity, label: "Behavior Tracking", value: "Active", pulse: true }
                            ].map((status, i) => (
                                <div key={i} className="flex items-center gap-4 bg-white/[0.03] border border-white/5 py-3 px-6 rounded-2xl backdrop-blur-sm group hover:border-primary/20 transition-all duration-500">
                                    <status.icon 
                                        className={`w-4 h-4 text-primary ${status.animation ? `animate-[spin_${status.animation.split('_')[1]}_linear_infinite]` : ""} ${status.pulse ? "animate-pulse" : ""}`} 
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-slate/50 font-mono">{status.label}</span>
                                        <span className="text-[11px] font-bold text-white uppercase tracking-widest">{status.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
