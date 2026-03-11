import { Navbar } from "@/app/components/Navbar";
import { Hero } from "@/app/components/Hero";
import { Problem } from "@/app/components/Problem";
import { TrainingFails } from "@/app/components/TrainingFails";
import { Products } from "@/app/components/Products";
import { Pipeline } from "@/app/components/Pipeline";
import { Impact } from "@/app/components/Impact";
import { Team } from "@/app/components/Team";
import { Podcast } from "@/app/components/Podcast";
import { Footer } from "@/app/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <div id="methodology">
        <Problem />
        <TrainingFails />
      </div>
      <Products />
      <Pipeline />
      <Impact />
      <Team />
      <Podcast />
      <Footer />
    </main>
  );
}
