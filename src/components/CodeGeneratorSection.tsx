import React, { useState } from 'react';
import { SlideIn } from './SlideIn';
import { 
  Terminal, ShieldCheck, CheckCircle2, ChevronRight, ChevronLeft,
  Sparkles, Code2, Copy, Check, Compass, Sliders, Layers
} from 'lucide-react';

interface StageDetail {
  stageNumber: number;
  id: string;
  name: string;
  subtitle: string;
  summary: string;
  humanInputs: { label: string; description: string; sample: string }[];
  safetyGuards: string[];
  codeOutputs: {
    webxr: string;
    unity: string;
    unreal: string;
    json: string;
  };
}

const SPEC_STAGES: StageDetail[] = [
  {
    stageNumber: 1,
    id: 'scene',
    name: '1. Spatial Environment Metaclass (Scene)',
    subtitle: 'Physical Boundaries & Reference Frames',
    summary: 'Defines spatial boundaries, camera reference frames, tracking origins, and atmospheric environment parameters using high-level domain constructs.',
    humanInputs: [
      { label: 'Environment Name', description: 'Name of the therapy clinic or workspace', sample: 'Orthopedic Rehab Clinic' },
      { label: 'Play Area Boundaries', description: 'Safe 3D floor dimensions for patient movement', sample: '6.0m × 6.0m × 3.0m' },
      { label: 'VR Camera Viewpoint', description: 'Headset tracking origin and perspective', sample: 'Floor Level + Oculus Touch' },
      { label: 'Visual Skybox', description: 'Background lighting and sky ambient', sample: 'Clinical Gradient Sky' },
    ],
    safetyGuards: [
      'Ensures room dimensions are strictly positive values to prevent physics calculation crashes.',
      'Verifies mandatory VR camera reference initialization.',
      'Checks headset tracking compatibility.',
    ],
    codeOutputs: {
      json: `{
  "_scenename": "Orthopedic_Rehab_Clinic",
  "_sid": "scene_001",
  "#length_playarea": 6.0,
  "#width_playarea": 6.0,
  "trackingorigin": "FloorLevel",
  "_skybox": "ClinicalGradient_Sky"
}`,
      webxr: `<a-scene embedded skybox="src: #ClinicalGradient_Sky">
  <a-entity id="Orthopedic_Rehab_Clinic">
    <a-camera id="MainVRCamera" position="0 1.6 0"></a-camera>
  </a-entity>
</a-scene>`,
      unity: `// Unity C# Scene Setup via VReqST Engine
public class VRClinicScene : MonoBehaviour {
    public Vector3 playAreaSize = new Vector3(6.0f, 3.0f, 6.0f);
    public string sceneName = "Orthopedic_Rehab_Clinic";
}`,
      unreal: `// Unreal Engine C++ Scene Initialization
AVRSceneManager::AVRSceneManager() {
    SceneName = TEXT("Orthopedic_Rehab_Clinic");
    PlayAreaBounds = FVector(600.0f, 600.0f, 300.0f);
}`,
    },
  },
  {
    stageNumber: 2,
    id: 'article',
    name: '2. Virtual Entity Metaclass (Article)',
    subtitle: 'Physical Properties, Mass & Grabbability',
    summary: 'Instantiates 3D equipment entities, specifying initial spatial transformations, physical mass, interactable grab behaviors, and haptic feedback profiles.',
    humanInputs: [
      { label: 'Equipment Object', description: 'Physical 3D item placed in scene', sample: 'Elastic Rehab Resistance Handle' },
      { label: 'Initial Position', description: 'Coordinates where object rests', sample: 'X: 0.5m, Y: 1.2m, Z: -0.8m' },
      { label: 'Physical Weight', description: 'Mass used for realistic VR physics', sample: '0.45 kg' },
      { label: 'Interaction Mode', description: 'VR grab interactable with haptics', sample: 'XR Grab Enabled + Audio Click' },
    ],
    safetyGuards: [
      'Validates that every 3D article has a unique identifier in the scene registry.',
      'Ensures physical mass is greater than zero.',
      'Verifies initial positions lie inside the defined room boundaries.',
    ],
    codeOutputs: {
      json: `{
  "_objectname": "RehabGrip_Tool",
  "_sid": "art_102",
  "Transform_initialpos": [0.5, 1.2, -0.8],
  "XRGrabInteractable": true,
  "hasmass": 0.45,
  "aud_src": "haptic_click.wav"
}`,
      webxr: `<a-entity id="RehabGrip_Tool"
          position="0.5 1.2 -0.8"
          grabbable
          sound="src: #haptic_click; on: grab">
</a-entity>`,
      unity: `[RequireComponent(typeof(XRGrabInteractable))]
public class RehabGripTool : MonoBehaviour {
    public float massKg = 0.45f;
    public string articleId = "art_102";
}`,
      unreal: `UVRehabToolComponent::UVRehabToolComponent() {
    ArticleID = TEXT("art_102");
    MassKg = 0.45f;
    bXRGrabInteractable = true;
}`,
    },
  },
  {
    stageNumber: 3,
    id: 'action_response',
    name: '3. Interaction Metaclass (ActionResponse)',
    subtitle: 'Event Triggers & Behavioral Callbacks',
    summary: 'Binds user interactions (e.g., grasping, rotation) to system routines (e.g., Range of Motion angle calculations) and repetition sets.',
    humanInputs: [
      { label: 'Interaction Trigger', description: 'Source action performed by user', sample: 'Right Hand Grasps Rehab Handle' },
      { label: 'Target Equipment', description: 'Object being operated on', sample: 'Rehab Grip Tool (art_102)' },
      { label: 'System Response', description: 'Calculation or routine executed', sample: 'Flexion Angle Tracking Routine' },
      { label: 'Required Repetitions', description: 'Number of repetitions per set', sample: '10 Repetitions' },
    ],
    safetyGuards: [
      'Verifies source hand and target object exist in registered article list.',
      'Ensures target behavior routine exists in logic engine.',
      'Confirms repetition counts are positive integers.',
    ],
    codeOutputs: {
      json: `{
  "actresid": "ar_204",
  "sourceObj": "User_Hand_Right",
  "targetObj": "RehabGrip_Tool",
  "response": "FlexionAngleCalculation",
  "repeatactionfor": 10
}`,
      webxr: `<a-entity vreqst-action-response="source: User_Hand_Right; target: RehabGrip_Tool; response: FlexionAngleCalculation">
</a-entity>`,
      unity: `public void OnGrabTool(SelectEnterEventArgs args) {
    VReqSTBehaviorEngine.ExecuteRoutine("FlexionAngleCalculation", 10);
}`,
      unreal: `void UVRInteractionSubsystem::OnGrabTool() {
    ExecuteRoutine(TEXT("FlexionAngleCalculation"), 10);
}`,
    },
  },
  {
    stageNumber: 4,
    id: 'behavior',
    name: '4. Behavioral State Machine Metaclass (Behavior)',
    subtitle: 'State Transition Logic & OCL Safety Guards',
    summary: 'Defines finite state machines and rule guards that monitor motion execution continuously and trigger safety protocols when invariant thresholds are exceeded.',
    humanInputs: [
      { label: 'Logic Rule Name', description: 'Rule name in monitoring system', sample: 'Forearm Flexion Angle Monitor' },
      { label: 'Resting State', description: 'Initial state before motion', sample: 'Resting Arm (0° Flexion)' },
      { label: 'Monitored Motion', description: 'Live event being tracked', sample: 'Patient Elbow Flexion' },
      { label: 'Safety Trigger', description: 'Action executed when limit reached', sample: 'Log Motion Data & Sound Alert' },
    ],
    safetyGuards: [
      'Validates low-code state transition logic syntax.',
      'Requires explicit initial and final state declarations.',
      'Guarantees safety alert routines are properly linked.',
    ],
    codeOutputs: {
      json: `{
  "state": [{
    "id": "flexion_mon_2026",
    "name": "Forearm Angle Monitor",
    "initial": "resting_arm_0deg",
    "event": "patient_elbow_flexion",
    "final": "log_rom_angle_and_trigger_haptic"
  }]
}`,
      webxr: `<a-entity vreqst-state-monitor="initial: resting_arm_0deg; target: target_rom_angle_reached">
</a-entity>`,
      unity: `if (currentFlexionAngle > maxSafeLimit) {
    TriggerSafetyHapticAlert();
    LogAngleMeasurement(currentFlexionAngle);
}`,
      unreal: `if (CurrentFlexionAngle > MaxSafeLimit) {
    TriggerSafetyAlert();
    LogMeasurement(CurrentFlexionAngle);
}`,
    },
  },
  {
    stageNumber: 5,
    id: 'timeline',
    name: '5. Temporal Synchronization Metaclass (Timeline)',
    subtitle: 'Chronological Phase Sequences & Choreography',
    summary: 'Schedules multi-phase therapy protocols or emergency drills into validated sequential timelines (Warmup -> Exercise -> Cooldown), completing the Platform-Independent Model (PIM).',
    humanInputs: [
      { label: 'Session Identifier', description: 'Full therapy protocol protocol', sample: 'Elbow Flexion 3-Set Protocol' },
      { label: 'Session Duration', description: 'Total allocated therapy time', sample: '15 Minutes Total' },
      { label: 'Phase Sequence', description: 'Chronological progression', sample: '1. Warmup (5m) -> 2. Exercise (3 Sets) -> 3. Cooldown (2m)' },
      { label: 'Object Sync', description: 'Ensures scene objects start together', sample: 'All Objects Sync Enabled' },
    ],
    safetyGuards: [
      'Verifies start time is strictly earlier than end time.',
      'Ensures routine begins with Warmup and finishes with Cooldown.',
      'Validates synchronized object references.',
    ],
    codeOutputs: {
      json: `{
  "tsyncid": "timeline_session_01",
  "routine": "ElbowFlexion_3Sets_Protocol",
  "order": ["Warmup_5Min", "Exercise_10Rep_3Sets", "Cooldown_2Min"]
}`,
      webxr: `<a-entity vreqst-timeline="routine: ElbowFlexion_3Sets; order: Warmup,Exercise,Cooldown">
</a-entity>`,
      unity: `public class TherapyTimeline : MonoBehaviour {
    public string[] phaseOrder = new string[] { "Warmup", "Exercise", "Cooldown" };
}`,
      unreal: `FTherapyTimeline::FTherapyTimeline() {
    PhaseOrder = { TEXT("Warmup"), TEXT("Exercise"), TEXT("Cooldown") };
}`,
    },
  },
];

