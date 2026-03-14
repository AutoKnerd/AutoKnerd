"use client";

import React from "react";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { STRATEGY_CALL_URL } from "@/app/lib/booking";
import { motion } from "framer-motion";
import { TrendingUp, Users, Activity, CheckCircle2 } from "lucide-react";

const CaseStudiesPage = () => {
    return (
        <main className="min-h-screen bg-background selection:bg-primary selection:text-black overflow-hidden relative">
            <Navbar />

            {/* Hero */}
            <section className="pt-44 pb-24 md:pt-64 md:pb-44 relative overflow-hidden">
                <div className="bg-dot-grid absolute inset-0 opacity-[0.03] pointer-events-none" />
                <div className="container mx-auto px-6 md:px-12 relative z-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-4 md:gap-6 text-primary mb-12 group cursor-default">
                            <div className="h-px w-24 bg-primary/40 group-hover:w-32 transition-all duration-1000" />
                            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.8em] font-mono whitespace-nowrap">Evidence of Impact</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-light leading-[1.05] mb-10 tracking-tighter font-outfit text-white">
                            Systems <br />
                            <span className="text-primary font-medium italic">in Action.</span>
                        </h1>
                        <p className="text-xl md:text-3xl text-slate/40 font-light max-w-3xl leading-relaxed tracking-tight">
                            Real-world results from dealerships that traded training events for behavioral systems.
                        </p>
                    </div>
                </div>
            </section>

            {/* Case Studies Grid */}
            <section className="pb-44">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 gap-12 lg:gap-24">
                        {[
                            {
                                id: "01",
                                title: "The Volatile Sales Floor",
                                situation: "A high-volume metro dealership struggling with erratic CSI scores and high sales-staff turnover.",
                                problem: "'Hero-based' performance. A few top performers carried the store, while the rest provided an inconsistent, low-trust experience.",
                                solution: "Installation of the AutoDrive Operational Platform. We mapped behavioral milestones and gave managers real-time telemetry.",
                                observation: "Managers moved from 'result-checking' to 'process-observing.' Team adherence to the guest greeting process increased from 42% to 94% in 60 days.",
                                impact: "CSI scores stabilized at the top 10% of the zone. Turnover decreased as the system provided clear expectations.",
                                icon: Activity
                            },
                            {
                                id: "02",
                                title: "Total Leadership Accountability",
                                situation: "A multi-point group where the owner felt disconnected from the daily operations of individual stores.",
                                problem: "Data fragmentation. Every manager had a different definition of 'good' service, leading to a disjointed brand experience.",
                                solution: "Group-wide AutoDrive integration with centralized behavioral metrics and a 'Common Language of Performance.'",
                                observation: "Managers across all stores began using the same coaching rubrics and behavioral tracking tools.",
                                impact: "The owner gained 100% observability into the 'internal health' of each store without needing to be physically present.",
                                icon: Users
                            },
                            {
                                id: "03",
                                title: "Bridging the Training Gap",
                                situation: "A premium brand dealership that invested heavily in OEM training but saw zero retention of new skills.",
                                problem: "Knowledge without reinforcement. Staff attended classes but returned to a system that didn't measure the new behaviors.",
                                solution: "AutoForge Behavior Challenges. Translating OEM standards into week-long, manager-led challenges.",
                                observation: "Daily reinforcement turned abstract concepts into muscle memory. Managers used 5-minute 'Mechanical Reinforcements' every morning.",
                                impact: "OEM certification scores reached an all-time high, and the 'gap' between knowledge and execution was closed.",
                                icon: TrendingUp
                            }
                        ].map((study, i) => (
                            <motion.div
                                key={study.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true }}
                                className="relative group"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                                    <div className="lg:col-span-4 sticky top-32">
                                        <div className="text-5xl md:text-7xl font-mono font-bold text-white/5 mb-8 group-hover:text-primary/20 transition-colors duration-700">{study.id}</div>
                                        <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 group-hover:bg-primary/[0.02] group-hover:border-primary/20 transition-all duration-700">
                                            <study.icon className="w-12 h-12 text-primary mb-8" />
                                            <h2 className="text-3xl md:text-4xl font-medium text-white font-outfit tracking-tight mb-4">{study.title}</h2>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3 text-primary/60">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    <span className="text-[10px] font-mono uppercase tracking-widest leading-none">System Active</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-8 space-y-12">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                            <div className="space-y-4">
                                                <h4 className="text-[10px] font-mono text-primary uppercase tracking-[0.4em]">Dealership Situation</h4>
                                                <p className="text-xl text-white font-light leading-relaxed">{study.situation}</p>
                                            </div>
                                            <div className="space-y-4">
                                                <h4 className="text-[10px] font-mono text-slate/40 uppercase tracking-[0.4em]">The CX Problem</h4>
                                                <p className="text-lg text-slate/50 font-light leading-relaxed">{study.problem}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="p-10 md:p-14 rounded-[3rem] bg-white/[0.01] border border-white/5 relative overflow-hidden group/inner">
                                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                                            <div className="space-y-12 relative z-10">
                                                <div className="space-y-4">
                                                    <h4 className="text-[10px] font-mono text-primary uppercase tracking-[0.4em]">What AutoKnerd Installed</h4>
                                                    <p className="text-xl md:text-2xl text-white font-medium italic tracking-tight">{study.solution}</p>
                                                </div>
                                                <div className="h-px w-full bg-white/5" />
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                                    <div className="space-y-4">
                                                        <h4 className="text-[10px] font-mono text-slate/40 uppercase tracking-[0.4em]">Behavior Change Observed</h4>
                                                        <p className="text-lg text-slate/50 font-light leading-relaxed">{study.observation}</p>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <h4 className="text-[10px] font-mono text-primary uppercase tracking-[0.4em]">Business Impact</h4>
                                                        <p className="text-lg text-white font-medium leading-relaxed">{study.impact}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {i < 2 && (
                                    <div className="mt-24 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final Outcome */}
            <section className="py-24 md:py-44 border-t border-white/5 bg-black/30 text-center">
                <div className="container mx-auto px-6 md:px-12">
                    <p className="text-2xl md:text-3xl text-slate/40 font-light italic max-w-4xl mx-auto tracking-tight leading-relaxed">
                        &quot;Consistent results are the byproduct of consistent systems. We don&apos;t hope for better behavior—<span className="text-white">we install the architecture that ensures it.&quot;</span>
                    </p>
                    <div className="mt-16">
                        <a href={STRATEGY_CALL_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center bg-primary text-black px-12 py-6 rounded-full font-bold uppercase tracking-[0.4em] text-[11px] transition-all hover:bg-white active:scale-95">
                            Book Your System Audit
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default CaseStudiesPage;
