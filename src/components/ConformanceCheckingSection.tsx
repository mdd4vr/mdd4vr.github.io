import React, { useState } from 'react';
import { SlideIn } from './SlideIn';
import { 
  CheckCircle2, XCircle, Play, AlertTriangle, ShieldCheck, 
  Terminal, FileText, Activity, Clock, Layers, Filter, 
  Check, RefreshCw, Eye, Cpu, Zap, ArrowRight, CornerDownRight
} from 'lucide-react';

interface TestCaseScenario {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  idealSpecJson: string;
  conformingLogs: {
    timestamp: number;
    event: string;
    object: string;
    target?: string;
    status: 'pass' | 'fail' | 'filtered';
    note?: string;
  }[];
  corruptedLogs: {
    timestamp: number;
    event: string;
    object: string;
    target?: string;
    status: 'pass' | 'fail' | 'filtered';
    note?: string;
  }[];
}

const TEST_SCENARIOS: TestCaseScenario[] = [
  {
    id: 'seq2_user_driven',
    name: 'Sequence 2: Multi-Object Interaction & Prerequisite Enforcement',
    subtitle: 'User-Input Driven Training Task with Prerequisite Order Verification',
    description: 'Requires the user to view the object (object_seen), pick it up within time tolerances, and satisfy prerequisite rules before final confirmation.',
    idealSpecJson: `{
  "testSuite": "Basic VR Grab Test",
  "version": "1.0",
  "settings": {
    "timeTolerance": { "value": 100, "unit": "ms" }
  },
  "objects": [
    { "id": "RedCube", "type": "grabbable" }
  ],
  "timeline": [
    {
      "event": "Player sees red cube",
      "type": "object_seen",
      "object": "RedCube"
    },
    {
      "event": "Player grabs red cube",
      "type": "object_grabbed",
      "object": "RedCube",
      "delay": 2000,
      "prerequisites": ["object_seen"]
    }
  ]
}`,
    conformingLogs: [
      { timestamp: 102, event: 'APPLICATION_STARTED', object: 'System', status: 'filtered', note: 'Extraneous background event filtered out' },
      { timestamp: 140, event: 'object_seen', object: 'RedCube', status: 'pass', note: 'Prerequisite satisfied (object_seen logged)' },
      { timestamp: 210, event: 'head_rotation_changed', object: 'Camera', status: 'filtered', note: 'Non-deterministic user motion ignored' },
      { timestamp: 2120, event: 'object_grabbed', object: 'RedCube', status: 'pass', note: 'Grab action matched within time window (2000ms delay + 100ms tolerance)' },
    ],
    corruptedLogs: [
      { timestamp: 102, event: 'APPLICATION_STARTED', object: 'System', status: 'filtered', note: 'Extraneous event ignored' },
      { timestamp: 210, event: 'object_grabbed', object: 'RedCube', status: 'fail', note: 'VIOLATION: Prerequisite "object_seen" was not satisfied before grab!' },
      { timestamp: 450, event: 'object_seen', object: 'RedCube', status: 'fail', note: 'Out-of-order sequence: object_seen occurred after grab' },
    ]
  },
  {
    id: 'seq1_system_driven',
    name: 'Sequence 1: Timed System Trajectory & Impact Sequence',
    subtitle: 'Automated Non-Interactive Verification with Precision Timing Windows',
    description: 'Validates that a moving object follows the expected linear trajectory, impacting the ground and target statue in exact sequence.',
    idealSpecJson: `{
  "testSuite": "Trajectory & Impact Test",
  "version": "1.0",
  "settings": {
    "timeTolerance": { "value": 50, "unit": "ms" }
  },
  "timeline": [
    {
      "event": "Capsule started moving",
      "type": "object_start_moving",
      "object": "Capsule"
    },
    {
      "event": "Collision with Ground",
      "type": "object_collision",
      "object": "Capsule",
      "target": "Ground",
      "delay": 1500
    },
    {
      "event": "Collision with Statue",
      "type": "object_collision",
      "object": "Capsule",
      "target": "UnityStatue",
      "delay": 3000
    }
  ]
}`,
    conformingLogs: [
      { timestamp: 50, event: 'object_start_moving', object: 'Capsule', status: 'pass', note: 'Movement initiated' },
      { timestamp: 1540, event: 'object_collision', object: 'Capsule', target: 'Ground', status: 'pass', note: 'Impact within 1500ms + 50ms window' },
      { timestamp: 3020, event: 'object_collision', object: 'Capsule', target: 'UnityStatue', status: 'pass', note: 'Statue impact verified' }
    ],
    corruptedLogs: [
      { timestamp: 50, event: 'object_start_moving', object: 'Capsule', status: 'pass', note: 'Movement initiated' },
      { timestamp: 1800, event: 'object_collision', object: 'Capsule', target: 'Ground', status: 'fail', note: 'TIMING VIOLATION: Impact delayed by 300ms (Exceeds 50ms tolerance)' },
      { timestamp: 3020, event: 'object_collision', object: 'Capsule', target: 'UnityStatue', status: 'fail', note: 'Aborted due to prior step failure' }
    ]
  }
];

