"use client";

import { motion } from "framer-motion";
import { Stethoscope, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import type { Diagnosis } from "@/lib/types";

function getConfidenceColor(confidence: number): string {
  if (confidence >= 80) return "oklch(0.75 0.15 185)";
  if (confidence >= 50) return "oklch(0.7 0.15 155)";
  if (confidence >= 30) return "oklch(0.8 0.15 85)";
  return "oklch(0.6 0.02 210)";
}

function getConfidenceLabel(confidence: number): string {
  if (confidence >= 80) return "HIGH";
  if (confidence >= 50) return "MODERATE";
  if (confidence >= 30) return "LOW";
  return "UNLIKELY";
}

interface DiagnosisPanelProps {
  diagnoses: Diagnosis[];
}

export function DiagnosisPanel({ diagnoses }: DiagnosisPanelProps) {
  const [expandedIdx, setExpandedIdx] = useState<number>(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-lg border border-border bg-card/50 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-border bg-[oklch(0.12_0.01_220)]">
        <Stethoscope className="w-4 h-4 text-[oklch(0.7_0.15_155)]" />
        <h2 className="text-sm font-semibold tracking-wide uppercase">
          Differential Diagnosis
        </h2>
        <Badge variant="secondary" className="ml-auto text-[10px] font-mono">
          {diagnoses.length} candidates
        </Badge>
      </div>

      {/* Diagnoses */}
      <div className="divide-y divide-border">
        {diagnoses.map((dx, i) => {
          const isExpanded = expandedIdx === i;
          const color = getConfidenceColor(dx.confidence);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.08 }}
            >
              {/* Clickable header */}
              <button
                onClick={() => setExpandedIdx(isExpanded ? -1 : i)}
                className="w-full text-left px-5 py-4 hover:bg-[oklch(0.15_0.012_220)] transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Rank */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border"
                    style={{
                      borderColor: color,
                      color: color,
                      backgroundColor: `color-mix(in oklch, ${color} 10%, transparent)`,
                    }}
                  >
                    {i + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-foreground">
                        {dx.name}
                      </h3>
                      <span
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded border"
                        style={{
                          color: "oklch(0.6 0.02 210)",
                          borderColor: "oklch(0.25 0.02 220)",
                        }}
                      >
                        {dx.icdCode}
                      </span>
                    </div>

                    {/* Confidence bar */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex-1 h-2 rounded-full bg-[oklch(0.18_0.015_220)] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${dx.confidence}%` }}
                          transition={{
                            duration: 0.8,
                            delay: 0.2 + i * 0.1,
                            ease: "easeOut",
                          }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      </div>
                      <span
                        className="text-xs font-mono font-bold shrink-0"
                        style={{ color }}
                      >
                        {dx.confidence}%
                      </span>
                      <span
                        className="text-[10px] font-mono tracking-wider shrink-0"
                        style={{ color }}
                      >
                        {getConfidenceLabel(dx.confidence)}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>
              </button>

              {/* Expanded details */}
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="px-5 pb-4 overflow-hidden"
                >
                  <div className="ml-12 space-y-4">
                    {/* Reasoning */}
                    <div>
                      <h4 className="text-xs font-mono text-muted-foreground mb-1 tracking-wider uppercase">
                        Clinical Reasoning
                      </h4>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {dx.reasoning}
                      </p>
                    </div>

                    {/* Key findings */}
                    <div>
                      <h4 className="text-xs font-mono text-muted-foreground mb-2 tracking-wider uppercase">
                        Key Findings
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {dx.keyFindings.map((f, j) => (
                          <span
                            key={j}
                            className="text-xs px-2 py-1 rounded-md border border-border bg-secondary/50 text-secondary-foreground"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Red flags */}
                    {dx.redFlags.length > 0 && (
                      <div>
                        <h4 className="text-xs font-mono text-[oklch(0.65_0.2_25)] mb-2 tracking-wider uppercase flex items-center gap-1.5">
                          <AlertTriangle className="w-3 h-3" />
                          Red Flags
                        </h4>
                        <ul className="space-y-1">
                          {dx.redFlags.map((rf, j) => (
                            <li
                              key={j}
                              className="text-xs text-[oklch(0.65_0.2_25/80%)] flex items-start gap-2"
                            >
                              <span className="text-[oklch(0.65_0.2_25)] mt-1 shrink-0">
                                &bull;
                              </span>
                              {rf}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
