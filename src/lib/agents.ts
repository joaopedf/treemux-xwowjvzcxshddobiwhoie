import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import type {
  PatientCase,
  Diagnosis,
  TreatmentPlan,
  DrugInteraction,
  LiteratureReference,
} from "./types";

function getModel() {
  return openai("gpt-4o");
}

// Agent 1: Case Parser — Extracts structured patient data from natural language
export async function parseCaseAgent(rawInput: string): Promise<PatientCase> {
  const { object } = await generateObject({
    model: getModel(),
    schema: z.object({
      chiefComplaint: z.string().describe("Primary reason for visit"),
      symptoms: z.array(z.string()).describe("List of all symptoms mentioned"),
      duration: z.string().describe("How long symptoms have been present"),
      medicalHistory: z.array(z.string()).describe("Past medical conditions"),
      medications: z.array(z.string()).describe("Current medications"),
      allergies: z.array(z.string()).describe("Known allergies"),
      age: z.number().describe("Patient age in years"),
      sex: z.string().describe("Patient sex (Male/Female/Other)"),
      vitalSigns: z
        .object({
          bloodPressure: z.string().optional(),
          heartRate: z.number().optional(),
          temperature: z.number().optional(),
          respiratoryRate: z.number().optional(),
          oxygenSaturation: z.number().optional(),
        })
        .optional()
        .describe("Vital signs if mentioned"),
      additionalNotes: z
        .string()
        .optional()
        .describe("Any additional clinical observations"),
    }),
    prompt: `You are a clinical case parser. Extract structured patient information from this clinical presentation. If information is not explicitly stated, make reasonable clinical inferences based on the presentation. Be thorough.

Patient Presentation:
${rawInput}`,
  });
  return object as PatientCase;
}

// Agent 2: Differential Diagnosis Generator
export async function diagnosisAgent(
  patientCase: PatientCase
): Promise<Diagnosis[]> {
  const { object } = await generateObject({
    model: getModel(),
    schema: z.object({
      diagnoses: z.array(
        z.object({
          name: z.string().describe("Diagnosis name"),
          icdCode: z.string().describe("ICD-10 code"),
          confidence: z
            .number()
            .min(0)
            .max(100)
            .describe("Confidence percentage 0-100"),
          reasoning: z
            .string()
            .describe("Clinical reasoning for this diagnosis"),
          keyFindings: z
            .array(z.string())
            .describe("Key findings supporting this diagnosis"),
          redFlags: z
            .array(z.string())
            .describe("Red flags or warning signs to watch for"),
        })
      ),
    }),
    prompt: `You are a board-certified diagnostician. Generate a differential diagnosis for this patient case. Provide 4-6 diagnoses ranked by likelihood. Include ICD-10 codes and detailed clinical reasoning. Consider both common and life-threatening conditions (don't miss anything dangerous).

Patient Case:
- Chief Complaint: ${patientCase.chiefComplaint}
- Symptoms: ${patientCase.symptoms.join(", ")}
- Duration: ${patientCase.duration}
- Age: ${patientCase.age}, Sex: ${patientCase.sex}
- Medical History: ${patientCase.medicalHistory.join(", ") || "None reported"}
- Current Medications: ${patientCase.medications.join(", ") || "None"}
- Allergies: ${patientCase.allergies.join(", ") || "NKDA"}
${patientCase.vitalSigns ? `- Vitals: BP ${patientCase.vitalSigns.bloodPressure || "N/A"}, HR ${patientCase.vitalSigns.heartRate || "N/A"}, Temp ${patientCase.vitalSigns.temperature || "N/A"}°F, RR ${patientCase.vitalSigns.respiratoryRate || "N/A"}, SpO2 ${patientCase.vitalSigns.oxygenSaturation || "N/A"}%` : ""}
${patientCase.additionalNotes ? `- Additional: ${patientCase.additionalNotes}` : ""}`,
  });
  return object.diagnoses as Diagnosis[];
}

