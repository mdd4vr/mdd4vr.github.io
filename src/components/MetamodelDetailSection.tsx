import React, { useState } from 'react';
import { SlideIn } from './SlideIn';
import { 
  Network, ShieldCheck, CheckCircle2, ChevronRight, ChevronLeft,
  Flame, Stethoscope, Trophy, Sliders, Code2, Layers, AlertTriangle, 
  Target, HelpCircle, Zap, Award, ArrowRight
} from 'lucide-react';
import { VRSpecMLProfile } from '../types';

const VRSPECML_PROFILES: VRSpecMLProfile[] = [
  {
    id: 'bowling_alley',
    domainName: 'Bowling Alley Simulation (VReqDV Benchmark)',
    ontologyRef: 'VR Game & Physics Ontology (ENASE 2025)',
    description: 'Formalizes a 3D VR bowling alley with pinsetter geometries, ball roll dynamics, action-responses (pin fall & score calculation), and event timelines.',
    mappings: [
      {
        baseClass: 'Scene',
        stereotype: '«BowlingAlleyScene»',
        taggedValues: [
          { name: 'sceneName', type: 'String', sampleValue: '"Bowling Alley"' },
          { name: 'playArea', type: 'PlayArea[1]', sampleValue: '50ft × 50ft × 50ft' },
          { name: 'gravity', type: 'Float', sampleValue: '10.0 m/s²' },
          { name: 'controllers', type: 'XRController[1]', sampleValue: 'HandRaycast (Distance: 10m)' },
        ],
      },
      {
        baseClass: 'Article',
        stereotype: '«BowlingEntity»',
        taggedValues: [
          { name: 'ballObject', type: 'Article[1]', sampleValue: 'Ball (Sphere, Radii: 5, Mass: 20kg)' },
          { name: 'pinArray', type: 'Article[10]', sampleValue: 'Pins 1..10 (Cylinder, Height: 5, Mass: 5kg)' },
          { name: 'laneSurfaces', type: 'Article[3]', sampleValue: '[trackplane, pinplane, gutter]' },
          { name: 'scoreboard', type: 'Article[1]', sampleValue: '_scoreboard (50ft × 20ft)' },
        ],
      },
      {
        baseClass: 'ActionResponse',
        stereotype: '«PinFallAction»',
        taggedValues: [
          { name: 'triggerCondition', type: 'String', sampleValue: 'if ({_gameball $hits _anypin} OR {_anypin $hits _anypin})' },
          { name: 'responseAction', type: 'String', sampleValue: 'then $fall(_anypin)' },
          { name: 'scoreUpdate', type: 'String', sampleValue: 'point = #count($fall(_anypin)) * ind_point' },
          { name: 'strikeBonus', type: 'String', sampleValue: 'if (#count($fall(_anypin)) == 10) point = strike_point' },
        ],
      },
      {
        baseClass: 'Behavior',
        stereotype: '«PinPhysicsBehavior»',
        taggedValues: [
          { name: 'rotationThresholdDeg', type: 'Float', sampleValue: '10.0°' },
          { name: 'pinDisappearance', type: 'Boolean', sampleValue: 'true' },
          { name: 'rigidBodyMass', type: 'Float', sampleValue: '5.0 kg' },
          { name: 'continuousCollision', type: 'Boolean', sampleValue: 'true' },
        ],
      },
      {
        baseClass: 'Timeline',
        stereotype: '«GameTimeline»',
        taggedValues: [
          { name: 'asyncTrigSync', type: 'String', sampleValue: 'All 10 pins change state on ball trigger' },
          { name: 'staticSyncList', type: 'String', sampleValue: '[_scoreboard, _floor]' },
          { name: 'routines', type: 'Routine[3]', sampleValue: '{route11: 00:30-00:55, route12, route13}' },
        ],
      },
    ],
    oclInvariants: [
      {
        name: 'inv ValidPinArrayCount',
        targetStereotype: '«BowlingEntity»',
        expression: 'self.pinArray->size() = 10',
        purpose: 'Ensures exactly 10 pinsetter cylinders are instantiated in standard triangle formation.',
        status: 'pass',
      },
      {
        name: 'inv BallMassAndPhysics',
        targetStereotype: '«BowlingEntity»',
        expression: 'self.ballObject.mass >= 15.0 and self.ballObject.XRGrabInteractable = true',
        purpose: 'Verifies the bowling ball has realistic mass and XR grab interaction enabled.',
        status: 'pass',
      },
      {
        name: 'inv StrikeScoreCheck',
        targetStereotype: '«PinFallAction»',
        expression: 'self.responseAction->notEmpty() implies self.scoreUpdate->notEmpty()',
        purpose: 'Ensures score calculation rules are bound to pin fall interaction triggers.',
        status: 'pass',
      },
      {
        name: 'inv RoutineOrderSequence',
        targetStereotype: '«GameTimeline»',
        expression: 'self.routines->forAll(r | r.starttime < r.endtime)',
        purpose: 'Validates temporal schedule start times strictly precede end times for bowling routines.',
        status: 'pass',
      },
    ],
  },
  {
    id: 'healthcare_rehab',
    domainName: 'Healthcare Rehabilitation (Elbow Physiotherapy)',
    ontologyRef: 'TRAK & TrhOnt Clinical Ontologies',
    description: 'Turns generic 3D spaces into medically validated rehab environments with patient safety limits and clinical timelines.',
    mappings: [
      {
        baseClass: 'Scene',
        stereotype: '«TherapyScene»',
        taggedValues: [
          { name: 'sceneName', type: 'String', sampleValue: '"ElbowRehabRoom_01"' },
          { name: 'therapyType', type: 'TherapyKind', sampleValue: 'TherapyKind::ElbowFlexion' },
          { name: 'clinicalGoal', type: 'String', sampleValue: '"IncreaseROM_PostOp"' },
          { name: 'patients', type: 'Patient[1..*]', sampleValue: '[Patient_#1042]' },
        ],
      },
      {
        baseClass: 'Article',
        stereotype: '«RehabTool»',
        taggedValues: [
          { name: 'gripDiameterMM', type: 'Integer', sampleValue: '60 mm' },
          { name: 'resistanceLevel', type: 'Integer', sampleValue: 'Level 2' },
          { name: 'material', type: 'String', sampleValue: '"FoamRubber"' },
          { name: 'mass', type: 'Float', sampleValue: '0.45 kg' },
          { name: 'therapyActions', type: 'TherapyAction[*]', sampleValue: '[Action_RotateForearm]' },
        ],
      },
      {
        baseClass: 'ActionResponse',
        stereotype: '«TherapyAction»',
        taggedValues: [
          { name: 'targetROMMinDeg', type: 'Float', sampleValue: '30.0°' },
          { name: 'targetROMMaxDeg', type: 'Float', sampleValue: '110.0°' },
          { name: 'repetitions', type: 'Integer', sampleValue: '10 reps' },
          { name: 'safetyConstraint', type: 'SafetyConstraint[1]', sampleValue: 'FlexionSafety_Limit120' },
        ],
      },
      {
        baseClass: 'Behavior',
        stereotype: '«SafetyConstraint»',
        taggedValues: [
          { name: 'maxFlexionDeg', type: 'Float', sampleValue: '120.0°' },
          { name: 'emergencyStopRequired', type: 'Boolean', sampleValue: 'true' },
          { name: 'actionResponses', type: 'ActionResponse[*]', sampleValue: '[EmergencyStopHandler]' },
        ],
      },
      {
        baseClass: 'Timeline',
        stereotype: '«TherapyTimeline»',
        taggedValues: [
          { name: 'setCount', type: 'Integer', sampleValue: '3 sets' },
          { name: 'restSeconds', type: 'Integer', sampleValue: '30 s' },
          { name: 'totalDurationMin', type: 'Integer', sampleValue: '15 mins' },
          { name: 'phases', type: 'TherapyPhase[*]', sampleValue: '{Warmup, Exercise, Cooldown}' },
        ],
      },
    ],
    oclInvariants: [
      {
        name: 'inv SafetyMaxFlexionCheck',
        targetStereotype: '«TherapyAction»',
        expression: 'self.targetROMMaxDeg <= self.safetyConstraint.maxFlexionDeg',
        purpose: 'Ensures target range-of-motion does not exceed clinician-prescribed safe flexion limit.',
        status: 'pass',
      },
      {
        name: 'inv RequiresPatient',
        targetStereotype: '«TherapyScene»',
        expression: 'self.patients->notEmpty()',
        purpose: 'Prevents therapy scene instantiation without at least one assigned patient record.',
        status: 'pass',
      },
      {
        name: 'inv AssociatedAction',
        targetStereotype: '«RehabTool»',
        expression: 'self.therapyActions->size() >= 1',
        purpose: 'Validates that every rehab tool article has at least one associated therapeutic action.',
        status: 'pass',
      },
      {
        name: 'inv EmergencyStopCheck',
        targetStereotype: '«SafetyConstraint»',
        expression: 'self.emergencyStopRequired implies self.actionResponses->exists(a | a.oclIsKindOf(EmergencyStop))',
        purpose: 'Enforces emergency stop handler inclusion whenever safety constraint demands emergency cutoff.',
        status: 'pass',
      },
      {
        name: 'inv SessionPhaseOrder',
        targetStereotype: '«TherapyTimeline»',
        expression: 'self.phases->first().kind = PhaseKind::Warmup and self.phases->last().kind = PhaseKind::Cooldown',
        purpose: 'Verifies clinical timeline begins with Warmup and concludes with Cooldown phase.',
        status: 'pass',
      },
    ],
  },
  {
    id: 'fire_safety_drill',
    domainName: 'Fire Safety Drill (Emergency Evacuation)',
    ontologyRef: 'IFEEont Fire Emergency Ontology',
    description: 'Turns generic 3D spaces into regulated emergency drills with hazard classifications, extinguisher checks, and exit timelines.',
    mappings: [
      {
        baseClass: 'Scene',
        stereotype: '«EmergencyScenario»',
        taggedValues: [
          { name: 'sceneName', type: 'String', sampleValue: '"OfficeFloor2_FireDrill"' },
          { name: 'hazardLevel', type: 'String', sampleValue: '"Moderate_ClassB"' },
          { name: 'buildingType', type: 'String', sampleValue: '"CommercialOffice"' },
          { name: 'hazardSources', type: 'HazardSource[*]', sampleValue: '[ElectricalPanelFire]' },
          { name: 'exitRoutes', type: 'ExitRoute[*]', sampleValue: '[StairwellNorth, ExitDoorSouth]' },
        ],
      },
      {
        baseClass: 'Article',
        stereotype: '«HazardSource»',
        taggedValues: [
          { name: 'fireClass', type: 'FireClass', sampleValue: 'FireClass::B' },
          { name: 'spreadRate', type: 'Float', sampleValue: '0.6 m/s' },
          { name: 'heatIntensity', type: 'String', sampleValue: '"High"' },
          { name: 'linkedSafetyEquipment', type: 'SafetyEquipment[*]', sampleValue: '[CO2_Extinguisher_#1]' },
        ],
      },
      {
        baseClass: 'ActionResponse',
        stereotype: '«Extinguish»',
        taggedValues: [
          { name: 'effectiveRangeM', type: 'Float', sampleValue: '4.5 meters' },
          { name: 'equipment', type: 'SafetyEquipment[1]', sampleValue: 'CO2_Extinguisher' },
          { name: 'targetHazard', type: 'HazardSource[1]', sampleValue: 'ClassB_LiquidFire' },
        ],
      },
      {
        baseClass: 'Behavior',
        stereotype: '«TimeCriticalConstraint»',
        taggedValues: [
          { name: 'maxEvacuationSeconds', type: 'Float', sampleValue: '180.0 s' },
          { name: 'mustTriggerAlarmBeforeEvac', type: 'Boolean', sampleValue: 'true' },
          { name: 'traineeActions', type: 'ActionResponse[*]', sampleValue: '[DetectFire, TriggerAlarm, Evacuate]' },
        ],
      },
      {
        baseClass: 'Timeline',
        stereotype: '«DrillScenario»',
        taggedValues: [
          { name: 'phases', type: 'DrillPhase[*]', sampleValue: '{DetectFire, TriggerAlarm, SuppressFire, Evacuate}' },
        ],
      },
    ],
    oclInvariants: [
      {
        name: 'inv CompatibleSafetyEquip',
        targetStereotype: '«HazardSource»',
        expression: 'self.linkedSafetyEquipment->forAll(e | e.supportedFireClasses->includes(self.fireClass))',
        purpose: 'Checks that linked extinguisher equipment matches the fire hazard class (e.g. Class B CO2).',
        status: 'pass',
      },
      {
        name: 'inv EquipValidForFireClass',
        targetStereotype: '«Extinguish»',
        expression: 'self.equipment.supportedFireClasses->includes(self.targetHazard.fireClass)',
        purpose: 'Validates that user extinguisher selection is rated for the target fire hazard class.',
        status: 'pass',
      },
      {
        name: 'inv RequiresHazardAndExit',
        targetStereotype: '«EmergencyScenario»',
        expression: 'self.hazardSources->notEmpty() and self.exitRoutes->notEmpty()',
        purpose: 'Ensures emergency scenario contains at least one active hazard source and defined exit route.',
        status: 'pass',
      },
      {
        name: 'inv AlarmPrecedesEvac',
        targetStereotype: '«TimeCriticalConstraint»',
        expression: 'self.mustTriggerAlarmBeforeEvac implies let al = self.traineeActions->select(a | a.oclIsKindOf(TriggerAlarm)) in let ev = self.traineeActions->select(a | a.oclIsKindOf(Evacuate)) in al->notEmpty() and (ev->isEmpty() or self.traineeActions->indexOf(al->first()) < self.traineeActions->indexOf(ev->first()))',
        purpose: 'Enforces protocol rule that fire alarm trigger action must precede evacuation action.',
        status: 'pass',
      },
      {
        name: 'inv ProtocolOrderEnforced',
        targetStereotype: '«DrillScenario»',
        expression: 'self.phases->collect(kind) = Sequence{DrillPhaseKind::DetectFire, DrillPhaseKind::TriggerAlarm, DrillPhaseKind::SuppressFire, DrillPhaseKind::Evacuate}',
        purpose: 'Validates exact chronological phase sequence for safety drill accreditation.',
        status: 'pass',
      },
    ],
  },
];