export const CodeGeneratorSection: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

  const currentStage = SPEC_STAGES[activeStageIndex];

  return (
    <section
      id="codegen"
      className="relative min-h-screen w-full bg-[#f8fafc] text-slate-900 py-16 px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center justify-center slide-section overflow-hidden"
    >
      <div className="w-full space-y-10">
        {/* Header */}
        <SlideIn direction="up" delay={0.1} duration={0.8}>
          <div className="text-center w-full space-y-3">
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-slate-900">
              VReqST: Model-to-Text (M2T) Code Generation
            </h2>
          </div>
        </SlideIn>

        {/* Research Paper Methodology Flow: Specification Operationalization to M2T Code Synthesis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-cyan-700 font-mono text-xs uppercase font-bold">
              <span>STEP 1</span>
            </div>
            <h3 className="text-base font-outfit font-bold text-slate-900">
              Instantiation of VRSpecML Metaclass Primitives
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Instantiates the 5 VRSpecML metaclass primitives (<code className="text-cyan-700 font-mono">Scene</code>, <code className="text-cyan-700 font-mono">Article</code>, <code className="text-cyan-700 font-mono">ActionResponse</code>, <code className="text-cyan-700 font-mono">Behavior</code>, <code className="text-cyan-700 font-mono">Timeline</code>) through a 5-stage specification environment for domain experts.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-cyan-700 font-mono text-xs uppercase font-bold">
              <span>STEP 2</span>
            </div>
            <h3 className="text-base font-outfit font-bold text-slate-900">
              Specification Static Model Validation
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Evaluates specification instances against the compiled VRSpecML OCL invariant suite prior to transformation, verifying spatial bounds, equipment references, and rule guard consistency.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-cyan-700 font-mono text-xs uppercase font-bold">
              <span>STEP 3</span>
            </div>
            <h3 className="text-base font-outfit font-bold text-slate-900">
              AST Synthesis & Platform-Specific Mapping (PSM)
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Transforms validated specification instances into intermediary Abstract Syntax Trees (AST) and Platform-Specific Models (PSM) ready for engine template binding.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-cyan-700 font-mono text-xs uppercase font-bold">
              <span>STEP 4</span>
            </div>
            <h3 className="text-base font-outfit font-bold text-slate-900">
              Automated Target Artifact Synthesis
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Executes Model-to-Text (M2T) code synthesis templates to output deployment-ready artifacts across WebXR (A-Frame HTML), Unity XR (C#), and Unreal Engine (C++).
            </p>
          </div>
        </div>

        {/* 5-Stage Step Progress Navigation */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-md flex flex-wrap items-center justify-between gap-2">
          {SPEC_STAGES.map((s, idx) => {
            const isActive = activeStageIndex === idx;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStageIndex(idx)}
                className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl transition-all cursor-pointer text-left flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-[#38c3db] text-[#181b1e] shadow-lg font-bold ring-2 ring-[#38c3db]/40'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                  isActive ? 'bg-[#181b1e] text-[#38c3db]' : 'bg-slate-200 text-slate-700'
                }`}>
                  {s.stageNumber}
                </span>
                <span className="text-xs font-outfit font-bold truncate">
                  {s.id === 'scene' && 'Scene'}
                  {s.id === 'article' && 'Article'}
                  {s.id === 'action_response' && 'Action Response'}
                  {s.id === 'behavior' && 'Behavior'}
                  {s.id === 'timeline' && 'Timeline'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Stage Header */}
          <div className="border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-slate-500">
                  {currentStage.subtitle}
                </span>
              </div>
              <h3 className="text-2xl font-outfit font-bold text-slate-900 mt-1">
                {currentStage.name}
              </h3>
            </div>
          </div>

          {/* Simple Explanation */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-1.5">
            <span className="text-xs font-mono font-bold text-cyan-700 uppercase tracking-wider block">
              Stage Overview & Purpose
            </span>
            <p className="text-slate-800 text-sm leading-relaxed font-outfit">
              {currentStage.summary}
            </p>
          </div>

          {/* User Inputs Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase font-bold text-slate-800 tracking-wider flex items-center gap-2">
              <span>User Specification Parameters Defined at this Stage</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentStage.humanInputs.map((input, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500 font-semibold">{input.label}</span>
                    <span className="text-cyan-700 font-bold bg-cyan-100/80 px-2 py-0.5 rounded border border-cyan-200/60">
                      {input.sample}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 pt-1">
                    {input.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Automated Safety & Quality Guards */}
          <div className="bg-cyan-50/60 p-5 rounded-2xl border border-cyan-200/80 space-y-3">
            <h4 className="text-xs font-mono uppercase font-bold text-cyan-800 tracking-wider flex items-center gap-2">
              <span>Automated Background Quality & Validation Rules</span>
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-cyan-900">
              {currentStage.safetyGuards.map((guard, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-white p-3 rounded-xl border border-cyan-200/70 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                  <span>{guard}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
