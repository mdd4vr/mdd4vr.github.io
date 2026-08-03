import React, { useState } from 'react';
import { SlideIn } from './SlideIn';
import { 
  Database, 
  FileText, 
  Compass, 
  CheckSquare, 
  Glasses, 
  Plus, 
  ArrowRight, 
  Info,
  Layers,
  Sparkles,
  GitBranch,
  ShieldCheck,
  Code2
} from 'lucide-react';
import { PipelineStep } from '../types';

interface PipelineDiagramProps {
  onSelectStep?: (step: PipelineStep) => void;
}

export const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: 'modelling',
    stepNumber: 1,
    label: 'Modelling',
    typeLabel: 'Core Domain Metamodel',
    description: 'Extends role-based VR metaclasses (Scene, Article, ActionResponse, Behavior, Timeline) with stereotypes, tagged values, and OCL constraints.',
    iconName: 'Database',
    details: {
      title: 'Modelling',
      traditionalWay: 'VR concepts and interaction logic are written directly in platform SDKs or engine scripts using unvalidated text labels without domain types.',
      whyInsufficientForVR: 'Conventional software modeling paradigms fail to express VR spatial rules and domain constraints, allowing specification flaws to propagate into generated code.',
      mddPipelineApproach: 'Establishes VRSpecML: a UML profile that extends role-based VR metaclasses (Scene, Article, ActionResponse, Behavior, Timeline) with domain semantics and machine-checkable OCL invariants evaluated at design time.',
      workedOnBy: 'Bavya Sri Kilari',
      missingWork: 'Tool support',
    },
  },
  {
    id: 'requirement-specification',
    stepNumber: 2,
    label: 'Requirement Specification',
    typeLabel: 'Specification Engine (VReqST)',
    description: 'Captures precise VR requirements via fillable model templates and underlying validator files.',
    iconName: 'FileText',
    details: {
      title: 'Requirement Specification',
      traditionalWay: 'Requirements are typically documented in text documents or issue trackers, with details interpreted manually by the development team.',
      whyInsufficientForVR: 'Without a structured specification, VR interactions and behaviors can be interpreted inconsistently, leading to implementation errors and rework.',
      mddPipelineApproach: 'Uses VReqST: a fillable, role-based model template tool (JSON schema & validator engine) covering Scene, Article, Action-Response, Behavior, and Timeline.',
      workedOnBy: 'Sai Anirudh Karre',
      missingWork: 'Tool support',
    },
  },
  {
    id: 'design',
    stepNumber: 3,
    label: 'Design',
    typeLabel: 'Design & Versioning (VReqDV)',
    description: 'Automates VR scene mock-ups, dual-event scriptable components, and 3D design version control.',
    iconName: 'Compass',
    details: {
      title: 'Design',
      traditionalWay: 'VR scenes are typically designed manually in Unity or Unreal by arranging objects, configuring components, and writing interaction scripts.',
      whyInsufficientForVR: 'Creating and maintaining multiple design iterations is time-consuming, and tracking changes across complex VR scenes is difficult',
      mddPipelineApproach: 'Employs VReqDV for model-based automated Unity/Unreal scene generation, scriptable event integration, and design versioning.',
      workedOnBy: 'Shambhavi Jahagirdar, Gursahib Singh',
    },
  },
  {
    id: 'vr-code-generator',
    stepNumber: 4,
    label: 'VR Code Generator',
    typeLabel: 'M2T Code Synthesis Engine',
    description: 'Automated Model-to-Text code generator compiling abstract models into target C#, C++, and WebXR scripts.',
    iconName: 'Code2',
    details: {
      title: 'VR Code Generator',
      traditionalWay: 'Hand-writing C# event listeners or C++ scripts for every interaction, collision, and animation trigger in the VR environment.',
      whyInsufficientForVR: 'Boilerplate interaction code is repetitive, error-prone, tightly coupled to specific HMD SDKs (Meta Quest SDK, SteamVR, WebXR), and tedious to update manually.',
      mddPipelineApproach: 'Not yet designed',
      workedOnBy: 'Nobody yet',
    },
  },
  {
    id: 'testing',
    stepNumber: 5,
    label: 'Testing',
    typeLabel: 'Logging & Conformance (VRSLOG)',
    description: 'Automates user interaction tracking, structured logging, and sequence conformance checking.',
    iconName: 'CheckSquare',
    details: {
      title: 'Testing',
      traditionalWay: 'Manual play-through testing in headsets by human testers who manually perform actions and write subjective bug reports.',
      whyInsufficientForVR: 'Human supervisor testing cannot scale, fails to track exact millisecond event timing, and cannot systematically verify protocol conformance.',
      mddPipelineApproach: 'Integrates VRSLOG: a generalized multi-threaded VR logging & rules engine capturing spatial vectors, rotations, visibility, and automated sequence conformance.',
      workedOnBy: 'Divij, Vijay',
    },
  },
  {
    id: 'deployment',
    stepNumber: 6,
    label: 'Deployment',
    typeLabel: 'Runtime Release & Traceability',
    description: 'Multi-HMD cross-platform deployment with full backward traceability to specifications.',
    iconName: 'Glasses',
    details: {
      title: 'Deployment',
      traditionalWay: 'Sideloading APKs manually or uploading separate build binaries to proprietary app stores without requirements traceability.',
      whyInsufficientForVR: 'Disconnects live deployed app behavior from initial requirement specifications, making post-deployment audits and updates difficult.',
      mddPipelineApproach: 'Deploys verified, model-driven VR applications across multi-platform hardware with full backward traceability to requirement models and design version tags.',
      workedOnBy: '',
    },
  },
];

