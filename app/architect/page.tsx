"use client";

import React from "react";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { STRATEGY_CALL_URL } from "@/app/lib/booking";
import { motion } from "framer-motion";
import { Shield, Brain, Layers, Cpu, Target, Globe, CircuitBoard } from "lucide-react";

const AnimatedSystemIcon = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden bg-black/40">
            {/* Technical Grid Background */}
            <div className="absolute inset-0 bg-blueprint opacity-10 pointer-events-none" />
            
            {/* Rotating Technical Rings */}
            {[1, 0.8, 0.6].map((scale, i) => (
                <motion.div
                    key={i}
                    animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                    transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
                    className="absolute rounded-full border border-primary/10 border-dashed"
                    style={{ 
                        width: `${scale * 100}%`, 
                        height: `${scale * 100}%`,
                        borderWidth: '1px'
                    }}
                />
            ))}

            {/* Custom SVG Circuit Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 500">
                <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="#7CFF1B" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>
                <motion.path
                    d="M 50,100 L 100,100 L 150,150 L 150,250 M 350,100 L 300,100 L 250,150 L 250,250 M 50,400 L 100,400 L 150,350 L 150,250 M 350,400 L 300,400 L 250,350 L 250,250"
                    fill="none"
                    stroke="url(#lineGrad)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Data Nodes */}
                {[
                    { x: 50, y: 100 }, { x: 350, y: 100 },
                    { x: 50, y: 400 }, { x: 350, y: 400 }
                ].map((pos, i) => (
                    <motion.circle
                        key={i}
                        cx={pos.x}
                        cy={pos.y}
                        r="3"
                        fill="#7CFF1B"
                        animate={{ opacity: [0.2, 1, 0.2], r: [3, 5, 3] }}
                        transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                    />
                ))}
            </svg>

            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                {/* Brain Icon Layer */}
                <motion.div
                    animate={{ 
                        opacity: [0, 1, 1, 0],
                        scale: [0.8, 1, 1, 0.8],
                        filter: ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]
                    }}
                    transition={{ 
                        duration: 8, 
                        repeat: Infinity, 
                        times: [0, 0.1, 0.45, 0.55],
                        ease: "anticipate"
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Brain className="w-full h-full text-primary/30" strokeWidth={0.5} />
                    <motion.div 
                        animate={{ opacity: [0, 0.5, 0] }}
                        transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 2 }}
                        className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"
                    />
                </motion.div>

                {/* Circuit Board / CPU Layer */}
                <motion.div
                    animate={{ 
                        opacity: [0, 0, 1, 1, 0],
                        scale: [0.8, 0.8, 1, 1, 0.8],
                        filter: ["blur(10px)", "blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]
                    }}
                    transition={{ 
                        duration: 8, 
                        repeat: Infinity, 
                        times: [0, 0.45, 0.55, 0.9, 1],
                        ease: "anticipate"
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <CircuitBoard className="w-full h-full text-primary/30" strokeWidth={0.5} />
                    {/* Pulsing Core */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute w-1/3 h-1/3 bg-primary/20 rounded-lg blur-2xl"
                    />
                </motion.div>
                
                {/* Data Streaming Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ 
                                y: [-20, 20], 
                                x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                                opacity: [0, 1, 0] 
                            }}
                            transition={{ 
                                duration: 2 + Math.random() * 2, 
                                repeat: Infinity,
                                delay: Math.random() * 2 
                            }}
                            className="absolute w-px h-8 bg-gradient-to-t from-transparent via-primary/40 to-transparent"
                        />
                    ))}
                </div>
            </div>

            {/* Matrix-like side readouts (decorative) */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 font-mono text-[8px] text-primary/20 uppercase tracking-widest hidden md:flex">
                <span>Core: Active</span>
                <span>Sys: Stable</span>
                <span>Buffer: Opt</span>
                <div className="h-px w-10 bg-primary/20" />
                <span>88.2.1.09</span>
            </div>

            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 font-mono text-[8px] text-primary/20 uppercase tracking-widest text-right hidden md:flex">
                <span>B-Model: v4.2</span>
                <span>Telemetry: 100%</span>
                <span>Latency: 2ms</span>
                <div className="h-px w-10 bg-primary/20 ml-auto" />
                <span>AK-ENGINEERING</span>
            </div>
        </div>
    );
};

const ArchitectPage = () => {
    return (
        <main className="min-h-screen bg-background selection:bg-primary selection:text-black overflow-hidden relative">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-44 pb-24 md:pt-64 md:pb-44 relative overflow-hidden">
                <div className="bg-dot-grid absolute inset-0 opacity-[0.03] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] bg-primary/5 blur-[200px] pointer-events-none -z-10" />
                
                <div className="container mx-auto px-6 md:px-12 relative z-20">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="flex items-center gap-4 md:gap-6 text-primary mb-12 group cursor-default">
                                <div className="h-px w-24 bg-primary/40 group-hover:w-32 transition-all duration-1000" />
                                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.8em] font-mono whitespace-nowrap">The Architect</span>
                            </div>

                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-light leading-[1.05] mb-10 tracking-tighter font-outfit text-white">
                                Engineering <br />
                                <span className="text-primary font-medium italic">Predictable Trust.</span>
                            </h1>

                            <p className="text-xl md:text-3xl text-slate/60 font-light max-w-3xl leading-relaxed tracking-tight mb-16">
                                Behind the behavioral systems stabilizing the modern automotive dealership.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Origin Story */}
            <section className="py-24 md:py-44 bg-black/50 relative border-y border-white/5 backdrop-blur-xl">
                <div className="bg-blueprint absolute inset-0 opacity-[0.02] pointer-events-none" />
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <div className="flex items-center gap-4 text-primary mb-8">
                                <span className="h-px w-8 bg-primary/40" />
                                <span className="text-[10px] uppercase tracking-[0.4em] font-bold">The Origin</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-light text-white mb-10 font-outfit tracking-tighter">A Transition from <br />Motivation to Mechanics.</h2>
                            <div className="space-y-8 text-lg md:text-xl text-slate/50 font-light leading-relaxed">
                                <p>
                                    The automotive industry has never lacked &quot;training.&quot; For decades, dealerships have relied on motivational speakers, weekend workshops, and high-energy sales tactics to drive performance. Yet results remain inconsistent.
                                </p>
                                <p className="text-white font-medium italic border-l-2 border-primary/40 pl-8">
                                    Behavior doesn&apos;t change because people are motivated; behavior changes when the system makes it inevitable.
                                </p>
                                <p>
                                    After years of observing the decay of traditional sales training, I stopped looking at dealerships as &quot;rooms full of people&quot; and started looking at them as complex systems. AutoKnerd is the result of that shift—a move from abstract culture-building to concrete behavioral engineering.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-[4/5] rounded-[3rem] border border-white/10 bg-white/[0.02] relative overflow-hidden group">
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <AnimatedSystemIcon />
                                </div>
                                <div className="absolute bottom-12 left-12 right-12 z-20">
                                    <div className="text-[10px] font-mono text-primary uppercase tracking-[0.5em] mb-4">Core Thesis</div>
                                    <div className="text-2xl text-white font-outfit tracking-tight leading-snug">
                                        Systems are the architecture of behavior.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Systems */}
            <section className="py-24 md:py-44 relative bg-background">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-4xl mx-auto text-center mb-32">
                        <h2 className="text-4xl md:text-6xl font-light text-white mb-8 font-outfit tracking-tighter">Why We Build Systems</h2>
                        <p className="text-xl text-slate/50 font-light leading-relaxed">Most dealership failures are not people failures; they are system failures.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: Target,
                                title: "Reliability",
                                text: "Ensuring every customer receives the same trust-driven experience regardless of which consultant they work with."
                            },
                            {
                                icon: Layers,
                                title: "Observability",
                                text: "Measuring behavioral consistency across the showroom through structured manager execution metrics."
                            },
                            {
                                icon: Cpu,
                                title: "Scalability",
                                text: "Building systems that function regardless of turnover, store size, or individual star performers."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-green p-12 rounded-[2.5rem] border-white/5 flex flex-col items-start gap-8"
                            >
                                <div className="p-4 rounded-2xl bg-black/40 border border-primary/20">
                                    <item.icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-2xl font-medium text-white font-outfit">{item.title}</h3>
                                <p className="text-lg text-slate/50 font-light leading-relaxed">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Philosophy & Equation */}
            <section className="py-24 md:py-44 border-t border-white/5 bg-black/30 relative overflow-hidden">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/2">
                            <div className="flex items-center gap-4 text-primary mb-8">
                                <span className="h-px w-8 bg-primary/40" />
                                <span className="text-[10px] uppercase tracking-[0.4em] font-bold">The Philosophy</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-light text-white mb-10 font-outfit tracking-tighter">Trust is a Stable, Engineered Outcome.</h2>
                            <p className="text-xl text-slate/50 font-light leading-relaxed mb-12">
                                If your team&apos;s behavior fluctuates based on their mood, the time of day, or the day of the month, your customer experience is unstable. We replace that volatility with systematic consistency.
                            </p>
                            <div className="p-10 rounded-[2.5rem] bg-primary/5 border border-primary/20 backdrop-blur-xl">
                                <div className="text-[10px] font-mono text-primary uppercase tracking-[0.5em] mb-8">The Stability Equation</div>
                                <div className="space-y-4">
                                    <div className="text-3xl md:text-4xl text-white font-outfit font-light tracking-tighter">
                                        Logic + Authenticity 
                                    </div>
                                    <div className="text-primary text-2xl font-mono px-4">×</div>
                                    <div className="text-3xl md:text-4xl text-primary font-outfit font-medium italic tracking-tighter">
                                        Behavioral Stabilization
                                    </div>
                                    <div className="h-px w-full bg-white/10 my-8" />
                                    <div className="text-4xl md:text-5xl text-white font-outfit font-bold tracking-tighter">
                                        Predictable Trust
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 space-y-12">
                            {[
                                {
                                    title: "Training is an event.",
                                    sub: "Stabilization is a state.",
                                    text: "Traditional training focuses on 'what to say.' AutoKnerd focuses on 'how to manage.'"
                                },
                                {
                                    title: "Telemetry & Reinforcement",
                                    sub: "AutoDrive & AutoForge",
                                    text: "We provide the management telemetry to observe behavior in real-time and the mechanical reinforcements needed to bridge behavioral gaps."
                                }
                            ].map((block, i) => (
                                <div key={i} className="space-y-4">
                                    <h4 className="text-2xl md:text-3xl text-white font-outfit font-medium flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                        {block.title}
                                    </h4>
                                    <p className="text-primary text-lg font-medium italic pl-6">{block.sub}</p>
                                    <p className="text-lg text-slate/50 font-light leading-relaxed pl-6">{block.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Closing CTA */}
            <section className="py-24 md:py-44 text-center">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-4xl mx-auto bg-white/[0.01] border border-white/5 p-16 md:p-24 rounded-[3.5rem] relative overflow-hidden group/cta">
                        <div className="absolute inset-0 bg-primary opacity-0 group-hover/cta:opacity-[0.02] transition-opacity duration-1000" />
                        <h2 className="text-4xl md:text-6xl font-light text-white mb-10 font-outfit tracking-tighter">
                            Ready to stop fixing your team and <span className="text-primary italic">start engineering your system?</span>
                        </h2>
                        <a href={STRATEGY_CALL_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center bg-primary text-black px-12 py-6 rounded-full font-bold uppercase tracking-[0.4em] text-[11px] transition-all hover:bg-white active:scale-95 shadow-[0_0_40px_rgba(124,255,27,0.3)]">
                            Begin the Strategy Call
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default ArchitectPage;
