"use client";

import React from "react";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { motion } from "framer-motion";
import { Shield, Settings, Zap, Target, Search, Rocket, BarChart2, Activity } from "lucide-react";

const MethodologyPage = () => {
    return (
        <main className="min-h-screen bg-background selection:bg-primary selection:text-black overflow-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-40 md:pt-64 pb-20 md:pb-32 relative overflow-hidden">
                <div className="perspective-grid opacity-20 pointer-events-none -z-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] bg-primary/10 blur-[250px] pointer-events-none -z-10 opacity-40 animate-slow-pulse" />

                <div className="container mx-auto px-6 md:px-12 relative z-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-4 md:gap-6 text-primary mb-8 md:mb-12 group cursor-default">
                            <div className="h-px w-12 md:w-20 bg-primary/40 group-hover:w-32 transition-all duration-1000" />
                            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.5em] md:tracking-[1em] font-mono group-hover:text-white transition-colors">Strategic_Engine_Core</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-9xl font-light leading-tight md:leading-none mb-8 md:mb-16 tracking-tighter font-outfit">
                            The <span className="text-white font-medium italic">AutoKnerd</span> <br />
                            <span className="text-primary italic">Methodology.</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate/80 leading-relaxed max-w-4xl font-light mb-12 md:mb-16 border-l border-primary/20 pl-6 md:pl-12">
                            Traditional dealership improvement is reactive, temporary, and emotional. Our methodology replaces individual heroics with behavioral infrastructure that functions exactly like robust software.
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Pillars */}
            <section className="py-20 md:py-32 bg-black/50 relative border-y border-white/5 backdrop-blur-3xl overflow-hidden">
                <div className="bg-blueprint absolute inset-0 opacity-10 pointer-events-none" />
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-24">
                        {[
                            {
                                title: "Reliability",
                                icon: Shield,
                                desc: "Ensuring every customer receives exactly the same trust-driven experience, regardless of which consultant they work with."
                            },
                            {
                                title: "Observability",
                                icon: Activity,
                                desc: "Measuring the behavioral consistency of the showroom floor in real-time through manager execution telemetry."
                            },
                            {
                                title: "Scalability",
                                icon: Settings,
                                desc: "Building systems that don't depend on a single manager or 'star' consultant, but on a repeatable, engineering-grade framework."
                            }
                        ].map((pillar, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className="glass p-8 md:p-12 lg:p-16 rounded-[2.5rem] md:rounded-[4rem] border-white/10 group cursor-default hover:bg-white/[0.02] transition-colors"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2rem] bg-primary/10 flex items-center justify-center mb-8 md:mb-12 group-hover:bg-primary transition-all duration-700">
                                    <pillar.icon className="w-8 h-8 md:w-10 md:h-10 text-primary group-hover:text-black transition-colors" />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-medium text-white mb-4 md:mb-6 font-outfit tracking-tighter">{pillar.title}</h3>
                                <p className="text-lg md:text-xl text-slate/60 leading-relaxed font-light">{pillar.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Trust Equation */}
            <section className="py-32 md:py-64 relative overflow-hidden">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <div className="flex items-center gap-4 md:gap-6 text-primary justify-center mb-12 md:mb-16">
                        <div className="h-px w-12 md:w-20 bg-primary/40" />
                        <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.5em] md:tracking-[1em] font-mono whitespace-nowrap">The_Trust_Equation</span>
                        <div className="h-px w-12 md:w-20 bg-primary/40" />
                    </div>

                    <h2 className="text-4xl md:text-6xl lg:text-9xl font-light mb-16 md:mb-24 font-outfit tracking-tighter transition-all duration-1000 leading-tight">
                        (Logic + <span className="text-white font-medium">Authenticity</span>) &times; <span className="text-primary italic">Stabilization</span> <br className="hidden md:block" />
                        <span className="text-white opacity-40">= Permanent CX Dominance</span>
                    </h2>

                    <div className="max-w-4xl mx-auto glass p-8 md:p-12 rounded-[2.5rem] md:rounded-[5rem] border-white/5 bg-white/[0.01]">
                        <p className="text-xl md:text-2xl text-slate font-light leading-relaxed">
                            Trust isn't a feeling. It's a calculated outcome of predictability. When a customer understands your logic and sees the same behavior from your team every time, trust becomes an inevitable system output.
                        </p>
                    </div>
                </div>
            </section>

            {/* Implementation Timeline */}
            <section className="py-24 md:py-64 border-t border-white/5 bg-fixed bg-dot-grid">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="mb-16 md:mb-32">
                        <h2 className="text-4xl md:text-6xl font-light text-white font-outfit tracking-tighter">System Implementation Process.</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                        {[
                            { step: "01", title: "Diagnostic Audit", details: "Evaluating existing behavioral gaps and performance leaks through a deep diagnostic study." },
                            { step: "02", title: "Core Deployment", details: "Installing the AutoForge manager framework and AutoDriveCX consultant training modules." },
                            { step: "03", title: "Calibration", details: "Customizing reinforcement protocols for your specific store culture and regional dynamics." },
                            { step: "04", title: "Stabilization", details: "Achieving consistent behavioral execution metrics above the 90th percentile." }
                        ].map((phase, i) => (
                            <div key={i} className="flex flex-col gap-4 md:gap-8 group">
                                <div className="text-6xl md:text-8xl font-black text-white/5 group-hover:text-primary/10 transition-colors duration-1000 font-outfit">{phase.step}</div>
                                <h4 className="text-2xl md:text-3xl font-medium text-white tracking-tighter group-hover:text-primary transition-colors">{phase.title}</h4>
                                <p className="text-lg text-slate/50 font-light leading-relaxed group-hover:text-slate transition-colors">{phase.details}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 md:py-64 bg-primary relative overflow-hidden group/final text-center">
                <div className="absolute inset-0 bg-blueprint opacity-[0.05]" />
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <h2 className="text-4xl md:text-6xl lg:text-9xl font-light text-black mb-12 md:mb-16 tracking-tighter leading-tight font-outfit group-hover/final:scale-[1.02] transition-transform duration-1000">
                        Ready to <span className="font-medium italic">Engineer</span> Your Showroom Floor?
                    </h2>
                    <button className="bg-black text-white px-10 md:px-20 py-6 md:py-8 rounded-full font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-[12px] hover:scale-110 active:scale-95 transition-all duration-700 shadow-[0_45px_120px_-20px_rgba(0,0,0,0.5)]">
                        Book Your Strategy Call
                    </button>
                </div>
            </section>


            <Footer />
        </main>
    );
};

export default MethodologyPage;
