import { Navbar } from "@/app/components/Navbar";
import { Hero } from "@/app/components/Hero";
import { Problem } from "@/app/components/Problem";
import { TrainingFails } from "@/app/components/TrainingFails";
import { BehavioralStabilityModel } from "@/app/components/BehavioralStabilityModel";
import { CXOperatingMap } from "@/app/components/CXOperatingMap";
import { CommandCenter } from "@/app/components/CommandCenter";
import { DealershipChange } from "@/app/components/DealershipChange";
import { BehaviorEngine } from "@/app/components/BehaviorEngine";
import { Transformation } from "@/app/components/Transformation";
import { Products } from "@/app/components/Products";
import { CSIRepair } from "@/app/components/CSIRepair";
import { Pipeline } from "@/app/components/Pipeline";
import { Impact } from "@/app/components/Impact";
import { FitSection } from "@/app/components/FitSection";
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
        <BehavioralStabilityModel />
        <CXOperatingMap />
        <CommandCenter />
        <DealershipChange />
        <BehaviorEngine />
      </div>
      <Transformation />
      <Products />
      <CSIRepair />
      <Pipeline />
      <Impact />
      <FitSection />
      <Team />
      <Podcast />
      <Footer />
    </main>
  );
}
