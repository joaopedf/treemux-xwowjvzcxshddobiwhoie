"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Siren } from "lucide-react";

interface AlertsPanelProps {
  alerts: string[];
}

function getAlertLevel(alert: string): "critical" | "severe" | "warning" {
  const upper = alert.toUpperCase();
  if (
    upper.startsWith("EMERGENT") ||
    upper.startsWith("CRITICAL") ||
    upper.startsWith("CONTRAINDICATED")
  )
    return "critical";
  if (upper.startsWith("SEVERE") || upper.startsWith("RED FLAG"))
    return "severe";
  return "warning";
}

function getAlertStyles(level: "critical" | "severe" | "warning") {
  switch (level) {
    case "critical":
      return {
        border: "border-[oklch(0.65_0.2_25/50%)]",
        bg: "bg-[oklch(0.65_0.2_25/10%)]",
        icon: "text-[oklch(0.65_0.2_25)]",
        text: "text-[oklch(0.65_0.2_25)]",
      };
    case "severe":
      return {
        border: "border-[oklch(0.8_0.15_85/40%)]",
        bg: "bg-[oklch(0.8_0.15_85/8%)]",
        icon: "text-[oklch(0.8_0.15_85)]",
        text: "text-[oklch(0.8_0.15_85)]",
      };
    case "warning":
      return {
        border: "border-[oklch(0.7_0.15_155/30%)]",
        bg: "bg-[oklch(0.7_0.15_155/6%)]",
        icon: "text-[oklch(0.7_0.15_155)]",
        text: "text-foreground/80",
      };
  }
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  if (alerts.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-lg border border-[oklch(0.65_0.2_25/30%)] bg-[oklch(0.65_0.2_25/5%)] overflow-hidden glow-red"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-[oklch(0.65_0.2_25/20%)] bg-[oklch(0.65_0.2_25/8%)]">
        <Siren className="w-4 h-4 text-[oklch(0.65_0.2_25)] animate-data-pulse" />
        <h2 className="text-sm font-semibold tracking-wide uppercase text-[oklch(0.65_0.2_25)]">
          Critical Alerts
        </h2>
        <span className="ml-auto text-xs font-mono text-[oklch(0.65_0.2_25/80%)]">
          {alerts.length} alert{alerts.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="p-3 space-y-2">
        {alerts.map((alert, i) => {
          const level = getAlertLevel(alert);
          const styles = getAlertStyles(level);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`flex items-start gap-3 p-3 rounded-md border ${styles.border} ${styles.bg}`}
            >
              <AlertTriangle
                className={`w-4 h-4 shrink-0 mt-0.5 ${styles.icon}`}
              />
              <p className={`text-xs leading-relaxed ${styles.text}`}>
                {alert}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
