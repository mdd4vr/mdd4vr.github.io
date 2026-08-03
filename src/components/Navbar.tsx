import React, { useState, useEffect } from 'react';
import { Layers, Image as ImageIcon, Sparkles, Navigation, Code, BookOpen, Monitor, GitBranch, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenImageModal: () => void;
  hasCustomImage: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenImageModal,
  hasCustomImage,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Monitor },
    { id: 'pipeline', label: 'MDD Pipeline', icon: Layers },
    { id: 'metamodel', label: 'VRSpecML', icon: Navigation },
    { id: 'codegen', label: 'VReqST', icon: Code },
    { id: 'designversioning', label: 'VReqDV', icon: GitBranch },
    { id: 'conformance', label: 'Conformance', icon: ShieldCheck },
    { id: 'publications', label: 'Publications', icon: BookOpen },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
        scrolled
          ? 'translate-y-0 opacity-100 pointer-events-auto bg-[#181b1e]/90 backdrop-blur-md border-b border-slate-800 py-3 shadow-xl'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="w-full px-4 sm:px-8 flex items-center justify-center">
        {/* Navigation Items / Progress Bar */}
        <nav className="flex items-center gap-1 bg-[#22262a]/90 p-1.5 rounded-full border border-slate-700/60 backdrop-blur-md shadow-inner max-w-full overflow-x-auto scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#38c3db] text-[#181b1e] font-bold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