export const PipelineDiagram: React.FC<PipelineDiagramProps> = ({ onSelectStep }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getStepIcon = (step: PipelineStep) => {
    switch (step.iconName) {
      case 'Database':
        return <Database className="w-5 h-5 stroke-[1.8]" />;
      case 'FileText':
        return <FileText className="w-5 h-5 stroke-[1.8]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 stroke-[1.8]" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 stroke-[1.8]" />;
      case 'CheckSquare':
        return <CheckSquare className="w-5 h-5 stroke-[1.8]" />;
      case 'Glasses':
        return <Glasses className="w-5 h-5 stroke-[1.8]" />;
      default:
        return <Layers className="w-5 h-5 stroke-[1.8]" />;
    }
  };

  return (
    <div className="w-full py-8 px-3 sm:px-6 bg-white rounded-none border border-slate-200/90 shadow-xl text-slate-900">
      <div className="w-full flex flex-col items-center">
        
        {/* Diagram Area - 6 Equal-Sized Nodes Layout */}
        <div className="w-full py-4">
          <div className="w-full flex flex-wrap md:flex-nowrap items-center justify-between gap-2 sm:gap-3 py-2">
            {PIPELINE_STEPS.map((step, idx) => {
              const isHovered = hoveredId === step.id;
              const isDeployment = step.id === 'deployment';

              return (
                <React.Fragment key={step.id}>
                  {/* Pipeline Node */}
                  <SlideIn direction="up" delay={0.05 * idx} duration={0.5} className="flex-1 min-w-[130px] sm:min-w-0">
                    <div
                      onClick={() => !isDeployment && onSelectStep?.(step)}
                      onMouseEnter={() => setHoveredId(step.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      title={isDeployment ? step.label : `Click to inspect ${step.label}`}
                      className={`group flex flex-col items-center select-none w-full ${isDeployment ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      {/* Equal-Sized Standard Module Box Node */}
                      <div
                        className={`w-full h-28 sm:h-32 p-3 rounded-none border-2 flex flex-col items-center justify-center text-center transition-all duration-300 shadow-sm ${
                          isHovered && !isDeployment
                            ? 'border-cyan-600 bg-slate-900 text-white scale-105 shadow-xl'
                            : isDeployment
                            ? 'border-slate-200 bg-slate-50 text-slate-700'
                            : 'border-slate-200 bg-slate-50 text-slate-900 hover:border-cyan-500 hover:bg-white hover:shadow-md'
                        }`}
                      >
                        <div className={`p-2 rounded-none mb-2 transition-colors ${
                          isHovered && !isDeployment ? 'bg-[#38c3db] text-[#181b1e]' : 'bg-white text-cyan-700 border border-slate-200'
                        }`}>
                          {getStepIcon(step)}
                        </div>
                        <span className={`text-xs sm:text-sm font-outfit font-bold leading-tight ${isHovered && !isDeployment ? 'text-white' : 'text-slate-900'}`}>
                          {step.label}
                        </span>
                      </div>
                    </div>
                  </SlideIn>

                  {/* Flow Arrow between nodes */}
                  {idx < PIPELINE_STEPS.length - 1 && (
                    <div className="hidden md:flex items-center text-slate-400 shrink-0 self-center">
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
