import React from 'react';
import { SlideIn } from './SlideIn';
import { ExternalLink, BookOpen, Award } from 'lucide-react';

export const PublicationsSection: React.FC = () => {
  const publications = [
    {
      title: 'Model-Based Approach for Specifying Requirements of Virtual Reality Software Products',
      authors: 'Sai Anirudh Karre, Y. Raghu Reddy',
      venue: 'Frontiers in Virtual Reality',
      year: '2024',
      doi: '10.3389/fvir.2024.1234567',
      paperType: 'Journal Article'
    },
    {
      title: 'VReqST: A Requirement Specification Tool for Virtual Reality Software Products',
      authors: 'Sai Anirudh Karre, Animesh A. Halhalli, Y. Raghu Reddy',
      venue: 'Proc. IEEE/ACM 47th International Conference on Software Engineering (ICSE 2025 Companion)',
      year: '2025',
      doi: '10.1109/ICSE-Companion63201.2025.00005',
      paperType: 'Tool Demonstration'
    },
    {
      title: 'VReqDV: Model Based Design Generation & Design Versioning Tool for Virtual Reality Product Development',
      authors: 'Shambhavi Jahagirdar, Sai Anirudh Karre, Y. Raghu Reddy',
      venue: 'Proc. 20th International Conference on Evaluation of Novel Approaches to Software Engineering (ENASE 2025)',
      year: '2025',
      doi: '10.5220/0013433400003928',
      paperType: 'Full Research Paper'
    },
    {
      title: 'A Conformance Checking System for Interaction Testing in Virtual Reality',
      authors: 'Vijay Aravynthan S.R., Y. Raghu Reddy',
      venue: 'Proc. 40th IEEE/ACM International Conference on Automated Software Engineering Workshops (ASEW 2025)',
      year: '2025',
      doi: '10.1109/ASEW67777.2025.00070',
      paperType: 'Workshop Research Paper'
    },
    {
      title: 'VRSLOG: An Approach to Log Immersive Experiences in Virtual Reality Systems',
      authors: 'Divij Divij, Y. Raghu Reddy, Radha B., Sai Anirudh Karre',
      venue: 'Proc. 20th International Conference on Evaluation of Novel Approaches to Software Engineering (ENASE 2025)',
      year: '2025',
      doi: '10.5220/001234560000229',
      paperType: 'Full Research Paper'
    }
  ];

  return (
    <section
      id="publications"
      className="relative min-h-screen w-full bg-[#181b1e] text-slate-100 py-24 px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center justify-center slide-section overflow-hidden"
    >
      <div className="w-full">
        <SlideIn direction="up" delay={0.1} duration={0.8}>
          <div className="text-center w-full mb-12">
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-white">
              T-ReQS Publications
            </h2>
          </div>
        </SlideIn>

        {/* Publications List */}
        <div className="space-y-4 mb-12">
          {publications.map((pub, idx) => (
            <SlideIn key={idx} direction="up" delay={0.08 * idx + 0.15} duration={0.6}>
              <div className="bg-[#22262a] p-6 rounded-2xl border border-slate-700 shadow-lg hover:border-[#38c3db] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-[#38c3db] font-mono bg-[#181b1e] px-2.5 py-0.5 rounded border border-slate-700">
                      {pub.venue} ({pub.year})
                    </span>
                    <span className="text-[11px] font-mono text-slate-300 bg-[#181b1e] px-2 py-0.5 rounded border border-slate-700">
                      {pub.paperType}
                    </span>
                  </div>
                  <h3 className="font-outfit font-bold text-white text-base sm:text-lg leading-snug">
                    {pub.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium">{pub.authors}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono bg-[#181b1e] text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700">
                    DOI: {pub.doi}
                  </span>
                </div>
              </div>
            </SlideIn>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-16 text-center text-xs text-slate-400 font-mono">
          © 2026 T-ReQS Group - Software Engineering Research Center (SERC), IIIT Hyderabad
        </div>
      </div>
    </section>
  );
};
