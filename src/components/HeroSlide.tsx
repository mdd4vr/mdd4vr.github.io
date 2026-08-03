import React from 'react';
import { SlideIn } from './SlideIn';

export const HeroSlide: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-[#181b1e] flex flex-col items-center justify-center px-4 sm:px-8 py-20 overflow-hidden slide-section select-none text-center"
    >
      {/* Background subtle ambient glow */}
      <div className="absolute inset-0 bg-radial from-cyan-500/5 via-transparent to-transparent pointer-events-none opacity-20 blur-3xl" />

      {/* Slide Container */}
      <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 text-center flex flex-col items-center justify-center my-auto">
        {/* Title Content */}
        <SlideIn direction="up" delay={0.1} duration={0.9} distance={30}>
          <div className="font-outfit font-extrabold tracking-tight text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[1.18] sm:leading-[1.14] w-full mx-auto space-y-1 sm:space-y-2">
            <span className="block">Model-Driven</span>
            <span className="block">Development for</span>
            <span className="block text-[#38c3db] font-extrabold">
              Virtual Reality
            </span>
          </div>
        </SlideIn>

        {/* Subtitle - T-ReQS Group */}
        <SlideIn direction="up" delay={0.3} duration={0.8} distance={20}>
          <p className="mt-6 text-slate-400 font-light text-base sm:text-lg md:text-xl tracking-[0.2em] font-['Outfit']">
            T-ReQS Group
          </p>
        </SlideIn>
      </div>
    </section>
  );
};
