"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Stethoscope,
  Pill,
  ShieldAlert,
  BookOpen,
  Check,
  Loader2,
  Circle,
} from "lucide-react";
import type { AnalysisStatus } from "@/lib/types";

const AGENT_STEPS = [
  {
    id: "parsing",
    icon: Brain,
    label: "Case Parser",
    description: "Extracting structured patient data",
    color: "oklch(0.75 0.15 185)",
  },
  {
    id: "diagnosing",
    icon: Stethoscope,
    label: "Diagnostician",
    description: "Generating differential diagnoses",
    color: "oklch(0.7 0.15 155)",
  },
  {
    id: "treating",
    icon: Pill,
    label: "Treatment Planner",
    description: "Creating evidence-based treatment plans",
    color: "oklch(0.8 0.15 85)",
  },
  {
    id: "checking-interactions",
    icon: ShieldAlert,
    label: "Drug Interaction Checker",
    description: "Screening for medication conflicts",
    color: "oklch(0.65 0.2 25)",
  },
  {
    id: "researching",
    icon: BookOpen,
    label: "Literature Agent",
    description: "Searching medical literature",
    color: "oklch(0.6 0.2 300)",
  },
];

function getStepStatus(
  stepId: string,
  currentStatus: AnalysisStatus
): "pending" | "running" | "complete" {
  const order = [
    "parsing",
    "diagnosing",
    "treating",
    "checking-interactions",
    "researching",
    "complete",
  ];
  const currentIdx = order.indexOf(currentStatus);
  const stepIdx = order.indexOf(stepId);

  if (currentStatus === "complete") return "complete";
  if (stepIdx < currentIdx) return "complete";
  if (stepIdx === currentIdx) return "running";
  return "pending";
}

interface AgentProgressProps {
  status: AnalysisStatus;
}

export function AgentProgress({ status }: AgentProgressProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto py-8"
    >
      <div className="flex items-center gap-2 mb-6 justify-center">
        <div className="w-2 h-2 rounded-full bg-[oklch(0.75_0.15_185)] animate-data-pulse" />
        <span className="text-xs font-mono text-[oklch(0.75_0.15_185)] tracking-wider uppercase">
          Multi-Agent Analysis Pipeline
        </span>
      </div>

      <div className="space-y-3">
        {AGENT_STEPS.map((step, i) => {
          const stepStatus = getStepStatus(step.id, status);
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className={`flex items-center gap-4 px-5 py-3 rounded-lg border transition-all duration-300 ${
                stepStatus === "running"
                  ? "border-[oklch(0.75_0.15_185/40%)] bg-[oklch(0.75_0.15_185/8%)]"
                  : stepStatus === "complete"
                    ? "border-[oklch(0.7_0.15_155/30%)] bg-[oklch(0.7_0.15_155/5%)]"
                    : "border-border bg-card/30"
              }`}
            >
              {/* Status icon */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  stepStatus === "running"
                    ? "bg-[oklch(0.75_0.15_185/15%)]"
                    : stepStatus === "complete"
                      ? "bg-[oklch(0.7_0.15_155/15%)]"
                      : "bg-muted/30"
                }`}
              >
                {stepStatus === "running" ? (
                  <Loader2
                    className="w-4 h-4 animate-spin"
                    style={{ color: step.color }}
                  />
                ) : stepStatus === "complete" ? (
                  <Check className="w-4 h-4 text-[oklch(0.7_0.15_155)]" />
                ) : (
                  <Circle className="w-3 h-3 text-muted-foreground/30" />
                )}
              </div>

              {/* Agent icon */}
              <step.icon
                className="w-4 h-4 shrink-0"
                style={{
                  color:
                    stepStatus === "pending"
                      ? "oklch(0.4 0.02 210)"
                      : step.color,
                }}
              />

              {/* Label & description */}
              <div className="flex-1 min-w-0">
                <div
                  className={`text-sm font-semibold ${
                    stepStatus === "pending"
                      ? "text-muted-foreground/40"
                      : "text-foreground"
                  }`}
                >
                  {step.label}
                </div>
                <div
                  className={`text-xs ${
                    stepStatus === "pending"
                      ? "text-muted-foreground/30"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.description}
                </div>
              </div>

              {/* Status badge */}
              <span
                className={`text-[10px] font-mono tracking-wider uppercase shrink-0 ${
                  stepStatus === "running"
                    ? "text-[oklch(0.75_0.15_185)]"
                    : stepStatus === "complete"
                      ? "text-[oklch(0.7_0.15_155)]"
                      : "text-muted-foreground/30"
                }`}
              >
                {stepStatus === "running"
                  ? "Running"
                  : stepStatus === "complete"
                    ? "Done"
                    : "Queued"}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
