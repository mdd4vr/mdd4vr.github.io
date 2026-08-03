import React, { useState, useEffect } from 'react';
import { HeroSlide } from './components/HeroSlide';
import { PipelineSlide } from './components/PipelineSlide';
import { MetamodelDetailSection } from './components/MetamodelDetailSection';
import { CodeGeneratorSection } from './components/CodeGeneratorSection';
import { DesignVersioningSection } from './components/DesignVersioningSection';
import { ConformanceCheckingSection } from './components/ConformanceCheckingSection';
import { PublicationsSection } from './components/PublicationsSection';
import { Navbar } from './components/Navbar';
import { ImageUploadModal } from './components/ImageUploadModal';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [customImageSrc, setCustomImageSrc] = useState<string | null>(null);

  // Smooth navigation handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Observe active section on scroll
  useEffect(() => {
    const sectionIds = ['hero', 'pipeline', 'metamodel', 'codegen', 'designversioning', 'conformance', 'publications'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#181b1e] text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#38c3db] selection:text-[#181b1e]">
      {/* Top Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenImageModal={() => setIsImageModalOpen(true)}
        hasCustomImage={!!customImageSrc}
      />

      {/* Slide Sections Sequence */}
      <main className="w-full">
        {/* Slide 1: Title Screen */}
        <HeroSlide />

        {/* Slide 2: Pipeline Screen */}
        <PipelineSlide />

        {/* Slide 3: VRSpecML Metamodel Architecture */}
        <MetamodelDetailSection />

        {/* Slide 4: VReqST Automated Code Generation Engine */}
        <CodeGeneratorSection />

        {/* Slide 5: VReqDV Model-Driven Scene Generation & Design Versioning */}
        <DesignVersioningSection />

        {/* Slide 6: Interaction Conformance Checking System */}
        <ConformanceCheckingSection />

        {/* Slide 7: Research Publications */}
        <PublicationsSection />
      </main>

      {/* Explaining Image Modal */}
      <ImageUploadModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        customImageSrc={customImageSrc}
        onImageChange={(newSrc) => setCustomImageSrc(newSrc)}
      />
    </div>
  );
}
