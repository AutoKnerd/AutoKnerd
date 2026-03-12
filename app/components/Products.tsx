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
        <section id="systems" className="py-32 md:py-[140px] relative bg-background overflow-hidden border-y border-white/5 bg-fixed">
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
                        <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.5em] md:tracking-[0.8em] font-mono group-hover:text-white transition-colors whitespace-nowrap shadow-glow-green">Behavioral Core Infrastructure</span>
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-glow-green" />
                        <div className="h-px w-12 md:w-20 bg-primary/40 group-hover:w-32 transition-all duration-1000" />
                    </motion.div>
                    <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light mb-[48px] font-outfit leading-[1.1] md:leading-[1.05] tracking-tighter text-white">
                        Architectures for <br /><span className="text-primary italic">Sustainable Growth.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-stretch max-w-7xl mx-auto">
                    {siteContent.products.map((product, i) => {
                        const Icon = productIcons[product.id];
                        const isAutoDrive = product.id === "autodrivecx";
                        const isAutoForge = product.id === "autoforge";
                        
                        // Default to original base colors if neither (fallback)
                        let cardClass = "luxury-card";
                        let mainColor = "text-primary";
                        let mainHex = "124, 255, 27"; // rgb for #7cff1b (primary)
                        
                        if (isAutoDrive) {
                            cardClass = "autodrive-card";
                            mainColor = "text-[#0ea5e9]"; // Tailwind Sky 500
                            mainHex = "14, 165, 233";
                        } else if (isAutoForge) {
                            cardClass = "autoforge-card";
                            mainColor = "text-[#dc2626]"; // Tailwind Red 600
                            mainHex = "220, 38, 38";
                        }

                        // Determine the specific color classes based on the active product
                        const iconColor = mainColor;
                        const iconShadow = `drop-shadow-[0_0_15px_rgba(${mainHex},0.5)]`;
                        const titleHover = isAutoDrive ? "group-hover/card:text-[#0ea5e9]" : isAutoForge ? "group-hover/card:text-[#dc2626]" : "group-hover/card:text-primary";
                        const taglineColor = `${mainColor} drop-shadow-[0_0_10px_rgba(${mainHex},0.3)]`;
                        const outcomeColor = isAutoDrive ? "text-[#0ea5e9]/80" : isAutoForge ? "text-[#dc2626]/80" : "text-primary/80";
                        
                        const dotBase = isAutoDrive ? "bg-[#0ea5e9]/20" : isAutoForge ? "bg-[#dc2626]/20" : "bg-primary/20";
                        const dotHover = isAutoDrive ? "group-hover/item:bg-[#0ea5e9] group-hover/item:shadow-[0_0_10px_rgba(14,165,233,0.5)]" : 
                                         isAutoForge ? "group-hover/item:bg-[#dc2626] group-hover/item:shadow-[0_0_10px_rgba(220,38,38,0.5)]" : 
                                         "group-hover/item:bg-primary group-hover/item:shadow-[0_0_10px_rgba(124,255,27,0.5)]";
                                         
                        const lineGradient = isAutoDrive ? "from-[#0ea5e9]/30" : isAutoForge ? "from-[#dc2626]/30" : "from-primary/30";
                        const lightGlow = isAutoDrive ? "from-[#0ea5e9]/20" : isAutoForge ? "from-[#dc2626]/20" : "from-white/20";
                        const topGlow = isAutoDrive ? "via-[#0ea5e9]/50" : isAutoForge ? "via-[#dc2626]/50" : "via-white/50";
                        const btnHover = isAutoDrive ? "hover:bg-[#0ea5e9] hover:border-[#0ea5e9] shadow-[0_0_20px_rgba(14,165,233,0.05)] hover:shadow-[0_0_40px_rgba(14,165,233,0.3)]" : 
                                         isAutoForge ? "hover:bg-[#dc2626] hover:border-[#dc2626] shadow-[0_0_20px_rgba(220,38,38,0.05)] hover:shadow-[0_0_40px_rgba(220,38,38,0.3)]" : 
                                         "hover:bg-primary hover:border-primary shadow-[0_0_20px_rgba(124,255,27,0.05)] hover:shadow-[0_0_40px_rgba(124,255,27,0.3)]";

                        return (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.98, y: 50 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 1.5, delay: i * 0.3, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true }}
                                className={`flex flex-col ${cardClass} p-10 md:p-16 lg:p-24 rounded-[2.5rem] md:rounded-[4rem] lg:rounded-[5rem] relative group/card overflow-hidden cursor-default animate-float`}
                                style={{ animationDelay: `${i * 0.5}s` }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${lightGlow} via-transparent to-transparent pointer-events-none opacity-50 transition-opacity duration-700 group-hover/card:opacity-100`} />
                                <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${topGlow} to-transparent pointer-events-none`} />
                                <div className={`absolute top-10 right-10 md:top-16 md:right-16 ${iconColor} opacity-20 group-hover/card:opacity-100 group-hover/card:scale-110 transition-all duration-1000`}>
                                    <Icon className={`w-10 h-10 md:w-16 md:h-16 ${iconShadow}`} />
                                </div>

                                <div className="flex items-center gap-4 mb-8 md:mb-12 relative z-10">
                                    <div className={`text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.4em] md:tracking-[0.6em] font-mono ${taglineColor}`}>{product.tagline}</div>
                                </div>

                                <h3 className={`text-3xl md:text-5xl font-medium mb-6 md:mb-10 text-white font-outfit tracking-tighter group-hover/card:tracking-tight transition-all duration-1000 ${titleHover} leading-[1.1] relative z-10`}>{product.title}</h3>

                                <p className="text-lg md:text-xl text-slate/70 leading-relaxed mb-6 md:mb-8 flex-none font-light group-hover/card:text-white transition-colors duration-1000 tracking-tight relative z-10">
                                    {product.description}
                                </p>

                                <p className={`text-xs md:text-sm font-bold mb-10 md:mb-16 uppercase tracking-[0.2em] md:tracking-[0.3em] font-mono flex-none relative z-10 ${outcomeColor}`}>
                                    {product.outcome}
                                </p>

                                <div className="space-y-[32px] mb-16 md:mb-32 md:pr-12 relative md:border-l border-white/10 md:pl-12 flex-1 z-10">
                                    {product.features.map((item: string, j: number) => (
                                        <div key={item} className="flex flex-col gap-2 group/item">
                                            <div className="flex items-center gap-4 md:gap-6">
                                                <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-700 ${dotBase} ${dotHover}`} />
                                                <span className="text-white/60 group-hover/item:text-white transition-colors duration-700 tracking-[0.2em] font-medium relative z-10 uppercase text-[10px] md:text-[11px] font-mono group-hover/item:translate-x-3 transition-transform">{item}</span>
                                            </div>
                                            <div className={`w-0 h-px bg-gradient-to-r ${lineGradient} to-transparent group-hover/item:w-full transition-all duration-1000 mt-1 ml-6 md:ml-8`} />
                                        </div>
                                    ))}
                                </div>

                                {isAutoDrive ? (
                                    <a 
                                        href="https://autodrivecx.com" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className={`w-full py-6 md:py-9 bg-background/50 border border-white/10 rounded-full text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.3em] md:tracking-[0.45em] text-white hover:text-black transition-all duration-700 flex items-center justify-center gap-4 md:gap-8 group/btn relative overflow-hidden z-10 backdrop-blur-md ${btnHover}`}
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-700 opacity-20" />
                                        <span className="relative z-10">Deploy {product.title.split(" ")[0]}</span>
                                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-3 transition-transform duration-700 relative z-10" />
                                    </a>
                                ) : (
                                    <button className={`w-full py-6 md:py-9 bg-background/50 border border-white/10 rounded-full text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.3em] md:tracking-[0.45em] text-white hover:text-black transition-all duration-700 flex items-center justify-center gap-4 md:gap-8 group/btn relative overflow-hidden z-10 backdrop-blur-md ${btnHover}`}>
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-700 opacity-20" />
                                        <span className="relative z-10">Deploy {product.title.split(" ")[0]}</span>
                                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-3 transition-transform duration-700 relative z-10" />
                                    </button>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
