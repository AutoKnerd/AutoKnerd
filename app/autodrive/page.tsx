"use client";

import React from "react";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { motion } from "framer-motion";
import { 
    Cpu, 
    ShieldCheck, 
    MessagesSquare, 
    Navigation, 
    RotateCcw, 
    FileText, 
    BarChart3, 
    Zap,
    ArrowUpRight,
    Search,
    BookOpen
} from "lucide-react";

const RadarScanner = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Radar Grid */}
            <div className="absolute inset-0 opacity-20">
                {[...Array(4)].map((_, i) => (
                    <div 
                        key={i} 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40"
                        style={{ width: `${(i + 1) * 25}%`, height: `${(i + 1) * 25}%` }}
                    />
                ))}
                <div className="absolute top-1/2 left-0 w-full h-px bg-primary/40" />
                <div className="absolute left-1/2 top-0 w-px h-full bg-primary/40" />
            </div>

            {/* Scanning Sweep */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 z-10 origin-center"
            >
                <div className="absolute top-0 left-1/2 -translate-x-full w-1/2 h-1/2 bg-gradient-to-tr from-primary/30 to-transparent origin-bottom-right rounded-tl-full blur-sm" />
                <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-primary shadow-[0_0_15px_rgba(124,255,27,0.8)]" />
            </motion.div>

            {/* CX Anomaly Targets */}
            {[
                { t: '25%', l: '35%', d: 0 },
                { t: '65%', l: '70%', d: 1.2 },
                { t: '40%', l: '20%', d: 2.5 },
                { t: '80%', l: '45%', d: 0.8 },
            ].map((p, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: p.d }}
                    className="absolute w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(124,255,27,1)] z-20"
                    style={{ top: p.t, left: p.l }}
                >
                    <div className="absolute -inset-2 rounded-full border border-primary/40 animate-ping" />
                </motion.div>
            ))}

            {/* Telemetry */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-30 font-mono">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-[8px] text-primary/60 uppercase tracking-widest">Scanning for Drift</span>
                    </div>
                    <span className="text-[10px] text-primary uppercase font-bold tracking-widest">CX ANOMALIES DETECTED</span>
                </div>
                <div className="text-[8px] text-primary/40 text-right">
                    LAT: 40.7128<br />LONG: -74.0060
                </div>
            </div>
        </div>
    );
};

