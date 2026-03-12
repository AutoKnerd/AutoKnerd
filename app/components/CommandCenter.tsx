"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const cards = [
  {
    title: "CX Intelligence",
    body: "Podcast episodes, behavioral insights, topic maps, and CX signals designed to help dealership teams understand what drives trust and inconsistency.",
    cta: "Explore Podcast Intelligence",
    href: "/podcast",
    external: false,
  },
  {
    title: "Skill Development",
    body: "AutoDriveCX turns podcast ideas into repeatable showroom behavior through guided drills, trust-driven practice, and discovery frameworks.",
    cta: "Start Training in AutoDriveCX",
    href: "https://app.autodrivecx.com/signup",
    external: true,
  },
  {
    title: "Dealership Stabilization",
    body: "AutoKnerd methodology and manager-led behavioral systems help dealerships turn good CX ideas into consistent execution.",
    cta: "Explore Methodology",
    href: "/methodology",
    external: false,
  },
];

export const CommandCenter = () => {
  return (
    <section className="py-24 md:py-[120px] bg-background relative overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 bg-dot-grid opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-0 bg-mesh-gradient opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-6xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter font-outfit text-white mb-6">
            The AutoKnerd Command Center
          </h2>
          <p className="text-lg md:text-2xl text-slate/70 tracking-tight">
            One ecosystem for dealership CX intelligence, skill practice, and behavioral stabilization.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="hidden lg:block absolute top-1/2 left-[16.7%] right-[16.7%] h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />

            {cards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="relative rounded-[2.1rem] border border-white/10 bg-white/[0.02] p-8 md:p-9 hover:border-primary/35 hover:shadow-[0_0_50px_rgba(124,255,27,0.16)] transition-all duration-500"
              >
                <h3 className="text-2xl md:text-3xl text-white tracking-tight leading-tight mb-4">
                  {card.title}
                </h3>
                <p className="text-base md:text-lg text-slate/65 tracking-tight leading-relaxed mb-7">
                  {card.body}
                </p>

                {card.external ? (
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center px-6 md:px-7 py-3.5 rounded-full border border-primary/35 bg-primary/[0.06] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.24em] text-primary hover:text-white hover:border-primary/60 hover:shadow-[0_0_24px_rgba(124,255,27,0.22)] transition-all duration-300"
                  >
                    {card.cta}
                  </a>
                ) : (
                  <Link
                    href={card.href}
                    className="inline-flex items-center justify-center px-6 md:px-7 py-3.5 rounded-full border border-primary/35 bg-primary/[0.06] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.24em] text-primary hover:text-white hover:border-primary/60 hover:shadow-[0_0_24px_rgba(124,255,27,0.22)] transition-all duration-300"
                  >
                    {card.cta}
                  </Link>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
