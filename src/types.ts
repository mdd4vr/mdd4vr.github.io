export interface PipelineStep {
  id: string;
  stepNumber: number;
  label: string;
  isConnector?: boolean;
  typeLabel: string;
  description: string;
  iconName: string;
  details: {
    title: string;
    traditionalWay: string;
    whyInsufficientForVR: string;
    mddPipelineApproach: string;
    workedOnBy: string;
    missingWork?: string;
  };
}

export interface MetamodelEntity {
  id: string;
  name: string;
  category: 'Structure' | 'Behavior' | 'Interaction' | 'Hardware';
  attributes: { name: string; type: string }[];
  description: string;
}

export interface VRSpecMLProfile {
  id: string;
  domainName: string;
  ontologyRef: string;
  description: string;
  mappings: {
    baseClass: 'Scene' | 'Article' | 'ActionResponse' | 'Behavior' | 'Timeline';
    stereotype: string;
    taggedValues: { name: string; type: string; sampleValue: string }[];
  }[];
  oclInvariants: {
    name: string;
    targetStereotype: string;
    expression: string;
    purpose: string;
    status: 'pass' | 'fail';
  }[];
}

export interface VReqSTStage {
  stageNumber: number;
  id: 'scene' | 'article' | 'action_response' | 'behavior' | 'timeline';
  title: string;
  templateFile: string;
  validatorFile: string;
  description: string;
  sampleJson: string;
  validatorRules: string[];
}

export type ViewMode = 'vector' | 'image' | 'placeholder';

