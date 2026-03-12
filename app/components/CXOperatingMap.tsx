"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const journeySteps = [
    "Customer Arrival",
    "Greeting",
    "Discovery",
    "Vehicle Experience",
    "Decision Guidance",
    "Delivery",
    "Customer Trust",
];

const resultItems = [
    "Stable CSI",
    "Consistent Consultant Performance",
    "Higher Customer Trust",
];

export const CXOperatingMap = () => {
    return (
        <section className="py-28 md:py-[140px] bg-background relative overflow-hidden border-b border-white/5">
            <div className="absolute inset-0 bg-dot-grid opacity-[0.03] pointer-events-none" />
            <div className="absolute inset-0 bg-mesh-gradient opacity-20 pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="max-w-6xl mx-auto text-center mb-10 md:mb-14">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter font-outfit text-white mb-6">
                        The AutoKnerd CX Operating Map
                    </h2>
                    <p className="text-lg md:text-2xl text-slate/70 tracking-tight">
                        How behavioral systems stabilize every stage of the dealership experience.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
                    <div className="luxury-card rounded-[2rem] md:rounded-[2.4rem] p-6 md:p-8 border-primary/20">
                        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold font-mono text-primary/70 mb-3">
                            Manager Reinforcement System
                        </p>
                        <p className="text-base md:text-lg text-slate/65 tracking-tight">
                            weekly coaching and behavior tracking
                        </p>
                    </div>

                    <div className="luxury-card rounded-[2rem] md:rounded-[2.6rem] p-4 md:p-5 overflow-x-auto">
                        <div className="min-w-[980px]">
                            <div className="flex items-center gap-2 md:gap-3">
                                {journeySteps.map((step, index) => (
                                    <React.Fragment key={step}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.06 }}
                                            viewport={{ once: true }}
                                            className="rounded-2xl border border-white/10 bg-white/[0.02] px-3 md:px-4 py-3 md:py-4 text-center min-w-[118px] md:min-w-[126px]"
                                        >
                                            <span className="text-sm md:text-base text-white/85 leading-snug tracking-tight block">
                                                {step}
                                            </span>
                                        </motion.div>
                                        {index < journeySteps.length - 1 && (
                                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-primary/50 shrink-0" />
                                        )}
                                    </React.Fragment>
                                ))}
                                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-primary/70 shrink-0" />
                                <div className="rounded-2xl border border-primary/30 bg-primary/[0.06] px-4 py-4 min-w-[206px]">
                                    <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold font-mono text-primary mb-3">
                                        Result
                                    </p>
                                    <ul className="space-y-2">
                                        {resultItems.map((item) => (
                                            <li key={item} className="text-sm md:text-base text-white/90 tracking-tight">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="luxury-card rounded-[2rem] md:rounded-[2.4rem] p-6 md:p-8 border-primary/20">
                        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold font-mono text-primary/70 mb-3">
                            AutoDriveCX Skill Development
                        </p>
                        <p className="text-base md:text-lg text-slate/65 tracking-tight">
                            consultant drills and conversation training
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