// Agent 3: Treatment Planner
export async function treatmentAgent(
  patientCase: PatientCase,
  diagnoses: Diagnosis[]
): Promise<TreatmentPlan[]> {
  const topDiagnoses = diagnoses.slice(0, 3);

  const { object } = await generateObject({
    model: getModel(),
    schema: z.object({
      plans: z.array(
        z.object({
          diagnosis: z.string(),
          firstLine: z.array(
            z.object({
              name: z.string().describe("Medication/treatment name"),
              dosage: z.string().describe("Dosage and frequency"),
              route: z.string().describe("Route of administration"),
              duration: z.string().describe("Duration of treatment"),
              evidenceLevel: z
                .enum(["A", "B", "C", "D"])
                .describe("Level of evidence"),
            })
          ),
          alternatives: z.array(
            z.object({
              name: z.string(),
              dosage: z.string(),
              reason: z.string().describe("Reason for alternative"),
            })
          ),
          nonPharmacological: z
            .array(z.string())
            .describe("Non-drug interventions"),
          monitoring: z
            .array(z.string())
            .describe("Lab/clinical monitoring needed"),
          followUp: z.string().describe("Follow-up recommendations"),
        })
      ),
    }),
    prompt: `You are a clinical pharmacologist and treatment specialist. Create evidence-based treatment plans for the top diagnoses. Consider the patient's current medications and allergies for safety.

Patient Info:
- Age: ${patientCase.age}, Sex: ${patientCase.sex}
- Current Medications: ${patientCase.medications.join(", ") || "None"}
- Allergies: ${patientCase.allergies.join(", ") || "NKDA"}
- Medical History: ${patientCase.medicalHistory.join(", ") || "None"}

Top Diagnoses to Treat:
${topDiagnoses.map((d, i) => `${i + 1}. ${d.name} (${d.confidence}% confidence) - ${d.reasoning}`).join("\n")}

For each diagnosis, provide first-line treatments with dosages, alternative options, non-pharmacological interventions, required monitoring, and follow-up schedule.`,
  });
  return object.plans as TreatmentPlan[];
}

// Agent 4: Drug Interaction Checker
export async function interactionAgent(
  currentMedications: string[],
  proposedTreatments: TreatmentPlan[]
): Promise<DrugInteraction[]> {
  const allProposed = proposedTreatments.flatMap((p) =>
    p.firstLine.map((t) => t.name)
  );
  const allDrugs = [...new Set([...currentMedications, ...allProposed])];

  if (allDrugs.length < 2) return [];

  const { object } = await generateObject({
    model: getModel(),
    schema: z.object({
      interactions: z.array(
        z.object({
          drug1: z.string(),
          drug2: z.string(),
          severity: z.enum(["mild", "moderate", "severe", "contraindicated"]),
          mechanism: z.string().describe("Pharmacological mechanism"),
          clinicalEffect: z
            .string()
            .describe("What happens clinically"),
          recommendation: z
            .string()
            .describe("Clinical recommendation"),
        })
      ),
    }),
    prompt: `You are a clinical pharmacist specializing in drug interactions. Check ALL potential interactions between these medications. Be thorough — missing an interaction can be dangerous.

Current Medications: ${currentMedications.join(", ") || "None"}
Proposed New Medications: ${allProposed.join(", ")}

All drugs to check: ${allDrugs.join(", ")}

Check every pair combination. Report ALL clinically significant interactions. Include severity classification, mechanism, clinical effect, and recommendation.`,
  });
  return object.interactions as DrugInteraction[];
}

