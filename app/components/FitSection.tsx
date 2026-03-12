"use client";

import React from "react";
import { motion } from "framer-motion";

const fitSignals = [
    "CSI scores fluctuate month to month",
    "Sales consultants follow different processes",
    "Managers want to coach more but lack a system",
    "Discovery conversations are inconsistent",
    "Follow-up varies by salesperson",
    "Customers feel pressure instead of guidance",
];

export const FitSection = () => {
    return (
        <section className="py-32 md:py-[140px] bg-background relative overflow-hidden border-t border-white/5">
            <div className="absolute inset-0 bg-dot-grid opacity-[0.03] pointer-events-none" />
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <div className="flex items-center justify-center gap-4 md:gap-6 text-primary mb-8 md:mb-10">
                            <div className="h-px w-16 md:w-24 bg-primary/30" />
                            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.5em] md:tracking-[0.7em] font-mono">
                                Dealership Fit
                            </span>
                            <div className="h-px w-16 md:w-24 bg-primary/30" />
                        </div>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter font-outfit text-white mb-6">
                            Is AutoKnerd Right for Your Dealership?
                        </h2>
                        <p className="text-xl md:text-2xl text-slate/70 leading-relaxed tracking-tight max-w-4xl mx-auto">
                            AutoKnerd works best for dealerships that recognize behavior inconsistency is hurting customer experience.
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 md:p-12 lg:p-14"
                    >
                        <p className="text-base md:text-lg text-slate/60 mb-8 md:mb-10 tracking-tight">
                            You may be a strong fit if your store is experiencing any of the following:
                        </p>

                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-12 md:mb-14">
                            {fitSignals.map((item) => (
                                <li key={item} className="flex items-start gap-4">
                                    <span className="w-5 h-5 border border-primary/40 rounded-sm mt-1 shrink-0" />
                                    <span className="text-lg md:text-xl text-white/85 leading-relaxed tracking-tight">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="space-y-5 md:space-y-6 border-t border-white/10 pt-8 md:pt-10">
                            <p className="text-xl md:text-2xl text-slate/70 tracking-tight">These problems rarely come from effort.</p>
                            <p className="text-2xl md:text-3xl text-white font-medium tracking-tight">
                                They come from a missing behavioral system.
                            </p>
                            <p className="text-lg md:text-xl text-slate/70 leading-relaxed tracking-tight max-w-4xl">
                                AutoKnerd installs the manager-led reinforcement structure that stabilizes these behaviors across the dealership.
                            </p>
                        </div>

                        <div className="mt-10 md:mt-12">
                            <button className="bg-primary hover:bg-white text-black px-10 md:px-16 py-5 md:py-7 rounded-full font-extrabold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-[11px] flex items-center justify-center transition-all duration-700 shadow-2xl active:scale-95 border border-primary">
                                Book Strategy Call
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
