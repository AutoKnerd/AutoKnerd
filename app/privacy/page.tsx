"use client";

import React from "react";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";

const PrivacyPage = () => {
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
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Data Governance</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-light text-white font-outfit tracking-tighter mb-8">Privacy Policy.</h1>
                        <p className="text-xl font-light italic text-primary/60">Last Updated: March 2026</p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="pb-44">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-4xl mx-auto space-y-20">
                        <div className="space-y-8">
                            <h2 className="text-2xl md:text-3xl font-medium text-white font-outfit tracking-tight">Information Collected</h2>
                            <p className="text-lg leading-relaxed font-light">
                                We collect information necessary to provide and improve our services, including:
                            </p>
                            <ul className="space-y-4 list-disc pl-6 text-lg font-light">
                                <li><strong>User Data:</strong> Names, email addresses, and professional roles of dealership staff.</li>
                                <li><strong>Operational Data:</strong> Behavioral metrics, coaching logs, and system adherence data.</li>
                                <li><strong>Technical Data:</strong> IP addresses, browser types, and usage patterns for platform optimization.</li>
                            </ul>
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-2xl md:text-3xl font-medium text-white font-outfit tracking-tight">How Information is Used</h2>
                            <p className="text-lg leading-relaxed font-light">
                                Data is used exclusively to facilitate dealership management, provide leadership reporting, and improve the performance of our platform tools. 
                            </p>
                            <p className="text-white font-medium italic border-l-2 border-primary/40 pl-8">
                                We do not sell your dealership&apos;s operational data to third parties.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-2xl md:text-3xl font-medium text-white font-outfit tracking-tight">Data Security</h2>
                            <p className="text-lg leading-relaxed font-light">
                                We implement industry-standard security measures, including encryption and secure servers, to protect your data from unauthorized access or disclosure.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-2xl md:text-3xl font-medium text-white font-outfit tracking-tight">Cookies & Analytics</h2>
                            <p className="text-lg leading-relaxed font-light">
                                We use cookies to maintain user sessions and analyze platform performance. You can manage cookie preferences through your browser settings.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-2xl md:text-3xl font-medium text-white font-outfit tracking-tight">User Rights</h2>
                            <p className="text-lg leading-relaxed font-light">
                                Users have the right to access, correct, or request the deletion of their personal information within the platform, subject to dealership management policies and legal requirements.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-2xl md:text-3xl font-medium text-white font-outfit tracking-tight">Privacy Requests</h2>
                            <p className="text-lg leading-relaxed font-light">
                                For all privacy-related inquiries, please contact: <a href="mailto:privacy@autoknerd.com" className="text-primary hover:text-white transition-colors">privacy@autoknerd.com</a>.
                            </p>
                        </div>

                        <div className="pt-20 border-t border-white/5">
                            <p className="text-slate/40 text-sm font-mono uppercase tracking-[0.2em]">Privacy Reference: AK-PRIVACY-2026</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default PrivacyPage;