const AutoDrivePage = () => {
    return (
        <main className="min-h-screen bg-background selection:bg-primary selection:text-black overflow-hidden relative">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-44 pb-24 md:pt-64 md:pb-44 relative overflow-hidden">
                <div className="bg-dot-grid absolute inset-0 opacity-[0.03] pointer-events-none" />
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[120vw] h-[120vh] bg-primary/5 blur-[160px] pointer-events-none -z-10" />
                
                <div className="container mx-auto px-6 md:px-12 relative z-20">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="flex items-center gap-4 md:gap-6 text-primary mb-12">
                                <div className="h-px w-24 bg-primary/40" />
                                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.8em] font-mono whitespace-nowrap">The Platform</span>
                            </div>

                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-light leading-[1.05] mb-10 tracking-tighter font-outfit text-white">
                                The Infrastructure of <br />
                                <span className="text-primary font-medium italic text-glow-green">Behavioral Stability.</span>
                            </h1>

                            <p className="text-xl md:text-3xl text-slate/60 font-light max-w-3xl leading-relaxed tracking-tight mb-16">
                                AutoDrive is the technical system designed to anchor dealership behavior and eliminate customer experience volatility.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <button className="bg-primary text-black px-12 py-6 rounded-full font-bold uppercase tracking-[0.4em] text-[11px] transition-all hover:bg-white active:scale-95 shadow-[0_0_40px_rgba(124,255,27,0.3)]">
                                    Start Training in AutoDrive
                                </button>
                                <a href="https://autodrivecx.com" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center border border-white/10 text-white/60 hover:text-white px-12 py-6 rounded-full font-bold uppercase tracking-[0.4em] text-[11px] transition-all hover:border-primary/40 bg-white/[0.02]">
                                    Learn More at AutoDriveCX.com
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Dealership CX Breaks Down */}
            <section className="py-24 md:py-44 bg-black/50 relative border-y border-white/5 backdrop-blur-xl overflow-hidden">
                <div className="absolute inset-0 bg-blueprint opacity-[0.03] pointer-events-none" />
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            <div className="flex items-center gap-4 text-primary mb-8">
                                <span className="h-px w-8 bg-primary/40" />
                                <span className="text-[10px] uppercase tracking-[0.4em] font-bold font-mono">Systemic Failure</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-light text-white mb-10 font-outfit tracking-tighter leading-tight">
                                Why Dealership CX <br />Eventually Breaks Down.
                            </h2>
                            <div className="space-y-8 text-lg md:text-xl text-slate/50 font-light leading-relaxed">
                                <p>
                                    Most dealerships do not have an effort problem; they have a <strong>behavioral drift</strong> problem. Training is often treated as an event—a weekend workshop or a guest speaker.
                                </p>
                                <p>
                                    For a few weeks, performance improves. But without a functional reinforcement system, teams slowly drift back to their default habits. Consistency is lost because the dealership lacks the mechanical infrastructure to anchor behavior.
                                </p>
                                <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 italic text-white/80">
                                    &quot;Training creates awareness. Systems create inevitability.&quot;
                                </div>
                            </div>
                        </motion.div>

                        <div className="relative">
                            <div className="aspect-square rounded-[3.5rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 p-1 rounded-3xl overflow-hidden">
                                <div className="h-full w-full bg-background rounded-[3.3rem] relative flex items-center justify-center overflow-hidden border border-white/5 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
                                    <RadarScanner />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Consultant Skill Development */}
            <section className="py-24 md:py-44 relative bg-background">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-12">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-4 text-primary mb-8">
                                <span className="h-px w-8 bg-primary/40" />
                                <span className="text-[10px] uppercase tracking-[0.4em] font-bold font-mono">Phase 01: Consultant</span>
                            </div>
                            <h2 className="text-4xl md:text-7xl font-light text-white font-outfit tracking-tighter">AutoDrive: Skill <br /><span className="text-primary italic">Mechanics.</span></h2>
                        </div>
                        <p className="text-xl text-slate/50 font-light max-w-md leading-relaxed">
                            Moving beyond scripts to behavioral mastery through structured showroom scenario practice.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: Search,
                                title: "Discovery Conversations",
                                text: "Uncovering actual customer situational needs beyond simple features and benefits."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Trust-Driven CX",
                                text: "Implementing clear, low-anxiety language that builds confidence and reduces friction."
                            },
                            {
                                icon: Navigation,
                                title: "Vehicle Guidance",
                                text: "Positioning consultants as expert advisors who guide the journey rather than just show stock."
                            },
                            {
                                icon: MessagesSquare,
                                title: "Follow-Up Precision",
                                text: "Automating the behavioral prompts that ensure lead treatment remains consistent and professional."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-green p-10 rounded-[2.5rem] border border-white/5 flex flex-col gap-8 group hover:border-primary/20 transition-all duration-500"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-black/40 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-medium text-white font-outfit">{item.title}</h3>
                                    <p className="text-slate/50 font-light leading-relaxed text-sm">{item.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AutoForge - Manager Reinforcement */}
            <section className="py-24 md:py-44 relative overflow-hidden bg-black">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-primary/5 blur-[150px] pointer-events-none" />
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="max-w-7xl mx-auto rounded-[4rem] border border-white/10 bg-white/[0.02] p-12 md:p-24 backdrop-blur-3xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div className="order-2 lg:order-1">
                                <div className="flex items-center gap-4 text-primary mb-8">
                                    <Zap className="w-5 h-5" />
                                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold font-mono text-glow-green">Phase 02: AutoForge</span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-light text-white mb-8 font-outfit tracking-tighter">The Manager <br />Operating System.</h2>
                                <p className="text-xl text-slate/50 font-light leading-relaxed mb-12">
                                    AutoForge is a built-in manager system within AutoDrive that generates custom CX development programs tailored to your store&apos;s specific challenges.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    {[
                                        { icon: BookOpen, title: "Coaching Frameworks", text: "Step-by-step 1-on-1 guides." },
                                        { icon: Cpu, title: "Behavior Drills", text: "10-minute huddle exercises." },
                                        { icon: FileText, title: "Custom Packets", text: "Tailored team training kits." },
                                        { icon: BarChart3, title: "Scorecards", text: "Objective execution metrics." }
                                    ].map((feat, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="mt-1 text-primary"><feat.icon className="w-5 h-5" /></div>
                                            <div>
                                                <h4 className="text-white font-medium mb-1">{feat.title}</h4>
                                                <p className="text-xs text-slate/50 leading-relaxed">{feat.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="order-1 lg:order-2">
                                <motion.div 
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 1 }}
                                    className="relative aspect-square glass rounded-[3rem] border border-primary/20 flex flex-col items-center justify-center p-12 text-center"
                                >
                                    <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center border-b border-white/5">
                                        <div className="flex gap-2">
                                            <div className="w-2 h-2 rounded-full bg-red-500/40" />
                                            <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                                            <div className="w-2 h-2 rounded-full bg-green-500/40" />
                                        </div>
                                        <div className="text-[8px] font-mono text-primary/40 uppercase tracking-widest">AutoForge Dynamic Compiler</div>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(124,255,27,0.2)]">
                                            <Cpu className="w-10 h-10 text-primary animate-pulse" />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-2xl text-white font-outfit font-light tracking-tight">Reinforcement Packet</div>
                                            <div className="text-[10px] font-mono text-primary uppercase tracking-[0.4em]">Compiling Data...</div>
                                        </div>
                                    </div>
                                    
                                    {/* Mock Progress Bars */}
                                    <div className="absolute bottom-12 left-12 right-12 space-y-4">
                                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "85%" }}
                                                transition={{ duration: 2, delay: 0.5 }}
                                                className="h-full bg-primary" 
                                            />
                                        </div>
                                        <div className="flex justify-between text-[8px] font-mono text-slate/50">
                                            <span>STABILITY RATING</span>
                                            <span className="text-primary">85.4%</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How the System Works Together */}
            <section className="py-24 md:py-44 relative border-t border-white/5">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-4xl mx-auto text-center mb-32">
                        <h2 className="text-4xl md:text-6xl font-light text-white mb-8 font-outfit tracking-tighter leading-tight">Practice. Reinforcement. <br /><span className="text-primary italic">Stability.</span></h2>
                        <p className="text-xl text-slate/50 font-light leading-relaxed">Behavioral consistency is not accidental. It is the result of consultants practicing and managers anchoring.</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-stretch">
                        {[
                            { step: "01", label: "Consultants Practice", text: "Using AutoDrive scenarios, consultants develop the high-trust conversational habits required to reduce showroom friction." },
                            { step: "02", label: "Managers Reinforce", text: "Using AutoForge packets, managers run weekly coaching huddles to anchor behavior and prevent drift." },
                            { step: "03", label: "System Tracks", text: "AutoDrive captures execution telemetry, allowing leadership to observe stability levels in real-time." }
                        ].map((item, i) => (
                            <div key={i} className="flex-1 p-12 rounded-[3.5rem] bg-white/[0.01] border border-white/5 relative overflow-hidden group">
                                <div className="text-6xl font-outfit font-bold text-white/[0.03] absolute top-8 right-8">{item.step}</div>
                                <h3 className="text-2xl text-white font-outfit mb-6 relative z-10">{item.label}</h3>
                                <p className="text-slate/50 font-light leading-relaxed text-sm relative z-10">{item.text}</p>
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact - Before/After */}
            <section className="py-24 md:py-44 relative bg-black/40 border-y border-white/5">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-[4rem] overflow-hidden">
                        {/* Before */}
                        <div className="p-12 md:p-24 bg-background/50">
                            <div className="text-[10px] font-mono text-red-500/60 uppercase tracking-[0.4em] mb-12">Unstable Environment</div>
                            <h3 className="text-3xl md:text-4xl text-white font-outfit font-light mb-16 tracking-tight">Before AutoDrive</h3>
                            <ul className="space-y-8">
                                {[
                                    "Inconsistent Discovery Conversations",
                                    "Reactive, Unstructured Coaching",
                                    "Rapid Post-Training Skills Decay",
                                    "High Customer Friction & Anxiety"
                                ].map((bullet, i) => (
                                    <li key={i} className="flex items-start gap-4 text-slate/50">
                                        <XCircle className="w-5 h-5 text-red-500/40 shrink-0 mt-1" />
                                        <span className="font-light">{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* After */}
                        <div className="p-12 md:p-24 bg-primary/[0.01] relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8">
                                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                            </div>
                            <div className="text-[10px] font-mono text-primary uppercase tracking-[0.4em] mb-12">Stabilized System</div>
                            <h3 className="text-3xl md:text-4xl text-white font-outfit font-light mb-16 tracking-tight">After AutoDrive</h3>
                            <ul className="space-y-8">
                                {[
                                    "Structured High-Trust Conversations",
                                    "Weekly Manager Coaching Cycles",
                                    "Continuous Behavioral Reinforcement",
                                    "Predictable & Low-Friction CX"
                                ].map((bullet, i) => (
                                    <li key={i} className="flex items-start gap-4 text-white/90">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1 shadow-glow-green" />
                                        <span className="font-light">{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Closing CTA */}
            <section className="py-24 md:py-44 text-center relative">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            className="bg-white/[0.01] border border-white/5 p-16 md:p-24 rounded-[3.5rem] relative overflow-hidden group/cta"
                        >
                            <div className="absolute inset-0 bg-primary opacity-0 group-hover/cta:opacity-[0.02] transition-opacity duration-1000" />
                            <h2 className="text-4xl md:text-6xl font-light text-white mb-10 font-outfit tracking-tighter">
                                Install the infrastructure <br />of <span className="text-primary italic">predictable performance.</span>
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <button className="bg-primary text-black px-12 py-6 rounded-full font-bold uppercase tracking-[0.4em] text-[11px] transition-all hover:bg-white active:scale-95 shadow-[0_0_40px_rgba(124,255,27,0.3)]">
                                    Start Training in AutoDrive
                                </button>
                            </div>
                            <div className="mt-12">
                                <a href="https://autodrivecx.com" target="_blank" rel="noreferrer" className="text-[10px] font-mono text-slate/40 hover:text-primary transition-colors uppercase tracking-[0.4em] flex items-center justify-center gap-2 group">
                                    Explore Technical Specs at AutoDriveCX.com
                                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

// Simple icon fallbacks for the Before/After section
const XCircle = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
    </svg>
);

const CheckCircle2 = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
    </svg>
);

export default AutoDrivePage;
