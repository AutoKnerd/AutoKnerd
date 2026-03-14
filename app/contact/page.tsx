"use client";

import React from "react";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { STRATEGY_CALL_URL } from "@/app/lib/booking";
import { motion } from "framer-motion";
import { Calendar, MessageSquare, Shield, Activity, Target, ArrowRight } from "lucide-react";

const ContactPage = () => {
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
                            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.8em] font-mono whitespace-nowrap">Engagement Portal</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-light leading-[1.05] mb-10 tracking-tighter font-outfit text-white">
                            Consultation & <br />
                            <span className="text-primary font-medium italic">Strategy.</span>
                        </h1>
                        <p className="text-xl md:text-3xl text-slate/40 font-light max-w-3xl leading-relaxed tracking-tight">
                            Stabilizing your dealership&apos;s customer experience starts with a single, strategic conversation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Strategic Options */}
            <section className="pb-44">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                        {/* Left: Who should contact */}
                        <div className="space-y-16">
                            <div className="space-y-8">
                                <div className="flex items-center gap-4 text-primary">
                                    <span className="h-px w-8 bg-primary/40" />
                                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">The Profile</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-light text-white font-outfit tracking-tighter leading-tight">Who We Work With.</h2>
                                <p className="text-lg md:text-xl text-slate/50 font-light leading-relaxed">
                                    We work best with dealership principals, general managers, and group executives who are seeking a data-driven approach to leadership.
                                </p>
                                <ul className="space-y-6">
                                    {[
                                        "Frustrated by inconsistent team performance.",
                                        "Tired of 'motivational' training that doesn't stick.",
                                        "Seeking objective behavioral telemetry for coaching.",
                                        "Ready to implement a long-term behavioral operating system."
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-4 text-white font-outfit tracking-tight text-lg">
                                            <div className="mt-2 w-2 h-2 rounded-full bg-primary shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/10 space-y-8 hover:bg-white/[0.04] transition-all duration-500">
                                <div className="p-4 w-fit rounded-2xl bg-black/40 border border-primary/20">
                                    <MessageSquare className="w-8 h-8 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-medium text-white font-outfit mb-2">General Inquiry</h3>
                                    <p className="text-slate/50 font-light">For press, speaking, or general questions:</p>
                                    <a href="mailto:systems@autoknerd.com" className="text-xl text-primary font-medium mt-4 block hover:text-white transition-colors">systems@autoknerd.com</a>
                                </div>
                            </div>
                        </div>

                        {/* Right: Strategy Call */}
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                className="glass-green p-12 md:p-16 rounded-[3.5rem] border-white/10 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-blueprint opacity-[0.03] pointer-events-none" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 text-primary mb-12">
                                        <Calendar className="w-6 h-6" />
                                        <span className="text-[11px] font-mono uppercase tracking-[0.5em] font-bold">The Strategy Call</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-light text-white font-outfit tracking-tighter mb-8 italic">Move past the symptoms. <br /><span className="text-primary not-italic font-medium">Audit the structure.</span></h2>
                                    <p className="text-lg text-slate/90 font-light leading-relaxed mb-12">
                                        During our initial 30-minute call, we will perform a consultative session designed to determine if behavioral engineering is the right fit for your organization.
                                    </p>
                                    
                                    <div className="space-y-8 mb-16">
                                        <h4 className="text-[10px] font-mono text-slate/40 uppercase tracking-[0.4em] mb-6 border-b border-white/5 pb-4">Discussion Topics</h4>
                                        {[
                                            { label: "Behavioral Gap Analysis", icon: Activity },
                                            { label: "Management Telemetry Audit", icon: Target },
                                            { label: "AutoDrive Platform Integration", icon: Shield }
                                        ].map((topic, i) => (
                                            <div key={i} className="flex items-center gap-6 group">
                                                <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-primary group-hover:border-primary transition-all duration-500">
                                                    <topic.icon className="w-5 h-5" />
                                                </div>
                                                <span className="text-lg text-white font-outfit tracking-tight">{topic.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <a 
                                        href={STRATEGY_CALL_URL} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="w-full bg-primary text-black px-10 py-7 rounded-full font-bold uppercase tracking-[0.4em] text-[11px] flex items-center justify-center gap-4 transition-all hover:bg-white active:scale-95 shadow-[0_0_50px_rgba(124,255,27,0.3)]"
                                    >
                                        Schedule Strategy Session
                                        <ArrowRight className="w-5 h-5" />
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default ContactPage;