// Agent 5: Literature Search Agent
export async function literatureAgent(
  patientCase: PatientCase,
  diagnoses: Diagnosis[]
): Promise<LiteratureReference[]> {
  const topDiagnosis = diagnoses[0];

  const { object } = await generateObject({
    model: getModel(),
    schema: z.object({
      references: z.array(
        z.object({
          title: z.string(),
          authors: z.string(),
          journal: z.string(),
          year: z.number(),
          relevance: z
            .string()
            .describe("Why this is relevant to the case"),
          keyFinding: z.string().describe("Main finding from the study"),
          evidenceLevel: z
            .string()
            .describe("Level of evidence (e.g., RCT, Meta-analysis, Case Series)"),
        })
      ),
    }),
    prompt: `You are a medical research librarian. Identify the most relevant and high-impact medical literature for this clinical case. Focus on landmark studies, recent guidelines, and systematic reviews.

Primary Diagnosis: ${topDiagnosis.name}
Patient Context: ${patientCase.age}yo ${patientCase.sex}, presenting with ${patientCase.chiefComplaint}
Key Symptoms: ${patientCase.symptoms.join(", ")}
Medical History: ${patientCase.medicalHistory.join(", ") || "None"}

Provide 4-6 key references including landmark trials, current guidelines, and relevant systematic reviews. Include real, well-known medical studies and guidelines.`,
  });
  return object.references as LiteratureReference[];
}

// Orchestrator: Runs all agents and returns complete analysis
export async function runClinicalAnalysis(
  rawInput: string,
  onProgress?: (step: string, status: string) => void
): Promise<{
  parsedCase: PatientCase;
  differentialDiagnoses: Diagnosis[];
  treatmentPlans: TreatmentPlan[];
  drugInteractions: DrugInteraction[];
  references: LiteratureReference[];
  criticalAlerts: string[];
  summary: string;
}> {
  // Step 1: Parse the case
  onProgress?.("parsing", "running");
  const parsedCase = await parseCaseAgent(rawInput);
  onProgress?.("parsing", "complete");

  // Step 2: Run diagnosis and literature search in parallel
  onProgress?.("diagnosing", "running");
  const [differentialDiagnoses, references] = await Promise.all([
    diagnosisAgent(parsedCase),
    literatureAgent(parsedCase, [
      {
        name: parsedCase.chiefComplaint,
        icdCode: "",
        confidence: 80,
        reasoning: "",
        keyFindings: parsedCase.symptoms,
        redFlags: [],
      },
    ]),
  ]);
  onProgress?.("diagnosing", "complete");

  // Step 3: Generate treatment plans
  onProgress?.("treating", "running");
  const treatmentPlans = await treatmentAgent(parsedCase, differentialDiagnoses);
  onProgress?.("treating", "complete");

  // Step 4: Check drug interactions
  onProgress?.("checking-interactions", "running");
  const drugInteractions = await interactionAgent(
    parsedCase.medications,
    treatmentPlans
  );
  onProgress?.("checking-interactions", "complete");

  // Generate critical alerts
  const criticalAlerts: string[] = [];

  // Check for severe interactions
  drugInteractions
    .filter((i) => i.severity === "severe" || i.severity === "contraindicated")
    .forEach((i) => {
      criticalAlerts.push(
        `${i.severity === "contraindicated" ? "CONTRAINDICATED" : "SEVERE"}: ${i.drug1} + ${i.drug2} — ${i.clinicalEffect}`
      );
    });

  // Check for red flags from diagnoses
  differentialDiagnoses.forEach((d) => {
    d.redFlags.forEach((rf) => {
      if (!criticalAlerts.includes(rf)) {
        criticalAlerts.push(`RED FLAG (${d.name}): ${rf}`);
      }
    });
  });

  // Generate summary
  const topDx = differentialDiagnoses[0];
  const summary = `${parsedCase.age}yo ${parsedCase.sex} presenting with ${parsedCase.chiefComplaint}. Most likely diagnosis: ${topDx.name} (${topDx.confidence}% confidence). ${criticalAlerts.length > 0 ? `${criticalAlerts.length} critical alert(s) require attention.` : "No critical alerts."}`;

  return {
    parsedCase,
    differentialDiagnoses,
    treatmentPlans,
    drugInteractions,
    references,
    criticalAlerts,
    summary,
  };
}
