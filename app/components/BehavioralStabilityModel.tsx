"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const modelSteps = [
    {
        title: "Manager Reinforcement",
        description: "Weekly coaching and behavioral reinforcement by managers.",
    },
    {
        title: "Behavior Consistency",
        description: "Consultants follow repeatable CX behaviors.",
    },
    {
        title: "Customer Trust",
        description: "Customers experience clarity, confidence, and guidance.",
    },
    {
        title: "Dealership Performance",
        description: "CSI stabilizes, consultant performance improves, and referrals increase.",
    },
];

export const BehavioralStabilityModel = () => {
    return (
        <section className="py-28 md:py-[140px] bg-background relative overflow-hidden border-b border-white/5">
            <div className="absolute inset-0 bg-dot-grid opacity-[0.03] pointer-events-none" />
            <div className="absolute inset-0 bg-mesh-gradient opacity-20 pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter font-outfit text-white mb-6">
                        The AutoKnerd Behavioral Stability Model
                    </h2>
                    <p className="text-lg md:text-2xl text-slate/70 tracking-tight">
                        How consistent behavior creates predictable dealership performance.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    {modelSteps.map((step, index) => (
                        <div key={step.title} className="flex flex-col items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: index * 0.08 }}
                                viewport={{ once: true }}
                                className="w-full luxury-card rounded-[2rem] md:rounded-[2.4rem] p-8 md:p-10 text-left border-white/10 hover:border-primary/35 hover:bg-[linear-gradient(135deg,rgba(124,255,27,0.14)_0%,rgba(124,255,27,0.04)_100%)] hover:shadow-[0_30px_80px_rgba(124,255,27,0.16),inset_0_0_0_1px_rgba(124,255,27,0.2),inset_0_0_24px_rgba(124,255,27,0.08)] transition-all duration-700"
                            >
                                <div className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold font-mono text-primary/70 mb-4">
                                    Step 0{index + 1}
                                </div>
                                <h3 className="text-2xl md:text-3xl text-white font-medium tracking-tight mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-lg md:text-xl text-slate/65 leading-relaxed tracking-tight">
                                    {step.description}
                                </p>
                            </motion.div>

                            {index < modelSteps.length - 1 && (
                                <div className="py-5 md:py-6 text-primary/55">
                                    <ArrowDown className="w-6 h-6 md:w-7 md:h-7" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <p className="max-w-4xl mx-auto text-center mt-14 md:mt-16 text-xl md:text-2xl text-white/90 font-light tracking-tight">
                    Consistent behavior creates predictable customer trust. Predictable trust creates stable dealership performance.
                </p>
            </div>
        </section>
    );
};
