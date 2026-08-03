import React, { useState } from 'react';
import { SlideIn } from './SlideIn';
import { PipelineDiagram } from './PipelineDiagram';
import { PipelineStep } from '../types';
import { X } from 'lucide-react';

export const PipelineSlide: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<PipelineStep | null>(null);

  return (
    <section
      id="pipeline"
      className="relative min-h-screen w-full bg-slate-50 text-slate-900 py-24 px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center justify-center slide-section overflow-hidden"
    >
      <div className="w-full flex flex-col items-center">
        {/* Top Header */}
        <SlideIn direction="down" delay={0.1} duration={0.8} className="w-full text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-outfit font-bold text-slate-900 mt-1">
            Model Driven VR development cycle
          </h2>
        </SlideIn>

        {/* Pipeline Diagram Content */}
        <div className="w-full">
          <SlideIn direction="fade-scale" delay={0.2} duration={0.8} className="w-full">
            <PipelineDiagram onSelectStep={(step) => setSelectedStep(step)} />
          </SlideIn>
        </div>
      </div>

      {/* Step Inspector Modal - 4 Required Fields */}
      {selectedStep && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#22262a] rounded-none max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-white relative text-slate-100 my-8">
            <button
              onClick={() => setSelectedStep(null)}
              className="absolute top-5 right-5 p-2 rounded-none bg-[#181b1e] hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-start mb-6 pr-8">
              <h3 className="text-xl sm:text-2xl font-outfit font-bold text-white">
                {selectedStep.details.title}
              </h3>
            </div>

            {/* 4 Fields Grid */}
            <div className="space-y-4 text-xs">
              
              {/* Field 1: Traditional way to do that step */}
              <div className="bg-[#181b1e] p-4 rounded-none border border-white space-y-1.5">
                <div className="text-slate-400 font-mono font-bold uppercase tracking-wider text-[11px]">
                  <span>1. Traditional Way to Do That Step</span>
                </div>
                <p className="text-white leading-relaxed font-sans text-xs sm:text-sm">
                  {selectedStep.details.traditionalWay}
                </p>
              </div>

              {/* Field 2: Why its insufficient for VR */}
              <div className="bg-[#181b1e] p-4 rounded-none border border-white space-y-1.5">
                <div className="text-rose-400 font-mono font-bold uppercase tracking-wider text-[11px]">
                  <span>2. Why It's Insufficient for Virtual Reality</span>
                </div>
                <p className="text-white leading-relaxed font-sans text-xs sm:text-sm">
                  {selectedStep.details.whyInsufficientForVR}
                </p>
              </div>

              {/* Field 3: How the MDD pipeline would do it */}
              <div className="bg-[#181b1e] p-4 rounded-none border border-white space-y-1.5">
                <div className="text-[#38c3db] font-mono font-bold uppercase tracking-wider text-[11px]">
                  <span>3. How the MDD Pipeline Does It</span>
                </div>
                <p className="text-white leading-relaxed font-sans text-xs sm:text-sm">
                  {selectedStep.details.mddPipelineApproach}
                </p>
              </div>

              {/* Field 4: Worked on by */}
              <div className="bg-[#181b1e] p-4 rounded-none border border-white space-y-1.5">
                <div className="text-cyan-400 font-mono font-bold uppercase tracking-wider text-[11px]">
                  <span>4. Worked on by</span>
                </div>
                <p className="text-white leading-relaxed font-mono text-xs font-semibold">
                  {selectedStep.details.workedOnBy || 'None / Standard Release'}
                </p>
              </div>

              {/* Field 5: Missing Work (if applicable) */}
              {selectedStep.details.missingWork && (
                <div className="bg-[#181b1e] p-4 rounded-none border border-white space-y-1.5">
                  <div className="text-amber-400 font-mono font-bold uppercase tracking-wider text-[11px]">
                    <span>5. Missing Work</span>
                  </div>
                  <p className="text-white leading-relaxed font-mono text-xs font-semibold">
                    {selectedStep.details.missingWork}
                  </p>
                </div>
              )}

            </div>


          </div>
        </div>
      )}
    </section>
  );
};