const ENTITY_DESCRIPTIONS: Record<string, { summary: string; impact: string }> = {
  Scene: {
    summary: 'Defines the overall 3D virtual environment, connecting floor plans with clinical patient files or building hazard specs.',
    impact: 'Prevents orphaned virtual spaces from executing without assigned patients or emergency exit paths.',
  },
  Article: {
    summary: 'Represents physical 3D tools and objects, such as elastic rehab handles, foam resistance balls, or CO2 extinguishers.',
    impact: 'Attaches real-world physical properties (mass, material, grip diameter) to standard 3D meshes.',
  },
  ActionResponse: {
    summary: 'Specifies what happens when a user touches, grabs, or operates an object in the virtual space.',
    impact: 'Tracks real-time movement ranges, repetition counts, and triggers feedback mechanisms.',
  },
  Behavior: {
    summary: 'Encapsulates safety logic and business rules that govern the entire simulation.',
    impact: 'Statically enforces movement thresholds (e.g., maximum flexion angles) and emergency cutoff triggers.',
  },
  Timeline: {
    summary: 'Schedules all exercise phases into a strict, validated chronological flow.',
    impact: 'Guarantees patients or trainees progress through Warmup, Core Activity, and Cooldown in correct order.',
  },
};

export const MetamodelDetailSection: React.FC = () => {
  const [activeProfileId, setActiveProfileId] = useState<string>('bowling_alley');
  const [selectedBaseClass, setSelectedBaseClass] = useState<string>('ActionResponse');
  const [showTechnicalDetails, setShowTechnicalDetails] = useState<boolean>(false);

  // Interactive OCL test state
  const [targetAngle, setTargetAngle] = useState<number>(110);
  const [safetyLimitAngle, setSafetyLimitAngle] = useState<number>(120);

  const currentProfile = VRSPECML_PROFILES.find((p) => p.id === activeProfileId) || VRSPECML_PROFILES[0];
  const activeMapping = currentProfile.mappings.find((m) => m.baseClass === selectedBaseClass) || currentProfile.mappings[2];
  const entityMeta = ENTITY_DESCRIPTIONS[selectedBaseClass] || ENTITY_DESCRIPTIONS['ActionResponse'];

  const isAngleCheckPassing = targetAngle <= safetyLimitAngle;

  return (
    <section
      id="metamodel"
      className="relative min-h-screen w-full bg-[#181b1e] text-slate-100 py-16 px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center justify-center slide-section overflow-hidden"
    >
      <div className="w-full space-y-10">
        {/* Header */}
        <SlideIn direction="up" delay={0.1} duration={0.8}>
          <div className="text-center w-full space-y-3">
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-white">
              VRSpecML: Abstract Syntax & Static Semantics
            </h2>
          </div>
        </SlideIn>

        {/* Research Paper Methodology Flow: VRSpecML Metamodel & Static Semantics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#22262a] border border-slate-700/60 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-[#38c3db] font-mono text-xs uppercase font-bold">
              <span>STEP 1</span>
            </div>
            <h3 className="text-base font-outfit font-bold text-white">
              Domain Stereotypes & Tagged Value Annotations
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Formalizes domain knowledge (e.g., TRAK clinical ontologies, IFEEont emergency standards, Bowling game rules) by extending standard UML metaclasses with domain-specific stereotypes and tagged value annotations.
            </p>
          </div>

          <div className="bg-[#22262a] border border-slate-700/60 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-[#38c3db] font-mono text-xs uppercase font-bold">
              <span>STEP 2</span>
            </div>
            <h3 className="text-base font-outfit font-bold text-white">
              Five Core Specification Primitives
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Establishes spatial, entity, interaction, state behavior, and temporal sequence boundaries through five base metaclasses (<code className="text-[#38c3db] font-mono">Scene</code>, <code className="text-[#38c3db] font-mono">Article</code>, <code className="text-[#38c3db] font-mono">ActionResponse</code>, <code className="text-[#38c3db] font-mono">Behavior</code>, <code className="text-[#38c3db] font-mono">Timeline</code>).
            </p>
          </div>

          <div className="bg-[#22262a] border border-slate-700/60 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-[#38c3db] font-mono text-xs uppercase font-bold">
              <span>STEP 3</span>
            </div>
            <h3 className="text-base font-outfit font-bold text-white">
              Machine-Processable Constraint Enforcement
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Evaluates model consistency statically at design time using Object Constraint Language (OCL) expressions, enforcing clinical ROM safety thresholds and equipment compatibility.
            </p>
          </div>

          <div className="bg-[#22262a] border border-slate-700/60 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-[#38c3db] font-mono text-xs uppercase font-bold">
              <span>STEP 4</span>
            </div>
            <h3 className="text-base font-outfit font-bold text-white">
              Verified AST Feed to Transformation Engine
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Produces a verified Platform-Independent Model (PIM) Abstract Syntax Tree (AST) representation, providing the formally validated foundation for the downstream VReqST M2T synthesis pipeline.
            </p>
          </div>
        </div>

        {/* Domain Profile Selector */}
        <div className="flex justify-center pt-2">
          <div className="bg-[#22262a] p-1.5 rounded-2xl border border-slate-700/80 inline-flex flex-wrap justify-center items-center gap-2 shadow-lg">
            <button
              onClick={() => {
                setActiveProfileId('bowling_alley');
                setSelectedBaseClass('ActionResponse');
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeProfileId === 'bowling_alley'
                  ? 'bg-[#38c3db] text-[#181b1e] shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <span>Bowling Alley Profile</span>
            </button>

            <button
              onClick={() => {
                setActiveProfileId('healthcare_rehab');
                setSelectedBaseClass('ActionResponse');
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeProfileId === 'healthcare_rehab'
                  ? 'bg-[#38c3db] text-[#181b1e] shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <span>Healthcare Rehabilitation Profile</span>
            </button>

            <button
              onClick={() => {
                setActiveProfileId('fire_safety_drill');
                setSelectedBaseClass('ActionResponse');
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeProfileId === 'fire_safety_drill'
                  ? 'bg-[#38c3db] text-[#181b1e] shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <span>Fire Safety Drill Profile</span>
            </button>
          </div>
        </div>

        {/* Interactive Entity Selector Cards */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase font-bold text-[#38c3db] tracking-wider block text-center">
            Click an Entity to Inspect Its Domain Properties & Safety Guardrails
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {currentProfile.mappings.map((m) => {
              const isSelected = selectedBaseClass === m.baseClass;
              return (
                <button
                  key={m.baseClass}
                  onClick={() => setSelectedBaseClass(m.baseClass)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#38c3db]/20 border-[#38c3db] text-white ring-2 ring-[#38c3db]/50 shadow-xl'
                      : 'bg-[#22262a] border-slate-700 text-slate-300 hover:bg-[#2a2f34] hover:border-slate-600'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-mono text-[#38c3db] uppercase font-bold block mb-1">
                      {m.baseClass}
                    </span>
                    <span className="font-outfit font-bold text-xs text-slate-100 block truncate">
                      {m.stereotype}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-2 font-mono">
                    {m.taggedValues.length} Properties
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Entity Card */}
        <div className="bg-[#22262a] border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-700/80 pb-4 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold bg-[#181b1e] text-[#38c3db] px-2.5 py-0.5 rounded border border-slate-700">
                  Base Concept: {selectedBaseClass}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Domain: {currentProfile.ontologyRef}
                </span>
              </div>
              <h3 className="text-2xl font-outfit font-bold text-white">
                Domain Role: {activeMapping.stereotype}
              </h3>
            </div>

            <button
              onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
              className="px-4 py-2 rounded-xl bg-[#181b1e] hover:bg-[#282d32] border border-slate-700 text-xs font-mono text-slate-100 font-semibold transition-all cursor-pointer flex items-center gap-2 self-start sm:self-auto"
            >
              <Code2 className="w-4 h-4 text-[#38c3db]" />
              <span>{showTechnicalDetails ? 'Hide Formal Rules' : 'View Formal Rule Syntax'}</span>
            </button>
          </div>

          {/* Simple Explanation & Impact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#181b1e]/90 p-4 rounded-2xl border border-slate-700 space-y-1.5">
              <span className="text-[#38c3db] font-mono font-bold block uppercase tracking-wider">
                Functional Overview
              </span>
              <p className="text-slate-100 font-medium leading-relaxed">
                {entityMeta.summary}
              </p>
            </div>

            <div className="bg-[#181b1e]/90 p-4 rounded-2xl border border-slate-700 space-y-1.5">
              <span className="text-[#38c3db] font-mono font-bold block uppercase tracking-wider">
                Safety & Quality Impact
              </span>
              <p className="text-slate-200 leading-relaxed">
                {entityMeta.impact}
              </p>
            </div>
          </div>

          {/* Domain Properties List */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase font-bold text-[#38c3db] tracking-wider block">
              Enforced Domain Properties
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
              {activeMapping.taggedValues.map((tag, idx) => (
                <div key={idx} className="flex items-center justify-between bg-[#181b1e] px-3.5 py-2 rounded-xl border border-slate-700/80">
                  <span className="text-slate-300 font-semibold">{tag.name}</span>
                  <span className="text-[#38c3db] font-bold text-xs">{tag.sampleValue}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Collapsible Technical Rules */}
          {showTechnicalDetails && (
            <div className="bg-[#181b1e] p-5 rounded-2xl border border-slate-700 font-mono text-xs text-slate-300 space-y-3">
              <div className="text-[#38c3db] font-bold border-b border-slate-700 pb-2 flex items-center justify-between">
                <span>Machine-Checkable Constraints</span>
                <span className="text-[10px] text-slate-400">Evaluated at Design Time</span>
              </div>

              <div className="space-y-2">
                {currentProfile.oclInvariants.map((inv, idx) => (
                  <div key={idx} className="bg-[#22262a] p-3 rounded-xl border border-slate-700 space-y-1">
                    <div className="text-[#38c3db] font-bold flex justify-between">
                      <span>{inv.name}</span>
                      <span className="text-[10px] text-slate-400">Target: {inv.targetStereotype}</span>
                    </div>
                    <div className="bg-[#14171a] p-2 rounded text-cyan-200 overflow-x-auto text-[11px]">
                      <code>{inv.expression}</code>
                    </div>
                    <p className="text-slate-300 font-sans text-[11px] italic">
                      {inv.purpose}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Live Safety Test */}
          <div className="bg-[#181b1e] p-5 sm:p-6 rounded-2xl border border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <span className="text-xs font-mono uppercase font-bold text-[#38c3db] flex items-center gap-2">
                <span>Interactive Design Safety Demonstration</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">Instant Rule Check</span>
            </div>

            {activeProfileId === 'healthcare_rehab' ? (
              <div className="space-y-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Clinician Safety Check:</strong> Test how VRSpecML evaluates patient safety thresholds during design:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#22262a] p-4 rounded-xl border border-slate-700">
                  <div>
                    <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                      <span>Target Flexion Angle:</span>
                      <span className="text-[#38c3db] font-bold">{targetAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="60"
                      max="160"
                      value={targetAngle}
                      onChange={(e) => setTargetAngle(Number(e.target.value))}
                      className="w-full accent-[#38c3db] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                      <span>Clinician Safe Limit:</span>
                      <span className="text-[#38c3db] font-bold">{safetyLimitAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="80"
                      max="150"
                      value={safetyLimitAngle}
                      onChange={(e) => setSafetyLimitAngle(Number(e.target.value))}
                      className="w-full accent-[#38c3db] cursor-pointer"
                    />
                  </div>
                </div>

                <div className={`p-4 rounded-xl border text-xs font-mono flex items-center gap-3 transition-colors ${
                  isAngleCheckPassing
                    ? 'bg-cyan-950/90 border-cyan-500/60 text-cyan-200'
                    : 'bg-rose-950/90 border-rose-500/70 text-rose-200'
                }`}>
                  {isAngleCheckPassing ? (
                    <CheckCircle2 className="w-5 h-5 text-[#38c3db] shrink-0" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                  <div>
                    <div className="font-bold text-sm">
                      {isAngleCheckPassing ? 'SAFETY RULE PASSED' : 'SAFETY RULE VIOLATED'}
                    </div>
                    <div className="text-[11px] opacity-90 mt-0.5">
                      {isAngleCheckPassing
                        ? `Flexion angle (${targetAngle}°) is within safe limit (${safetyLimitAngle}°). Design approved for code generation.`
                        : `Flexion angle (${targetAngle}°) EXCEEDS clinician safe limit (${safetyLimitAngle}°)! System rejects design before generating code.`}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 font-sans text-xs text-slate-300">
                <p>
                  <strong>Fire Safety Protocol Check:</strong> <em>Every emergency scenario must contain active hazard sources, matching extinguishers, and ordered evacuation steps.</em>
                </p>
                <div className="bg-[#22262a] p-3.5 rounded-xl border border-slate-700 font-mono text-slate-200 text-[11px] space-y-1">
                  <div>Hazard Source: Electrical Fire (Class B)</div>
                  <div>Equipment: CO2 Extinguisher (Class B Rated)</div>
                  <div>Sequence: Detect Fire -&gt; Trigger Alarm -&gt; Suppress Fire -&gt; Evacuate</div>
                </div>
                <div className="flex items-center gap-2 text-slate-200 font-semibold font-mono text-[11px]">
                  <CheckCircle2 className="w-4 h-4 text-[#38c3db]" />
                  <span>All safety drill invariants satisfied with 0 violations.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
