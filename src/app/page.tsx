"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hero } from "@/components/landing/hero";
import { CaseInput } from "@/components/landing/case-input";
import { AgentProgress } from "@/components/dashboard/agent-progress";
import { PatientSummary } from "@/components/dashboard/patient-summary";
import { DiagnosisPanel } from "@/components/dashboard/diagnosis-panel";
import { TreatmentPanel } from "@/components/dashboard/treatment-panel";
import { InteractionsPanel } from "@/components/dashboard/interactions-panel";
import { LiteraturePanel } from "@/components/dashboard/literature-panel";
import { AlertsPanel } from "@/components/dashboard/alerts-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  RotateCcw,
  Stethoscope,
  Pill,
  ShieldAlert,
  BookOpen,
  AlertTriangle,
  User,
  Info,
} from "lucide-react";
import type { ClinicalAnalysis, AnalysisStatus } from "@/lib/types";

type DashboardTab =
  | "overview"
  | "diagnoses"
  | "treatment"
  | "interactions"
  | "literature";

export default function Home() {
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>("idle");
  const [results, setResults] = useState<ClinicalAnalysis | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
  const dashboardRef = useRef<HTMLDivElement>(null);

  const simulateProgress = useCallback(() => {
    const statuses: AnalysisStatus[] = [
      "parsing",
      "diagnosing",
      "treating",
      "checking-interactions",
      "researching",
      "complete",
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < statuses.length) {
        setAnalysisStatus(statuses[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    return interval;
  }, []);

  const handleSubmit = useCallback(
    async (input: string, demoId?: string) => {
      setAnalysisStatus("parsing");
      setResults(null);
      setActiveTab("overview");

      const progressInterval = simulateProgress();

      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input, demoId }),
        });

        const data = await response.json();

        clearInterval(progressInterval);

        if (data.success) {
          setResults(data.data);
          setIsDemo(data.isDemo || false);
          setAnalysisStatus("complete");
        } else {
          setAnalysisStatus("error");
        }
      } catch {
        clearInterval(progressInterval);
        setAnalysisStatus("error");
      }
    },
    [simulateProgress]
  );

  const handleReset = () => {
    setAnalysisStatus("idle");
    setResults(null);
    setIsDemo(false);
    setActiveTab("overview");
  };

  // Scroll to dashboard when results appear
  useEffect(() => {
    if (results && dashboardRef.current) {
      setTimeout(() => {
        dashboardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  }, [results]);

  const isLoading = !["idle", "complete", "error"].includes(analysisStatus);

  const TABS = [
    {
      id: "overview" as const,
      label: "Overview",
      icon: User,
    },
    {
      id: "diagnoses" as const,
      label: "Diagnoses",
      icon: Stethoscope,
      count: results?.differentialDiagnoses.length,
    },
    {
      id: "treatment" as const,
      label: "Treatment",
      icon: Pill,
      count: results?.treatmentPlans.length,
    },
    {
      id: "interactions" as const,
      label: "Interactions",
      icon: ShieldAlert,
      count: results?.drugInteractions.length,
    },
    {
      id: "literature" as const,
      label: "Literature",
      icon: BookOpen,
      count: results?.references.length,
    },
  ];

  return (
    <div className="min-h-screen bg-background noise-bg">
      {/* Top bar */}
      <div className="fixed top-0 inset-x-0 z-50 border-b border-border bg-[oklch(0.1_0.01_220/90%)] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[oklch(0.75_0.15_185)] animate-data-pulse" />
            <span className="text-sm font-bold tracking-tight">
              <span className="text-[oklch(0.75_0.15_185)]">Med</span>
              <span className="text-foreground">Scope</span>
              <span className="text-muted-foreground font-light ml-1">AI</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            {isDemo && results && (
              <Badge
                variant="outline"
                className="text-[10px] font-mono text-[oklch(0.8_0.15_85)] border-[oklch(0.8_0.15_85/30%)]"
              >
                Demo Mode
              </Badge>
            )}
            {results && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-xs font-mono gap-1.5 text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="w-3 h-3" />
                New Case
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pt-12">
        {/* Hero & Input — show when no results */}
        <AnimatePresence mode="wait">
          {!results && analysisStatus === "idle" && (
            <motion.div
              key="hero"
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Hero />
              <CaseInput onSubmit={handleSubmit} isLoading={isLoading} />

              {/* Disclaimer */}
              <div className="max-w-4xl mx-auto px-6 mt-8 pb-12">
                <div className="flex items-start gap-2 p-3 rounded-lg border border-border bg-card/30 text-xs text-muted-foreground">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>
                    MedScope AI is a clinical decision support tool for
                    educational and research purposes only. It does not provide
                    medical advice and should not be used as a substitute for
                    professional medical judgment. Always consult qualified
                    healthcare professionals for patient care decisions.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading state */}
        <AnimatePresence>
          {isLoading && !results && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-6"
            >
              <AgentProgress status={analysisStatus} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Dashboard */}
        <AnimatePresence>
          {results && (
            <motion.div
              key="dashboard"
              ref={dashboardRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-7xl mx-auto px-6 py-8"
            >
              {/* Summary bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg border border-[oklch(0.75_0.15_185/20%)] bg-[oklch(0.75_0.15_185/5%)] glow-teal"
              >
                <p className="text-sm text-foreground leading-relaxed">
                  {results.summary}
                </p>
              </motion.div>

              {/* Alerts */}
              {results.criticalAlerts.length > 0 && (
                <div className="mb-6">
                  <AlertsPanel alerts={results.criticalAlerts} />
                </div>
              )}

              {/* Tab navigation */}
              <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-1 border-b border-border">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono tracking-wide transition-all border-b-2 whitespace-nowrap ${
                      activeTab === tab.id
                        ? "border-[oklch(0.75_0.15_185)] text-[oklch(0.75_0.15_185)]"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    {tab.label}
                    {tab.count !== undefined && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          activeTab === tab.id
                            ? "bg-[oklch(0.75_0.15_185/15%)] text-[oklch(0.75_0.15_185)]"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                  >
                    <PatientSummary patient={results.parsedCase} />
                    <DiagnosisPanel diagnoses={results.differentialDiagnoses} />
                    <TreatmentPanel plans={results.treatmentPlans} />
                    <InteractionsPanel
                      interactions={results.drugInteractions}
                    />
                  </motion.div>
                )}

                {activeTab === "diagnoses" && (
                  <motion.div
                    key="diagnoses"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="max-w-3xl"
                  >
                    <DiagnosisPanel diagnoses={results.differentialDiagnoses} />
                  </motion.div>
                )}

                {activeTab === "treatment" && (
                  <motion.div
                    key="treatment"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="max-w-3xl"
                  >
                    <TreatmentPanel plans={results.treatmentPlans} />
                  </motion.div>
                )}

                {activeTab === "interactions" && (
                  <motion.div
                    key="interactions"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="max-w-3xl"
                  >
                    <InteractionsPanel
                      interactions={results.drugInteractions}
                    />
                  </motion.div>
                )}

                {activeTab === "literature" && (
                  <motion.div
                    key="literature"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="max-w-3xl"
                  >
                    <LiteraturePanel references={results.references} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer disclaimer */}
              <div className="mt-12 mb-8 flex items-start gap-2 p-3 rounded-lg border border-border bg-card/30 text-xs text-muted-foreground">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[oklch(0.8_0.15_85)]" />
                <p>
                  This analysis is generated by AI and is for educational and
                  research purposes only. It should not replace professional
                  medical judgment. All treatment decisions should be made by
                  qualified healthcare professionals in consultation with the
                  patient.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
