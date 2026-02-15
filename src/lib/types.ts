export interface PatientCase {
  chiefComplaint: string;
  symptoms: string[];
  duration: string;
  medicalHistory: string[];
  medications: string[];
  allergies: string[];
  age: number;
  sex: string;
  vitalSigns?: {
    bloodPressure?: string;
    heartRate?: number;
    temperature?: number;
    respiratoryRate?: number;
    oxygenSaturation?: number;
  };
  additionalNotes?: string;
}

export interface Diagnosis {
  name: string;
  icdCode: string;
  confidence: number; // 0-100
  reasoning: string;
  keyFindings: string[];
  redFlags: string[];
}

export interface TreatmentPlan {
  diagnosis: string;
  firstLine: {
    name: string;
    dosage: string;
    route: string;
    duration: string;
    evidenceLevel: "A" | "B" | "C" | "D";
  }[];
  alternatives: {
    name: string;
    dosage: string;
    reason: string;
  }[];
  nonPharmacological: string[];
  monitoring: string[];
  followUp: string;
}

export interface DrugInteraction {
  drug1: string;
  drug2: string;
  severity: "mild" | "moderate" | "severe" | "contraindicated";
  mechanism: string;
  clinicalEffect: string;
  recommendation: string;
}

export interface LiteratureReference {
  title: string;
  authors: string;
  journal: string;
  year: number;
  relevance: string;
  keyFinding: string;
  evidenceLevel: string;
}

export interface ClinicalAnalysis {
  parsedCase: PatientCase;
  differentialDiagnoses: Diagnosis[];
  treatmentPlans: TreatmentPlan[];
  drugInteractions: DrugInteraction[];
  references: LiteratureReference[];
  criticalAlerts: string[];
  summary: string;
}

export interface AgentStep {
  agent: string;
  status: "pending" | "running" | "complete" | "error";
  message: string;
  data?: unknown;
}

export type AnalysisStatus = "idle" | "parsing" | "diagnosing" | "treating" | "checking-interactions" | "researching" | "complete" | "error";
