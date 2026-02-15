"use client";

import { motion } from "framer-motion";
import { ShieldAlert, ArrowLeftRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { DrugInteraction } from "@/lib/types";

function getSeverityStyles(severity: DrugInteraction["severity"]) {
  switch (severity) {
    case "contraindicated":
      return {
        bg: "bg-[oklch(0.65_0.2_25/12%)]",
        border: "border-[oklch(0.65_0.2_25/40%)]",
        text: "text-[oklch(0.65_0.2_25)]",
        badge: "bg-[oklch(0.65_0.2_25)] text-white",
        glow: "glow-red",
      };
    case "severe":
      return {
        bg: "bg-[oklch(0.65_0.2_25/8%)]",
        border: "border-[oklch(0.65_0.2_25/30%)]",
        text: "text-[oklch(0.65_0.2_25)]",
        badge: "bg-[oklch(0.65_0.2_25/80%)] text-white",
        glow: "",
      };
    case "moderate":
      return {
        bg: "bg-[oklch(0.8_0.15_85/6%)]",
        border: "border-[oklch(0.8_0.15_85/25%)]",
        text: "text-[oklch(0.8_0.15_85)]",
        badge: "bg-[oklch(0.8_0.15_85/80%)] text-black",
        glow: "",
      };
    case "mild":
      return {
        bg: "bg-[oklch(0.7_0.15_155/6%)]",
        border: "border-[oklch(0.7_0.15_155/20%)]",
        text: "text-[oklch(0.7_0.15_155)]",
        badge: "bg-[oklch(0.7_0.15_155/80%)] text-black",
        glow: "",
      };
  }
}

interface InteractionsPanelProps {
  interactions: DrugInteraction[];
}

export function InteractionsPanel({ interactions }: InteractionsPanelProps) {
  // Sort by severity
  const severityOrder = {
    contraindicated: 0,
    severe: 1,
    moderate: 2,
    mild: 3,
  };
  const sorted = [...interactions].sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-lg border border-border bg-card/50 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-border bg-[oklch(0.12_0.01_220)]">
        <ShieldAlert className="w-4 h-4 text-[oklch(0.65_0.2_25)]" />
        <h2 className="text-sm font-semibold tracking-wide uppercase">
          Drug Interactions
        </h2>
        <Badge variant="secondary" className="ml-auto text-[10px] font-mono">
          {interactions.length} found
        </Badge>
      </div>

      {interactions.length === 0 ? (
        <div className="p-8 text-center text-sm text-muted-foreground">
          No significant drug interactions detected.
        </div>
      ) : (
        <div className="divide-y divide-border">
          {sorted.map((interaction, i) => {
            const styles = getSeverityStyles(interaction.severity);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.08 }}
                className={`p-4 ${styles.bg} ${i === 0 && interaction.severity === "contraindicated" ? styles.glow : ""}`}
              >
                {/* Drug pair */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-semibold text-foreground">
                    {interaction.drug1}
                  </span>
                  <ArrowLeftRight className={`w-4 h-4 ${styles.text}`} />
                  <span className="text-sm font-semibold text-foreground">
                    {interaction.drug2}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${styles.badge}`}
                  >
                    {interaction.severity}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-1.5 text-xs">
                  <p className="text-muted-foreground">
                    <span className="text-foreground/50 font-mono">
                      Mechanism:
                    </span>{" "}
                    {interaction.mechanism}
                  </p>
                  <p className={styles.text}>
                    <span className="font-mono">Effect:</span>{" "}
                    {interaction.clinicalEffect}
                  </p>
                  <p className="text-foreground/80">
                    <span className="text-foreground/50 font-mono">Rec:</span>{" "}
                    {interaction.recommendation}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
