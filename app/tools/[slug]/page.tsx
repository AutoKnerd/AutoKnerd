import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { AUTOKNERD_CX_TOOLS, getToolBySlug } from "@/app/lib/tools";
import {
  AUTODRIVECX_INFO_URL,
  AUTODRIVECX_SIGNUP_URL,
} from "@/app/lib/autodrivecxSkills";

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return AUTOKNERD_CX_TOOLS.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: "AutoKnerd Tool",
      description: "AutoKnerd behavioral tool",
    };
  }

  return {
    title: `${tool.title} | AutoKnerd CX Tools`,
    description: tool.shortDescription,
  };
}

function ListPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-7 md:p-9">
      <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-6 font-mono">
        {title}
      </h2>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item} className="text-base md:text-lg text-slate/75 leading-relaxed tracking-tight flex gap-3">
            <span className="text-primary">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ToolDetailPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-36 md:pt-44 pb-16 md:pb-20 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-mesh-gradient opacity-35 pointer-events-none" />
        <div className="absolute inset-0 parallax-grid-1 pointer-events-none opacity-55" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <Link
            href="/tools"
            className="inline-block text-primary text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] mb-8 hover:text-white transition-colors"
          >
            Back to Tools Hub
          </Link>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter text-white leading-tight max-w-6xl">
            {tool.title}
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-slate/70 tracking-tight max-w-4xl leading-relaxed">
            {tool.shortDescription}
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {tool.topics.map((topic) => (
              <span
                key={topic}
                className="px-3 py-1.5 rounded-full border border-primary/30 bg-primary/[0.06] text-[10px] uppercase tracking-[0.15em] text-primary/90 font-mono"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12 space-y-6 md:space-y-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-7 md:p-9">
            <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-5 font-mono">
              What This Tool Solves
            </h2>
            <p className="text-lg text-slate/75 leading-relaxed tracking-tight">
              {tool.whatThisToolSolves}
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-7 md:p-9">
            <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-5 font-mono">
              Why It Matters
            </h2>
            <p className="text-lg text-slate/75 leading-relaxed tracking-tight">
              {tool.whyItMatters}
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
            <ListPanel title="What It Helps You Do" items={tool.whatItHelpsYouDo} />
            <ListPanel title="How to Use It" items={tool.howToUseIt} />
          </div>

          <ListPanel title="Best Fit For" items={tool.bestFitFor} />

          <div className="rounded-[2rem] border border-primary/20 bg-primary/[0.05] p-7 md:p-9 shadow-[0_0_30px_rgba(124,255,27,0.12)]">
            <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary mb-4 font-mono">
              Next Step CTA
            </h2>
            <p className="text-lg text-slate/75 leading-relaxed tracking-tight">
              Deploy this behavior in your daily workflow, then reinforce it across the store.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-14 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="rounded-[2rem] border border-primary/25 bg-primary/[0.06] p-7 md:p-9 shadow-[0_0_34px_rgba(124,255,27,0.12)]">
            <h2 className="text-2xl md:text-3xl text-white tracking-tight mb-4">
              Practice This Skill in AutoDriveCX
            </h2>
            <p className="text-base md:text-lg text-slate/75 leading-relaxed tracking-tight mb-6">
              Want to turn this tool into repeatable showroom behavior? AutoDriveCX gives consultants guided drills, trust-driven practice, and behavioral skill development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={AUTODRIVECX_SIGNUP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center bg-primary text-black px-7 py-3.5 rounded-full text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.28em] border border-primary hover:bg-white hover:border-white transition-all duration-300"
              >
                Start Training in AutoDriveCX
              </a>
              <a
                href={AUTODRIVECX_INFO_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-white/10 bg-white/[0.02] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.22em] text-white/75 hover:text-white hover:border-primary/40 transition-all duration-300"
              >
                What is AutoDriveCX?
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-primary relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-blueprint opacity-[0.05]" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-black mb-10 tracking-tighter leading-tight font-outfit">
            Need Store-Wide CX Stability?
          </h2>
          <p className="text-lg md:text-2xl text-black/80 tracking-tight max-w-5xl mx-auto mb-10">
            AutoKnerd helps dealerships install manager-led behavioral systems that make better customer experience repeatable.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 md:gap-6">
            <button className="bg-black text-white px-10 md:px-16 py-5 md:py-7 rounded-full font-extrabold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-[11px] border border-black hover:bg-white hover:text-black hover:border-white transition-all duration-500">
              Book Strategy Call
            </button>
            <Link
              href="/methodology"
              className="inline-flex items-center justify-center text-black/80 hover:text-black px-8 md:px-12 py-5 md:py-7 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] transition-all border border-black/25 hover:border-black rounded-full"
            >
              Explore Methodology
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
