import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { AUTOKNERD_CX_TOOLS } from "@/app/lib/tools";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AutoKnerd CX Tools",
  description: "Behavioral tools built to stabilize dealership customer experience.",
};

export default function ToolsHubPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-36 md:pt-44 pb-18 md:pb-24 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-mesh-gradient opacity-40 pointer-events-none" />
        <div className="absolute inset-0 parallax-grid-1 pointer-events-none opacity-60" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter text-white font-outfit mb-6">
            AutoKnerd CX Tools
          </h1>
          <h2 className="text-xl md:text-3xl text-primary/90 tracking-tight mb-6">
            Behavioral tools built to stabilize dealership customer experience.
          </h2>
          <p className="text-lg md:text-2xl text-slate/70 tracking-tight max-w-5xl leading-relaxed">
            These tools help consultants and managers apply the AutoKnerd system in real dealership
            conversations. Each tool focuses on a specific point where trust, clarity, or consistency can break down.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {AUTOKNERD_CX_TOOLS.map((tool) => (
              <article
                key={tool.slug}
                className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-8 hover:border-primary/35 hover:shadow-[0_0_45px_rgba(124,255,27,0.2)] hover:-translate-y-1 transition-all duration-500 flex flex-col"
              >
                <h3 className="text-2xl md:text-3xl text-white tracking-tight leading-tight mb-4">
                  {tool.title}
                </h3>
                <p className="text-base md:text-lg text-slate/65 tracking-tight leading-relaxed mb-5 flex-1">
                  {tool.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {tool.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1.5 rounded-full border border-primary/30 bg-primary/[0.06] text-[10px] uppercase tracking-[0.15em] text-primary/90 font-mono"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="inline-flex items-center justify-center bg-primary text-black px-7 py-3.5 rounded-full text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.28em] border border-primary hover:bg-white hover:border-white transition-all duration-300"
                >
                  Explore Tool
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
