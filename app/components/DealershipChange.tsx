"use client";

import React from "react";
import { motion } from "framer-motion";

const beforeItems = [
    "Managers coach occasionally",
    "Consultants improvise",
    "Follow-up varies by salesperson",
    "CSI swings month to month",
];

const afterItems = [
    "Managers run weekly CX reinforcement cycles",
    "Consultants follow a structured discovery framework",
    "Follow-up becomes standardized",
    "CSI stabilizes",
];

export const DealershipChange = () => {
    return (
        <section className="py-24 md:py-[120px] bg-background relative overflow-hidden border-b border-white/5">
            <div className="absolute inset-0 bg-dot-grid opacity-[0.03] pointer-events-none" />
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <h3 className="text-3xl md:text-5xl font-light tracking-tighter font-outfit text-white">
                            What Actually Changes in a Dealership
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="rounded-[2.2rem] border border-white/10 bg-white/[0.02] p-8 md:p-10"
                        >
                            <h4 className="text-lg md:text-xl font-bold uppercase tracking-[0.3em] font-mono text-slate/50 mb-6">
                                Before AutoKnerd
                            </h4>
                            <ul className="space-y-4">
                                {beforeItems.map((item) => (
                                    <li key={item} className="text-lg md:text-xl text-slate/70 tracking-tight">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="rounded-[2.2rem] border border-primary/20 bg-primary/[0.04] p-8 md:p-10"
                        >
                            <h4 className="text-lg md:text-xl font-bold uppercase tracking-[0.3em] font-mono text-primary mb-6">
                                After AutoKnerd
                            </h4>
                            <ul className="space-y-4">
                                {afterItems.map((item) => (
                                    <li key={item} className="text-lg md:text-xl text-white/85 tracking-tight">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
