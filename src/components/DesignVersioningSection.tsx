import React, { useState } from 'react';
import { SlideIn } from './SlideIn';
import { 
  GitBranch, GitCommit, Layers, Database, Sparkles, CheckCircle2, 
  ChevronRight, ChevronLeft, ArrowRight, ShieldCheck, RefreshCw, 
  Sliders, FileJson, Play, Cpu, AlertCircle, Eye, Copy, Check
} from 'lucide-react';

interface VersionSpec {
  version: string;
  label: string;
  date: string;
  author: string;
  sceneName: string;
  objectsCount: number;
  description: string;
  objects: {
    name: string;
    shape: string;
    illuminate: boolean;
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
  }[];
  actionResponses: {
    id: string;
    trigger: string;
    target: string;
    response: string;
    threshold?: string;
  }[];
  jsonSpec: string;
}

const VERSION_DATA: VersionSpec[] = [
  {
    version: '1.0.0',
    label: 'Initial Bowling Alley Scene (V1)',
    date: '2025-02-10',
    author: 'VR Requirements Analyst',
    sceneName: 'BowlingAlley_Base',
    objectsCount: 3,
    description: 'Initial requirements specification for bowling alley setup featuring static ball, rectangular lane, and single pin.',
    objects: [
      { name: 'BowlingBall', shape: 'sphere', illuminate: true, position: [0, 0.5, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
      { name: 'BowlingPin', shape: 'cylinder', illuminate: false, position: [0, 0.5, 5], rotation: [0, 0, 0], scale: [0.3, 1, 0.3] },
      { name: 'BowlingLane', shape: 'cuboid', illuminate: false, position: [0, 0, 2.5], rotation: [0, 0, 0], scale: [2, 0.1, 8] },
    ],
    actionResponses: [
      { id: 'pin_fall_v1', trigger: 'Ball_Collision', target: 'BowlingPin', response: 'Fall_To_Ground', threshold: 'Collision Force > 5N' }
    ],
    jsonSpec: `{
  "_scenename": "BowlingAlley_Base",
  "version": "1.0.0",
  "articles": [
    {
      "_objectname": "BowlingBall",
      "shape": "sphere",
      "IsIlluminate": true,
      "Transform_initialpos": { "x": "0", "y": "0.5", "z": "0" }
    },
    {
      "_objectname": "BowlingPin",
      "shape": "cylinder",
      "IsIlluminate": false,
      "Transform_initialpos": { "x": "0", "y": "0.5", "z": "5" }
    }
  ],
  "action_responses": [
    {
      "actresid": "pin_fall_v1",
      "sourceObj": "BowlingBall",
      "targetObj": "BowlingPin",
      "trigger": "collision",
      "response": "fall_over"
    }
  ]
}`
  },
  {
    version: '2.0.0',
    label: 'Enhanced Dynamic Disappearance (V2)',
    date: '2025-02-18',
    author: 'VR Scene Designer',
    sceneName: 'BowlingAlley_Enhanced',
    objectsCount: 3,
    description: 'Updated interaction behavior: when the pin tilts beyond 10° tilt threshold, it disappears dynamically from the virtual scene.',
    objects: [
      { name: 'BowlingBall', shape: 'sphere', illuminate: true, position: [0, 0.5, 0.2], rotation: [0, 0, 0], scale: [1, 1, 1] },
      { name: 'BowlingPin', shape: 'cylinder', illuminate: true, position: [0, 0.5, 5], rotation: [10, 0, 0], scale: [0.3, 1, 0.3] },
      { name: 'BowlingLane', shape: 'cuboid', illuminate: false, position: [0, 0, 2.5], rotation: [0, 0, 0], scale: [2, 0.1, 8] },
    ],
    actionResponses: [
      { id: 'pin_fall_v2', trigger: 'Pin_Tilt_Threshold_10deg', target: 'BowlingPin', response: 'Disappear_And_Destroy', threshold: 'Rotation > 10°' }
    ],
    jsonSpec: `{
  "_scenename": "BowlingAlley_Enhanced",
  "version": "2.0.0",
  "articles": [
    {
      "_objectname": "BowlingBall",
      "shape": "sphere",
      "IsIlluminate": true,
      "Transform_initialpos": { "x": "0", "y": "0.5", "z": "0.2" }
    },
    {
      "_objectname": "BowlingPin",
      "shape": "cylinder",
      "IsIlluminate": true,
      "Transform_initialpos": { "x": "0", "y": "0.5", "z": "5" }
    }
  ],
  "action_responses": [
    {
      "actresid": "pin_fall_v2",
      "sourceObj": "BowlingBall",
      "targetObj": "BowlingPin",
      "trigger": "tilt_threshold_10deg",
      "response": "disappear"
    }
  ]
}`
  }
];

export const DesignVersioningSection: React.FC = () => {
  const [selectedVersionIdx, setSelectedVersionIdx] = useState<number>(0);
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const currentVersion = VERSION_DATA[selectedVersionIdx];
  const otherVersion = VERSION_DATA[selectedVersionIdx === 0 ? 1 : 0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentVersion.jsonSpec);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="designversioning"
      className="relative min-h-screen w-full bg-[#181b1e] text-slate-100 py-20 px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center justify-center slide-section overflow-hidden"
    >
      <div className="w-full space-y-10 relative z-10">
        {/* Header Badge & Title */}
        <SlideIn direction="up" delay={0.1} duration={0.8}>
          <div className="text-center w-full space-y-3">
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-white">
              VReqDV: Automated Scene Generation & Version Control
            </h2>
          </div>
        </SlideIn>

        {/* Paper Methodology Pipeline Flow (Phase 1 to 4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#22262a] border border-slate-700/60 rounded-2xl p-5 space-y-2 shadow-lg">
            <div className="flex items-center gap-2 text-[#38c3db] font-mono text-xs uppercase font-bold">
              <span>STEP 1</span>
            </div>
            <h3 className="text-base font-outfit font-bold text-white">
              JSON Specification Consumption
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Extracted properties from VReqST model templates (<code className="text-[#38c3db] font-mono">Scene</code>, <code className="text-[#38c3db] font-mono">Asset</code>, <code className="text-[#38c3db] font-mono">Action-Response</code>, <code className="text-[#38c3db] font-mono">Timeline</code>) are ingested into the VReqDV Model Parser.
            </p>
          </div>

          <div className="bg-[#22262a] border border-slate-700/60 rounded-2xl p-5 space-y-2 shadow-lg">
            <div className="flex items-center gap-2 text-[#38c3db] font-mono text-xs uppercase font-bold">
              <span>STEP 2</span>
            </div>
            <h3 className="text-base font-outfit font-bold text-white">
              Template Instantiation & Geometry Binding
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Sequentially processes objects, instantiating primitives (cubes, spheres, cuboids) with transform vectors, light properties, audio cues, and scriptable action components.
            </p>
          </div>

          <div className="bg-[#22262a] border border-slate-700/60 rounded-2xl p-5 space-y-2 shadow-lg">
            <div className="flex items-center gap-2 text-[#38c3db] font-mono text-xs uppercase font-bold">
              <span>STEP 3</span>
            </div>
            <h3 className="text-base font-outfit font-bold text-white">
              Modular Trigger & Response Binding
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Links trigger events (collisions, rotation thresholds) to response callbacks (visibility changes, movement, audio) using reusable Unity Scriptable Object templates.
            </p>
          </div>

          <div className="bg-[#22262a] border border-slate-700/60 rounded-2xl p-5 space-y-2 shadow-lg">
            <div className="flex items-center gap-2 text-[#38c3db] font-mono text-xs uppercase font-bold">
              <span>STEP 4</span>
            </div>
            <h3 className="text-base font-outfit font-bold text-white">
              Requirement Synchronization & Scene Differencing
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Converts edited Unity scenes back into textual model specifications, providing Git-like visual side-by-side differencing and backward compatibility trace.
            </p>
          </div>
        </div>

        {/* Interactive Versioning Studio Card */}
        <div className="bg-[#22262a] border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-700/80 pb-4 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-[#38c3db] bg-[#38c3db]/10 px-2.5 py-1 rounded-full border border-[#38c3db]/30">
                  VReqDV Editor Studio
                </span>
                <span className="text-xs font-mono text-slate-300">
                  UNITY Custom Editor Plugin Simulation
                </span>
              </div>
              <h3 className="text-2xl font-outfit font-bold text-white mt-1">
                Bowling Alley Scene Design Generation & Version Control
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCompareMode(!compareMode)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 border ${
                  compareMode
                    ? 'bg-[#38c3db] text-[#181b1e] border-[#38c3db] font-bold shadow-md'
                    : 'bg-slate-800 text-[#38c3db] border-slate-700 hover:bg-slate-700'
                }`}
              >
                <GitBranch className="w-4 h-4" />
                <span>{compareMode ? 'Exit Version Differencing' : 'Compare V1 vs V2 Spec'}</span>
              </button>
            </div>
          </div>

          {/* Version Selector Tabs */}
          <div className="flex items-center justify-between bg-[#181b1e] p-1.5 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-2">
              {VERSION_DATA.map((v, idx) => (
                <button
                  key={v.version}
                  onClick={() => setSelectedVersionIdx(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    selectedVersionIdx === idx
                      ? 'bg-[#38c3db] text-[#181b1e] shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <span>Version {v.version}</span>
                </button>
              ))}
            </div>

            <div className="text-xs font-mono text-slate-400 hidden sm:block">
              Active Spec: <span className="text-[#38c3db] font-bold">{currentVersion.sceneName}</span>
            </div>
          </div>

          {/* Main Inspection View: Single or Side-by-Side Compare */}
          {!compareMode ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Scene Objects & Attributes */}
              <div className="space-y-4">
                <div className="bg-[#181b1e] p-4 rounded-2xl border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Spec Version:</span>
                    <span className="text-[#38c3db] font-bold">{currentVersion.version}</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {currentVersion.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#38c3db] block">
                    Instantiated Scene Primitives ({currentVersion.objects.length})
                  </span>
                  {currentVersion.objects.map((obj, idx) => (
                    <div key={idx} className="bg-[#181b1e] p-3.5 rounded-xl border border-slate-700 flex items-center justify-between text-xs font-mono">
                      <div className="space-y-0.5">
                        <span className="text-white font-bold block">{obj.name}</span>
                        <span className="text-slate-400 text-[11px]">Shape: {obj.shape} | Light: {obj.illuminate ? 'Enabled' : 'Disabled'}</span>
                      </div>
                      <div className="text-right text-[11px] text-slate-300">
                        <div>Pos: [{obj.position.join(', ')}]</div>
                        <div>Rot: [{obj.rotation.join(', ')}]</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Response Component */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#38c3db] block">
                    Unity Action-Response Scriptable Component
                  </span>
                  {currentVersion.actionResponses.map((ar) => (
                    <div key={ar.id} className="bg-[#181b1e] p-4 rounded-xl border border-slate-700 space-y-1 text-xs font-mono">
                      <div className="flex items-center justify-between text-slate-200 font-bold">
                        <span>Trigger: {ar.trigger}</span>
                        <span>-&gt; Target: {ar.target}</span>
                      </div>
                      <div className="text-slate-200">Response Routine: <span className="text-white font-bold">{ar.response}</span></div>
                      {ar.threshold && <div className="text-slate-400 text-[11px]">Guard Condition: {ar.threshold}</div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* JSON Spec View */}
              <div className="bg-[#181b1e] rounded-2xl p-4 border border-slate-700 flex flex-col justify-between space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <span className="text-[#38c3db] font-bold flex items-center gap-2">
                    <span>Parsed Model Template (JSON)</span>
                  </span>
                  <button
                    onClick={handleCopy}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] flex items-center gap-1 border border-slate-700 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#38c3db]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <pre className="text-slate-200 bg-[#14171a] p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed max-h-[300px]">
                  <code>{currentVersion.jsonSpec}</code>
                </pre>

                <div className="text-[11px] text-slate-300 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700 flex items-center gap-2">
                  <span>Requirement-to-Design Traceability Guaranteed via VReqST Model ID</span>
                </div>
              </div>
            </div>
          ) : (
            /* Side-by-Side Compare View */
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                {/* Version 1 */}
                <div className="bg-[#181b1e] p-5 rounded-2xl border border-slate-700 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                    <span className="text-slate-300 font-bold">Version 1.0.0 (Base)</span>
                    <span className="text-slate-400">BowlingAlley_Base</span>
                  </div>
                  <div className="space-y-2 text-slate-300">
                    <div>Pin Reaction: <span className="text-white font-semibold">Fall To Ground</span></div>
                    <div>Trigger Mechanism: <span className="text-white font-semibold">Direct Ball Collision</span></div>
                    <div>Illuminate Pin: <span className="text-amber-400 font-semibold">false</span></div>
                    <div>Ball Start Vector: <span className="text-white font-semibold">[0, 0.5, 0]</span></div>
                  </div>
                </div>

                {/* Version 2 */}
                <div className="bg-[#181b1e] p-5 rounded-2xl border border-[#38c3db]/60 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                    <span className="text-[#38c3db] font-bold">Version 2.0.0 (Revision)</span>
                    <span className="text-[#38c3db]">BowlingAlley_Enhanced</span>
                  </div>
                  <div className="space-y-2 text-slate-200">
                    <div>Pin Reaction: <span className="text-[#38c3db] font-bold">Disappear & Destroy</span></div>
                    <div>Trigger Mechanism: <span className="text-[#38c3db] font-bold">Rotation Tilt &gt; 10°</span></div>
                    <div>Illuminate Pin: <span className="text-[#38c3db] font-bold">true (Updated)</span></div>
                    <div>Ball Start Vector: <span className="text-[#38c3db] font-bold">[0, 0.5, 0.2] (Shifted)</span></div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-xs font-mono text-cyan-200 flex items-center gap-3">
                <GitBranch className="w-5 h-5 text-[#38c3db] shrink-0" />
                <span>
                  <strong>VReqDV Change Log:</strong> Modified action-response <code className="text-[#38c3db]">pin_fall</code> behavior from physical tilt to dynamic destruction upon 10° threshold breach. Updated pin lighting flag to active.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
