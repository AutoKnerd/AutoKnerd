"use client";

import React from "react";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { motion } from "framer-motion";

const TermsPage = () => {
    return (
        <main className="min-h-screen bg-background selection:bg-primary selection:text-black overflow-hidden relative text-slate/80">
            <Navbar />

            {/* Header */}
            <section className="pt-44 pb-24 relative overflow-hidden">
                <div className="bg-dot-grid absolute inset-0 opacity-[0.03] pointer-events-none" />
                <div className="container mx-auto px-6 md:px-12 relative z-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-4 text-primary mb-8">
                            <span className="h-px w-8 bg-primary/40" />
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Legal Architecture</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-light text-white font-outfit tracking-tighter mb-8">Terms of Service.</h1>
                        <p className="text-xl font-light italic text-primary/60">Last Updated: March 2026</p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="pb-44">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-4xl mx-auto space-y-20">
                        <div className="space-y-8">
                            <h2 className="text-2xl md:text-3xl font-medium text-white font-outfit tracking-tight">1. Service Description</h2>
                            <p className="text-lg leading-relaxed font-light">
                                AutoKnerd provides a behavioral systems platform (AutoDrive) and consulting services designed to stabilize and improve dealership customer experience. Services are provided on a subscription or project basis as defined in your individual Service Agreement.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-2xl md:text-3xl font-medium text-white font-outfit tracking-tight">2. Platform Usage</h2>
                            <p className="text-lg leading-relaxed font-light">
                                Users are responsible for maintaining the confidentiality of their AutoDrive credentials. The platform must be used in accordance with its intended purpose: managing dealership operations and team behavior. Unauthorized access or attempt to reverse-engineer the platform is strictly prohibited.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-2xl md:text-3xl font-medium text-white font-outfit tracking-tight">3. Intellectual Property</h2>
                            <p className="text-lg leading-relaxed font-light">
                                All methodologies, system designs, software (AutoDrive/AutoForge), and training materials provided by AutoKnerd remain the exclusive intellectual property of AutoKnerd. Clients are granted a non-exclusive, non-transferable license to use these materials for their internal dealership operations during the term of their agreement.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-2xl md:text-3xl font-medium text-white font-outfit tracking-tight">4. Limitations of Liability</h2>
                            <p className="text-lg leading-relaxed font-light font-mono text-sm border-l-2 border-white/10 pl-8 py-4 bg-white/[0.01]">
                                WHILE AUTOKNERD SYSTEMS ARE DESIGNED TO IMPROVE PERFORMANCE, WE DO NOT GUARANTEE SPECIFIC FINANCIAL OUTCOMES OR REVENUE INCREASES. OUR LIABILITY IS LIMITED TO THE FEES PAID FOR THE SERVICES PROVIDED DURING THE PRECEDING TWELVE-MONTH PERIOD.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-2xl md:text-3xl font-medium text-white font-outfit tracking-tight">5. Termination</h2>
                            <p className="text-lg leading-relaxed font-light">
                                Either party may terminate the service agreement with 30 days&apos; written notice. Upon termination, access to the AutoDrive platform will be revoked, and all outstanding fees become due immediately.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-2xl md:text-3xl font-medium text-white font-outfit tracking-tight">6. Governing Law</h2>
                            <p className="text-lg leading-relaxed font-light">
                                These terms are governed by the laws of the United States, without regard to conflict of law principles.
                            </p>
                        </div>

                        <div className="pt-20 border-t border-white/5">
                            <p className="text-slate/40 text-sm font-mono uppercase tracking-[0.2em]">End of Document | Reference: AK-TOS-2026</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default TermsPage;
