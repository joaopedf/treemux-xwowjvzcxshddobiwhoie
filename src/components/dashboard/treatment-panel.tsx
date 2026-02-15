"use client";

import { motion } from "framer-motion";
import { Pill, FlaskConical, HeartPulse, CalendarClock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import type { TreatmentPlan } from "@/lib/types";

function getEvidenceColor(level: string): string {
  switch (level) {
    case "A":
      return "oklch(0.75 0.15 185)";
    case "B":
      return "oklch(0.7 0.15 155)";
    case "C":
      return "oklch(0.8 0.15 85)";
    case "D":
      return "oklch(0.6 0.02 210)";
    default:
      return "oklch(0.6 0.02 210)";
  }
}

interface TreatmentPanelProps {
  plans: TreatmentPlan[];
}

export function TreatmentPanel({ plans }: TreatmentPanelProps) {
  const [activeTab, setActiveTab] = useState(0);
  const plan = plans[activeTab];

  if (!plan) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-lg border border-border bg-card/50 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-border bg-[oklch(0.12_0.01_220)]">
        <Pill className="w-4 h-4 text-[oklch(0.8_0.15_85)]" />
        <h2 className="text-sm font-semibold tracking-wide uppercase">
          Treatment Plans
        </h2>
      </div>

      {/* Diagnosis tabs */}
      {plans.length > 1 && (
        <div className="flex border-b border-border bg-[oklch(0.12_0.01_220)]">
          {plans.map((p, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`flex-1 px-4 py-2 text-xs font-mono transition-colors border-b-2 ${
                activeTab === i
                  ? "border-[oklch(0.75_0.15_185)] text-[oklch(0.75_0.15_185)] bg-[oklch(0.75_0.15_185/5%)]"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {p.diagnosis.length > 30
                ? p.diagnosis.substring(0, 30) + "..."
                : p.diagnosis}
            </button>
          ))}
        </div>
      )}

      <div className="p-5 space-y-5">
        {/* First-line treatments */}
        <div>
          <h3 className="text-xs font-mono text-muted-foreground mb-3 tracking-wider uppercase flex items-center gap-2">
            <FlaskConical className="w-3 h-3" />
            First-Line Treatments
          </h3>
          <div className="space-y-2">
            {plan.firstLine.map((tx, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-md border border-border bg-secondary/30 p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        {tx.name}
                      </span>
                      <span
                        className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border"
                        style={{
                          color: getEvidenceColor(tx.evidenceLevel),
                          borderColor: getEvidenceColor(tx.evidenceLevel),
                          backgroundColor: `color-mix(in oklch, ${getEvidenceColor(tx.evidenceLevel)} 8%, transparent)`,
                        }}
                      >
                        Level {tx.evidenceLevel}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                      <p>
                        <span className="text-foreground/60">Dosage:</span>{" "}
                        {tx.dosage}
                      </p>
                      <p>
                        <span className="text-foreground/60">Route:</span>{" "}
                        {tx.route}
                      </p>
                      <p>
                        <span className="text-foreground/60">Duration:</span>{" "}
                        {tx.duration}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Alternatives */}
        {plan.alternatives.length > 0 && (
          <div>
            <h3 className="text-xs font-mono text-muted-foreground mb-3 tracking-wider uppercase">
              Alternative Options
            </h3>
            <div className="space-y-2">
              {plan.alternatives.map((alt, i) => (
                <div
                  key={i}
                  className="rounded-md border border-dashed border-border p-3"
                >
                  <span className="text-sm font-semibold text-foreground/80">
                    {alt.name}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {alt.dosage}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1 italic">
                    {alt.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Non-pharmacological */}
        <div>
          <h3 className="text-xs font-mono text-muted-foreground mb-3 tracking-wider uppercase flex items-center gap-2">
            <HeartPulse className="w-3 h-3" />
            Non-Pharmacological Interventions
          </h3>
          <ul className="space-y-1.5">
            {plan.nonPharmacological.map((item, i) => (
              <li
                key={i}
                className="text-xs text-foreground/80 flex items-start gap-2"
              >
                <span className="text-[oklch(0.75_0.15_185)] mt-0.5 shrink-0">
                  &rsaquo;
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Monitoring */}
        <div>
          <h3 className="text-xs font-mono text-muted-foreground mb-3 tracking-wider uppercase">
            Required Monitoring
          </h3>
          <div className="flex flex-wrap gap-2">
            {plan.monitoring.map((item, i) => (
              <Badge
                key={i}
                variant="outline"
                className="text-[10px] font-normal"
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>

        {/* Follow-up */}
        <div className="rounded-md border border-border bg-[oklch(0.12_0.01_220)] p-3">
          <h3 className="text-xs font-mono text-muted-foreground mb-1 tracking-wider uppercase flex items-center gap-2">
            <CalendarClock className="w-3 h-3" />
            Follow-Up
          </h3>
          <p className="text-xs text-foreground/80 leading-relaxed">
            {plan.followUp}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
