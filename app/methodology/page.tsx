"use client";

import React from "react";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Settings, Zap, Target, Rocket, BarChart2, Activity } from "lucide-react";

const MethodologyPage = () => {
    return (
        <main className="min-h-screen bg-background selection:bg-primary selection:text-black overflow-hidden relative">
            <Navbar />

            {/* Hero Section / Introduction */}
            <section className="py-[120px] md:py-[140px] relative overflow-hidden">
                <div className="bg-dot-grid absolute inset-0 opacity-[0.03] pointer-events-none" />
                
                <div className="container mx-auto px-6 md:px-12 relative z-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-4 md:gap-6 text-primary mb-[48px] group cursor-default">
                            <div className="h-px w-24 bg-primary/40" />
                            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.8em] font-mono whitespace-nowrap">Methodology Foundation</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-light leading-[1.05] mb-[32px] tracking-tighter font-outfit">
                            The AutoKnerd <span className="text-white font-medium italic">Methodology.</span>
                        </h1>

                        <h2 className="text-2xl md:text-4xl text-primary font-light mb-[60px] tracking-tight font-outfit opacity-80">
                            Behavioral Systems for Predictable Customer Experience
                        </h2>

                        <div className="max-w-4xl space-y-8 border-l border-primary/20 pl-8 md:pl-12">
                            <p className="text-xl md:text-2xl text-slate/80 leading-relaxed font-light tracking-tight">
                                Traditional dealership improvement is reactive, temporary, and emotional. 
                            </p>
                            <p className="text-xl md:text-2xl text-slate/80 leading-relaxed font-light tracking-tight">
                                AutoKnerd replaces individual heroics with behavioral infrastructure that functions like a reliable operating system.
                            </p>
                            <p className="text-xl md:text-2xl text-white font-medium italic leading-relaxed tracking-tight">
                                The goal is simple: stabilize the behaviors that create predictable customer trust.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Framework Cards Section */}
            <section className="py-[120px] md:py-[160px] bg-black/50 relative border-y border-white/5 backdrop-blur-xl overflow-hidden">
                <div className="bg-blueprint absolute inset-0 opacity-[0.02] pointer-events-none" />
                
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                        {[
                            {
                                title: "Reliability",
                                text: "Ensuring every customer receives the same trust-driven experience regardless of which consultant they work with."
                            },
                            {
                                title: "Observability",
                                text: "Measuring behavioral consistency across the showroom through structured manager execution metrics."
                            },
                            {
                                title: "Scalability",
                                text: "Building systems that function regardless of turnover, store size, or individual star performers."
                            }
                        ].map((pillar, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="bg-white/[0.01] border border-white/10 p-12 rounded-[2rem] flex flex-col items-start text-left shadow-sm hover:bg-white/[0.04] transition-all duration-300"
                            >
                                <h3 className="text-2xl md:text-3xl font-medium text-white mb-6 font-outfit tracking-tighter">{pillar.title}</h3>
                                <p className="text-lg md:text-xl text-slate/50 leading-relaxed font-light tracking-tight">{pillar.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Trust Equation */}
            <section className="py-[140px] md:py-[240px] relative overflow-hidden bg-background">
                <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-7xl mx-auto py-24 md:py-32"
                    >
                        <div className="flex flex-col items-center justify-center text-center">
                            <h3 className="text-4xl md:text-7xl lg:text-8xl font-light text-white mb-6 md:mb-10 tracking-tighter font-outfit">
                                Logic + Authenticity
                            </h3>
                            <div className="text-primary text-4xl md:text-6xl font-mono mb-6 md:mb-10 opacity-30">×</div>
                            <h3 className="text-4xl md:text-7xl lg:text-8xl font-medium text-primary italic mb-12 md:mb-16 tracking-tighter font-outfit">
                                Behavioral Stabilization
                            </h3>
                            
                            {/* Visual Separator as a divider */}
                            <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-16 md:mb-24" />

                            <h3 className="text-6xl md:text-9xl lg:text-[14rem] font-bold text-white mb-16 md:mb-24 tracking-tighter font-outfit leading-none">
                                Predictable Customer Trust
                            </h3>
                            
                            <p className="text-xl md:text-3xl text-slate/40 font-light leading-relaxed max-w-4xl mx-auto tracking-tight">
                                &quot;Trust is not random. It is the outcome of consistent behavior that customers can understand and rely on.&quot;
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* The Behavioral Stability Model */}
            <section id="behavioral-model" className="py-[120px] md:py-[180px] bg-black/30 relative border-y border-white/5 overflow-hidden">
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center max-w-4xl mx-auto mb-20 md:mb-32">
                        <h2 className="text-4xl md:text-6xl font-light text-white mb-6 font-outfit tracking-tighter">The Behavioral Stability Model</h2>
                        <h3 className="text-xl md:text-2xl text-primary font-light tracking-wide uppercase opacity-70 mb-12">Why Systems Outperform Training</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                            <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-8">
                                <p className="text-[11px] text-primary uppercase tracking-[0.3em] font-bold font-mono mb-4">Problem</p>
                                <p className="text-lg text-slate/60 leading-relaxed">Dealership CX becomes inconsistent because execution varies by person and by day.</p>
                            </div>
                            <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-8">
                                <p className="text-[11px] text-primary uppercase tracking-[0.3em] font-bold font-mono mb-4">Why Training Fails</p>
                                <p className="text-lg text-slate/60 leading-relaxed">Training creates temporary awareness, not permanent behavior. Without reinforcement, old habits return.</p>
                            </div>
                            <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-8">
                                <p className="text-[11px] text-primary uppercase tracking-[0.3em] font-bold font-mono mb-4">What AutoKnerd Installs</p>
                                <p className="text-lg text-slate/60 leading-relaxed">Manager-led behavioral systems with weekly coaching protocols, scorecards, and accountability loops.</p>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-4 relative">
                            {[
                                { label: "Behavior", icon: Activity },
                                { label: "Manager Reinforcement", icon: Settings },
                                { label: "Behavior Consistency", icon: Target },
                                { label: "Customer Trust", icon: Shield },
                                { label: "Dealership Performance", icon: BarChart2 }
                            ].map((step, i) => (
                                <div key={i} className="flex flex-col items-center gap-6 relative z-10 w-full md:w-auto group">
                                    <motion.div 
                                        whileHover={{ scale: 1.1 }}
                                        className="w-24 h-24 rounded-full bg-background border border-white/10 flex items-center justify-center text-primary group-hover:border-primary transition-all duration-700 shadow-2xl relative"
                                    >
                                        <step.icon size={36} className="opacity-30 group-hover:opacity-100 transition-opacity" />
                                        {/* Animated pulse effect for the core nodes */}
                                        <div className="absolute inset-x-0 inset-y-0 rounded-full border border-primary/20 animate-ping opacity-0 group-hover:opacity-40" />
                                    </motion.div>
                                    <div className="text-center">
                                        <span className="text-sm md:text-base font-medium text-white/70 tracking-tight block max-w-[120px] mx-auto uppercase">
                                            {step.label}
                                        </span>
                                    </div>
                                    {i < 4 && (
                                        <div className="flex items-center justify-center text-white/20 py-4 group-hover:text-primary transition-colors duration-700">
                                            <div className="hidden md:block w-24 h-[1px] bg-gradient-to-r from-white/10 to-transparent absolute left-[110%] top-1/2 -translate-y-1/2 pointer-events-none" />
                                            <Zap size={24} className="md:hidden" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-20 md:mt-32 text-center space-y-4">
                            <p className="text-xl md:text-2xl text-white font-medium italic tracking-tight opacity-90 border-t border-white/5 pt-12 md:pt-16 max-w-4xl mx-auto">
                                &quot;Stable behavior produces stable customer experiences. Stable customer experiences produce stable business results.&quot;
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Implementation Timeline */}
            <section className="py-[120px] md:py-[180px] border-t border-white/5 bg-background relative overflow-hidden">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="mb-24 md:mb-32 max-w-4xl text-left">
                        <div className="flex items-center gap-3 text-primary mb-6">
                            <span className="h-px w-8 bg-primary/40" />
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Standard Deployment Roadmap</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-light text-white font-outfit tracking-tighter">System Implementation Process.</h2>
                        <p className="text-xl md:text-2xl text-slate/40 mt-8 font-light tracking-tight">A repeatable methodology for architectural stabilization of dealership CX.</p>
                    </div>

                    <div className="relative">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative z-10">
                            {[
                                { 
                                    step: "01", 
                                    title: "Diagnostic Audit", 
                                    details: "Evaluation of behavioral gaps and performance leaks in the current dealership journey." 
                                },
                                { 
                                    step: "02", 
                                    title: "Core Deployment", 
                                    details: "Installation of AutoForge manager systems and AutoDriveCX behavioral development hooks." 
                                },
                                { 
                                    step: "03", 
                                    title: "Calibration", 
                                    details: "Refining reinforcement protocols and store leadership alignment for long-term consistency." 
                                },
                                { 
                                    step: "04", 
                                    title: "Stabilization", 
                                    details: "Achieving consistent behavioral telemetry and predictable dealership CX outcomes." 
                                }
                            ].map((phase, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="relative group h-full"
                                >
                                    <div className="bg-white/[0.01] border border-white/10 p-10 md:p-8 rounded-[2.5rem] flex flex-col gap-8 h-full group-hover:bg-white/[0.03] transition-all duration-700">
                                        <div className="text-4xl md:text-5xl font-mono font-bold text-white/5 italic group-hover:text-primary/20 transition-colors duration-700">
                                            {phase.step}
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="text-2xl md:text-2xl font-medium text-white tracking-tighter font-outfit leading-tight group-hover:text-primary transition-colors duration-500">{phase.title}</h4>
                                            <p className="text-base md:text-lg text-slate/50 font-light leading-relaxed font-outfit tracking-tight">
                                                {phase.details}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Connection Arrows (Desktop) */}
                                    {i < 3 && (
                                        <div className="hidden lg:flex absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-20 text-white/10 group-hover:text-primary/40 transition-all duration-700">
                                            <Rocket size={24} className="rotate-90 opacity-20 group-hover:opacity-100" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Outcome Reinforcement */}
                    <div className="mt-32 md:mt-48 text-center bg-white/[0.01] border border-white/5 py-16 md:py-24 rounded-[3rem]">
                        <p className="text-xl md:text-3xl text-primary/60 font-light italic tracking-tight max-w-4xl mx-auto px-6 leading-relaxed">
                            &quot;Dealerships implementing the AutoKnerd methodology typically stabilize CX behavior within 90 days of system deployment.&quot;
                        </p>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-[120px] md:py-[180px] bg-primary relative overflow-hidden group/final text-center">
                <div className="absolute inset-0 bg-blueprint opacity-[0.05]" />
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <h2 className="text-5xl md:text-[8rem] lg:text-[10rem] font-light text-black mb-[48px] tracking-tighter leading-[0.9] font-outfit">
                        Stabilize Your <br className="hidden md:block" />
                        <span className="font-medium italic">Customer Experience.</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-6 md:gap-10">
                        <button className="bg-black text-white px-10 md:px-16 py-5 md:py-7 rounded-full font-extrabold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-[11px] flex items-center justify-center transition-all duration-700 shadow-2xl active:scale-95 border border-black hover:bg-white hover:text-black hover:border-white">
                            Book Strategy Call
                        </button>
                        <Link href="#behavioral-model" className="flex items-center justify-center text-black/70 hover:text-black px-10 md:px-16 py-5 md:py-7 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] transition-all border border-black/20 hover:border-black rounded-full active:scale-95">
                            Explore Methodology
                        </Link>
                    </div>
                </div>
            </section>


            <Footer />
        </main>
    );
};

export default MethodologyPage;
