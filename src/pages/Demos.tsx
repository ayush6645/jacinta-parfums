import React from 'react';
import { GooeyLoader } from "@/src/components/ui/loader-10";
import { ParallaxComponent } from '@/src/components/ui/parallax-scrolling';
import InteractiveHoverButton from "@/src/components/ui/interactive-hover-button";
import { FlowButton } from "@/src/components/ui/flow-hover-button";
import { Github, Play } from 'lucide-react';

export default function DemosPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="container mx-auto space-y-32">
        
        {/* Gooey Loader Section */}
        <section className="text-center space-y-8">
          <h2 className="text-3xl font-serif italic text-gold">Gooey Loader</h2>
          <div className="flex items-center justify-center w-full min-h-[250px] bg-zinc-900/50 rounded-xl border border-zinc-800">
            <GooeyLoader
              primaryColor="#C9A14A" 
              secondaryColor="#D4AF37"
              borderColor="#333" 
            />
          </div>
        </section>

        {/* Interactive Hover Button Section */}
        <section className="text-center space-y-8">
          <h2 className="text-3xl font-serif italic text-gold">Interactive Hover Button</h2>
          <div className="flex items-center justify-center gap-8 py-12 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <InteractiveHoverButton text="Subscribe" />
            <InteractiveHoverButton text="Download" loadingText="Fetching..." successText="Downloaded!" />
          </div>
        </section>

        {/* Flow Hover Button Section */}
        <section className="text-center space-y-8">
          <h2 className="text-3xl font-serif italic text-gold">Flow Hover Button</h2>
          <div className="flex items-center justify-center gap-8 py-12 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <FlowButton icon={<Github className="w-5 h-5" />}>
              Github Repository
            </FlowButton>
            <FlowButton icon={<Play className="w-5 h-5" />}>
              Start Experience
            </FlowButton>
          </div>
        </section>

        {/* Parallax Section */}
        <section className="space-y-8 pt-20">
          <h2 className="text-3xl font-serif italic text-gold text-center">Parallax Scrolling</h2>
          <div className="rounded-xl overflow-hidden border border-zinc-800">
            <ParallaxComponent />
          </div>
        </section>

      </div>

      <style>
        {`
          .text-gold { color: #C9A14A; }
          .bg-gold { background-color: #C9A14A; }
          .border-gold { border-color: #C9A14A; }
        `}
      </style>
    </div>
  );
}
