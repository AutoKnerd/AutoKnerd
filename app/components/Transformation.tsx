"use client";

import React, { useState } from "react";
import { siteContent } from "@/app/data/mockData";
import { motion } from "framer-motion";

export const Transformation = () => {
    const { transformation } = siteContent;
    const [hoveredSide, setHoveredSide] = useState<"before" | "after" | null>(null);

    return (
        <section className="py-32 md:py-[140px] relative bg-background border-y border-white/5 transition-colors duration-1000">
            <div className="container mx-auto px-6 md:px-12 relative z-20">
                <div className="mb-20 md:mb-32 text-left max-w-5xl">
                    <div className="flex items-center gap-6 text-primary mb-12 group/header cursor-default">
                        <div className="h-px w-20 bg-primary/40 group-hover:w-32 transition-all duration-1000" />
                        <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.5em] md:tracking-[0.8em] font-mono shadow-glow-green">{transformation.title}</span>
                    </div>
                    
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-light mb-8 font-outfit text-white tracking-tighter leading-tight">
                        {transformation.subtitle}
                    </h2>
                </div>

                <div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden mb-20 md:mb-32 group/grid"
                    onMouseLeave={() => setHoveredSide(null)}
                >
                    {/* Before Column */}
                    <div 
                        className={`p-8 md:p-16 transition-all duration-1000 relative ${
                            hoveredSide === "after" ? "opacity-20 blur-[2px] grayscale" : 
                            hoveredSide === "before" ? "bg-white/[0.05] opacity-100" : 
                            "bg-black/20 opacity-60"
                        }`}
                        onMouseEnter={() => setHoveredSide("before")}
                    >
                        <div className="flex items-center gap-4 mb-16">
                            <span className="text-[10px] font-bold text-slate/30 uppercase tracking-[0.4em] font-mono">Current State</span>
                            <div className="h-px flex-1 bg-white/5" />
                        </div>
                        
                        <h3 className={`text-2xl font-medium font-outfit tracking-tight mb-12 uppercase transition-colors duration-1000 ${
                            hoveredSide === "before" ? "text-white" : "text-white/40"
                        }`}>
                            Typical Dealership
                        </h3>
                        
                        <ul className="space-y-8">
                            {transformation.before.list.map((item, i) => (
                                <li key={i} className="flex items-start gap-6 text-slate/40 font-light leading-relaxed group/item transition-all duration-700">
                                    <span className={`text-[10px] font-mono mt-1.5 flex-none transition-colors duration-700 ${
                                        hoveredSide === "before" ? "text-red-500/60" : "text-slate/20"
                                    }`}>[ {i < 9 ? `0${i+1}` : i+1} ]</span>
                                    <span className={`text-lg md:text-xl transition-colors duration-700 ${
                                        hoveredSide === "before" ? "text-slate/90" : ""
                                    }`}>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* After Column */}
                    <div 
                        className={`p-8 md:p-16 relative transition-all duration-1000 ${
                            hoveredSide === "before" ? "opacity-10 blur-[1px] grayscale" : 
                            hoveredSide === "after" ? "bg-primary/[0.05] opacity-100" : 
                            "bg-primary/[0.02] opacity-80"
                        }`}
                        onMouseEnter={() => setHoveredSide("after")}
                    >
                        <div className="absolute inset-0 bg-scanlines opacity-[0.03] pointer-events-none" />
                        <div className="flex items-center gap-4 mb-16">
                            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] font-mono shadow-glow-green">Desired State</span>
                            <div className="h-px flex-1 bg-primary/20" />
                            <div className={`w-1.5 h-1.5 rounded-full bg-primary shadow-glow-green transition-all duration-1000 ${
                                hoveredSide === "after" ? "scale-150 animate-pulse" : ""
                            }`} />
                        </div>
                        
                        <h3 className="text-2xl font-medium text-white font-outfit tracking-tight mb-12 uppercase transition-colors duration-1000">
                            Systemized Dealership
                        </h3>
                        
                        <ul className="space-y-8">
                            {transformation.after.list.map((item, i) => (
                                <li key={i} className="flex items-start gap-6 text-white/80 font-light leading-relaxed group transition-all duration-700">
                                    <span className={`text-[10px] font-mono text-primary mt-1.5 flex-none shadow-glow-green transition-transform duration-700 ${
                                        hoveredSide === "after" ? "scale-125" : ""
                                    }`}>√</span>
                                    <span className={`text-lg md:text-xl group-hover:text-primary transition-colors duration-500 ${
                                        hoveredSide === "after" ? "text-white" : ""
                                    }`}>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Results Block */}
                <div className="max-w-7xl mx-auto mb-24 md:mb-40">
                    <div className="p-10 md:p-20 rounded-[3rem] border border-white/10 bg-black/40 relative overflow-hidden transition-all duration-1000">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="flex-none">
                                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.8em] font-mono mb-4 block shadow-glow-green">{transformation.results.title.toUpperCase()}</span>
                                <div className="h-px w-24 bg-primary/40" />
                            </div>
                            
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 w-full">
                                {transformation.results.items.map((result, i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="text-[9px] font-mono text-slate/30 uppercase tracking-widest">Indicator {i+1}</div>
                                        <div className="text-white font-medium text-lg tracking-tight leading-tight border-l-2 border-primary/40 pl-4">{result}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Conclusion Line */}
                <div className="text-center max-w-4xl mx-auto font-outfit">
                    {transformation.conclusion.lines.map((line, i) => (
                        <p 
                            key={i} 
                            className={`text-2xl md:text-3xl lg:text-4xl tracking-tight mb-3 transition-all duration-1000 ${
                                i === 1 ? "text-primary italic font-medium shadow-glow-green" : 
                                i === 2 ? "text-white font-medium" : 
                                "text-slate/60 font-light"
                            } ${hoveredSide === "before" && i !== 2 ? "opacity-30" : "opacity-100"}`}
                        >
                            {line}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    );
};