export const ConformanceCheckingSection: React.FC = () => {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState<number>(0);
  const [testRunMode, setTestRunMode] = useState<'conforming' | 'corrupted'>('conforming');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const scenario = TEST_SCENARIOS[activeScenarioIdx];
  const currentLogs = testRunMode === 'conforming' ? scenario.conformingLogs : scenario.corruptedLogs;

  const passedCount = currentLogs.filter(l => l.status === 'pass').length;
  const failedCount = currentLogs.filter(l => l.status === 'fail').length;
  const filteredCount = currentLogs.filter(l => l.status === 'filtered').length;
  const isOverallPass = failedCount === 0;

  const handleRunVerification = () => {
    setIsExecuting(true);
    setTimeout(() => setIsExecuting(false), 400);
  };

  return (
    <section
      id="conformance"
      className="relative min-h-screen w-full bg-[#f8fafc] text-slate-900 py-20 px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center justify-center slide-section overflow-hidden"
    >
      <div className="w-full space-y-10 relative z-10">
        {/* Header */}
        <SlideIn direction="up" delay={0.1} duration={0.8}>
          <div className="text-center w-full space-y-3">
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-slate-900">
              VR Interaction Conformance Checking System
            </h2>
          </div>
        </SlideIn>

        {/* Paper Methodology Pipeline Flow (Phase 1 to 4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-sm">
            <div className="flex items-center gap-2 text-cyan-700 font-mono text-xs uppercase font-bold">
              <span>STEP 1</span>
            </div>
            <h3 className="text-base font-outfit font-bold text-slate-900">
              JSON-Based Event & Tolerance Formalism
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Defines expected interaction flow graphs, object entities, prerequisite dependency chains, global timing tolerances (<code className="text-cyan-700 font-mono">timeTolerance</code>), and per-event delay windows.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-sm">
            <div className="flex items-center gap-2 text-cyan-700 font-mono text-xs uppercase font-bold">
              <span>STEP 2</span>
            </div>
            <h3 className="text-base font-outfit font-bold text-slate-900">
              Non-Programmer Test Suite Authoring
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Enables instructional designers and QA testers to visually construct interaction test sequences using node-based drag-and-drop flowcharts without writing raw code.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-sm">
            <div className="flex items-center gap-2 text-cyan-700 font-mono text-xs uppercase font-bold">
              <span>STEP 3</span>
            </div>
            <h3 className="text-base font-outfit font-bold text-slate-900">
              Multi-Modal Interaction Capture
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Captures structured runtime interaction logs (<code className="text-cyan-700 font-mono">object_seen</code>, <code className="text-cyan-700 font-mono">object_grabbed</code>, <code className="text-cyan-700 font-mono">collision</code>) with high-precision timestamps and spatial vectors.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-sm">
            <div className="flex items-center gap-2 text-cyan-700 font-mono text-xs uppercase font-bold">
              <span>STEP 4</span>
            </div>
            <h3 className="text-base font-outfit font-bold text-slate-900">
              Extraneous Event Filtering & Timing Checks
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Executes a state-machine log verification algorithm in O(n × m) time, filtering non-deterministic extraneous actions while enforcing strict prerequisite order and timing windows.
            </p>
          </div>
        </div>

        {/* Interactive Verification Testing Studio */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-200">
                  Rules Engine Test Simulator
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Runtime Log Verification Harness (O(n × m))
                </span>
              </div>
              <h3 className="text-2xl font-outfit font-bold text-slate-900 mt-1">
                Automated Conformance Checking Execution
              </h3>
            </div>

            {/* Scenario Selector */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveScenarioIdx(0)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeScenarioIdx === 0 ? 'bg-[#38c3db] text-[#181b1e] shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Scenario 2 (User-Input)
              </button>
              <button
                onClick={() => setActiveScenarioIdx(1)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeScenarioIdx === 1 ? 'bg-[#38c3db] text-[#181b1e] shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Scenario 1 (System)
              </button>
            </div>
          </div>

          {/* Test Run Configuration & Run Mode Switch */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
              <span className="text-xs font-mono text-cyan-700 font-bold block">
                {scenario.name}
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-outfit">
                {scenario.description}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-2">
              <span className="text-xs font-mono text-slate-500 font-bold">Simulated VR Log Run:</span>
              <div className="flex items-center gap-2 bg-slate-200/80 p-1 rounded-xl border border-slate-300">
                <button
                  onClick={() => { setTestRunMode('conforming'); handleRunVerification(); }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    testRunMode === 'conforming' ? 'bg-[#38c3db] text-[#181b1e] shadow' : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  Golden Run
                </button>
                <button
                  onClick={() => { setTestRunMode('corrupted'); handleRunVerification(); }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    testRunMode === 'corrupted' ? 'bg-rose-600 text-white shadow' : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  Corrupted Log
                </button>
              </div>
            </div>
          </div>

          {/* Verification Results Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ideal Specification JSON View */}
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-2 font-mono text-xs text-slate-100">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-100 font-bold flex items-center gap-2">
                  <span>Ideal Interaction Specification Schema</span>
                </span>
                <span className="text-[11px] text-slate-400">JSON Blueprint</span>
              </div>
              <pre className="text-slate-200 bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed max-h-[280px]">
                <code>{scenario.idealSpecJson}</code>
              </pre>
            </div>

            {/* Runtime Log Verification Stream */}
            <div className="space-y-3 font-mono text-xs">
              {/* Summary Bar */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase border ${
                    isOverallPass ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-rose-100 text-rose-800 border-rose-300'
                  }`}>
                    {isOverallPass ? 'PASS (100% Conformance)' : 'FAIL (Violations Detected)'}
                  </span>
                  <span className="text-slate-600 text-[11px]">Execution: <strong className="text-slate-900">24 ms</strong></span>
                </div>

                <div className="flex items-center gap-3 text-[11px]">
                  <span className="text-emerald-700 font-bold">Passed: {passedCount}</span>
                  <span className="text-rose-600 font-bold">Failed: {failedCount}</span>
                  <span className="text-slate-500">Filtered: {filteredCount}</span>
                </div>
              </div>

              {/* Log Event Stream */}
              <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
                {currentLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border transition-all text-xs space-y-1 ${
                      log.status === 'pass'
                        ? 'bg-emerald-50/90 border-emerald-200 text-slate-800'
                        : log.status === 'fail'
                        ? 'bg-rose-50 border-rose-300 text-rose-950 font-medium'
                        : 'bg-slate-100 border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <div className="flex items-center gap-2">
                        {log.status === 'pass' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                        {log.status === 'fail' && <XCircle className="w-4 h-4 text-rose-600" />}
                        {log.status === 'filtered' && <Filter className="w-3.5 h-3.5 text-slate-400" />}
                        <span>t={log.timestamp}ms | <code className="font-mono text-slate-900">{log.event}</code></span>
                      </div>
                      <span className="text-[11px] opacity-80">Object: {log.object}</span>
                    </div>

                    {log.note && (
                      <p className="text-[11px] opacity-90 pl-6 font-outfit">
                        {log.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
